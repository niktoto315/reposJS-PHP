class Ball {
	constructor(x, y, r, dir, color){
		this.x = x;
		this.y = y;
		this.r = r;
		this.dir = dir;
		this.color = color;
	}
	
	setOptions(type, value){
		switch(type){
			case 'x': this.x = value; break;
			case 'y': this.y = value; break;
			case 'radius': this.r = value; break;
			case 'dir': this.dir = value; break;
			case 'color': this.color = value; break;
		}
	}
	
	getOptions(type){
		switch(type){
			case 'x': return this.x; break;
			case 'y': return this.y; break;
			case 'radius': return this.r; break;
			case 'dir': return this.dir; break;
			case 'color': return this.color; break;
		}
	}
}