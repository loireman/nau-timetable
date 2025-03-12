<?php

namespace App\Http\Controllers\Telegram;

use App\Models\Group;
use App\Models\Groups;
use App\Models\TguserGroupRelation;
use Illuminate\Support\Facades\Log;
use SergiX44\Nutgram\Conversations\Conversation;
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Keyboard\InlineKeyboardButton;
use SergiX44\Nutgram\Telegram\Types\Keyboard\InlineKeyboardMarkup;

class StartConversation extends Conversation
{

    public $chat_id;
    public $depart;
    public $group;
    public $pgroup;
    public $selectedInfo;

    public function start(Nutgram $bot)
    {
        $chat_type = $bot->getChat($bot->chatId())->type;

        if ($chat_type == 'group' || $chat_type == 'supergroup') {
            $admin = $bot->getChatMember($bot->chatId(), $bot->userId())->status;
            if ($admin != 'creator' && $admin != 'administrator') {
                $bot->sendMessage('У вас недостатньо прав для зміни групи');
                $this->end();
            }
        }

        $groupInfo = Timetables::checkUserGroup($bot->chatId());

        if ($groupInfo) {
            $this->group = Groups::where('id', $groupInfo["group_id"])->first();
            $bot->sendMessage('Наразі встановлено таку групу: ' . $this->group->name . '
Підгрупа: ' . ($groupInfo["pgroup"] == 0 ? 'Обидві' : $groupInfo["pgroup"]));
            $this->pgroup = $groupInfo["pgroup"];
            $bot->sendMessage(
                'Які дані змінити?',
                reply_markup: InlineKeyboardMarkup::make()
                    ->addRow(InlineKeyboardButton::make('Група', callback_data: 'group'))
                    ->addRow(InlineKeyboardButton::make('Підгрупа', callback_data: 'pgroup'))
                    ->addRow(InlineKeyboardButton::make('Вийти', callback_data: 'Back'))
            );
            $this->chat_id = $bot->chatId();
            $this->next('askForChangeGroup');
        } else {
            $this->chat_id = $bot->chatId();
            $this->askChangeGroup($bot);
        }
    }

    public function askForChangeGroup(Nutgram $bot)
    {
        // if is not a callback query, ask again!
        if (!$bot->isCallbackQuery()) {
            return;
        }

        $choice = $bot->callbackQuery()->data;

        switch ($choice) {
            case 'group':
                $bot->deleteMessage($bot->chatId(), $bot->messageId());
                $this->askChangeGroup($bot);
                break;
            case 'pgroup':
                $this->askChangePGroupManual($bot);
                break;
            default:
                $bot->deleteMessage($bot->chatId(), $bot->messageId());
                $this->end();
                break;
        }
    }

    public function askChangeGroup(Nutgram $bot)
    {
        $string = 'Впишіть назву групи (наприклад, Б-123-21-4-КС)';
        $bot->sendMessage(
            $string,
            reply_markup: InlineKeyboardMarkup::make()
                ->addRow(InlineKeyboardButton::make('Вийти', callback_data: 'exit')),
        );
        $this->next('askChangePGroup');
    }

    public function askChangePGroup(Nutgram $bot)
    {
        if ($bot->isCallbackQuery()) {
            if ($bot->callbackQuery()->data === 'exit') {
                $bot->editMessageText('Процес відмінено.');
                $this->end();
            }
            return;
        }

        // Try to delete the previous message
        try {
            $bot->deleteMessage($bot->chatId(), $bot->messageId() - 1);
        } catch (\Exception $e) {
            // Silently continue if deletion fails
        }

        // Convert to uppercase once and store in variable
        $group = strtoupper($bot->message()->text);

        // Use first() only if needed (more efficient database query)
        $groupModel = Groups::where('name', $group)->first();

        if ($groupModel) {
            $this->group = $groupModel;

            // Combine messages to reduce API calls
            $bot->sendMessage(
                'Ви вибрали групу: ' . $groupModel->name . "\n\nТепер виберіть підгрупу:",
                reply_markup: InlineKeyboardMarkup::make()
                    ->addRow(
                        InlineKeyboardButton::make('Перша', callback_data: '1'),
                        InlineKeyboardButton::make('Друга', callback_data: '2')
                    )
                    ->addRow(InlineKeyboardButton::make('Обидві', callback_data: '3'))
            );
            $this->next('endChanges');
        } else {
            $bot->sendMessage('Група з назвою "' . $group . '" не знайдена. Спробуйте ще раз.');
        }
    }

    public function askChangePGroupManual(Nutgram $bot)
    {
        if (!$bot->isCallbackQuery()) {
            return;
        }

        $bot->editMessageText(
            'Виберіть підгрупу:',
            reply_markup: InlineKeyboardMarkup::make()
                ->addRow(
                    InlineKeyboardButton::make('Перша', callback_data: '1'),
                    InlineKeyboardButton::make('Друга', callback_data: '2')
                )
                ->addRow(InlineKeyboardButton::make('Обидві', callback_data: '3'))
        );
        $this->next('endChanges');
    }

    public function endChanges(Nutgram $bot)
    {
        if (!$bot->isCallbackQuery()) {
            return;
        }

        if ($bot->callbackQuery()->data == 'exit') {
            $bot->editMessageText('Процес відмінено.');
            $this->end();
        } else {
            $this->pgroup = $bot->callbackQuery()->data;
            TguserGroupRelation::updateOrCreate([
                'telegram_id'   => $this->chat_id
            ], [
                'group_id' => $this->group->id,
                'pgroup'    => $this->pgroup == 3 ? 0 : $this->pgroup,
            ]);
            $bot->editMessageText('Дані оновлено.');
            $bot->sendMessage('Натисни /help щоб дізнатись перелік доступних команд.');
            $this->end();
        }
    }
}
