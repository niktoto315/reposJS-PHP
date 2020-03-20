let str = 'site.ru sss site.com zzz site.net';
let sum = 0;

//19.1
console.log(str.match(/\w+\.ru|\w+\.com|\w+\.net/g, '!'));
//19.2
str = 'a1b c34d x567z';
for(let i of str.match(/\d+/g)){
	sum += +i;
}
console.log(sum);
