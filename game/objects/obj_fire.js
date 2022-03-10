var obj_fire = new GameObject(
	"obj_fire", 
	0, 0, 
	new Sprite("spr_fire","game/sprites/items.png",[256,288,320,352],384,32,48,32,48)
);
obj_fire.vars.owner = "obj_player";
obj_fire.oncreate = function() {
	let th = this;
	setTimeout(function() { th.destroy(); }, 1000);
}
obj_fire.onstep = function() {

	this.getCollisions().forEach(obj=>{
		if(obj.name == "obj_enemy") {
			obj.hp -= 1;
			obj.amIDead();
		}
	});
}
obj_fire.ondestroy = function() { sou_fire.stop(); }
obj_fire.vars.canhurt = true;