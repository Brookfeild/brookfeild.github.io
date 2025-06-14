<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/listings.json';
$uploadDir = $repoPath . '/uploads/';

// Ensure the uploads directory exists
if (!is_dir($uploadDir)) mkdir($uploadDir);

// Validate form data
$data = $_POST;
if (!$data || count($data) === 0) {
  http_response_code(400);
  exit('No form data');
}

// Access form fields explicitly
$title = $_POST['title'] ?? '';
$mlspin = $_POST['mlspin'] ?? '';
$rooms = $_POST['rooms'] ?? '';
$yearBuilt = $_POST['yearBuilt'] ?? '';
$roof = $_POST['roof'] ?? '';
$livingArea = $_POST['livingArea'] ?? '';
$foundation = $_POST['foundation'] ?? '';
$acreage = $_POST['acreage'] ?? '';
$garageSpaces = $_POST['garageSpaces'] ?? '';
$virtualTour = $_POST['virtualTour'] ?? '';

$town = $_POST['town'] ?? '';
$county = $_POST['county'] ?? '';
$state = $_POST['state'] ?? '';
$zip = $_POST['zip'] ?? '';

$taxes = $_POST['taxes'] ?? '';
$basement = $_POST['basement'] ?? '';
$fireplace = isset($_POST['fireplace']) ? true : false;
$fireplacesTotal = $_POST['fireplacesTotal'] ?? '';
$fireplaceFeatures = $_POST['fireplaceFeatures'] ?? '';

$parkingSpaces = $_POST['parkingSpaces'] ?? '';
$parkingFeatures = $_POST['parkingFeatures'] ?? '';
$heatSystem = isset($_POST['heatSystem']) ? true : false;
$appliances = $_POST['appliances'] ?? '';

$elementary = $_POST['elementary'] ?? '';
$junior = $_POST['junior'] ?? '';
$high = $_POST['high'] ?? '';

$amenities = $_POST['amenities'] ?? '';

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
$newListing = [
  'title' => $title,
  'mlspin' => $mlspin,
  'rooms' => $rooms,
  'yearBuilt' => $yearBuilt,
  'roof' => $roof,
  'livingArea' => $livingArea,
  'foundation' => $foundation,
  'acreage' => $acreage,
  'garageSpaces' => $garageSpaces,
  'virtualTour' => $virtualTour,
  'town' => $town,
  'county' => $county,
  'state' => $state,
  'zip' => $zip,
  'taxes' => $taxes,
  'basement' => $basement,
  'fireplace' => $fireplace,
  'fireplacesTotal' => $fireplacesTotal,
  'fireplaceFeatures' => $fireplaceFeatures,
  'parkingSpaces' => $parkingSpaces,
  'parkingFeatures' => $parkingFeatures,
  'heatSystem' => $heatSystem,
  'appliances' => $appliances,
  'elementary' => $elementary,
  'junior' => $junior,
  'high' => $high,
  'amenities' => $amenities,
  'images' => $images
];
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