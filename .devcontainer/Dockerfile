FROM mcr.microsoft.com/devcontainers/php:0-8.1

# Install MariaDB client
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mariadb-client \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install php-mysql driver
RUN docker-php-ext-install mysqli pdo pdo_mysql

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends libjpeg-dev libpng-dev libwebp-dev

# [Optional] Uncomment this line to install global node packages.
# RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1

# Install Drupal dependencies
RUN docker-php-ext-configure gd --with-jpeg=/usr --with-webp \
    && docker-php-ext-install gd opcache \
    && wget https://getcomposer.org/installer \
    && php installer --install-dir=/usr/local/bin --filename=composer \
    && wget -O /usr/local/bin/drush https://github.com/drush-ops/drush-launcher/releases/latest/download/drush.phar \
    && chmod +x /usr/local/bin/drush
