<?php
header("Content_type: text/plain; charset=UTF-8");
if(isset($_POST['status'])){
  $status = $_POST['status'];
  file_put_contents("ledLog.txt","led-status:".$status);
}
?>
