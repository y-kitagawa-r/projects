var PHP_URL = "statusSet.php"

$(function(){
  init();
});
//初期処理
function init(){
  $('#led_main_area').show();
  $('#tv_main_area').hide();

  ledInit();
  tvInit();

  $('#led_show_button').click(function(e){
    setTimeout(function(){
      $('#led_main_area').fadeIn(1000);
    },300);
    $('#tv_main_area').fadeOut(250);
  });
  $('#tv_show_button').click(function(e){
    $('#led_main_area').fadeOut(250);
    setTimeout(function(){
      $('#tv_main_area').fadeIn(1000);
    },300);
  });
  $('#humidity_show_button_area').click(function(e){
    alert("comming soon!!")
  });


}
function ledInit(){
  $('#on_led').hide();
  $('#off_led').show();
  sendStatus("LED_OFF");

  $('#on_led_btn').click(function(e){
    $('#on_led').show();
    $('#off_led').hide();
    sendStatus("LED_ON");
  });
  $('#off_led_btn').click(function(e){
    $('#on_led').hide();
    $('#off_led').show();
    sendStatus("LED_OFF");
  });
}
function tvInit(){
  $('#on_tv').hide();
  $('#off_tv').show();

  $('#on_tv_btn').click(function(e){
    $('#on_tv').show();
    $('#off_tv').hide();
    sendStatus("TV_ON");
  });
  $('#off_tv_btn').click(function(e){
    $('#on_tv').hide();
    $('#off_tv').show();
    sendStatus("TV_OFF");
  });
}
function sendStatus(status){
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
