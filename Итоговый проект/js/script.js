let out_count = document.querySelector('#lab1');
var can = document.getElementById("canvas");
var c = can.getContext('2d');

let count_ball = 0;
let balls = [];

var timer = setInterval(function(){
	if(balls.length < 100)CreateBall(c);
	if(count_ball == 10)Full_Edition();
	if(count_ball == 100)Button_Random_Ball();
		count_ball++;
		out_count.innerHTML = out_count.innerHTML.replace(/\d+/g, count_ball);
	if(count_ball < 100 && document.querySelector('input[type]') != null)document.querySelector('#form1').removeChild(document.querySelector('input[type]'));
	if(count_ball < 10 && document.querySelector('p') != null)document.querySelector('#form1').removeChild(document.querySelector('p'));
}, 1000);

var draw_timer = setInterval(function(){
	drawBackground(c);
	drawBall(c);
	moveBall(c);
	CheckCollBall();
}, 100)

function drawBackground(c){
	c.fillStyle = 'lightblue';
	c.fillRect(0, 0, can.width, can.height);
}

// ============ добавление элементов на форму ===================

function Full_Edition(){
	let p = document.createElement('p');
	p.innerHTML += 'Чтобы разблокировать движение не по прямой, купите полную версию';
	p.setAttribute('id', 'p1');
	document.querySelector('#form1').appendChild(p);
}

function Button_Random_Ball(){
	let but = document.createElement('input');
	but.type = 'button';
	but.value = 'Создать рандомный шарик';
	but.addEventListener('click', function(){
		var user_ball = new Ball(RandomInt(10, can.width-10), RandomInt(10, can.width-10), RandomInt(15, 60), RandomInt(0, 3), 'red');
		balls.push(user_ball);
		count_ball -= 100;
	});
	document.querySelector('#form1').appendChild(but);
}

// ========================= шары ===============================

// ========================= создание ===========================

function CreateBall(){
	var ball = new Ball(RandomInt(10, can.width-10), RandomInt(10, can.height-10), 15, RandomInt(0, 3), 'white');
	balls.push(ball);
}

function drawBall(c){
	for(let bal of balls){
		c.fillStyle = bal.getOptions('color');
		c.beginPath();
		c.arc( bal.getOptions('x'), bal.getOptions('y'), 
			bal.getOptions('radius'), 0, Math.PI*2
		);
		c.fill();
	}
}

// ========================= изменение ===========================

function moveBall(){
	for(let bal of balls){
		if(bal.getOptions('x') >= can.width-bal.getOptions('radius'))bal.setOptions('dir', 1)
		if(bal.getOptions('y') >= can.height-bal.getOptions('radius'))bal.setOptions('dir', 3)
		if(bal.getOptions('x') <= bal.getOptions('radius'))bal.setOptions('dir', 0)
		if(bal.getOptions('y') <= bal.getOptions('radius'))bal.setOptions('dir', 2)
		switch(bal.getOptions('dir')){
			case 0: bal.setOptions('x', bal.getOptions('x')+10); break;
			case 1: bal.setOptions('x', bal.getOptions('x')-10); break;
			case 2: bal.setOptions('y', bal.getOptions('y')+10); break;
			case 3: bal.setOptions('y', bal.getOptions('y')-10); break;
		}
		
	}
}

function CheckCollBall(){
	for(let ibal=0; ibal<balls.length; ibal++){
		for(let jbal=0; jbal<balls.length; jbal++){
				if(CollBall(balls[ibal].getOptions('x'), balls[ibal].getOptions('y'), balls[ibal].getOptions('radius'), 
							balls[jbal].getOptions('x'), balls[jbal].getOptions('y'), balls[jbal].getOptions('radius')) && ibal != jbal)
				{
					balls.splice(ibal, 1);
					let nradius = balls[jbal].getOptions('radius') > 100 ? balls[jbal].getOptions('radius') : balls[jbal].getOptions('radius')*2;
					balls[jbal].setOptions('radius', nradius);				
				}
		}
	}
}

function CollBall(x1, y1, radius1, x2, y2, radius2){
	return x1 > x2 - radius2 && x1 < x2 + radius2 && y1 > y2 - radius2 && y1 < y2 + radius2;
}

// ========================= разное ===============================

function RandomInt(min, max){
	return Math.floor(min + Math.random() * (max + 1 - min));
}




















