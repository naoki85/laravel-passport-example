<?php
$request_uri = $_SERVER['REQUEST_URI'];
if ($request_uri === '/' || $request_uri === 'index') {
  return;
}

$basename = basename($request_uri);
if (!file_exists('./'.$basename.'.php')) {
  header('HTTP/1.1 404 Not Found');
  exit();
}

require_once('./'.$basename.'.php');
?>