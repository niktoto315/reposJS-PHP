document.querySelector('#b1').addEventListener('click', write);
document.querySelector('#b2').addEventListener('click', prev);
document.querySelector('#b3').addEventListener('click', next);
setInterval(timer, 100);

let t1 = document.querySelector('#t1');
let obj = [];
let key = 0;
let i = 0;

//странно, но задача чем-то напоминает ловушку дьявола =)

window.addEventListener('load', function(){
	obj = JSON.parse(localStorage['t2']);
	t1.value = obj[key];
	key = obj.length-1;
});
window.addEventListener('beforeunload', function(){
	localStorage['t2'] = JSON.stringify(obj);
});

function write(){
	obj[key]=t1.value;
	key++;
}
function next(){
	i++;
	t1.value = obj[i];
}
function prev(){
	i--;
	t1.value = obj[i];
}
function timer(){
	document.querySelector('#b1').disabled = t1.value == '' ? true : false;
	document.querySelector('#b2').disabled = i < 1 ? true : false;
	document.querySelector('#b3').disabled = i >= obj.length-1 ? true : false;
}


























