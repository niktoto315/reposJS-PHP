let str = 'sss site.ru zzz site.com kkk';
document.write(str+'<br>');

//22.2
let res = str.replace(/\w+\.\w+/g, '<a href="http://$&">$&</a>');
document.write(res);