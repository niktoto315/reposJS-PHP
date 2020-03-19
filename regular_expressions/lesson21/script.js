let str = '12 34 56 78';

//21.1
let res = str.replace(/(\d)(\d)/g, '$2$1');
console.log(res);
