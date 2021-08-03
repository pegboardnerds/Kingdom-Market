<?php
$myFile = "posts.json";
$stringData = $_GET["data"];
$commentsfile = $_GET['comid'];
$contents;

$myfile = fopen("posts.json", "r") or die("Unable to open file!");
if(!(filesize("posts.json")<=0)){$contents = fread($myfile, filesize("posts.json"));}
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
$fp = fopen($commentsfile, 'w');
fclose($fp);
?>