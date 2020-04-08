let arr = [1, 2, 3, 4];

let iterator = createiterator(arr);
for(let i of iterator){
	console.log(i);
}

function *createiterator(mas){
	for(let i=0; i<mas.length; i++){
		let ar = [];
		ar[0] = (mas[i]);
		ar[1] = (mas[++i]);
		yield ar;
	}
}