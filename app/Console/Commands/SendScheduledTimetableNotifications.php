<?php

namespace App\Console\Commands;

use App\Http\Controllers\Telegram\Timetables;
use App\Models\TguserGroupRelation;
use App\Models\User;
use App\Notifications\ScheduledNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Properties\ParseMode;

class SendScheduledTimetableNotifications extends Command
{
    protected $signature = 'notifications:send-timetable';
    protected $description = 'Sends scheduled timetable notifications to subscribed users.';

    protected $scheduledTimes = [
        '07:55',
        '09:45',
        '11:35',
        '13:25',
        '15:15',
        '16:05',
        '18:55',
    ];

    public function handle()
    {
        $now = Carbon::now();
        $dayOfWeek = $now->dayOfWeek;

        if ($dayOfWeek == 0) {
            $this->info('Skipping Sunday notifications.');
            return;
        }

        $currentTime = $now->format('H:i');

        if (in_array($currentTime, $this->scheduledTimes)) {
            $subscribedUsers = TguserGroupRelation::where('subscription', true)
                ->whereNotNull('telegram_id')
                ->pluck('telegram_id');

            foreach ($subscribedUsers as $telegramId) {                
                $timetableMessage = Timetables::getCurrentPair($telegramId);

                if ($timetableMessage) {
                    app(Nutgram::class)->sendMessage($timetableMessage, $telegramId, parse_mode: ParseMode::HTML);
                }
            }
            $this->info("Timetable notifications sent for {$currentTime}.");
        } else {
            $this->info("No notification scheduled for {$currentTime}.");
        }
    }
}