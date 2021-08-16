<?php
define('SESSION_COOKIE_NAME', getenv('SESSION_COOKIE_NAME'));
define('MEMCACHED_HOST_NAME', getenv('MEMCACHED_HOST_NAME'));
define('LARAVEL_SESSION_PREFIX', getenv('LARAVEL_SESSION_PREFIX'));
define('LARAVEL_CACHE_PREFIX', getenv('LARAVEL_CACHE_PREFIX'));
define('MYSQL_DATABASE', getenv('DB_NAME'));
define('MYSQL_USER', getenv('DB_USER'));
define('MYSQL_PASSWORD', getenv('DB_PASSWORD'));
define('MYSQL_HOST', getenv('DB_HOST'));

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
$user = null;
if (!empty($_COOKIE[SESSION_COOKIE_NAME])) {
  $session = $memcached->get(LARAVEL_SESSION_PREFIX.$_COOKIE[SESSION_COOKIE_NAME]);
  if (!empty($session)) {
    $user_id = getUserIdFromSession($session);
  }
}

if ($user_id) {
  $dsn = 'mysql:dbname='.MYSQL_DATABASE.';host='.MYSQL_HOST;
  $dbh = new PDO($dsn, MYSQL_USER, MYSQL_PASSWORD);
  $sql = 'SELECT id, name FROM users WHERE id = :id LIMIT 1';
  $sth = $dbh->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
  $sth->execute([':id' => $user_id]);
  $user = $sth->fetch();
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
    <?php if ($user): ?>
      <p>Hello, <?= $user['name'] ?> !!</p>
    <? else: ?>
      <p>You are not logged in. <a href="http://localhost:8080/login">Please login</a></p>
    <?php endif; ?>
    <p><a href="http://localhost:3000">TOP</a></p>
  </body>
</html>