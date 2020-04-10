let texts = document.querySelectorAll('input[type=text]');
let b1 = document.querySelector('input[type=button]');

class Rentangle{
	constructor(width, height){
		this.elem = document.createElement('div');
		this.elem.addEventListener('click', function(){
			alert(parseInt(elem1.getWidth()) + ', ' + parseInt(elem1.getHeight()))
		});
		this.elem.innerHTML = 'нажми меня!';
		this.setWidth(width);
		this.setHeight(height);
		this.elem.style.border = '1px solid black';
		
		document.body.appendChild(this.elem);
	}
	
	setWidth(width){
		this.elem.style.width = width + 'px';
	}
	
	setHeight(height){
		this.elem.style.height = height + 'px';
	}
	
	getWidth(){
		return this.elem.style.width;
	}
	
	getHeight(){
		return this.elem.style.height;
	}
}

var elem1 = new Rentangle(100, 50);

b1.addEventListener('click', function(){
	elem1.setWidth(texts[0].value);
	elem1.setHeight(texts[1].value);
});













