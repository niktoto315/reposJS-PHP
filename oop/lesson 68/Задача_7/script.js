let t1 = document.querySelector('input[type=text]');
let b1 = document.querySelector('input[type=button]');
let ta = document.querySelector('textarea');
let p = document.querySelectorAll('p');

class Pet{
	constructor(hungry, happy, health){
		this.happy = happy;
		this.hungry = hungry;
		this.health = health;
	}
	
	getHealth(){
		return this.health;
	}
	getHappy(){
		return this.happy;
	}
	getHungry(){
		return this.hungry;
	}
	
	setHealth(health){
		this.health += health;
		if(Pet1.getHealth() > 100)this.health = 100;
	}
	setHappy(happy){
		this.happy += happy;
		if(Pet1.getHappy() > 100)this.happy = 100;
	}
	setHungry(hungry){
		this.hungry += hungry;
		if(Pet1.getHungry() > 100)this.hungry = 100;
	}
	
	Start(value){
		this.happy = value;
		this.hungry = value;
		this.health = value;
	}
}

var Pet1 = new Pet(1, 1, 1);
let iter = 0;
let feed_msg = false;
let play_msg = false;
let health_msg = false;

b1.addEventListener('click', function(){
	if(/play/.test(t1.value)){
		Pet1.setHappy(10);
		ta.value += '\n'+'Мяу!';
		play_msg = false;
	}
	if(/feed/.test(t1.value)){
		Pet1.setHungry(10);
		ta.value += '\n'+'Вкуфна!';
		feed_msg = false;
	}
	if(/heal/.test(t1.value)){
		Pet1.setHealth(10);
		ta.value += '\n'+'Ура! Я не умру';
		health_msg = false;
	}
});

setInterval(function(){
	iter++;
	
	p[0].innerHTML = 'Happy: ' + Pet1.getHappy();
	p[1].innerHTML = 'Hungry: ' + Pet1.getHungry();
	p[2].innerHTML = 'Health: ' + Pet1.getHealth();

	switch(iter){
		case 1: Pet1.setHungry(-1); break;
		case 2: Pet1.setHappy(-1); break;
		case 5: Pet1.setHealth(-1); break;
		case 6: iter=0; break;
	}
	if(Pet1.getHappy() < 20 && !play_msg){
		play_msg = true;
		ta.value += '\n'+'Играть! Играть, играть, играть!';
	}
	if(Pet1.getHungry() < 20 && !feed_msg){
		feed_msg = true;
		ta.value += '\n'+'Хочу кушац';
	}
	if(Pet1.getHealth() < 20 && !health_msg){
		health_msg = true;
		ta.value += '\n'+'*Корова вирус наступает!*';
	}

	if(Pet1.getHealth() == 0)Game_Over('Питомец не пережил коровавирус');
	if(Pet1.getHappy() == 0)Game_Over('Питомец погиб в борьбе со скукой');
	if(Pet1.getHungry() == 0)Game_Over('Питомец не удовлетворён святым духом');
}, 1000);

function Game_Over(msg){
	alert(msg)
	Pet1.Start(10);
	ta.value = '';feed_msg = false;
	play_msg = false;
	health_msg = false;
}











