<?php
$myFile = 'notifications/'.$_GET['path'];
$stringData = $_GET["data"];
$contents;

if(!file_exists($myFile)){fopen($myFile);fclose($myFile);}
$myfile = fopen($myFile, "r") or die("Unable to open file!");
if(!(filesize($myFile)<=0)){$contents = fread($myfile, filesize($myFile));}
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
?>