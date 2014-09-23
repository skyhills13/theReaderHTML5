(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

var myColor = ["#ECD078","#D95B43","#C02942","#542437","#53777A"];
var myData = [10,30,20,60,40];

function getTotal(){
	var myTotal = 0;
	for (var i = 0; i < myData.length; i++) {
		myTotal += (typeof myData[i] == 'number') ? myData[i] : 0;
	}
	return myTotal;
}

function plotData() {
	var lastEndAngle = 0;
	var myTotal = getTotal();

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < myData.length; i++) {
		ctx.fillStyle = myColor[i];
		ctx.beginPath();
		ctx.moveTo( 200, 150 );
		ctx.arc( 200, 150, 150, lastEndAngle, lastEndAngle + ( MathUtils.CIRCLE_DEGREE * ( myData[i]/myTotal ) ), false);
		ctx.lineTo(200,150);
		ctx.fill();
		lastEndAngle += MathUtils.CIRCLE_DEGREE*(myData[i]/myTotal);
	}
}


//필요할 줄 알고 만들었는데 거의 무쓸모 약간 쓸모 있어서 다행 
var MathUtils = {
	
	ONE_DEGREE_OF_RADIAN : Math.PI/180,
	
	ONE_RADIAN_OF_DEGREE : 180/Math.PI,

	CIRCLE_DEGREE : 2 * Math.PI, 

	degreesToRadians : function(degree) {
		//같은 것이다.
		// return degree * ONE_DEGREE_OF_RADIAN;
		return ( degree * 2 * Math.PI ) / 360;
	},

	radiansToDegrees : function(radian) {
		return radian * ONE_RADIAN_OF_DEGREE; 
	}
} 

// // 하단의 애니메이션이 제대로 작동하지 않는 이유는, 처음부터 다시 그리는 것이 아니라, 중간부터 다시 그리기 때문 
// var lastEndAngle = 0;
// var myTotal = getTotal();
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// var animate = function(dataIndex) {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	ctx.fillStyle = myColor[dataIndex];
// 	ctx.beginPath();
// 	ctx.moveTo(200, 150);
// 	ctx.arc(200, 150, 150, lastEndAngle, lastEndAngle + ( MathUtils.CIRCLE_DEGREE * ( myData[dataIndex]/myTotal ) ), false); 
// 	ctx.lineTo(200, 150);
// 	ctx.fill();
// 	lastEndAngle += MathUtils.CIRCLE_DEGREE*(myData[dataIndex]/myTotal);
// 	dataIndex++;
// 	if ( dataIndex < myData.length) {
// 		console.log(dataIndex);
// 		requestAnimationFrame(function(){
// 			animate(dataIndex);
// 		});
// 	}	
// }

// animate(0);

plotData();






