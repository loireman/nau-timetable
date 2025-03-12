# NAU Timetable

## Основні компоненти

```
nau-timetable/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── ConfigController.php
│   │   │   │   ├── DepartmentController.php
│   │   │   │   ├── GroupController.php
│   │   │   │   ├── PermissionController.php
│   │   │   │   ├── RoleController.php
│   │   │   │   ├── StreamController.php
│   │   │   │   └── TimetableController.php
│   │   │   ├── Api/
│   │   │   │   ├── DepartmentController.php
│   │   │   │   ├── ParseController.php
│   │   │   │   └── SearchController.php
│   │   │   ├── FrontController.php
│   │   │   └── Telegram/
│   │   │   │   ├── StartConversation.php
│   │   │   │   └── Timetables.php
│   ├── Models/
│   │   ├── Departments.php
│   │   ├── Groups.php
│   │   ├── Permission.php
│   │   ├── Role.php
│   │   ├── Setting.php
│   │   ├── Stream.php
│   │   ├── Timetable.php
│   │   └── User.php
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   ├── app.js
│   │   └── bootstrap.js
├── routes/
│   ├── api.php
│   ├── channels.php
│   ├── console.php
│   └── web.php
```

## Налаштування

1. Клонувати репозиторій:
    ```sh
    git clone https://github.com/yourusername/nau-timetable.git
    cd nau-timetable
    ```

2. Налаштувати файл `.env`:
    ```sh
    cp .env.example .env
    ```

    ```.env
    APP_URL=http://localhost

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=example_app
    DB_USERNAME=root
    DB_PASSWORD=

    TELEGRAM_TOKEN="user_token"
    TELEGRAM_BOT_NAME="bot_name"
    ```

3. Встановити залежності Composer:
    ```sh
    composer install
    ```

4. Встановити залежності NPM:
    ```sh
    npm install && npm run build
    ```

5. Згенерувати ключ додатку:
    ```sh
    php artisan key:generate
    ```

6. Запустити міграції:
    ```sh
    php artisan migrate --seed
    ```

7. Запустити тестовий сервер
    ```sh
    php artisan serve
    ```
    За замовчуванням буде сервер на http://127.0.0.1:8000

    Для перевірки парсера можна зайти в панель адміністратора http://127.0.0.1:8000/admin

    Базовий логін: admin@example.com
    
    Базовий пароль: password

## API Routes

-   `GET /api/v1/search/group/{name?}` - Пошук групи за назвою
-   `GET /api/v1/group/{group}` - Отримати розклад групи

-   `GET /api/v1/search/teacher/{name?}` - Пошук викладача за ім'ям
-   `GET /api/v1/teacher/{teacher}` - Отримати розклад викладача

-   `GET /api/v1/fetchDep` - Отримати список назв факультетів
-   `POST /api/parseDep` - Парсинг факультету
-   `POST /api/parseGroup` - Парсинг групи
-   `POST /api/parseTimetable` - Парсинг розкладу

## Web Routes

-   `GET /` - Головна сторінка (Welcome).
-   `GET /google/auth/redirect` - Перенаправлення на Google для аутентифікації.
-   `GET /google/auth/callback` - Зворотній виклик від Google після аутентифікації.
-   `GET /api` - Документація API.
-   `GET /timetable` - Розклад групи.
-   `GET /timetable/teacher` - Розклад викладача.

### Admin Routes (middleware auth, can:admin page)

-   `GET /admin` - Панель адміністратора.
-   `GET /admin/permission` - Список дозволів.
-   `GET /admin/permission/create` - Форма створення дозволу.
-   `GET /admin/permission/{permission}` - Деталі дозволу.
-   `GET /admin/permission/{permission}/edit` - Форма редагування дозволу.
-   `POST /admin/permission` - Створення дозволу.
-   `PUT /admin/permission/{permission}` - Оновлення дозволу.
-   `DELETE /admin/permission/{permission}` - Видалення дозволу.
-   Аналогічні маршрути для `role`, `user`, `config`, `department`, `stream`, `group`, `timetable`.

### Profile Routes (middleware auth)

-   `GET /profile` - Редагування профілю.
-   `PATCH /profile` - Оновлення профілю.
-   `DELETE /profile` - Видалення профілю.

## Telegram Commands

-   `/start` - Розпочати роботу з ботом.
-   `/selectgroup` - Змінити інформацію про групу.
-   `/help` - Вивести інформацію про бота.
-   `/time` - Вивести поточний час та номер пари що проходить.
-   `/lesson` - Вивести поточну пару якщо є.
-   `/today` - Вивести пари за поточний день.
-   `/tomorrow` - Вивести пари за наступний день. Якщо поточний день - неділя, виводить пари понеділка наступного тижня.
