function get_arr(){
	let arr = [];
	let func = Symbol('Sum');
	for(let i=0; i<10; i++){
		arr[i] = Int_Random(1, 10);
	}
	arr[func] = function(){
		let sum = 0;
		for(let a of this){
			sum+=a;
		}
		return sum;
	}
	console.log(arr[func]());
	return arr;
}
function Int_Random(min, max){
	return Math.floor(Math.random()*(min+max));
}

function func(arr1, arr2){
	let arr3 = [];
	let tr = false;
	for(let a of arr1){
		for(let b of arr2){
			tr=false;
			if(a == b){
				arr3.push(a);
				tr = true;
			}
			if(tr)break;
		}
	}
	let func = Symbol('Sum');
	arr3[func] = function(){
		let sum = 0;
		for(let a of this){
			sum+=a;
		}
		return sum;
	}
	console.log(arr3[func]());
	return arr3;
}

let arr1 = get_arr();
console.log(arr1);
let arr2 = get_arr();
console.log(arr2);

console.log(func(arr1, arr2));

