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
console.log('Является ли ' + str1 + ' числом длиной до 12 цифр ? ' + (/\d+/.test(str1) && str1.length<12 && str1.length>=1));
str1 = '123456789123456789';
console.log('Является ли ' + str1 + ' числом длиной до 12 цифр ? ' + (/\d+/.test(str1) && str1.length<12 && str1.length>=1));
//18.8
str1 = '11.11.2000';
let str = str1.split('.');
console.log('Является ли ' + str1 + ' датой в формате день.месяц.год ? ' + (/\d{1,2}.\d{1,2}.\d{1,4}/.test(str1)
&& ((+str[0]<=31 && +str[0]>=1 && (+str[1]==1 || +str[1]==3 || +str[1]==5 || +str[1]==7 || +str[1]==8 || +str[1]==10 || +str[1]==12)) 
|| (+str[0]<=30 && +str[0]>=1 && (+str[1]==4 || +str[1]==6 || +str[1]==9 || +str[1]==11)) 
|| (+str[0]<=29 && +str[0]>=1 && +str[1]==2))
&& +str[2]<2100 && +str[2]>=0));
str1 = '30.02.881';
str = str1.split('.');
console.log('Является ли ' + str1 + ' датой в формате день.месяц.год ? ' + (/\d{1,2}.\d{1,2}.\d{1,4}/.test(str1)
&& ((+str[0]<=31 && +str[0]>=1 && (+str[1]==1 || +str[1]==3 || +str[1]==5 || +str[1]==7 || +str[1]==8 || +str[1]==10 || +str[1]==12)) 
|| (+str[0]<=30 && +str[0]>=1 && (+str[1]==4 || +str[1]==6 || +str[1]==9 || +str[1]==11)) 
|| (+str[0]<=29 && +str[0]>=1 && +str[1]==2))
&& +str[2]<2100 && +str[2]>=0));
//18.10
str1 = 'niktoto@gmail.com';
console.log('Является ли ' + str1 + ' корректным email`ом ? ' + (/@\w+\.\w+$/.test(str1)));
str1 = 'niktotogmail.com';
console.log('Является ли ' + str1 + ' корректным email`ом ? ' + (/@\w+\.\w+$/.test(str1)));