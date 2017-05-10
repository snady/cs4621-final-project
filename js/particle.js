function Particle(x, y, z){
	this.position = {"x": x, "y": y, "z": z};

	this.velocity = 1;

	this.update = function(dt, endHeight) {
		this.position.y -= this.velocity.y * dt;

	}

}

function Emitter(x, y, z){
	
	this.totalParticles = 1000;
	this.particlePool = [];

	this.startHeight = y;
	this.endHeight = 0;

	for( var i = 0; i < this.totalParticles; i++ ){
		this.particlePool.push(new Particle(x,y,z));
	}

	this.update = function(dt) {
		for( var ii = 0; ii < this.totalParticles; ii++ ){
			var particle = this.particlePool[ii];
			if( particle.position.y <= endHeight ){
				particle.position.y = startHeight;
			}
			particle.update(dt);
		}
	}
}

function addCube(llx, lly, llz, len, vbuffer, ibuffer){
	var c = vbuffer.length;
	vbuffer.push(llx, lly, llz, llx+len, lly, llz, llx+len, lly+len, llz, llx, lly+len, llz,
				llx, lly, llz-len, llx+len, lly, llz-len, llx+len, lly+len, llz-len, llx, lly+len, llz-len);
	ibuffer.push(c, c+1, c+2, c+2, c+3, c,
				 c+1, c+5, c+6, c+6, c+2, c+1,
				 c+5, c+4, c+7, c+7, c+6, c+5,
				 c+4, c, c+3, c+3, c+7, c+4,
				 c+3, c+3, c+6, c+6, c+7, c+3,
				 c+4, c+5, c+1, c+1, c, c+4);
}