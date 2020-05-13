class Ball {
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
	}
	
	setPositions(x, y, radius){
		this.x = x;
		this.y = y;
		this.r = radius;
	}
	
	getOptions(type){
		switch(type){
			case 'x': return this.x; break;
			case 'y': return this.y; break;
			case 'radius': return this.r; break;
		}
	}
}