<?php
$data = file_get_contents('php://input');
if (!$data) {
  http_response_code(400);
  exit('No input');
}

file_put_contents(__DIR__ . '/settings.json', $data);
echo "Settings saved successfully.";
?>