FROM php:8.0-fpm-buster
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ENV COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
  apt-get -y install libzip-dev libmemcached-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  docker-php-ext-install pdo_mysql && \
  pecl install memcached && \
  docker-php-ext-enable memcached

COPY ./docker/php.ini /usr/local/etc/php/php.ini

WORKDIR /var/www/html

# COPY ./composer.json /var/www/html/composer.json
# COPY ./composer.lock /var/www/html/composer.lock
# RUN composer install

COPY ./ /var/www/html