<?php
$repoPath = __DIR__;
$listingsFile = $repoPath . '/listings.json';

// Get raw JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['index']) || !is_numeric($data['index'])) {
    http_response_code(400);
    exit('Invalid index');
}

$index = (int) $data['index'];

// Load existing listings
$listings = file_exists($listingsFile) ? json_decode(file_get_contents($listingsFile), true) : [];

if (!isset($listings[$index])) {
    http_response_code(404);
    exit('Listing not found');
}

// Remove the listing
array_splice($listings, $index, 1);

// Save updated listings
if (file_put_contents($listingsFile, json_encode($listings, JSON_PRETTY_PRINT)) === false) {
    http_response_code(500);
    exit('Failed to save listings');
}

echo 'Listing deleted successfully';
?>
