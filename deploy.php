<?php
namespace Deployer;

require 'recipe/symfony.php';

// Config

set('repository', 'https://github.com/delrodie/happyhouse.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('https://happyhouse2.esthetera.com')
    ->set('remote_user', 'deployer')
    ->set('deploy_path', '~/happyhouse');

// Hooks

after('deploy:failed', 'deploy:unlock');
