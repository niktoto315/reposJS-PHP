var game = {
    state: "start",
	level: 0,
	difficulty: 200,
	EnemyCount: 0,
};

var overlay = {
    counter: -1,
    title: "foo",
    subtitle: "bar",
	x: 0,
	y: 0,
	subx: 0,
	suby: 0,
};

var menu = {
	gamename: 'Space Wars',
	instruction: "Игра очень проста: Нужно убить всех врагов и не умереть.\n"+
	"Для выстрела предназначена кнопка - space,\nдля движения стрелки ← и →.\n"+
	"Для старта игры в меню - enter,\nдля выбора корабля те же стрелки ← и →.\n"+
	"Чтобы пройти этап, нужно убить всех врагов.\n"+
	"Дополнительная информация о игре покажется по ситуации.\n"+
	"(необозримом будущем возможно упраление в меню\nчерез клавиатуру)\n"+
	"Любопытный факт: на фоне последний кадр вашей игры.\n",
	counter: 0,
};

var player = {
	x:100,
	y:350,
	width: 20,
	height: 50,
	counter: 0,
	lives: 3,
	score: 0,
};

var keyboard = { };

var SoundDeath = new sound('music/deathPlayer.wav');
var SoundDeathEnemy = new sound('music/deathEnemy.wav');

var playerBullets = [];
var enemies = [];
var enemyBullets = [];
player.counter=-1;

// =========== game   ============
function updateGame() {
    if(game.state == "playing" && enemies.length == 0) {
        game.state = "won";
        overlay.title = "Уровень пройден";
		overlay.subtitle = "для продолжения нажмите пробел";
        	overlay.counter = 0;
		overlay.x = 140; overlay.y = 200;
		overlay.subx = 170; overlay.suby = 250;
    }
    if(game.state == "over" && keyboard[32] && overlay.counter >= 45) {
		menu.counter = 0;
		game.level = 0;
		game.EnemyCount = 0;
		player.score = 0;
		player.lives = 3;
        overlay.counter = -1;
    }
    if(game.state == "won" && keyboard[32] && overlay.counter >= 45) {
		menu.counter = 0;
		Start();
        overlay.counter = -1;
    }
    if(game.state != "playing" && keyboard[13] && menu.counter != -1) {
		Start();
    }
    if(game.state == "playing" && keyboard[27]) {
		Pause();
    }
    if(game.state == "pause" && keyboard[13]) {
		Pause();
    }
    if(game.state == "pause" && keyboard[77]) {
		menu.counter = 0;
		game.level = 0;
		game.EnemyCount = 0;
		player.lives = 3;
    }
    if(overlay.counter >= 0) {
        overlay.counter++;
    }
	if(menu.counter != -1 && keyboard[37]){
		if(PictBox.img > 0){
			PictBox.img--;
			keyboard[37] = false;
		}
	}
	if(menu.counter != -1 && keyboard[39]){
		if(PictBox.img < 2){
			PictBox.img++;
			keyboard[39] = false;
		}
	}
}

function updatePlayer() {
    if(player.state == "dead")return;
    
    //left arrow
	if(keyboard[37])  { 
	    player.x -= 10; 
	    if(player.x < 0) player.x = 0;
	}	
	//right arrow
	if(keyboard[39]) { 
	    player.x += 10;	
	    var right = canvas.width - player.width;
	    if(player.x > right) player.x = right;
	}	
	
	//space bar
	if(keyboard[32]) {
		if(!keyboard.fired) { 
			firePlayerBullet(); 
			keyboard.fired = true;
		}
	} else {
		keyboard.fired = false;
	}
	
	if(player.state == "hit") {
		player.counter++;
		if(player.counter == 20)SoundDeath.play();
		if(player.counter >= 40) {
			if(player.lives <= 1){	
				player.counter = 0;
				player.state = "dead";
				game.state = "over";
				if(timeout){
					overlay.title = "Время вышло";
					overlay.subtitle = "для продолжения нажмите пробел";
					overlay.counter = 0;
					overlay.x = 170; overlay.y = 200;
					overlay.subx = 160; overlay.suby = 250;
				}
				else{
					overlay.title = "Вас убили";
					overlay.subtitle = "для продолжения нажмите пробел";
					overlay.counter = 0;
					overlay.x = 200; overlay.y = 200;
					overlay.subx = 160; overlay.suby = 250;
				}
				player.counter=-1;
			}
			else{
				player.lives--;
				player.state = "alive";
			}
		}
	}
}

function updatePlayerBullets() {
	//move each bullet
	for(i in playerBullets) {
		var bullet = playerBullets[i];
		bullet.y -= 8;
		bullet.counter++;
	}
	//remove the ones that are off the screen
	playerBullets = playerBullets.filter(function(bullet){
		return bullet.y > 0;
	});
}

function updateBackground() {
}

// ============== Music =============
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

// ============== Enemy =============
function updateEnemies() {
    if(game.state == "start") {
        enemies = [];
        enemyBullets = [];
		if(game.level%2 == 0) { if(game.difficulty > 20)game.difficulty-=20; }
		else { if(game.level <= 20)game.EnemyCount++; }
        for(var i=0; i<game.EnemyCount; i++) {
            enemies.push({
                    x: 50+ i*50,
                    y: 50,
                    width: 40,
                    height: 40,
                    state: "alive",
                    counter: 0,
                    phase: Math.floor(Math.random()*50),
                    shrink: 20,
            });
        }
        game.state = "playing";
    }
    for(var i=0; i<game.EnemyCount; i++) {
        var enemy = enemies[i];
        if(!enemy) continue;
        if(enemy && enemy.state == "alive") {
            enemy.counter++;
            enemy.x += Math.sin(enemy.counter*Math.PI*2/100)*2;
            if((enemy.counter + enemy.phase) % game.difficulty == 0) {
                enemyBullets.push(createEnemyBullet(enemy));
            }
        }
        if(enemy && enemy.state == "hit") {
            enemy.counter++;
			if(enemy.counter == 2)SoundDeathEnemy.play();
            if(enemy.counter >= 20) {
                enemy.state = "dead";
                enemy.counter = 0;
            }
        }
    }
    enemies = enemies.filter(function(e) {
            if(e && e.state != "dead")return true;
            return false;
    });
}

function updateEnemyBullets() {
    for(var i in enemyBullets) {
        var bullet = enemyBullets[i];
        bullet.y += 2;
        bullet.counter++;
    }
}

function checkCollisions() {
    for(var i in playerBullets) {
        var bullet = playerBullets[i];
        for(var j in enemies) {
            var enemy = enemies[j];
            if(collided(bullet,enemy)) {
				if(enemy.state == 'alive')player.score += 200;
                bullet.state = "hit";
                enemy.state = "hit";
                enemy.counter = 0;
            }
        }
    }
    
    if(player.state == "hit" || player.state == "dead")return;
    for(var i in enemyBullets) {
        var bullet = enemyBullets[i];
        if(collided(bullet,player)) {
            bullet.state = "hit";
            player.state = "hit";
            player.counter = 0;
        }
    }
}

function collided(a, b) {
    //check for horz collision
    if(b.x + b.width >= a.x && b.x < a.x + a.width) {
        //check for vert collision
        if(b.y + b.height >= a.y && b.y < a.y + a.height) {
            return true;
        }
    }
    //check a inside b
    if(b.x <= a.x && b.x + b.width >= a.x+a.width) {
        if(b.y <= a.y && b.y + b.height >= a.y + a.height) {
            return true;
        }
    }
    //check b inside a
    if(a.x <= b.x && a.x + a.width >= b.x+b.width) {
        if(a.y <= b.y && a.y + a.height >= b.y+b.height) {
            return true;
        }
    }
    return false;
}

function doSetup() {
	attachEvent(document, "keydown", function(e) {
		keyboard[e.keyCode] = true;
	});
	attachEvent(document, "keyup", function(e) {
		keyboard[e.keyCode] = false;
	});
}

function attachEvent(node,name,func) {
    if(node.addEventListener) {
        node.addEventListener(name,func,false);
    } else if(node.attachEvent) {
        node.attachEvent(name,func);
    }
};
