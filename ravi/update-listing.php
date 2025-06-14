<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/listings.json';
$uploadDir = $repoPath . '/uploads/';

if (!is_dir($uploadDir)) mkdir($uploadDir);

$data = $_POST;
if (!isset($data['index'])) {
  http_response_code(400);
  exit('Missing index');
}

$images = [];
if (!empty($_FILES['images']['name'][0])) {
  foreach ($_FILES['images']['tmp_name'] as $i => $tmpName) {
    $name = basename($_FILES['images']['name'][$i]);
    $target = $uploadDir . time() . '-' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $name);
    if (move_uploaded_file($tmpName, $target)) {
      $images[] = str_replace($repoPath . '/', '', $target);
    }
  }
}

$listings = file_exists($listingsFile) ? json_decode(file_get_contents($listingsFile), true) : [];
$i = (int)$data['index'];
if (!isset($listings[$i])) exit('Invalid index');

$listings[$i]['title'] = $data['title'];
$listings[$i]['zip'] = $data['zip'];
if ($images) $listings[$i]['images'] = $images;

file_put_contents($listingsFile, json_encode($listings, JSON_PRETTY_PRINT));

putenv('HOME=/var/www/.git-home');
chdir($repoPath);
exec('git add listings.json uploads');
exec('git commit -m "Updated listing index $i"');
exec('git push origin master');

echo "Listing updated and pushed.";
?>