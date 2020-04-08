let selects = document.querySelectorAll('select');
let inputs = document.querySelectorAll('input');
let texts = document.querySelectorAll('textarea');
let nodes = [];
let obj = {};

UpdateSelects();
UpdateNodes();
console.log(localStorage);

window.addEventListener('load', function(){
	obj = JSON.parse(localStorage['t3']);
	for(let i of nodes){
		switch(i.type){
			case 'text': i.value = obj[i.id]; break; 
			case 'textarea': i.value = obj[i.id]; break;
			case 'checkbox': i.checked = obj[i.id]; break; 
			case 'radio': i.checked = obj[i.id]; break;
			case 'select-one': i.selectedIndex = obj[i.id]; break;
		}
	}
});

window.addEventListener('beforeunload', function(){
	for(let i of nodes){
		switch(i.type){
			case 'text': obj[i.id] = i.value; break; 
			case 'textarea': obj[i.id] = i.value; break;
			case 'checkbox': obj[i.id] = i.checked; break; 
			case 'radio': obj[i.id] = i.checked; break;
			case 'select-one': obj[i.id] = i.selectedIndex; break;
		}
	}
	localStorage['t3'] = JSON.stringify(obj);
});

function UpdateNodes(){
	for(let i of inputs){
		nodes.push(i);
	}
	for(let i of texts){
		nodes.push(i);
	}
	for(let i of selects){
		nodes.push(i);
	}
}

function UpdateSelects(){
	for(let i of selects){
		let count;
		switch(i.id){
			case 'sel1': count=31; break;
			case 'sel2': count=12; break;
			case 'sel3': count=200; break;
			default: count=20; break;
		}
		for(let ind=0; ind<count; ind++){
			let opt = document.createElement('option');
			opt.text = i.id == 'sel3' ? 1950+ind : ind+1;
			i.appendChild(opt);
		}
	}
}
























