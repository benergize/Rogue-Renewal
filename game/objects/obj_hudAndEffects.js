var obj_hudAndEffects = new GameObject("obj_hudAndEffects");
obj_hudAndEffects.setDepth(-9999);

obj_hudAndEffects.player = {
	dhp: obj_player.hp,
	dmp: obj_player.mp
};

obj_hudAndEffects.ondraw = function() {
	
	if(obj_player.hp < this.player.dhp) { this.player.dhp -= 1; }
	if(obj_player.hp > this.player.dhp) { this.player.dhp += 1; }

	//Hud
	let room = game.getCurrentRoom();

	game.engine.ctx.fillStyle = "black";

	game.engine.ctx.fillRect(0,0,room.view.width, 40);

	game.engine.ctx.fillStyle = "#5BA67F";
	game.engine.ctx.strokeStyle = "#5BA67F";

	let sx = 13;
	let sy = 9;
	game.engine.ctx.fillRect(sx+2,sy+2, this.player.dhp, 18);
	game.engine.ctx.strokeRect(sx,sy, this.player.dhp+4, 22);


	//Enemy health bars
	room.getObjects("obj_enemy").forEach(enemy=>{
		
		game.engine.ctx.fillRect(-room.view.x + (enemy.x + (enemy.sprite.drawWidth / 2) - (enemy.hp)), -room.view.y + (enemy.y - 12), (enemy.hp) * 2, 6);
	});
}