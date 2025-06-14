<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/listings.json';
$uploadDir = $repoPath . '/uploads/';

// Ensure the uploads directory exists
if (!is_dir($uploadDir)) mkdir($uploadDir);

$data = $_POST;
if (!$data) {
  http_response_code(400);
  exit('No form data');
}

// Handle image uploads
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

// Load existing listings
$listings = file_exists($listingsFile) ? json_decode(file_get_contents($listingsFile), true) : [];

// Add the new listing with images
$newListing = $data;
$newListing['images'] = $images;
$listings[] = $newListing;
file_put_contents($listingsFile, json_encode($listings, JSON_PRETTY_PRINT));

// Commit and push changes to Git
putenv('HOME=/var/www/.git-home');
chdir($repoPath);
exec('git add listings.json uploads');
exec('git commit -m "New listing added with images"');
exec('git push origin master');

// Return success message
echo "Listing and images saved and pushed.";
?>