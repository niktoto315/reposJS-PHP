let obj = {
	a: 1,
	b: 2,
	c: 3,
};

let symbol = Symbol('New Symbol');
obj[symbol] = 'JavaScript';

for(let i in obj){
	console.log(i + ':' + obj[i]);
}