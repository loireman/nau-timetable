<?php
/** @var SergiX44\Nutgram\Nutgram $bot */

use SergiX44\Nutgram\Nutgram;
use App\Http\Controllers\Telegram\StartConversation;
use App\Http\Controllers\Telegram\Timetables;
use App\Models\Groups;
use Illuminate\Support\Facades\Storage;
use SergiX44\Nutgram\Telegram\Properties\ParseMode;
use SergiX44\Nutgram\Telegram\Types\Internal\InputFile;

$bot->onCommand('start', function (Nutgram $bot) {
    $pginfo = ['Не встановлена', 'Перша', 'Друга'];

    $bot->sendMessage(`Привіт! Я функціональний бот розкладу КАІ.
Сайт розкладу: https://timetable.loiri.com.ua
Автор: @lo1ri_andy
Вихідний код тут: https://github.com/loireman/nau-timetable`, parse_mode: ParseMode::HTML);

    $groupInfo = Timetables::checkUserGroup($bot->chatId());
    
    if($groupInfo) {
        $group = Groups::where('id', $groupInfo["group_id"])->first();
        $bot->sendMessage('Наразі встановлено таку групу: ' . $group->name . '
        Підгрупа: ' . $pginfo[$groupInfo["pgroup"]]);
        $bot->sendMessage('Натисни /help щоб дізнатись перелік доступних команд.');
    }
    else {
        $bot->sendMessage('Схоже, що у вас не вибрана група. Ви можете її встановити за допомогою /selectgroup');
    };
})->description('Розпочати роботу з ботом');

$bot->onCommand('selectgroup', StartConversation::class)
->description('Змінити інформацію про групу');

$bot->onCommand('help', function (Nutgram $bot) {
    $photo = InputFile::make(fopen(Storage::path('public/TelebotLogoNew.png'), 'rb'));
    $message = $bot->sendPhoto($photo)->
    sendMessage('Наразі бот відкукується на такі команди:
/start - розпочати роботу з ботом.
/selectgroup - вибрати групу для розкладу.
/help - вивести інформацію про бота.
/time - вивести поточний час та номер пари що проходить.
/lesson - вивести поточну пару якщо є.
/today - вивести пари за поточний день.
/tomorrow - вивести пари за наступний день. Якщо поточний день - неділя, виводить пари понеділка наступного тижня.

Також функціонал оновлюється. Приємного користування :)', parse_mode: ParseMode::HTML
        );
    return $message;
})->description('Вивести інформацію про бота');

$bot->onCommand('time', function (Nutgram $bot) {
    $pairnum = Timetables::getCurrentPairNum();

    $pair = ($pairnum > 0 && $pairnum < 8) ? $pairnum : 'наразі пари немає';

    $message = 'Cьогодні ' . Timetables::getCurrentStrDay() . '
' . date("d.m.Y")  . '
' . 'Час: ' . date_format(Timetables::getKyivTimezone(), "H:i:s ") . '
' . 'Тиждень: ' . Timetables::getCurrentWeek() + 1 . '
' . 'Пара: ' . (Timetables::getCurrentDay() ? $pair : 'Сьогодні вихідний, пар немає');

    $bot->sendMessage($message);
})->description('Вивести поточний час та номер пари що проходить');

$bot->onCommand('lesson', function (Nutgram $bot) {

    $pair = Timetables::getCurrentDay() ? Timetables::getCurrentPair($bot->chatId()) : 'Сьогодні вихідний, пар немає';

    $bot->sendMessage($pair, parse_mode: ParseMode::HTML);
})->description('Вивести поточну пару якщо є');

$bot->onCommand('today', function (Nutgram $bot) {
    $message = Timetables::getPairsToday($bot->chatId(), 0);

    $bot->sendMessage($message, parse_mode: ParseMode::HTML);
})->description('Вивести пари за поточний день');

$bot->onCommand('tomorrow', function (Nutgram $bot) {
    $message = Timetables::getPairsToday($bot->chatId(), 1);

    $bot->sendMessage($message, parse_mode: ParseMode::HTML);
})->description('Вивести пари за наступний день');