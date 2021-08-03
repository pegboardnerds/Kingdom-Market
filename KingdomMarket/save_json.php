<?php
$myFile = "accounts.json";
$stringData = $_GET["data"];
$notificationfile = $_GET["path"];
$contents;

$myfile = fopen("accounts.json", "r") or die("Unable to open file!");
if(!(filesize("accounts.json")<=0)){$contents = fread($myfile, filesize("accounts.json"));}
fclose($myfile);
if ($contents != null) {
    $contents = str_replace("]", ",",$contents);
    $stringData = str_replace("[", "",$stringData);
    $stringData = $contents . $stringData."]";
    $fh = fopen($myFile, 'w+') or die("can't open file");
    fwrite($fh, $stringData);
    fclose($fh);
} else {
    $fh = fopen($myFile, 'w+') or die("can't open file");
    fwrite($fh, '['.$stringData.']');
    fclose($fh);
}
$fp = fopen($notificationfile, 'w');
fclose($fp);
?>