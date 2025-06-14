<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/listings.json';
$uploadDir = $repoPath . '/uploads/';

// Ensure the uploads directory exists
if (!is_dir($uploadDir)) mkdir($uploadDir);

// Debug: Log form data and file uploads
file_put_contents('/tmp/form-debug.log', print_r($_POST, true));
file_put_contents('/tmp/files-debug.log', print_r($_FILES, true));

// Validate form data
$data = $_POST;
if (!$data || count($data) === 0) {
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
$listings = [];
if (file_exists($listingsFile)) {
  $raw = file_get_contents($listingsFile);
  $json = json_decode($raw, true);
  if (is_array($json)) {
    $listings = $json;
  }
}

// Add the new listing with images
$newListing = [
  'title' => $_POST['title'] ?? '',
  'mlspin' => $_POST['mlspin'] ?? '',
  'rooms' => $_POST['rooms'] ?? '',
  'yearBuilt' => $_POST['yearBuilt'] ?? '',
  'roof' => $_POST['roof'] ?? '',
  'livingArea' => $_POST['livingArea'] ?? '',
  'foundation' => $_POST['foundation'] ?? '',
  'acreage' => $_POST['acreage'] ?? '',
  'garageSpaces' => $_POST['garageSpaces'] ?? '',
  'virtualTour' => $_POST['virtualTour'] ?? '',

  'town' => $_POST['town'] ?? '',
  'county' => $_POST['county'] ?? '',
  'state' => $_POST['state'] ?? '',
  'zip' => $_POST['zip'] ?? '',

  'taxes' => $_POST['taxes'] ?? '',
  'basement' => $_POST['basement'] ?? '',
  'fireplace' => isset($_POST['fireplace']),
  'fireplacesTotal' => $_POST['fireplacesTotal'] ?? '',
  'fireplaceFeatures' => $_POST['fireplaceFeatures'] ?? '',

  'parkingSpaces' => $_POST['parkingSpaces'] ?? '',
  'parkingFeatures' => $_POST['parkingFeatures'] ?? '',
  'heatSystem' => isset($_POST['heatSystem']),
  'appliances' => $_POST['appliances'] ?? '',

  'elementary' => $_POST['elementary'] ?? '',
  'junior' => $_POST['junior'] ?? '',
  'high' => $_POST['high'] ?? '',
  'amenities' => $_POST['amenities'] ?? '',
  'images' => $images
];
$listings[] = $newListing;

// Save listings to file and check for errors
if (file_put_contents($listingsFile, json_encode($listings, JSON_PRETTY_PRINT)) === false) {
  http_response_code(500);
  exit("Failed to write listings.json");
}

// Commit and push changes to Git
putenv('HOME=/var/www/.git-home');
chdir($repoPath);
exec('git add listings.json uploads');
exec('git commit -m "New listing added with images"');
exec('git push origin master');

// Return success message
echo "Listing and images saved and pushed.";
?>