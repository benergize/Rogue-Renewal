function spell_flameWall() {
	let croom = game.getCurrentRoom();
	croom.addObject(new Instance(obj_fire,{x:obj_player.x,y:obj_player.y-24,depth:-obj_player.y*-1}));
	croom.addObject(new Instance(obj_fire,{x:obj_player.x,y:obj_player.y+24,depth:-99999}));
	croom.addObject(new Instance(obj_fire,{x:obj_player.x+32,y:obj_player.y,depth:-99999}));
	croom.addObject(new Instance(obj_fire,{x:obj_player.x-32,y:obj_player.y,depth:-99999}));
	sou_fire.loop();
}