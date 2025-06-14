<?php
// Enable error logging for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$repoPath = __DIR__;
$settingsFile = $repoPath . '/settings.json';

$data = $_POST;
if (!$data) {
  http_response_code(400);
  echo "No data received";
  exit;
}

if (file_put_contents($settingsFile, json_encode($data, JSON_PRETTY_PRINT)) === false) {
  http_response_code(500);
  echo "Failed to save settings.";
  exit;
}

// Set HOME for Apache Git config
putenv('HOME=/var/www/.git-home');

// Change to the repo root
chdir($repoPath);

// Run git commands
exec('/usr/bin/git add settings.json 2>&1', $addOutput, $addCode);
exec('/usr/bin/git commit -m "Admin updated settings.json" 2>&1', $commitOutput, $commitCode);
exec('/usr/bin/git push origin master 2>&1', $pushOutput, $pushCode);

// Log output (optional)
file_put_contents('/tmp/git-push.log', implode("\n", array_merge(
  ["[ADD]"] + $addOutput,
  ["[COMMIT]"] + $commitOutput,
  ["[PUSH]"] + $pushOutput
)) . "\n\n", FILE_APPEND);

// Return result
echo ($commitCode === 0 && $pushCode === 0)
  ? "Settings saved and pushed successfully."
  : "Saved settings, but Git push may have failed.";
?>