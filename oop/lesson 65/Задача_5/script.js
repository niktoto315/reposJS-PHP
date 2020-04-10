let t1 = document.querySelector('input[type=text]');
let b1 = document.querySelector('input[type=button]');
let selects = document.querySelector('select');

class Valiator{
	IsEmail(str){
		return /@\w+\.\w+$/.test(str);
	}
	IsDomain(str){
		return /\w+\.\w+/.test(str);
	}
	IsDate(str){
		//Остановимся на том, что нам нужен формат даты дд.мм.гггг. 
		//Хотя не помешает добавить проверку на дату из серии 31.02.7205
		return /\d{2}\.\d{2}\.\{4}/.test(str);
	}
	IsPhone(str){
		//формат записи телефона - код страны(+d) код оператора(ddd) номер абонента(ddd dd dd)
		return /\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}/.test(str);
	}
}

b1.addEventListener('click', function(){
	let MyStr = new Valiator();
	switch(selects.selectedIndex){
		case 0: alert(MyStr.IsEmail(t1.value)); break;
		case 1: alert(MyStr.IsDomain(t1.value)); break;
		case 2: alert(MyStr.IsDate(t1.value)); break;
		case 3: alert(MyStr.IsPhone(t1.value)); break;
	}
});