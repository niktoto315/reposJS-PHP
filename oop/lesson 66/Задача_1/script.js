let texts = document.querySelectorAll('input[type=text]');
let b1 = document.querySelector('input[type=button]');
let p = document.querySelectorAll('p');

class User{
	constructor(name, surname) {
		this.name = name;
		this.surname = surname;
	}

	getFullName() {
		return this.name + ' ' + this.surname;
	}
}

class Student extends User{
	constructor(name, surname, year){
		super();
		this.name = name;
		this.surname = surname;
		this.year = year;
	}
	
	getCourse(){
		var date = new Date();
		let result = date.getFullYear() - this.year > 5 ? 5 : date.getFullYear() - this.year;
		if(result <= 0)result=1;
		return result;
	}
}

b1.addEventListener('click', function(){
	var student = new Student(texts[0].value, texts[1].value, texts[2].value);
	p[0].innerHTML += 'Name:' + student.name;
	p[1].innerHTML += 'Surname:' + student.surname;
	p[2].innerHTML += 'FullName:' + student.getFullName();
	p[3].innerHTML += 'Year:' + student.year;
	p[4].innerHTML += 'Course:' + student.getCourse();
	console.log(student.name);
	console.log(student.surname);
	console.log(student.getFullName());
	console.log(student.year);
	console.log(student.getCourse());
});













