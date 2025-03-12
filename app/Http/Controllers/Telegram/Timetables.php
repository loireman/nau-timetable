<?php

namespace App\Http\Controllers\Telegram;

use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Controller;
use App\Models\Groups;
use App\Models\TguserGroupRelation;
use App\Models\Timetable;
use Exception;
use Illuminate\Support\Facades\Log;

class Timetables extends Controller
{
    private static $startWeek = 04;

    public static function getStrWeeks()
    {
        return [
            '1' => 'Перший тиждень',
            '2' => 'Другий тиждень',
        ];
    }

    public static function getStrDays()
    {
        return [
            '0' => ['long' => 'Неділя', 'shortOld' => 'Нед'],
            '1' => ['long' => 'Понеділок', 'shortOld' => 'Пнд.'],
            '2' => ['long' => 'Вівторок', 'shortOld' => 'Втр.'],
            '3' => ['long' => 'Сeреда', 'shortOld' => 'Срд.'],
            '4' => ['long' => 'Четвер', 'shortOld' => 'Чтв.'],
            '5' => ['long' => 'П\'ятниця', 'shortOld' => 'Птн.'],
            '6' => ['long' => 'Субота', 'shortOld' => 'Сбт.']
        ];
    }

    public static function getStrPairs()
    {
        return
            [
                '0' => ['name' => 'Ще рано, поспи трохи', 'time_start' => '12:00', 'time_end' => '7:45'],
                '1' => ['name' => 'Наразі <b>Перша пара</b>', 'time_start' => '8:00', 'time_end' => '9:35'],
                '2' => ['name' => 'Наразі <b>Друга пара</b>', 'time_start' => '9:50', 'time_end' => '11:25'],
                '3' => ['name' => 'Наразі <b>Третя пара</b>', 'time_start' => '11:40', 'time_end' => '13:15'],
                '4' => ['name' => 'Наразі <b>Четверта пара</b>', 'time_start' => '13:30', 'time_end' => '15:05'],
                '5' => ['name' => 'Наразі <b>П\'ята пара</b>', 'time_start' => '15:20', 'time_end' => '16:55'],
                '6' => ['name' => 'Наразі <b>Шоста пара</b>', 'time_start' => '17:10', 'time_end' => '18:45'],
                '7' => ['name' => 'Наразі <b>Сьома пара</b>', 'time_start' => '19:00', 'time_end' => '20:35'],
                '8' => ['name' => 'Лягай спати, пізно вже', 'time_start' => '20:50', 'time_end' => '12:00'],
            ];
    }

    public static function getKyivTimezone()
    {
        return date_create('now', timezone_open("Europe/Kyiv"));
    }

    public static function getCurrentDay()
    {
        return date_format(self::getKyivTimezone(), "w");
    }

    public static function getCurrentStrDay(): string
    {
        return self::getStrDays()[self::getCurrentDay()]['long'];
    }

    public static function getCurrentWeek(): int
    {
        if (config('config.start_week') == 1) {
            self::$startWeek = 05;
        }
        return (date_format(self::getKyivTimezone(), 'W') - self::$startWeek) % 2;
    }

    public static function getCurrentPairNum(): int
    {
        $timezone = self::getKyivTimezone();
        $time = date_format($timezone, 'i') + date_format($timezone, 'H') * 60;
        switch ($time) {
            case $time < 465:
                return 0;
            case $time < 1235:
                $time = ($time - 465);
                $value = 0;
                while ($time > 0) {
                    $time = $time - 110;
                    $value++;
                }
                return $value;
            default:
                return 8;
        }
    }

    public static function getCurrentPair($chat_id): string
    {
        $num = self::getCurrentPairNum();
        $message = self::getStrPairs()[$num]['name'];
        $info = self::checkUserGroup($chat_id);

        if (!$info) {
            return 'У вас не вказано групу. Це можна зробити у /selectgroup';
        }


        try {
            if (self::getCurrentDay() == 0) {
                $week = self::getCurrentWeek() == 0 ? self::getCurrentWeek() + 2 : self::getCurrentWeek();
                $currDay = self::getCurrentDay() + 1;
            } else {
                $week = (self::getCurrentWeek() + 1);
                $currDay = self::getCurrentDay();
            }

            $group = Groups::find($info["group_id"]);

            if (!$group) {
                return 'Група не знайдена.';
            }

            // Fetch timetables using the many-to-many relationship
            $timetable = $group->timetables()
                ->where('week', $week)
                ->where('day', $currDay)
                ->where('lesson', $num)
                ->first();

            if ($timetable == null) {
                return $message;
            }

            $message .= '

<b>' . $timetable->lesson . ' Пара: ' . self::getStrPairs()[$timetable->lesson]['time_start'] . '-' . self::getStrPairs()[$timetable->lesson]['time_end'] . '</b>
Назва: <b>' . $timetable->name . '</b>
Тип: ' . ['Лекція', 'Практична', 'Лабораторна'][$timetable->type] . ($timetable->type == 2 ? '
Підгрупа: ' . $timetable->pgroup : '') . '
Викладач: <b>' . $timetable->teacher . ($timetable->auditory ? '</b>
Аудиторія: <b>' . $timetable->auditory . '</b>' : '</b>') . ($timetable->auditory_link ? '
Посилання на міт: <a href="' . $timetable->auditory_link . '">Посилання</a>' : '');
            return $message;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $message;
        }

        return $message;
    }
    public static function getPairsToday($chat_id, $isToday = 0): string
    {
        $info = self::checkUserGroup($chat_id);
        $days = ['Сьогодні', 'Завтра', 'Сьогодні Неділя, у Понеділок наступного тижня'];

        if (!$info) {
            return 'У вас не вказано групу. Це можна зробити у /selectgroup';
        }

        try {
            if (self::getCurrentDay() == 0) {
                $week = self::getCurrentWeek() == 0 ? self::getCurrentWeek() + 2 : self::getCurrentWeek();
                $currDay = self::getCurrentDay() + 1;
                $message = $days[$isToday ?: 2];
            } else {
                $week = (self::getCurrentWeek() + 1);
                $currDay = $isToday ? self::getCurrentDay() + 1 : self::getCurrentDay();
                $message = $days[$isToday];
            }

            $group = Groups::find($info["group_id"]);

            if (!$group) {
                return 'Група не знайдена.';
            }

            $timetables = $group->timetables()
                ->where('week', $week)
                ->where('day', $currDay)
                ->get()
                ->sortBy('lesson');

            if ($timetables->isEmpty()) {
                return $message . ' пар немає';
            }

            $message .= ' такі пари: ';

            foreach ($timetables as $timetable) {

                $message .= '

<b>' . $timetable->lesson . ' Пара: ' . self::getStrPairs()[$timetable->lesson]['time_start'] . '-' . self::getStrPairs()[$timetable->lesson]['time_end'] . '</b>
Назва: <b>' . $timetable->name . '</b>
Тип: ' . ['Лекція', 'Практична', 'Лабораторна'][$timetable->type] . ($timetable->type == 2 ? '
Підгрупа: <b>' . $timetable->pgroup . '</b>' : '') . '
Викладач: <b>' . $timetable->teacher . ($timetable->auditory ? '</b>
Аудиторія: <b>' . $timetable->auditory . '</b>' : '</b>');
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return 'Виникла помилка при отриманні розкладу.';
        }

        return $message;
    }


    public static function checkUserGroup($chat_id): array | null
    {
        return TguserGroupRelation::where('telegram_id', $chat_id)->first()
            ? TguserGroupRelation::where('telegram_id', $chat_id)->first()->toArray()
            : null;
    }
}
