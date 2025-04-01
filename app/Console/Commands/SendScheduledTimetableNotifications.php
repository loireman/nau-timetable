<?php

namespace App\Console\Commands;

use App\Http\Controllers\Telegram\Timetables;
use App\Models\TguserGroupRelation;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Properties\ParseMode;

class SendScheduledTimetableNotifications extends Command
{
    protected $signature = 'notifications:send-timetable';
    protected $description = 'Sends scheduled timetable notifications to subscribed users.';

    protected $scheduledTimes = [
        '06:55',
        '08:45',
        '10:35',
        '12:25',
        '14:15',
        '15:05',
        '17:55',
    ];

    public function handle()
    {
        $now = Carbon::now('Europe/Kyiv');
        $dayOfWeek = $now->dayOfWeek;

        if ($dayOfWeek == 0) {
            $this->info('Skipping Sunday notifications.');
            return;
        }

        $currentTime = $now->format('H:i');
        
        if (env('APP_ENV') == 'local') {
            self::send();
            $this->info("Timetable notifications sent for {$currentTime} (local).");
        } else {
            foreach ($this->scheduledTimes as $scheduledTime) {
                $scheduled = $now->createFromFormat('H:i', $scheduledTime, 'Europe/Kyiv'); 

                if ($currentTime == $scheduled) {
                    self::send();
                    $this->info("Timetable notifications sent for {$currentTime} (prod).");
                    return;
                }
            }

            $this->info("No notification scheduled for {$currentTime}.");
        }
    }

    private function send() {
        $subscribedUsers = TguserGroupRelation::where('subscription', true)
                ->whereNotNull('telegram_id')
                ->pluck('telegram_id');
                
                foreach ($subscribedUsers as $telegramId) {                
                    $timetableMessage = Timetables::getCurrentPair($telegramId);
                    
                    if ($timetableMessage[1]) {
                        app(Nutgram::class)->sendMessage($timetableMessage[0], $telegramId, parse_mode: ParseMode::HTML);
                    }
                }
    }
}