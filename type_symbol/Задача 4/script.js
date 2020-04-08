let arr = [1, 2, 3];

let symbol = Symbol('New Symbol');
arr[symbol] = function Sum() { 
	let sum = 0;
	for(let i of arr){
		sum+=i;
	}
	return sum;
};

console.log(arr[symbol]());