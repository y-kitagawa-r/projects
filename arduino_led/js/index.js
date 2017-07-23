(function () {
var unit = 100,
    info = {}, // 描画情報
    canvas = document.getElementById("sine_canvas"),
    color = ['#10c2cd', '#43c0e4', '#1d82b6'],
    waveHeight;

$(function(){
  init();
});

function init() {

  $('#led_main_area').show();
  $('#tv_main_area').hide();
  $('#moisture_main_area').hide();

  ledInit();
  tvInit();
  moistureInit();

  $('#led_show_button').click(function(e){
    $('#tv_main_area').fadeOut(250);
    $('#moisture_main_area').fadeOut(250);
    setTimeout(function(){
      $('#led_main_area').fadeIn(500);
    },300);
  });
  $('#tv_show_button').click(function(e){
    $('#led_main_area').fadeOut(250);
    $('#moisture_main_area').fadeOut(250);
    setTimeout(function(){
      $('#tv_main_area').fadeIn(500);
    },300);
  });
  $('#moisture_show_button_area').click(function(e){
    $('#led_main_area').fadeOut(250);
    $('#tv_main_area').fadeOut(250);
    setTimeout(function(){
      $('#moisture_main_area').fadeIn(500);
      getMoistureValue();
    },300);
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
    url: "statusSet.php",
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

function moistureInit(){
  info.seconds = 0;
  info.t = 0;
  canvas.width = 200;
  canvas.height = 200;
  canvas.contextCache = canvas.getContext("2d");
  getMoistureValue();
	update();
}

function getMoistureValue(){
  isAjax = true;
  var moistureValue = 0;
  $.ajax({
    type: "post",
    url: "moistureGet.php"+"?p="+ new Date().getTime(),
    dataType: "json",
  }).done(function(value){
    console.log("success " + value);// 確認メッセージ用
    moistureValue = Number(value);
    isAjax = false;
    setWaveHeight(moistureValue);
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log("error ");// 確認メッセージ用
    isAjax = false;
  });
  return moistureValue;
}
/**
* 取得したセンサーの値をもとに、波の高さを決定する
*/
function setWaveHeight(moistureValue){
  //非常に少ない
  if(moistureValue < 100){
    waveHeight = 1.05;
  //少ない
  }else if(100 <= moistureValue && moistureValue < 300){
    waveHeight = 1.4;
  //中間
  }else if(300 <= moistureValue && moistureValue < 450){
    waveHeight = 2;
  //余裕がある
  }else if(450 <= moistureValue && moistureValue < 600){
    waveHeight = 3;
  //潤沢
  }else if(600 <= moistureValue){
    waveHeight = 10;
  }
}

function update() {
  // 各キャンバスの描画
  draw(canvas, color);
  // 共通の描画情報の更新
  info.seconds = info.seconds + .014;
  info.t = info.seconds*Math.PI;
  // 自身の再起呼び出し
  setTimeout(update, 35);
}

function draw(canvas, color) {
	// 対象のcanvasのコンテキストを取得
  var context = canvas.contextCache;
  // キャンバスの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height);

  //波を描画
  drawWave(canvas, color[0], 0.3, 4, 0);
  drawWave(canvas, color[1], 0.4, 2, 250);
  drawWave(canvas, color[2], 0.2, 1, 100);
};

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
	var context = canvas.contextCache;
  context.fillStyle = color;
  context.globalAlpha = alpha;

  context.beginPath(); //パスの開始
  drawSine(canvas, info.t / 0.5, zoom, delay);
  context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
  context.lineTo(0, canvas.height); //パスをCanvasの左下へ
  context.closePath() //パスを閉じる
  context.fill(); //塗りつぶす
}

/**
 * Function to draw sine
 *
 * The sine curve is drawn in 10px segments starting at the origin.
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height/waveHeight);
  var yAxis = 0;
  var context = canvas.contextCache;
  // Set the initial x and y, starting at 0,0 and translating to the origin on
  // the canvas.
  var x = t; //時間を横の位置とする
  var y = Math.sin(x)/zoom;
  context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

  // Loop to draw segments (横幅の分、波を描画)
  for (i = yAxis; i <= canvas.width + 10; i += 10) {
      x = t+(-yAxis+i)/unit/zoom;
      y = Math.sin(x - delay)/12;
      context.lineTo(i, unit*y+xAxis);
  }
}

})();
