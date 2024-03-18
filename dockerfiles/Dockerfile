FROM php:7.4-apache
ARG UID=root
ARG GID=root
ARG USER

# Instalando extensões necessárias do PHP
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    zip unzip libzip-dev libldap2-dev \
    libfreetype6-dev libcurl4-openssl-dev \
    libmcrypt-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
    
RUN docker-php-ext-configure ldap --with-ldap=/usr
RUN docker-php-ext-configure xml
RUN docker-php-ext-install bcmath calendar ldap gd mysqli pdo_mysql \
    sockets zip exif

RUN docker-php-ext-enable mysqli

RUN pecl install mcrypt && \
    docker-php-ext-enable mcrypt

# Habilitar o módulo mod_php 
RUN a2enmod rewrite
RUN a2enmod headers

# Instalando o Composker
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Setando o user:group do conteiner para o user:group da máquina host (ver arquivo .env e docker-compose.yml)
# Assim, o Composer passa a usar o mesmo user:group do usuário do host
# Configura também as pastas para o novo usuário
RUN chown -R ${UID}:${GID} /var/www/html
# RUN mkdir -p /.composer && chown -R ${UID}:${GID} /.composer
# RUN mkdir -p /.config && chown -R ${UID}:${GID} /.config
VOLUME /var/www/html
VOLUME /.composer
VOLUME /.config

USER ${UID}
