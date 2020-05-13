let out_count = document.querySelector('#lab1');
var can = document.getElementById("canvas");
var c = can.getContext('2d');

let count_ball = 0;
let balls = [];

Start();


function Start(){
	drawBackground(c);
}

function drawBackground(c){
	c.fillStyle = 'lightblue';
	c.fillRect(0, 0, can.width, can.height);
}

function CreateBall(){
	var ball = new Ball(RandomInt(10, can.width-10), RandomInt(10, can.height-10), 2);
	balls.push(ball);
	console.log(balls);
}

function drawBall(c){
	var ball = balls[balls.length-1]
	c.fillStyle = 'white';
	c.beginPath();
	c.arc(
		ball.getOptions('x'),
		ball.getOptions('y'), 
		ball.getOptions('radius'), 0, Math.PI*2, false
	);
	c.fill();
}

function RandomInt(min, max){
	return Math.floor(min + Math.random() * (max + 1 - min));
}

setInterval(function(){
	CreateBall(c);
	drawBall(c);
	count_ball++;
	out_count.innerHTML = out_count.innerHTML.replace(/\d+/g, count_ball);
}, 5000);




















