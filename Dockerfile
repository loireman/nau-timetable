FROM php:8.1-cli

# Install dependencies
RUN apt-get update
RUN apt-get install -y libmcrypt-dev libpq-dev libzip-dev libpng-dev libonig-dev

# Install extensions
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl bcmath gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents
COPY . /var/www/html

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Install dependencies
RUN composer install

# Expose port 80 and start apache server
EXPOSE 80
CMD php artisan optimize --host=0.0.0.0 --port=80 && npm install && npm run build && php artisan migrate
