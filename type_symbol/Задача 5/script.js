let arr = [1, 2, 3];

arr['S'] = function() { 
	let sum = 0;
	let S = Symbol.for('S');
	for(let i of arr){
		sum+=i;
	}
	return sum;
};

console.log(arr['S']());