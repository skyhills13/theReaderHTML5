//#TODO# 
//1. canvas 크기를 축 이름을 넣을 수 있도록 변경하고, 변수 수정
//2. 그래프 라인 그리기
//


//그래프의 원래 크기는 800*400
//하지만 축을 표시해야하므로, 830*430으로 캔버스의 사이즈 지정 ( html 상에서 )
var tempJson = {"0" : "100", "1" : "300","2":"200","3" : "360", "4":"300", 5: "400"};

var canvasEle = document.getElementById("polygonalGraph");
var canvasCtx = canvasEle.getContext("2d");
var graphWidth = canvasEle.getAttribute("width");
var graphHeight = canvasEle.getAttribute("height");
var bumperSize = 30;

var drawPoly = function( context ,json, xMagnification ) {

 	//graph그리기
  	for( var i = 0 ; i < Object.keys(json).length ; ++i) {
  		context.beginPath();
		canvasCtx.lineWidth = 2;
		canvasCtx.lineCap = "round";
    	context.strokeStyle = "#16DFF5";
    	context.moveTo(i*xMagnification+bumperSize, parseInt(json[i]));
    	context.lineTo((i+1)*xMagnification+bumperSize, parseInt(json[i+1]));
  		context.stroke();
  	}

	//점 표시하기
  	for ( index in json ) {
  		context.beginPath();
    	context.arc(index*xMagnification+bumperSize,parseInt(json[index]),3,0*Math.PI,2*Math.PI);
  		context.fillStyle="#FFFFFF";
  		context.fill();
		canvasCtx.lineWidth = 2;
		canvasCtx.lineCap = "round";
    	context.strokeStyle = "#16DFF5";
  		context.stroke();
  	}

  	for ( index in json ) {
  		context.font= "20px Helvetica";
  		context.textAlign="center";
  		context.fillStyle = "#3B373B"
  		context.fillText(index.toString(), index*xMagnification+bumperSize, graphHeight);
  	}
}

drawPoly(canvasCtx, tempJson, 100);




/*
var gradient=context.createLinearGradient(0,0,graphWidth,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		context.fillStyle=gradient;
*/

