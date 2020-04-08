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

for(let i of obj){
	console.log(i);
}