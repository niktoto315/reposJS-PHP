let out_count = document.querySelector('#lab1');
var can = document.getElementById("canvas");
var c = can.getContext('2d');

let count_ball = 0;
let balls = [];

var timer = setInterval(function(){
	count_ball++;
	out_count.innerHTML = out_count.innerHTML.replace(/\d+/g, count_ball);
	if(balls.length < 100)CreateBall(c);
	if(count_ball >= 10 && document.querySelector('#p1') == null)Full_Edition();
	if(count_ball >= 50 && document.querySelector('#p2') == null)No_Bugs_This_Feature();
	if(count_ball >= 100 && document.querySelector('#but1') == null)Button_Random_Ball();
	if(count_ball >= 200 && document.querySelector('#div1') == null)Button_Custom_Ball();
	if(document.querySelector('#but1') != null)document.querySelector('#but1').disabled = count_ball < 100 && document.querySelector('#but1') != null ? true : false;
	if(document.querySelector('#but2') != null)document.querySelector('#but2').disabled = count_ball < 200 && document.querySelector('#but2') != null ? true : false;
}, 500);

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
	p.innerHTML += 'Чтобы разблокировать дополнительные функции, купите полную версию!<br>(Просто подождите или понажимайте на шары)';
	p.setAttribute('id', 'p1');
	document.querySelector('#form1').appendChild(p);
}

function No_Bugs_This_Feature(){
	let p = document.createElement('p');
	p.innerHTML += 'Если заметите застрявший в стенке шарик, то всё так и задумано';
	p.setAttribute('id', 'p2');
	document.querySelector('#form1').appendChild(p);
}

function Button_Random_Ball(){
	let but = document.createElement('input');
	but.setAttribute('id', 'but1');
	but.type = 'button';
	but.value = 'Создать рандомный шарик';
	but.addEventListener('click', function(){
		let coords = Random_Coords();
		var user_ball = new Ball(coords[0], coords[1], 15, RandomInt(0, 3), 10, 'red');
		switch(RandomInt(0, 2)){
			case 0: user_ball.setOptions('radius', 15); break;
			case 1: user_ball.setOptions('radius', 30); break;
			case 2: user_ball.setOptions('radius', 60); break;
		}
		switch(user_ball.getOptions('radius')){
			case 15: user_ball.setOptions('step', 10); break;
			case 30: user_ball.setOptions('step', 8); break;
			case 60: user_ball.setOptions('step', 6); break;
		}
		balls.push(user_ball);
		if(count_ball > 100)count_ball -= 100;
	});
	document.querySelector('#form1').appendChild(but);
}

function Button_Custom_Ball(){
	let div = document.createElement('div');
	div.setAttribute('id', 'div1');
	document.querySelector('#form1').appendChild(div);
	
	let sel = document.createElement('select');
	sel.setAttribute('id', 'x');
	document.querySelector('#form1').appendChild(sel);
	for(let i=80; i<can.width-80; i++){
		let opt = document.createElement('option');
		opt.innerHTML += i;
		document.querySelector('#x').appendChild(opt);
	}
	
	sel = document.createElement('select');
	sel.setAttribute('id', 'y');
	document.querySelector('#form1').appendChild(sel);
	for(let i=80; i<can.height-80; i++){
		
		let opt = document.createElement('option');
		opt.innerHTML += i;
		document.querySelector('#y').appendChild(opt);
	}
	
	sel = document.createElement('select');
	sel.setAttribute('id', 'radius');
	document.querySelector('#form1').appendChild(sel);
	for(let i=15; i<80; i*=2){
		
		let opt = document.createElement('option');
		opt.innerHTML += i;
		document.querySelector('#radius').appendChild(opt);
	}
	
	sel = document.createElement('select');
	sel.setAttribute('id', 'dir');
	document.querySelector('#form1').appendChild(sel);
	for(let i=0; i<8; i++){
		
		let opt = document.createElement('option');
		opt.innerHTML += i;
		document.querySelector('#dir').appendChild(opt);
	}
	
	let but = document.createElement('input');
	but.id = 'but2';
	but.type = 'button';
	but.value = 'Создать шар';
	but.addEventListener('click', function(){
		let arr = [	+document.querySelector('#x')[document.querySelector('#x').selectedIndex].innerHTML,
					+document.querySelector('#y')[document.querySelector('#y').selectedIndex].innerHTML,
					+document.querySelector('#radius')[document.querySelector('#radius').selectedIndex].innerHTML,
					+document.querySelector('#dir')[document.querySelector('#dir').selectedIndex].innerHTML];
		var user_ball = new Ball(arr[0], arr[1], arr[2], arr[3], 10, 'yellow');
		switch(user_ball.getOptions('radius')){
			case 15: user_ball.setOptions('step', 10); break;
			case 30: user_ball.setOptions('step', 8); break;
			case 60: user_ball.setOptions('step', 6); break;
		}
		balls.push(user_ball);
		if(count_ball > 200)count_ball -= 200;
	});
	document.querySelector('#div1').appendChild(but);
}

function Random_Coords(){
	let x = RandomInt(100, can.width-100);
	let y = RandomInt(100, can.width-100);
	for(let bal of balls){
		while(x == bal.getOptions('x') && y == bal.getOptions('y')){
			x = RandomInt(100, can.width-100);
			y = RandomInt(100, can.width-100);
		}
	}
	return [x, y];
}

//! ========================= шары ==============================

// ===================== Нажатие на шар =========================

can.addEventListener('click', function(e){				
	for(let bal in balls){	
		if(CheckMouse(e.offsetX, e.offsetY, balls[bal])){
			switch(balls[bal].getOptions('color')){
				case 'white': 
					balls.splice(bal, 1); 
					count_ball += RandomInt(0, 30);
				break; 
				case 'yellow': 
					count_ball += RandomInt(50, 60);
					balls[bal].setOptions('dir', RandomInt(0, 7));
				break; 
				case 'red': 
					if(balls[bal].getOptions('radius') <= 15)balls.splice(bal, 1);
					else balls[bal].setOptions('radius', balls[bal].getOptions('radius')/2); 
					balls[bal].setOptions('dir', RandomInt(0, 7));
					balls[bal].setOptions('step', balls[bal].getOptions('step')+2); 
				break; 
			}
			break;
		}
	}
});

// ========================= создание ===========================

function CreateBall(){
	var ball = new Ball(RandomInt(100, can.width-100), RandomInt(100, can.height-100), 15, RandomInt(0, 7), 10, 'white');
	switch(RandomInt(0, 2)){
		case 0: ball.setOptions('radius', 15); break;
		case 1: ball.setOptions('radius', 30); break;
		case 2: ball.setOptions('radius', 60); break;
	}
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

// ------------------- движение внутри границ --------------------

function moveBall(){
	for(let bal of balls){
		if( bal.getOptions('x')+bal.getOptions('radius') >= can.width || 
			bal.getOptions('y')+bal.getOptions('radius') >= can.height || 
			bal.getOptions('x')-bal.getOptions('radius') <= 0 || 
			bal.getOptions('y')-bal.getOptions('radius') <= 0)
		{
			switch(bal.getOptions('dir')){
				case 0: bal.setOptions('dir', 1); break;
				case 1: bal.setOptions('dir', 0); break;
				case 2: bal.setOptions('dir', 3); break;
				case 3: bal.setOptions('dir', 2); break;
			}
		}
		if(bal.getOptions('x')+bal.getOptions('radius') >= can.width){
			switch(bal.getOptions('dir')){
				case 6: bal.setOptions('dir', 5); break;
				case 4: bal.setOptions('dir', 7); break;
			}
		}
		if(bal.getOptions('y')+bal.getOptions('radius') >= can.height){
			switch(bal.getOptions('dir')){
				case 7: bal.setOptions('dir', 5); break;
				case 4: bal.setOptions('dir', 6); break;
			}
		}
		if(bal.getOptions('x')-bal.getOptions('radius') <= 0){
			switch(bal.getOptions('dir')){
				case 5: bal.setOptions('dir', 6); break;
				case 7: bal.setOptions('dir', 4); break;
			}
		}
		if(bal.getOptions('y')-bal.getOptions('radius') <= 0){
			switch(bal.getOptions('dir')){
				case 5: bal.setOptions('dir', 7); break;
				case 6: bal.setOptions('dir', 4); break;
			}
		}
		
		switch(bal.getOptions('dir')){
			case 0: bal.setOptions('x', bal.getOptions('x')+bal.getOptions('step')); break;
			case 1: bal.setOptions('x', bal.getOptions('x')-bal.getOptions('step')); break;
			case 2: bal.setOptions('y', bal.getOptions('y')+bal.getOptions('step')); break;
			case 3: bal.setOptions('y', bal.getOptions('y')-bal.getOptions('step')); break;
			case 4: bal.setOptions('x', bal.getOptions('x')+bal.getOptions('step')); 
					bal.setOptions('y', bal.getOptions('y')+bal.getOptions('step')); break;
			case 5: bal.setOptions('x', bal.getOptions('x')-bal.getOptions('step')); 
					bal.setOptions('y', bal.getOptions('y')-bal.getOptions('step')); break;
			case 6: bal.setOptions('x', bal.getOptions('x')+bal.getOptions('step')); 
					bal.setOptions('y', bal.getOptions('y')-bal.getOptions('step')); break;
			case 7: bal.setOptions('x', bal.getOptions('x')-bal.getOptions('step')); 
					bal.setOptions('y', bal.getOptions('y')+bal.getOptions('step')); break;
		}
	}
}

// -------------------- столкновение друг с другом ----------------------

function CheckCollBall(){
	for(let ibal=0; ibal<balls.length; ibal++){
		for(let jbal=0; jbal<balls.length; jbal++){
				if(CollBall(balls[ibal].getOptions('x'), balls[ibal].getOptions('y'), balls[ibal].getOptions('radius'), 
							balls[jbal].getOptions('x'), balls[jbal].getOptions('y'), balls[jbal].getOptions('radius')) && ibal != jbal)
				{
					let big, small;
					if(balls[ibal].getOptions('radius') == balls[jbal].getOptions('radius')){
						balls.splice(ibal, 1);
						balls.splice(jbal, 1);
						break;
					}
					else if(balls[ibal].getOptions('radius') < balls[jbal].getOptions('radius')){
						big = jbal;
						small = ibal;
					}
					else{
						big = ibal;
						small = jbal;
					}
					if(balls[big].getOptions('radius') < 100){
						balls[big].setOptions('radius', balls[big].getOptions('radius')*2);
						balls[big].setOptions('step', balls[big].getOptions('step')-2);
						if(balls[big].getOptions('x')+balls[big].getOptions('radius') >= can.width)balls[big].setOptions('x', can.width-balls[big].getOptions('radius')-50);
						if(balls[big].getOptions('y')+balls[big].getOptions('radius') >= can.height)balls[big].setOptions('y', can.height-balls[big].getOptions('radius')-50);
						if(balls[big].getOptions('x')-balls[big].getOptions('radius') <= 0)balls[big].setOptions('x', balls[big].getOptions('radius')+50);
						if(balls[big].getOptions('y')-balls[big].getOptions('radius') <= 0)balls[big].setOptions('y', balls[big].getOptions('radius')+50);
					}
					balls.splice(small, 1);
					break;
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
  
function CheckMouse(x,y,obj){
	return 	x >= obj.getOptions('x') - obj.getOptions('radius') && x <= obj.getOptions('x') + obj.getOptions('radius') && 
			y >= obj.getOptions('y') - obj.getOptions('radius') && y <= obj.getOptions('y') + obj.getOptions('radius');
}




















