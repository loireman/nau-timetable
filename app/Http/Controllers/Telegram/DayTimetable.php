<?php

namespace App\Http\Controllers\Telegram;

use App\Models\Groups;
use Exception;
use Illuminate\Support\Facades\Log;
use SergiX44\Nutgram\Conversations\Conversation;
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Properties\ParseMode;
use SergiX44\Nutgram\Telegram\Types\Keyboard\InlineKeyboardButton;
use SergiX44\Nutgram\Telegram\Types\Keyboard\InlineKeyboardMarkup;

class DayTimetable extends Conversation
{
    private static $startWeek = 04;
    private static $groupInfo;
    private static $date;

    public function __construct()
    {
        if (config('config.start_week') == 1) {
            self::$startWeek = 05;
        }
    }

    private static $strWeeks = [
        '1' => 'Перший тиждень',
        '2' => 'Другий тиждень',
    ];
    private static $strDays = [
        '0' => ['long' => 'Неділя', 'shortOld' => 'Нед'],
        '1' => ['long' => 'Понеділок', 'shortOld' => 'Пнд.'],
        '2' => ['long' => 'Вівторок', 'shortOld' => 'Втр.'],
        '3' => ['long' => 'Сeреда', 'shortOld' => 'Срд.'],
        '4' => ['long' => 'Четвер', 'shortOld' => 'Чтв.'],
        '5' => ['long' => 'П\'ятниця', 'shortOld' => 'Птн.'],
        '6' => ['long' => 'Субота', 'shortOld' => 'Сбт.']
    ];
    private static $strPairs = [
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

    public static function getKyivTimezone()
    {
        return date_create(self::$date, timezone_open("Europe/Kyiv"));
    }

    public static function getCurrentDay()
    {
        return date_format(self::getKyivTimezone(self::$date), "w");
    }

    public static function getCurrentStrDay(): string
    {
        return self::$strPairs[self::getCurrentDay()]['long'];
    }

    public static function getCurrentWeek(): int
    {
        return (date_format(self::getKyivTimezone(self::$date), 'W') - self::$startWeek) % 2;
    }

    public function start(Nutgram $bot)
    {
        self::$groupInfo = Timetables::checkUserGroup($bot->chatId());

        if (!self::$groupInfo) {
            return 'У вас не вказано групу. Це можна зробити у /selectgroup';
        }

        $date = str_replace('/lessontest', '', $bot->message()->text);
        if ($date != "") {
            self::$date = date("Y-m-d", strtotime(str_replace(" ", '', $date) . '.2025'));
        } else {
            self::$date = date("Y-m-d");
        }

        $message = self::getPairsDate();

        if ($message == '404') {
            $bot->sendMessage('Помилка при отриманні даних на задану дату');
            $this->end();
            return;
        }

        $bot->sendMessage(
            $message,
            reply_markup: InlineKeyboardMarkup::make()
                ->addRow(
                    InlineKeyboardButton::make('Попередній', callback_data: '1'), 
                    InlineKeyboardButton::make('Наступний', callback_data: '2')
            ),
            parse_mode: ParseMode::HTML
        );

        $this->next('getUpdates');
    }

    public function getUpdates(Nutgram $bot)
    {
        if (!$bot->isCallbackQuery()) {
            return;
        }

        $choice = $bot->callbackQuery()->data;

        switch ($choice) {
            case '1':
                self::$date = date('Y-m-d', strtotime(self::$date . ' -1 day'));
                break;
            case '2':
                self::$date = date('Y-m-d', strtotime(self::$date . ' +1 day'));
                break;
            default:
                $this->end();
                break;
        }

        $message = self::getPairsDate();

        if ($message == '404') {
            $bot->editMessageText('Помилка при отриманні даних на задану дату');
            $this->end();
            return;
        }

        $bot->editMessageText(
            $message,
            reply_markup: InlineKeyboardMarkup::make()
                ->addRow(
                    InlineKeyboardButton::make('Попередній день', callback_data: '1'), 
                    InlineKeyboardButton::make('Наступний день', callback_data: '2')
            ),
            parse_mode: ParseMode::HTML
        );
        $this->next('getUpdates');
    }

    public static function getPairsDate(): string
    {
        try {
            $week = self::getCurrentWeek() == 0 ? self::getCurrentWeek() + 2 : self::getCurrentWeek();
            $currDay = date('w', strtotime(self::$date));
            $group = Groups::find(self::$groupInfo["group_id"]);

            if (!$group) {
                return 'Група не знайдена.';
            }

            $timetables = $group->timetables()
                ->where('week', $week)
                ->where('day', $currDay)
                ->get()
                ->sortBy('lesson');

            if ($timetables->isEmpty()) {
                return 'На ' . date('d.m', strtotime(self::$date)) . ' (' . self::$strDays[$currDay]['long'] . ', ' . self::$strWeeks[self::getCurrentWeek() + 1] . ') ' . ' пар немає';
            }

            $message = 'На ' . date('d.m', strtotime(self::$date)) . ' (' . self::$strDays[$currDay]['long'] . ', ' . self::$strWeeks[self::getCurrentWeek() + 1] . ') ' . ' такі пари: ';

            foreach ($timetables as $timetable) {

                $message .= '

<b>' . $timetable->lesson . ' Пара: ' . self::$strPairs[$timetable->lesson]['time_start'] . '-' . self::$strPairs[$timetable->lesson]['time_end'] . '</b>
Назва: <b>' . $timetable->name . '</b>
Тип: ' . ['Лекція', 'Практична', 'Лабораторна'][$timetable->type] . ($timetable->type == 2 ? '
Підгрупа: <b>' . $timetable->pgroup . '</b>' : '') . '
Викладач: <b>' . $timetable->teacher . ($timetable->auditory ? '</b>
Аудиторія: <b>' . $timetable->auditory . '</b>' : '</b>');
            }

            return $message;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return 404;
        }
    }
}
