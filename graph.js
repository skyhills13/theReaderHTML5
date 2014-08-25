//그래프의 원래 크기는 800*400
//하지만 축을 표시해야하므로, 860*430으로 캔버스의 사이즈 지정 ( html 상에서 )
var polyJson = {0 : "100", 1 : "300", 2:"200", 3 : "360", 4:"300", 5: "400"};

var canvasEle = document.getElementById("polygonalGraph");
var canvasCtx = canvasEle.getContext("2d");
var canvasWidth = canvasEle.getAttribute("width");
var canvasHeight = canvasEle.getAttribute("height");
var xBumperSize = 60;
var yBumperSize = 30;
var graphWidth = canvasWidth - xBumperSize;
var graphHeight = canvasHeight - yBumperSize;

var dataLength = Object.keys(polyJson).length;

var drawPoly = function( context ,json, xMagnification ) {
	context.font= "16px Helvetica";
	context.textAlign="center";
 	//graph그리기
  	for( var i = 0 ; i < dataLength ; ++i) {
  		context.beginPath();
		canvasCtx.lineWidth = 2;
		canvasCtx.lineCap = "round";
    	context.strokeStyle = "#16DFF5";
    	context.moveTo(i*xMagnification+xBumperSize, graphHeight-parseInt(json[i]));
    	context.lineTo((i+1)*xMagnification+xBumperSize, graphHeight-parseInt(json[i+1]));
  		context.stroke();
  	}

	//점 표시하기
  	for ( index in json ) {
  		context.beginPath();
    	context.arc(index*xMagnification+xBumperSize,graphHeight-parseInt(json[index]),3,0*Math.PI,2*Math.PI);
  		context.fillStyle="#FFFFFF";
  		context.fill();
		canvasCtx.lineWidth = 2;
		canvasCtx.lineCap = "round";
    	context.strokeStyle = "#16DFF5";
  		context.stroke();
  	}
  	//축 변수표시하기
  	//x축 
  	for ( index in json ) {
  		context.fillStyle = "#3B373B"
  		context.fillText(index.toString(), index*xMagnification+xBumperSize, canvasHeight);
  	}
  	//y축
  	for( var i = 0 ; i < 8 ; ++i) {
  		context.textBaseline = "middle";
  		context.fillStyle = "#3B373B"
  		//TODO 100이랑 30도 비율로 계산해서 변수로 뺄 것 
  		context.fillText(i*100, 0+xBumperSize-30, graphHeight-i*100);
  	}
  
  	//모눈종이 그리기
  	//수평방향 
  	context.lineWidth = 1;
  	context.strokeStyle = "#D7E4FA";
  	context.beginPath();
    for (var i = 0; i <= graphHeight ; i += 100 ) {
    	context.moveTo(0+xBumperSize, i);
    	context.lineTo(graphWidth+xBumperSize, i);
    }
    context.stroke();

	//수직방향 
    context.beginPath();
    for (var i = 0 ; i < graphWidth ; i += graphWidth/dataLength ) {
    	context.moveTo(i+xBumperSize, 0);
    	context.lineTo(i+xBumperSize, graphHeight);
    }
    context.stroke();
};

var drawBar = function(context, json, xMagnification) {
	context.font= "16px Helvetica";
	context.textAlign="center";

	//모눈종이 그리기
  	//수평방향 
  	context.lineWidth = 1;
  	context.strokeStyle = "#D7E4FA";
  	context.beginPath();
    for (var i = 0; i <= graphHeight ; i += 100 ) {
    	context.moveTo(0+xBumperSize, i);
    	context.lineTo(graphWidth+xBumperSize, i);
    }
    context.stroke();

	//수직방향 
    context.beginPath();
    for (var i = 0 ; i < graphWidth ; i += graphWidth/dataLength ) {
    	context.moveTo(i+xBumperSize, 0);
    	context.lineTo(i+xBumperSize, graphHeight);
    }
    context.stroke();


};

drawPoly(canvasCtx, polyJson, graphWidth/dataLength);
//drawBar(canvasCtx, polyJson, graphWidth/dataLength);



/*
var gradient=context.createLinearGradient(0,0,graphWidth,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		context.fillStyle=gradient;
*/

