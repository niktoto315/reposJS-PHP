let str = 'Moca is really a funny girl';

let ul = document.createElement('ul');
for(let i of str){
	let li = document.createElement('li');
	li.innerHTML = i;
	ul.appendChild(li);
}
document.querySelector('body').appendChild(ul);