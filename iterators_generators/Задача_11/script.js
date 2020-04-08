let arr = {
	a: 1,
	b: 2,
	c: 3,
};

let iterator = createiterator(arr);
for(let i of iterator){
	console.log(i);
}

function *createiterator(mas){
	for(let i in mas){
		yield mas[i];
	}
}