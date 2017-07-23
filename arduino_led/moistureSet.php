<?php
header("Content-type: application/json; charset=utf8");
if(isset($_GET['value'])){
  $value = $_GET['value'];
  file_put_contents("moistureLog.txt",$value);
  echo json_encode($value);
}else{
  $error = "失敗";
  echo json_encode($error);
}
?>
