let str = 'sss site.ru zzz site.com kkk';
document.write(str+'<br>');

//22.2
let res = str.replace(/(\w+\.ru|\w+\.com|\w+\.net)/g, '<a href="http://$1">$1</a>');
document.write(res);