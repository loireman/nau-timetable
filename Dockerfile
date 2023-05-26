FROM php:8.1-cli

# Install dependencies
RUN apt-get update
RUN apt-get install -y curl libmcrypt-dev libpq-dev libzip-dev libpng-dev libonig-dev

# get install script and pass it to execute:
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
# and install node
RUN apt-get install nodejs
# confirm that it was successful
RUN node -v
# npm installs automatically
RUN npm -v


# Install extensions
RUN docker-php-ext-install pdo_pgsql mbstring zip exif gd

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
RUN npm install && npm run build

# Expose port 80 and start apache server
EXPOSE 80
CMD php artisan optimize && php artisan migrate
