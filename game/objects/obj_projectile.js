function Obj_Projectile(target, x, y, homing=false) {

	target = game.getObject(target);

	let projectile = new GameObject({
		"name":"obj_projectile",
		"sprite": "spr_fire",
		"collisionBox":[12,12,6,6],
		"x":x,
		"y":y,
		"vars": {
			"target":target,
			"homing":homing,
			"destX": target.x,
			"destY": target.y
		}
	});

	
	projectile.sprite.scaleX = .75;
	projectile.sprite.scaleY = .75;


	projectile.onstep = function() {

		if(this.homing) { 
			this.vars.destX = this.vars.target.x;
			this.vars.destY = this.vars.target.y;
		}
		this.moveTowardsPoint(this.vars.destX, this.vars.destY, 30);

		this.getCollisions(0,0,true).forEach(obj=>{
			if(obj.name=="obj_wall") {this.destroy();}
		});
	}
	return projectile;
}