let obj = {
	a: 1,
	b: 2,
	c: 3,
};

let symbol = Symbol('New Symbol');
obj[symbol] = function Name() { alert('!') };

console.log(obj);
obj[symbol]();