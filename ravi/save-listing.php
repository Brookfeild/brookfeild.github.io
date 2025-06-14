<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/listings.json';

$data = file_get_contents('php://input');
if (!$data) {
  http_response_code(400);
  exit('No input');
}

$listings = file_exists($listingsFile) ? json_decode(file_get_contents($listingsFile), true) : [];
$listings[] = json_decode($data, true);
file_put_contents($listingsFile, json_encode($listings, JSON_PRETTY_PRINT));

putenv('HOME=/var/www/.git-home');
chdir($repoPath);
exec('git add listings.json');
exec('git commit -m "New listing added via admin"');
exec('git push origin master');

echo "Listing saved and pushed.";
?>