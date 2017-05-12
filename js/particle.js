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

	for( var i = 0; i < this.totalParticles; i++ ){
		this.particlePool.push(new Particle(Math.random()*width,y,-Math.random()*height));
	}

	this.update = function(dt) {
		this.vertices = [];
		this.indices = [];
		this.texture_coords = [];
		for( var ii = 0; ii < this.totalParticles; ii++ ){
			var particle = this.particlePool[ii];
			if( particle.position.y <= this.endHeight ){
				particle.position.y = this.startHeight;
			}
			particle.update(dt);
			addSquare(particle.position.x, particle.position.y, particle.position.z, this.particleSize, this.vertices, this.indices, this.texture_coords);
		}
	}
}

function addSquare(llx, lly, llz, len, vbuffer, ibuffer, tbuffer){
	var c = vbuffer.length/3;
	vbuffer.push(llx, lly, llz, llx+len, lly, llz, llx+len, lly+len, llz, llx, lly+len, llz);
	ibuffer.push(c, c+1, c+2, c+2, c+3, c);
	tbuffer.push(0,0,1,0,1,1,0,1);
}