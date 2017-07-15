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
    url: PHP_URL,
    type: "post",
    dataType: "json",
    data:{
      status:status
    }
  })
}
