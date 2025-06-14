<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/ravi/listings.json';

$data = json_decode(file_get_contents('php://input'), true);
$index = $data['index'] ?? -1;

if (!file_exists($listingsFile) || $index < 0) {
  http_response_code(400);
  exit('Invalid listing index.');
}

$listings = json_decode(file_get_contents($listingsFile), true);
if (!isset($listings[$index])) {
  http_response_code(404);
  exit('Listing not found.');
}

unset($listings[$index]);
$listings = array_values($listings);
file_put_contents($listingsFile, json_encode($listings, JSON_PRETTY_PRINT));

// Optional: Git commit the change
putenv('HOME=/var/www/.git-home');
chdir($repoPath);
exec('git add ravi/listings.json');
exec('git commit -m "Deleted listing index ' . $index . '"');
exec('git push origin master');

echo "Listing deleted.";
?>
