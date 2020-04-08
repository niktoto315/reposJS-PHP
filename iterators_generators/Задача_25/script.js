let input = document.querySelector('input[type=button]');
let p = document.querySelectorAll('p');

input.addEventListener('click', function(){
	for(let [num, i] of p.entries()){
		i.innerHTML += '-'+(++num);
	}
});