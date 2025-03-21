<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use SergiX44\Nutgram\Nutgram;

class ScheduledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function via($notifiable)
    {
        return ['telegram'];
    }

    public function toTelegram($notifiable)
    {
        return [
            'chat_id' => $notifiable->telegram_chat_id,
            'text' => $this->message,
        ];
    }

    public function send($notifiable, $notification)
    {
        $data = $this->toTelegram($notifiable);
        if($data['chat_id']){
            app(Nutgram::class)->sendMessage($data['text'], ['chat_id' => $data['chat_id']]);
        }
    }
}