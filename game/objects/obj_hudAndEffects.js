var obj_hudAndEffects = new GameObject("obj_hudAndEffects");
obj_hudAndEffects.setDepth(-9999);

obj_hudAndEffects.player = {
	dhp: obj_player.hp,
	dmp: obj_player.mp
};

obj_hudAndEffects.onroomstart = function() {
	console.log('running');
	let map = [];
	this.dmap=[];
	for(let y = 0; y < room1.height/48; y++) {
		map[y] = [];
		this.dmap[y]=[];
		for(let x = 0; x < room1.width/32; x++) {
			map[y][x] = room1.getObjectsAt(1+(x*32),1+(y*48),true,0,0).length>0?"A":" ";
			this.dmap[y][x] = [false,"black"];
		}
	}
	console.log(map,this.dmap)
	this.map = map;
}


obj_hudAndEffects.ondraw = function() {
	
	let room = game.getCurrentRoom();

	for(let y = 0; y < this.dmap.length; y++) {
		for(let x = 0; x < this.dmap[y].length; x++) {

			if(this.dmap[y][x][1] !== -1) {

				if(game.engine.ctx.fillStyle != this.dmap[y][x][1]) { game.engine.ctx.fillStyle =  this.dmap[y][x][1]; } 
				game.engine.ctx.fillRect(-room.view.x + (x*32),-room.view.y + (y*48),32,48);
			}	
		}
	}

	if(obj_player.hp < this.player.dhp) { this.player.dhp -= Math.abs(this.player.dhp-obj_player.hp)/5; }
	if(obj_player.hp > this.player.dhp) { this.player.dhp += Math.abs(this.player.dhp-obj_player.hp)/5; }

	//Hud

	//Black hud bar
	game.engine.ctx.fillStyle = "black";
	game.engine.ctx.fillRect(0,0,room.view.width, 40);

	//game.engine.ctx.fillStyle = 'white';
	//game.engine.ctx.fillText("PRESS K TO ATTACK, I FOR INVENTORY.",280, 32);

	game.engine.ctx.fillStyle = "#5BA67F";
	game.engine.ctx.strokeStyle = "#5BA67F";

	let sx = 13;
	let sy = 9;
	game.engine.ctx.fillRect(sx+2,sy+2, this.player.dhp, 18);
	game.engine.ctx.strokeRect(sx,sy, 100+4, 22);


	//Enemy health bars
	room.getObjects("obj_enemy").forEach(enemy=>{
		
		if(game.mDistance(obj_player.x,obj_player.y,enemy.x,enemy.y) < 6*32) {  
			game.engine.ctx.strokeStyle = "black";
			game.engine.ctx.strokeRect(-room.view.x + (enemy.x + (enemy.sprite.drawWidth / 2) - (enemy.hp)), -room.view.y + (enemy.y - 12), (enemy.hp) * 2, 6);
			game.engine.ctx.fillRect(-room.view.x + (enemy.x + (enemy.sprite.drawWidth / 2) - (enemy.hp)), -room.view.y + (enemy.y - 12), (enemy.hp) * 2, 6);	
		} 
		
	});

	game.engine.ctx.fillStyle = 'black';


}

obj_hudAndEffects.onkeypress = function(ev) {

	for(let y = 0; y < this.map.length; y++) {

		if(typeof(this.dmap[y]) == 'undefined') {this.dmap[y]=[];}

		for(let x = 0; x < this.map[y].length; x++) {

			let sx = x; 
			let sy = y;
			let px = Math.round(obj_player.x/32);
			let py = Math.round(obj_player.y/48);
 
			let distance = game.mDistance(sx,sy,px,py);
			let inRange = distance < 6;
			let discovered = this.dmap[y][x][0];  
			let accessible = true;

			for(let panic = 0; panic < 40; panic++) {

				if(px > sx) { sx++; }
				if(py > sy) { sy++; }
				if(px < sx) { sx--; }
				if(py < sy) { sy--; }

				if(this.map[sy][sx] != " ") { accessible=false; break; }
				if(sx==px && sy==py) { break; }
				
				if(panic>=38) { console.log('panic') }
			}

			let color = -1;
			if(accessible || discovered) { 

				let c = Math.min(1,distance/12);
				if(inRange) { color = -1; }
				else { color = "rgba(0,0,0,"+c+")"; }

				this.dmap[y][x][0] = true;
			}
			else {
				color = "black";
			}
			

			this.dmap[y][x][1] = color;
			//if(!accessible) { game.engine.ctx.fillRect(-room.view.x + (x*32),-room.view.y + (y*48),32,48); }
		}
	}
}

obj_hudAndEffects.onmousedown = obj_hudAndEffects.onkeypress;