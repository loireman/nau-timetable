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

    /**
     * Data to parse 
     * 
     *   name: "",
     *   teacher: "",
     *   type: 0,
     *   week: 1,
     *   day: 1,
     *   lesson: 1,
     *   auditory: "",
     *   auditory_link: "",
     *   pgroup: 0,
     *   group_id: null,
     *   stream_id: null,
     */

    public function parseDep()
    {
        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group/list");

        // Initialize DOM and XPath
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        // Get group name
        $deps = $this->xpath->query('//*[contains(@class, "accordion-button")]');

        foreach ($deps as $dep) {
            $this->result[] = str_replace(["\r\n", "  "], "", $dep->nodeValue);
        }

        return $this->result;
    }

    public function parseGroup(Request $request)
    {
        $group = $request->input('group');

        if ($group == null) {
            return response()->json([
                'error' => 'Потрібно вказати групу'
            ], 400);
        }

        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group/list");

        // Initialize DOM and XPath
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        // Query to find the <a> tag with the group name
        $query = "//a[text()='$group']";
        $link = $this->xpath->query($query)->item(0);

        if (!$link) {
            return response()->json([
                'error' => 'Групу не знайдено'
            ], 404);
        }

        $parentDiv = $link->parentNode->parentNode->parentNode->parentNode->parentNode;
        $departmentHeader = $parentDiv->previousSibling->previousSibling;
        $departmentName = '';

        if ($departmentHeader && $departmentHeader->nodeName === 'h2') {
            $button = $departmentHeader->getElementsByTagName('button')->item(0);
            if ($button) {
                $departmentName = str_replace(["\r\n", "  "], "", $button->nodeValue);
            }
        }

        $dep = Departments::where('name', $departmentName)->first('id');

        // Parse the group number for the streamData (optional)
        $parts = explode('-', $link->nodeValue);
        [$part, $spec, $year, $group, $name] = $parts;

        $stream = Stream::firstOrCreate([
            'name' => $name . '-' . $spec . $part,
            'course' => date('Y') - 2000 - $year,
            'department_id' => $dep->id,
        ]);

        $group_stream = Groups::firstOrCreate([
            'name' => $part . '-' . $spec . '-' . $year . '-x-' . $name,
            'stream_id' => $stream->id,
            'substream_id' => null,
        ]);

        $group = Groups::firstOrCreate([
            'name' => $link->nodeValue,
            'stream_id' => null,
            'substream_id' => $group_stream->id,
        ]);

        $this->result = [
            'group' => $group,
            'stream' => $stream->name,
            'department' => $departmentName,
            'group_id' => $group_stream->id,
            'stream_id' => $stream->id,
        ];

        return $this->result;
    }

    public function parseTimetable(Request $request)
    {
        $group = $request->input('group');

        if ($group == null) {
            return response()->json([
                'error' => 'Потрібно вказати групу'
            ], 400);
        }

        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group/list");

        // Initialize DOM and XPath
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        // Query to find the <a> tag with the group name
        $query = "//a[text()='$group']";
        $link = $this->xpath->query($query)->item(0);

        if (!$link) {
            return response()->json([
                'error' => 'Групу не знайдено'
            ], 404);
        }

        $groupID = $link->getAttribute('href');
        $groupID = explode('=', $groupID)[1];

        $html = file_get_contents("https://portal.nau.edu.ua/schedule/group?id=" . $groupID);

        // Initialize DOM and XPath
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($html);
        libxml_use_internal_errors(false);
        $this->xpath = new \DOMXPath($doc);

        // Get group name
        $group = $this->xpath->query('//h1')->item(0)->nodeValue;
        $this->result["group"] = str_replace(["Розклад групи", " ", "\r\n"], "", $group);

        $this->group = Groups::where('name', $this->result["group"])->first();

        if (!$this->group) {
            return response()->json([
                'error' => 'Група не знайдена, її потрібно додати в базу даних вручну'
            ], 404);
        }

        // Parse both weeks
        $this->parseWeek(0, "week1");
        $this->parseWeek(1, "week2");

        foreach($this->result['lessons'] as $item) {
            if($item['type'] == 0) {
                $item['group_id'] = $item['stream_id'];
            }

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

        return "success";
    }

    private function parseWeek($tableIndex, $weekKey)
    {
        $table = $this->xpath->query('//table[@class="schedule"]')->item($tableIndex);
        if (!$table) return;

        // Get day names first
        $dayNames = [];
        $dayHeaders = $this->xpath->query('.//th[@class="day-name"]', $table);
        foreach ($dayHeaders as $index => $header) {
            $dayNames[$index] = trim($header->nodeValue);
        }

        // Parse schedule rows, skip the header row
        $rows = $this->xpath->query('.//tr[th[@class="hour-name"]]', $table);
        foreach ($rows as $rowIndex => $row) {

            // Parse classes for each day
            $cells = $this->xpath->query('.//td', $row);

            foreach ($cells as $cellIndex => $cell) {
                $classes = [];

                $pairs = $this->xpath->query('.//div[@class="pairs"]', $cell);
                Log::info(json_encode($pairs->length));

                if ($pairs->length === 0) {
                    Log::info('No pairs found');
                    continue;
                }


                foreach ($pairs as $pairIndex => $pair) {

                    if ($this->getNodeValue($pair, './/div[@class="subject"]')) {
                        $typestr = $this->getNodeValue($pair, './/div[@class="activity-tag"]');
                        $type = 0;
                        switch ($typestr) {
                            case "Практичне":
                                $type = 1;
                                break;
                            case "Лабораторна":
                                $type = 2;
                                break;
                            default:
                                $type = 0;
                                break;
                        }

                        $pgroup = 0;
                        $pgroupstr = $this->getNodeValue($pair, './/div[@class="subgroup"]');

                        if ($pgroupstr == "Підгрупа 1") {
                            $pgroup = 1;
                        } else if ($pgroupstr == "Підгрупа 2") {
                            $pgroup = 2;
                        } else {
                            $pgroup = 0;
                        }

                        $groupId = $this->group->id;
                        $streamId = $this->group->substream_id;

                        $class = [
                            'name' => $this->getNodeValue($pair, './/div[@class="subject"]'),
                            'teacher' => $this->getNodeValue($pair, './/div[@class="teacher"]/a'),
                            'type' => $type,
                            'week' => $weekKey === 'week1' ? 1 : 2,
                            'day' => $cellIndex + 1,
                            'lesson' => $rowIndex + 1,
                            'auditory' => $this->getNodeValue($pair, './/div[@class="room"]/span') == "Без аудиторії" ? "" : $this->getNodeValue($pair, './/div[@class="room"]/span'),
                            'pgroup' => $pgroup,
                            'group_id' => $type == 0 ? $streamId : $groupId,
                            'stream_id' => $type == 0 ? $streamId : null,
                        ];

                        if (!empty($class)) {
                            $this->result['lessons'][] = $class;
                        }
                    }
                }
            }
        }
    }

    private function getNodeValue($context, $query)
    {
        $node = $this->xpath->query($query, $context)->item(0);
        return $node ? trim($node->nodeValue) : null;
    }
}
