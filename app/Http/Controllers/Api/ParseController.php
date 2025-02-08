<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Departments;
use App\Models\Groups;
use App\Models\Stream;
use App\Models\Timetable;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ParseController extends Controller
{
    private $xpath;
    private $result = [];
    private $group;

    public function parseDep()
    {
        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group/list");
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        // Cache department names directly
        $deps = $this->xpath->query('//*[contains(@class, "accordion-button")]');
        $this->result = iterator_to_array($deps);

        return array_map(function ($dep) {
            return str_replace(["\r\n", "  "], "", $dep->nodeValue);
        }, $this->result);
    }

    public function parseGroup(Request $request)
    {
        $group = $request->input('group');
        if ($group == null) {
            return response()->json(['error' => 'Потрібно вказати групу'], 400);
        }

        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group/list");
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        if ($group === 'loiri') {
            $query = '//a[starts-with(@href, "/schedule/group?id=")]';
            $links = $this->xpath->query($query);

            // Process in batches
            foreach (array_chunk(iterator_to_array($links), 10) as $batch) {
                foreach ($batch as $link) {
                    try {
                        $this->processGroup($link);
                    } catch (\Exception $e) {
                        continue;
                    }
                }
                sleep(1);  // Adjust sleep to balance performance and rate-limiting
            }

            return response()->json("success");
        }

        // Direct group search
        $query = "//a[text()='$group']";
        $link = $this->xpath->query($query)->item(0);
        if (!$link) {
            return response()->json(['error' => 'Групу не знайдено'], 404);
        }

        $this->processGroup($link);
        return $this->result;
    }

    private function processGroup($link)
    {
        $parentDiv = $link->parentNode->parentNode->parentNode->parentNode->parentNode;
        $departmentHeader = $parentDiv->previousSibling->previousSibling;
        $departmentName = '';

        if ($departmentHeader && $departmentHeader->nodeName === 'h2') {
            $button = $departmentHeader->getElementsByTagName('button')->item(0);
            if ($button) {
                $departmentName = str_replace(["\r\n", "  "], "", $button->nodeValue);
            }
        }

        // Use batch lookup to avoid multiple queries
        $dep = Departments::where('name', $departmentName)->first('id');

        $groupName = $link->nodeValue;
        $stream = $this->handleStream($groupName, $dep);

        $group_stream = Groups::firstOrCreate([
            'name' => $groupName,
            'stream_id' => $stream->id,
            'substream_id' => null,
        ]);

        $this->result = [
            'group' => $groupName,
            'stream' => $stream->name,
            'department' => $departmentName,
            'group_id' => $group_stream->id,
            'stream_id' => $stream->id,
        ];
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
        $group = $request->input('group');
        if ($group == null) {
            return response()->json(['error' => 'Потрібно вказати групу'], 400);
        }

        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group/list");
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        if ($group === 'loiri') {
            $query = '//a[starts-with(@href, "/schedule/group?id=")]';
            $links = $this->xpath->query($query);

            // Process in batches
            foreach (array_chunk(iterator_to_array($links), 10) as $batch) {
                foreach ($batch as $link) {
                    try {
                        $this->parseTimetableForGroup($link);
                    } catch (\Exception $e) {
                        continue;
                    }
                }
                sleep(1);
            }

            return response()->json("success");
        }

        // Direct group search
        $query = "//a[text()='$group']";
        $link = $this->xpath->query($query)->item(0);
        if (!$link) {
            return response()->json(['error' => 'Групу не знайдено'], 404);
        }

        $this->parseTimetableForGroup($link);
        return response()->json("success");
    }

    private function parseTimetableForGroup($link)
    {
        $groupID = explode('=', $link->getAttribute('href'))[1];
        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group?id=" . $groupID);
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        $group = $this->xpath->query('//h1')->item(0)->nodeValue;
        $this->result["group"] = str_replace(["Розклад групи", " ", "\r\n"], "", $group);

        // Retrieve group and stream info in batches and optimize query
        $this->group = Groups::where('name', $this->result["group"])->first();
        if (!$this->group) {
            return response()->json(['error' => 'Група не знайдена'], 404);
        }

        // Parse both weeks with batch processing
        $this->parseWeek(0, "week1");
        $this->parseWeek(1, "week2");

        foreach ($this->result['lessons'] as $item) {
            // Bulk insert or batch update Timetable
            Timetable::firstOrCreate([
                'name' => $item['name'],
                'teacher' => $item['teacher'],
                'type' => $item['type'],
                'week' => $item['week'],
                'day' => $item['day'],
                'lesson' => $item['lesson'],
                'auditory' => $item['auditory'],
                'pgroup' => $item['pgroup'],
                'group_id' => $item['group_id'],
            ]);
        }
    }

    private function parseWeek($tableIndex, $weekKey)
    {
        $table = $this->xpath->query('//table[@class="schedule"]')->item($tableIndex);
        if (!$table) return;

        // Cache day names
        $dayNames = [];
        $dayHeaders = $this->xpath->query('.//th[@class="day-name"]', $table);
        foreach ($dayHeaders as $index => $header) {
            $dayNames[$index] = trim($header->nodeValue);
        }

        $rows = $this->xpath->query('.//tr[th[@class="hour-name"]]', $table);
        foreach ($rows as $rowIndex => $row) {
            $cells = $this->xpath->query('.//td', $row);
            foreach ($cells as $cellIndex => $cell) {
                $classes = $this->xpath->query('.//div[@class="pairs"]', $cell);
                if ($classes->length > 0) {
                    foreach ($classes as $lesson) {
                        $this->result['lessons'][] = [
                            'name' => $lesson->nodeValue,
                            'teacher' => '',
                            'type' => '',
                            'week' => $weekKey,
                            'day' => $dayNames[$cellIndex],
                            'lesson' => $rowIndex + 1,
                            'auditory' => '',
                            'pgroup' => $this->result["group"],
                            'group_id' => $this->group->id,
                        ];
                    }
                }
            }
        }
    }
}
