var PHP_URL = "ledSet.php"

$(function(){
  init();
});
//初期処理
function init(){
    offLed();
  $('#on_btn').click(function(e){
    onLed();
  });
  $('#off_btn').click(function(e){
    offLed();
  });
}
function onLed(){
  $('#off').hide();
  $('#on').show();
  sendLedStatus("ON");
}
function offLed(){
  $('#on').hide();
  $('#off').show();
  sendLedStatus("OFF");
}
function sendLedStatus(status){
  $.ajax({
    type: "post",
    url: PHP_URL,
    dataType: "json",
    data:{
      status:status
    }
  }).done(function(data){
    console.log("success " + data);// 確認メッセージ用
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log("error " + data);// 確認メッセージ用
  });
}
