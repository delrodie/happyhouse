<?php
namespace Deployer;

require 'recipe/symfony.php';

// Configuration générale
set('application', 'Happy HOuse');
set('repository', 'git@github.com:delrodie/happyhouse.git');
set('allow_anonymous_stats', false);

// Configuration des serveurs de déploiement
host('access962326531.webspace-data.io')
//    ->hostname('https://happyhouse2.esthetera.com')
//    ->user('u112236248')
//    ->identityFile('~/.ssh/id_rsa')
    ->set('remote_user', 'u112236248')
    ->set('deploy_path', '/happyhouse/v1');

// Tâches personnalisées
task('build', function () {
    run('cd {{release_path}} && yarn install && yarn encore production');
});

// Exécution des tâches lors du déploiement
after('deploy:shared', 'build');

// Exécution des tâches Symfony lors du déploiement
task('database:migrate', function () {
    run('{{/usr/bin/php8.1-cli}} {{release_path}}/bin/console doctrine:schema:update --force');
})->desc('Execute database migrations');

// Exécution des tâches Symfony lors du déploiement
after('deploy:symlink', 'database:migrate');