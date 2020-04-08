let str = '1a2b3c';

console.log(str);
str = UpdStr(str);
console.log(str);

function UpdStr(str){
	return [...str].reverse().join('');
}