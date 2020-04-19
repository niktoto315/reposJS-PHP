let body = document.querySelector('#body');
let ta1 = document.querySelector('#ta1');
let b1 = document.querySelector('#b1');
let b2 = document.querySelector('#b2');
let CB1 = document.querySelector('#CB1');
let date = document.querySelector('#date');
let l1 = document.querySelector('#l1');
let sel = document.querySelector('#select1');
let opts = [];
let obj = {};
let replay=false;

window.addEventListener('load', Load);
window.addEventListener('beforeunload', Save);
setInterval(timer, 100);
b1.addEventListener('click', AddNote);
b2.addEventListener('click', DeleteNote);

sel.addEventListener('change', function(){ 
	ta1.value = sel[sel.selectedIndex].text; 
});
CB1.addEventListener('change', function(){
	l1.innerHTML = l1.innerHTML == 'New' ? 'Edit' : 'New';
});
date.addEventListener('change', function(){
	for(let i of sel){
		sel.removeChild(i);
	}
	UpdateNote();
});

function Save(){
	obj['selected'] = sel.selectedIndex;
	obj['ta1'] = ta1.value;
	obj['opts'] = opts;
	localStorage['obj'] = JSON.stringify(obj);
}

function Load(){
	SetDate();
	obj = JSON.parse(localStorage['obj']);
	ta1.value = obj['ta1'];
	opts = obj['opts'];
	UpdateNote();
}

function UpdateNote(){
	for(let i of opts){
		if(i['date'] == date.value){
			let opt = document.createElement('option');
			opt.text = i['value'];
			sel.appendChild(opt);
		}
	}
	sel.selectedIndex = obj['selected'];
}

function AddNote(){
	let i;
	options = document.querySelectorAll('#select1 option');
	if(CB1.checked)
	{
		let opt = document.createElement('option');
		opt.text = ta1.value;
		opt.setAttribute('selected', '');
		sel.appendChild(opt);
		opts.push({'value': opt.text, 'date': date.value});
	}
	else
	{
		options[sel.selectedIndex].text = ta1.value;
	}
}

function DeleteNote(){
	for(let i=0; i<opts.length; i++){
		if(opts[i]['value'] == sel[sel.selectedIndex].innerHTML)opts.splice(i, 1);
	}
	sel.removeChild(sel[sel.selectedIndex]);
	sel.selectedIndex = sel.length - 1;
}

function timer(){
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
	if(sel.length == 1 && ta1.value == '' && !CB1.checked)ta1.value = sel[sel.selectedIndex].text;
}

function SetDate(){
	var dat = new Date();
	date.value = [dat.getFullYear(), dat.getMonth()+1 < 10 ? "0"+(dat.getMonth()+1) : (dat.getMonth()+1), dat.getDate()].join('-');
}







