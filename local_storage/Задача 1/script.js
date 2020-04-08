let t1 = document.querySelector('#t1');

//1
t1.value = localStorage['t1'];
window.addEventListener('beforeunload', function(){
	localStorage['t1'] = t1.value;
});