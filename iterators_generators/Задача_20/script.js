let obj = {
	a: 1, 
	b: 2, 
	c: 3,
	*[Symbol.iterator](){
		for(let i in this){
			yield this[i];
		}
	},
};

console.log([...obj]);