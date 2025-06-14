<?php
// Set Apache HOME so git works
putenv('HOME=/var/www/.git-home');

// Optional: set a GitHub webhook secret (also set this in GitHub Settings > Webhooks)
$secret = 'i8S;6&hyIW|Te7/4mjq3';  // <-- match GitHub webhook secret

// Logging location
$logFile = '/var/www/git/deploy.log';
file_put_contents($logFile, date('c') . " — Webhook triggered\n", FILE_APPEND);

// Get the raw payload
$payload = file_get_contents('php://input');
$header = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret, false);

if (!hash_equals($expected, $header)) {
    file_put_contents($logFile, "Invalid signature.\n\n", FILE_APPEND);
    http_response_code(403);
    echo "Invalid signature.";
    exit;
}

// Run git pull from the root of the repo
$gitRoot = '/var/www/git/brookfeild.github.io';
$output = shell_exec("/usr/bin/git -C $gitRoot pull 2>&1");
file_put_contents($logFile, "Git Output:\n$output\n\n", FILE_APPEND);

echo "Deployed.";
?>
