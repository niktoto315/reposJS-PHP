let str1 = 'http://cat.jpg';
let str2 = 'ссылка на кота с расширением jpeg.';
//18.2
console.log('Начинается ли ' + str1 + ' с https:// или http:// ? ' + /^[https://]|^[http://]/.test(str1));
console.log('Начинается ли ' + str2 + ' с https:// или http:// ? ' + /^[https://]|^[http://]/.test(str2));
//18.4
console.log('Заканчиается ли ' + str1 + ' jpeg или jpg ? ' + /jpeg$|jpg$/.test(str1));
console.log('Заканчиается ли ' + str2 + ' jpeg или jpg ? ' + /jpeg$|jpg$/.test(str2));
//18.6
str1 = '123456789';
console.log('Является ли ' + str1 + ' числом длиной до 12 цифр ? ' + (/\d/.test(str1) && str1.length<12 && str1.length>=1));
str1 = '123456789123456789';
console.log('Является ли ' + str1 + ' числом длиной до 12 цифр ? ' + (/\d/.test(str1) && str1.length<12 && str1.length>=1));
//18.8
str1 = '11.11.2000';
let str = str1.split('.');
console.log('Является ли ' + str1 + ' датой в формате день.месяц.год ? ' + (/\d.\d.\d/.test(str1)
&& str[0]<32 && str[0]>=1 && str[1]<13 && str[1]>=1 && str[2]<2100 && str[2]>=0));
str1 = '41.13.881';
str = str1.split('.');
console.log('Является ли ' + str1 + ' датой в формате день.месяц.год ? ' + (/\d.\d.\d/.test(str1)
&& str[0]<32 && str[0]>=1 && str[1]<13 && str[1]>=1 && str[2]<2100 && str[2]>=0));
//18.10
str1 = 'niktoto@gmail.com';
console.log('Является ли ' + str1 + ' корректным email`ом ? ' + (/@gmail.com$|@mail.ru|@ya.ru$$/.test(str1)));
str1 = 'niktoto@mail.com';
console.log('Является ли ' + str1 + ' корректным email`ом ? ' + (/@gmail.com$|@mail.ru|@ya.ru$$/.test(str1)));
str1 = 'niktoto@gmail.ru';
console.log('Является ли ' + str1 + ' корректным email`ом ? ' + (/@gmail.com$|@mail.ru|@ya.ru$$/.test(str1)));
