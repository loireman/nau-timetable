<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departments;
use App\Models\Groups;
use App\Models\Stream;
use App\Models\Timetable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class ParseController extends Controller
{
    private $result = [];
    private $group;

    // At the top of your controller, make client reusable
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'timeout'  => 10.0,
            'verify'   => false,
            'connect_timeout' => 5.0,
            'http_errors' => false,
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            ]
        ]);
    }

    public function parseDep()
    {
        try {
            $response = $this->client->request('GET', "https://portal.nau.edu.ua/schedule/group/list");
            $html = $response->getBody()->getContents();

            $crawler = new Crawler($html);

            $departments = $crawler->filter('.accordion-button')->each(function (Crawler $node) {
                return trim(str_replace(["\r\n", "  "], "", $node->text()));
            });

            return $departments;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return null;
        }
    }

    public function parseGroup(Request $request)
    {
        $dep = trim($request->input('dep'));
        if (!$dep) {
            return response()->json(['error' => 'Потрібно вказати факультет'], 400);
        }

        if (!Departments::where('name', $dep)->exists()) {
            return response()->json(['error' => 'Факультет не знайдено'], 404);
        }

        $dep = Departments::where('name', $dep)->first(['id', 'name']);

        try {
            $response = $this->client->request('GET', "https://portal.nau.edu.ua/schedule/group/list");
            $html = $response->getBody()->getContents();

            $crawler = new Crawler($html);

            $firstCollapse = $crawler->filter('.accordion-button')->each(function (Crawler $node) use ($dep) {
                if (str_contains(trim($node->text()), $dep->name)) {
                    // Instead of going up to ancestors twice, find the collapse directly
                    $collapseElement = $node->closest('.accordion-header')
                        ->nextAll('.accordion-collapse')
                        ->first();

                    if (!$collapseElement->count()) {
                        return;
                    }

                    return $collapseElement;
                }
            });

            if (!$firstCollapse) {
                return response()->json(['error' => 'Не вдалося знайти групи для факультету'], 500);
            }

            $firstCollapse = array_values(array_filter($firstCollapse));

            $links = $firstCollapse[0]->filter('a')->each(function (Crawler $node) {
                return [
                    'name' => trim($node->text()),
                    'url'  => $node->attr('href'),
                ];
            });

            if (empty($links)) {
                return response()->json(['error' => 'Групи не знайдено'], 404);
            }

            // Process in batches
            foreach (array_chunk($links, 25) as $batch) {
                foreach ($batch as $group) {
                    try {
                        $stream = $this->handleStream($group['name'], $dep);

                        Groups::firstOrCreate([
                            'name' => $group['name'],
                        ], [
                            'stream_id' => $stream->id,
                        ]);
                    } catch (\Exception $e) {
                        Log::error("Error processing group: " . $e->getMessage());
                        return response()->json(['error' => 'Помилка при отриманні розкладу'], 500);
                    }
                }
            }

            return response()->json(['message' => 'Групи успішно оброблені']);
        } catch (\Exception $e) {
            Log::error("Error fetching groups: " . $e->getMessage());
            return response()->json(['error' => 'Помилка при отриманні розкладу'], 500);
        }
    }

    private function handleStream($groupName, $dep)
    {
        // Check if the group name starts with "ПБ"
        if (strpos($groupName, 'ПБ') === 0) {
            // Handle special case where the name starts with "ПБ"
            $name = 'ПБ';

            // Extract spec (numeric) and part (alphabetic) from the remaining string
            preg_match('/(\d+)([А-Яа-я]+)/', substr($groupName, 3), $matches);

            if (count($matches) === 3) {
                $spec = $matches[1]; // e.g., 107
                $part = $matches[2]; // e.g., Мв
                $year = (int)substr($matches[1], 0, 1); // Takes the first digit of the spec number as year
                $group = (int)substr($matches[1], -1); // Takes the last digit of the spec number as group
            }

            // Create or find the Stream
            $stream = Stream::firstOrCreate([
                'name' => $name . '-' . $spec . $part,
                'course' => $year,
                'department_id' => $dep->id,
            ]);

            $year = date('Y') - 2000 - $year;
        } else {
            // Handle the standard case where the name doesn't start with "ПБ"
            $parts = explode('-', $groupName);
            [$part, $spec, $year, $group, $name] = $parts;

            // Create or find the Stream
            $stream = Stream::firstOrCreate([
                'name' => $name . '-' . $spec . $part,
                'course' => date('Y') - 2000 - preg_replace('/\D/', '', $year),
                'department_id' => $dep->id,
            ]);
        }

        return $stream; // Return the created stream
    }

    public function parseTimetable(Request $request)
    {
        $dep = trim($request->input('dep'));
        if (!$dep) {
            return response()->json(['error' => 'Потрібно вказати факультет'], 400);
        }

        if (!Departments::where('name', $dep)->exists()) {
            return response()->json(['error' => 'Факультет не знайдено'], 404);
        }

        $dep = Departments::where('name', $dep)->first(['id', 'name']);

        try {
            $response = $this->client->request('GET', "https://portal.nau.edu.ua/schedule/group/list");
            $html = $response->getBody()->getContents();

            $crawler = new Crawler($html);

            $firstCollapse = $crawler->filter('.accordion-button')->each(function (Crawler $node) use ($dep) {
                if (str_contains(trim($node->text()), $dep->name)) {
                    // Instead of going up to ancestors twice, find the collapse directly
                    $collapseElement = $node->closest('.accordion-header')
                        ->nextAll('.accordion-collapse')
                        ->first();

                    if (!$collapseElement->count()) {
                        return;
                    }

                    return $collapseElement;
                }
            });

            if (!$firstCollapse) {
                return response()->json(['error' => 'Не вдалося знайти групи для факультету'], 500);
            }

            $firstCollapse = array_values(array_filter($firstCollapse));

            $links = $firstCollapse[0]->filter('a')->each(function (Crawler $node) {
                return [
                    'name' => trim($node->text()),
                    'url'  => $node->attr('href'),
                ];
            });

            if (empty($links)) {
                return response()->json(['error' => 'Групи не знайдено'], 404);
            }

            // Process in batches
            foreach (array_chunk($links, 25) as $batch) {
                foreach ($batch as $group) {
                    try {
                        $this->parseTimetableForGroup($group);
                    } catch (\Exception $e) {
                        Log::error("Error processing group: " . $e->getMessage());
                        return response()->json(['error' => 'Помилка при отриманні розкладу'], 500);
                    }
                }
            }

            return response()->json(['message' => 'Групи успішно оброблені']);
        } catch (\Exception $e) {
            Log::error("Error fetching groups: " . $e->getMessage());
            return response()->json(['error' => 'Помилка при отриманні розкладу'], 500);
        }
    }

    private function parseTimetableForGroup($link)
    {
        $this->group = Groups::where('name', $link["name"])->first();
        if (!$this->group) {
            return response()->json(['error' => 'Група не знайдена'], 404);
        }

        try {
            $response = $this->client->request('GET', "https://portal.nau.edu.ua" . $link['url']);
            $html = $response->getBody()->getContents();

            $crawler = new Crawler($html);

            // Parse both weeks with batch processing
            $this->parseWeek($crawler, 0);
            $this->parseWeek($crawler, 1);

            foreach ($this->result['lessons'] as $item) {
                try {
                    $timetable = Timetable::firstOrCreate([
                        'name' => $item['name'],
                        'week' => $item['week'],
                        'day' => $item['day'],
                        'lesson' => $item['lesson'],
                        'teacher' => $item['teacher'],
                        'type' => $item['type'],
                        'pgroup' => $item['pgroup'],
                        'auditory' => $item['auditory'],
                    ]);

                    $timetable->groups()->sync($item['group_ids']);
                } catch (\Exception $e) {
                    Log::error($e->getMessage());
                    return response()->json(['error' => 'Помилка при отриманні розкладу'], 500);
                }
            }
        } catch (\Exception $e) {
            Log::error("Error fetching groups: " . $e->getMessage());
            return response()->json(['error' => 'Помилка при отриманні розкладу'], 500);
        }
    }

    private function parseWeek(Crawler $crawler, $tableIndex)
    {
        $table = $crawler->filter('table.schedule')->eq($tableIndex);
        if ($table->count() === 0) return;

        // Get day names first
        $dayNames = [];
        $table->filter('th.day-name')->each(function (Crawler $node, $index) use (&$dayNames) {
            $dayNames[$index] = trim($node->text());
        });

        // Parse schedule rows, skipping the header row
        $table->filter('tr')->each(function (Crawler $row, $rowIndex) use ($tableIndex) {
            if ($row->filter('th.hour-name')->count() === 0) return; // Skip header row

            $row->filter('td')->each(function (Crawler $cell, $cellIndex) use ($rowIndex, $tableIndex) {
                $cell->filter('div.pairs')->each(function (Crawler $pair) use ($cellIndex, $rowIndex, $tableIndex) {
                    if ($this->getNodeValue($pair, 'div.subject')) {
                        $typestr = $this->getNodeValue($pair, 'div.activity-tag');
                        $type = match ($typestr) {
                            'Практичне' => 1,
                            'Лабораторна' => 2,
                            default => 0,
                        };

                        $pgroup = 0;
                        $pgroupstr = $this->getNodeValue($pair, 'div.subgroup');
                        if ($pgroupstr == "Підгрупа 2") {
                            $pgroup = 2;
                        } elseif ($type == 2) {
                            $pgroup = 1;
                        }

                        $groupId = $this->group->id;

                        $class = [
                            'name' => $this->getNodeValue($pair, 'div.subject'),
                            'teacher' => $this->getNodeValue($pair, 'div.teacher a'),
                            'type' => $type,
                            'week' => $tableIndex + 1,
                            'day' => $cellIndex + 1,
                            'lesson' => $rowIndex,
                            'auditory' => ($this->getNodeValue($pair, 'div.room span') == "Без аудиторії") ? "" : $this->getNodeValue($pair, 'div.room span'),
                            'pgroup' => $pgroup,
                            'group_id' => $groupId,
                            'group_ids' => [],
                        ];

                        if ($pair->filter('div.flow-groups')->count() > 0) {
                            $class['group_ids'] = []; // Initialize group_ids if it's not already initialized
                            $groupIds = $pair->filter('div.flow-groups a')->each(function (Crawler $groupNode) use ($class) {
                                $groupName = trim($groupNode->text());
                                if ($flowGroup = Groups::where('name', $groupName)->first(['id'])) {
                                    return $flowGroup->id;
                                }
                            });
                            
                            $class['group_ids'] = $groupIds;
                        } else {
                            $class['group_ids'][] = $groupId;
                        }

                        if (!empty($class)) {
                            $this->result['lessons'][] = $class;
                        }
                    }
                });
            });
        });
    }

    private function getNodeValue(Crawler $crawler, string $selector)
    {
        return $crawler->filter($selector)->count() > 0 ? trim($crawler->filter($selector)->text()) : null;
    }
}
