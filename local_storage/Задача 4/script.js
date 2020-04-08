let body = document.querySelector('#body');
let ta1 = document.querySelector('#ta1');
let b1 = document.querySelector('#b1');
let b2 = document.querySelector('#b2');
let b3 = document.querySelector('#b3');
let b4 = document.querySelector('#b4');
let b5 = document.querySelector('#b5');
let CB1 = document.querySelector('#CB1');
let l1 = document.querySelector('#l1');
let sel = document.querySelector('#select1');
let options = document.querySelectorAll('#select1 option');
let optvalue = [];
let obj = {};
let replay=false;

window.addEventListener('load', Load);
window.addEventListener('beforeunload', Save);

sel.addEventListener('change', function(){ 
	ta1.value = sel[sel.selectedIndex].text; 
});

b1.addEventListener('click', function(){
	let i;
	options = document.querySelectorAll('#select1 option');
	if(CB1.checked)
	{
		let opt = document.createElement('option');
		opt.text = ta1.value;
		opt.setAttribute('selected', '');
		sel.appendChild(opt);
	}
	else
	{
		options[sel.selectedIndex].text = ta1.value;
	}
});

b2.addEventListener('click', function(){
	sel.removeChild(sel[sel.selectedIndex]);
	sel.selectedIndex = sel.length - 1;
});

b3.addEventListener('click', function(){
	ta1.value = '';
});

b4.addEventListener('click', Save);

b5.addEventListener('click', Load);

b6.addEventListener('click', function(){
	obj['selected'] = -1;
	obj['ta1'] = '';
	obj['optvalue'] = [];
	ta1.value = '';
	while(sel.length > 0){
		sel.removeChild(sel[sel.selectedIndex]);
		sel.selectedIndex = sel.length - 1;
	}
	b6.disabled = true;
});

CB1.addEventListener('change', function(){
	l1.innerHTML = l1.innerHTML == 'New' ? 'Edit' : 'New';
});

setInterval(function(){
	if(sel.length == 0){
		b2.disabled = true;
		CB1.checked = true;
		CB1.disabled = true;
		l1.innerHTML = 'New';
	}
	else {
		b2.disabled = false;
		CB1.disabled = false;
	}
	if(ta1.value == '')b3.disabled = true;
	else b3.disabled = false;
	if(sel.length == 1 && ta1.value == '' && !CB1.checked)ta1.value = sel[sel.selectedIndex].text;
}, 100);

function Save(){
	options = document.querySelectorAll('#select1 option');
	optvalue = [];
	for(let i of options){
		optvalue.push(i.text);
	}
	obj['selected'] = sel.selectedIndex;
	obj['ta1'] = ta1.value;
	obj['optvalue'] = optvalue;
	localStorage['obj'] = JSON.stringify(obj);
	console.log(localStorage);
	b6.disabled = false;
}

function Load(){
	obj = JSON.parse(localStorage['obj']);
	ta1.value = obj['ta1'];
	optvalue = obj['optvalue'];
	for(let i of optvalue){
		let opt = document.createElement('option');
		opt.text = i;
		sel.appendChild(opt);
	}
	options = document.querySelectorAll('#select1 option');
	sel.selectedIndex = obj['selected'];
	b6.disabled = false;
}















