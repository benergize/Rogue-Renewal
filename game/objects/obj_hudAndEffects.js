var obj_hudAndEffects = new GameObject("obj_hudAndEffects");
obj_hudAndEffects.setDepth(-9999);

obj_hudAndEffects.player = {
	dhp: obj_player.hp,
	dmp: obj_player.mp
};

obj_hudAndEffects.ui = {
	x: 64,
	y: -720,
	width:640-128,
	height:480-128,
	open:0,
	toggle: function() {
		if(this.open === 0) { this.show(); }
		if(this.open === 1) { this.hide();  }
	},
	show: function() {
		this.y += 4;
		if(this.y < 64) { this.open = .5; setTimeout(function(){obj_hudAndEffects.ui.show()},1); }
		else { this.open = 1; }
	},
	hide: function() {
		this.y -= 4;
		if(this.y > -720) { this.open = .5; setTimeout(function(){obj_hudAndEffects.ui.hide()},1); }
		else { this.open = 0; }
	},
	draw: function() {
		if(this.open > 0) {

			game.engine.ctx.fillRect(this.x,this.y,this.width,this.height);
			game.engine.ctx.strokeStyle = '#5674bd';
			game.engine.ctx.strokeRect(this.x,this.y,this.width,this.height);
			game.engine.ctx.strokeRect(this.x+4,this.y+4,this.width-8,this.height-8);
			game.engine.ctx.fillStyle = "white";

			//Draw player name, level and class
			game.engine.ctx.fillText(`${obj_player.name} - Level ${obj_player.level} ${obj_player.class}`, this.x+24,this.y+32);

			//HP,MP,
			game.engine.ctx.fillText(`HP: ${Math.round(obj_hudAndEffects.player.dhp)}/${obj_player.maxHp} | MP: 100/100`,this.x+24,this.y+48);

			//Right hand side divider
			let dx = this.x+340;
			game.engine.ctx.strokeRect(dx,this.y+48,1,this.height-96);
			game.engine.ctx.strokeRect(409+16,this.y+207-48,128,1);
			
			let br = this.y + 64;
			let brs = 18;
			game.engine.ctx.fillText(`AGI: ${obj_player.stats.agi}`, dx+24, br ); br += brs;
			game.engine.ctx.fillText(`STR: ${obj_player.stats.str}`, dx+24, br ); br += brs;
			game.engine.ctx.fillText(`SNE: ${obj_player.stats.sneak}`, dx+24, br ); br += brs;
			game.engine.ctx.fillText(`CON: ${obj_player.stats.cons}`, dx+24, br ); br += brs;
			game.engine.ctx.fillText(`INT: ${obj_player.stats.int}`, dx+24, br ); br += brs;

		}
	}
};

obj_hudAndEffects.onroomstart = function() {
	 
	this.generateGraph();
	game.engine.ctx.font = "12px Monospace";
}

obj_hudAndEffects.generateGraph = function() {
	let map = [];
	this.dmap=[];
	let croom = game.getCurrentRoom();
	for(let y = 0; y < croom.height/48; y++) {
		map[y] = [];
		this.dmap[y]=[];
		for(let x = 0; x < croom.width/32; x++) {
			map[y][x] = croom.getObjectsAt(1+(x*32),1+(y*48),true,0,0).length>0?"A":" ";

			//Discovered, current color, objective color (1=black, 0 = transparent)
			this.dmap[y][x] = [false, 1, 1];
		}
	} 
	this.map = map;
	this.computeShadows();
}


obj_hudAndEffects.ondraw = function() {
	
	let room = game.getCurrentRoom();


	for(let y = 0; y < this.dmap.length; y++) {
		for(let x = 0; x < this.dmap[y].length; x++) {

			if(this.dmap[y][x][1] < this.dmap[y][x][2]) { this.dmap[y][x][1]+=.2; }
			else if(this.dmap[y][x][1] > this.dmap[y][x][2]) { this.dmap[y][x][1]-=.2; }
			if(Math.abs(this.dmap[y][x][1]-this.dmap[y][x][2]) < .2) { this.dmap[y][x][1] = this.dmap[y][x][2]; }

			if(this.dmap[y][x][1] != 0) {

				if(game.engine.ctx.fillStyle != this.dmap[y][x][1]) { game.engine.ctx.fillStyle = "rgba(0,0,0, "+ this.dmap[y][x][1] + ")"; } 
				game.engine.ctx.fillRect(-room.view.x + (x*32),-room.view.y + (y*48),32,48);
			}	
		}
	}

	if(obj_player.hp < this.player.dhp) { this.player.dhp -= Math.abs(this.player.dhp-obj_player.hp)/5; }
	if(obj_player.hp > this.player.dhp) { this.player.dhp += Math.abs(this.player.dhp-obj_player.hp)/5; }

	
	this.ui.draw();

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

	let inv = obj_player.inventory.contents;
	let inhand = obj_player.vars.inhand;
	let invText = 
		(inv.length == 0 ? "INVENTORY EMPTY" : "ITEMS HAVE: " + inv.length) + "\n" + 
		(inhand != -1 ? 
			"EQUIPPED: " + inv[inhand].name + " | " + 
			(inv[inhand].type == "spell" ? inv[inhand].uses + " USES REMAIN" :
			( inv[inhand].consumable ? 
				inv[inhand].consumeEffect.hp + "hp " + 
				inv[inhand].consumeEffect.mp + "mp " + 
				inv[inhand].consumeEffect.ap + "ap" : ""))
		: "")
	;
	
	invText.split("\n").forEach(function (el,ind) {
		game.engine.ctx.fillText(el,sx+120,sy+10+ ( ind * 12));
	});

	//Enemy health bars
	room.getObjects("obj_enemy").forEach(enemy=>{
		
		if(game.mDistance(obj_player.x,obj_player.y,enemy.x,enemy.y) < 6*32) {  

			if(enemy.dhp > enemy.hp) { enemy.dhp -= Math.abs(enemy.dhp-enemy.hp)/2; }

			game.engine.ctx.strokeStyle = "black";
			game.engine.ctx.strokeRect(-room.view.x + (enemy.x + (enemy.sprite.drawWidth / 2) - (enemy.dhp)), -room.view.y + (enemy.y - 12), (enemy.dhp) * 2, 6);
			game.engine.ctx.fillRect(-room.view.x + (enemy.x + (enemy.sprite.drawWidth / 2) - (enemy.dhp)), -room.view.y + (enemy.y - 12), (enemy.dhp) * 2, 6);	
		} 
		
	});

	game.engine.ctx.fillStyle = 'black';


}

obj_hudAndEffects.onkeypress = function(e){
	this.computeShadows();

	if(e.key === "i") { this.ui.toggle(); }
}

obj_hudAndEffects.computeShadows = function() {

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

				if(typeof this.map[sy] == "undefined" || this.map[sy][sx] != " ") { accessible=false; break; }
				if(sx==px && sy==py) { break; }
				
				if(panic>=38) { console.log('panic') }
			}

			let color = -1;
			if(accessible || discovered) { 

				let c = Math.min(1,distance/12);
				if(inRange) { color = 0; }
				else { color = c; }

				this.dmap[y][x][0] = true;
			}
			else {
				color = 1;
			}
			

			this.dmap[y][x][2] = color;
			//if(!accessible) { game.engine.ctx.fillRect(-room.view.x + (x*32),-room.view.y + (y*48),32,48); }
		}
	}
}

obj_hudAndEffects.onmousedown = obj_hudAndEffects.onkeypress;