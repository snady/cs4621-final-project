function Particle(x, y, z){
	this.position = {"x": x, "y": y, "z": z};

	this.velocity = (Math.random()*0.5)+0.1;

	this.update = function(dt, endHeight) {
		this.position.y -= this.velocity * dt;

	}

}

function Emitter(x, y, z, width, height){
	
	this.totalParticles = 1000;
	this.particlePool = [];
	this.particleSize = 0.5; //arbitrary for now

	this.startHeight = y;
	this.endHeight = 0;

	this.vertices = [];
	this.indices = [];
	this.texture_coords = [];
	this.center_coords = [];

	for( var i = 0; i < this.totalParticles; i++ ){
		var p = new Particle(Math.random()*width,y,-Math.random()*height);
		this.particlePool.push(p);
		addSquare(p.position.x, p.position.y, p.position.z, this.particleSize, this.vertices, this.indices, this.texture_coords, this.center_coords);
	}

	this.update = function(dt) {

		for( var ii = 0; ii < this.totalParticles; ii++ ){
			var particle = this.particlePool[ii];
			if( particle.position.y <= this.endHeight ){
				particle.position.y = this.startHeight;
			}
			particle.update(dt);

			this.vertices[(12*ii)+1] = particle.position.y;
			this.vertices[(12*ii)+4] = particle.position.y;
			this.vertices[(12*ii)+7] = particle.position.y+this.particleSize;
			this.vertices[(12*ii)+10] = particle.position.y+this.particleSize;
		}
	}
}

function addSquare(llx, lly, llz, len, vbuffer, ibuffer, tbuffer, cbuffer){
	var c = vbuffer.length/3;
	vbuffer.push(llx, lly, llz, llx+len, lly, llz, llx+len, lly+len, llz, llx, lly+len, llz);
	ibuffer.push(c, c+1, c+2, c+2, c+3, c);
	tbuffer.push(0,0,1,0,1,1,0,1);
	cbuffer.push(llx+len/2, lly+len/2, llz, llx+len/2, lly+len/2, llz, llx+len/2, lly+len/2, llz, llx+len/2, lly+len/2, llz);
	//try to do this without duplicated centers
}