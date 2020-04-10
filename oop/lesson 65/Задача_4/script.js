let t1 = document.querySelector('input[type=text]');
let b1 = document.querySelector('input[type=button]');
let selects = document.querySelector('select');

class MyString{
	reverse(str){
		return str.split('').reverse().join('');
	}
	ucFirst(str){
		return str[0].toUpperCase()+str.slice(1);
	}
	ucWords(str){
		let words = str.split(' ');
		for(let i=0; i<words.length; i++){
			words[i] = words[i].slice(0, 1).toUpperCase()+words[i].slice(1);
		}
		return words.join(' ');
	}
}

b1.addEventListener('click', function(){
	let MyStr = new MyString();
	switch(selects.selectedIndex){
		case 0: t1.value = MyStr.reverse(t1.value); break;
		case 1: t1.value = MyStr.ucFirst(t1.value); break;
		case 2: t1.value = MyStr.ucWords(t1.value); break;
	}
});