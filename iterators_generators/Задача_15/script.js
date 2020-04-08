let map = new Map();

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

let key = map.keys();
let arr_key = [];

for(let i of key){
	arr_key.push(i);
}
console.log(arr_key);