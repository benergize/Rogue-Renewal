function Obj_Projectile(target, x, y, homing=false) {

	target = game.getObject(target);

	let projectile = new GameObject({
		"name":"obj_projectile",
		"sprite": "spr_fire",
		"collisionBox":[14,14,14,14],
		"x":x,
		"y":y,
		"vars": {
			"target":target,
			"homing":homing,
			"destX": target.x,
			"destY": target.y
		}
	});



	projectile.onstep = function() {

		if(this.homing) { 
			this.vars.destX = this.vars.target.x;
			this.vars.destY = this.vars.target.y;
		}
		this.moveTowardsPoint(this.vars.destX, this.vars.destY, 20);

		this.getCollisions(0,0,true).forEach(obj=>{
			if(obj.name=="obj_wall") {this.destroy();}
		});
	}
	return projectile;
}