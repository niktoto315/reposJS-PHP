let str = '<a href="" class="eee" id="zzz">';

//25.2
let res = str.match(/\w+(?==)/g);
console.log(res);