<?php
define('SESSION_COOKIE_NAME', 'laravel_session');
define('MEMCACHED_HOST_NAME', 'memcached');
define('LARAVEL_SESSION_PREFIX', 'laravel_cache:');
define('LARAVEL_CACHE_PREFIX', 'login_web_');

function getUserIdFromSession(string $session): int | null {
  $filtered = array_filter(unserialize($session), function($k) {
    return strpos($k, LARAVEL_CACHE_PREFIX) !== false;
  }, ARRAY_FILTER_USE_KEY);
  if (empty($filtered)) return null;

  return (int) array_values($filtered)[0];
}


$memcached = new Memcached();
$memcached->addServer(MEMCACHED_HOST_NAME, 11211);

$user_id = null;
if (!empty($_COOKIE[SESSION_COOKIE_NAME])) {
  $session = $memcached->get(LARAVEL_SESSION_PREFIX.$_COOKIE[SESSION_COOKIE_NAME]);
  if (!empty($session)) {
    $user_id = getUserIdFromSession($session);
  }
}
?>

<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>Home | Laravel Passport Example</title>
  </head>
  <body>
    <h1>About</h1>
    <?php if ($user_id): ?>
      <p>Your ID: <?= $user_id ?></p>
    <? else: ?>
      <p>You are not logged in.</p>
    <?php endif; ?>
  </body>
</html>