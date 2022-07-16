var obj_player = new GameObject(
	"obj_player", 
	128, 240, 
	-1,
	-1,
	-1,
	-1,
	true,
	true,
	[1,24,24,11],
	-1
);
obj_player.vars.sprite = new Sprite("spr_player","game/sprites/people.png",-1,0,25,38,25,38);
obj_player.pname = "Darius Wildwand";
obj_player.gold = 0;
obj_player.class = "Explorer"
obj_player.hp = 100;
obj_player.maxHp=100;
obj_player.level = 1;
obj_player.stats = {
	
	agi: 5,
	str: 8,
	int: 5,
	sneak: 5,
	cons: 5
};
obj_player.vars.worldCoords = [255,255];
obj_player.vars.slots = {
	"head": -1,
	"legs":-1,
	"shoulders":-1,
	"ring1":-1,
	"ring2":-1,
	"hands":-1,
	"body":-1,
	"neck":-1,
	"weapon":-1,
	"attuned1":-1,
	"attuned2":-1,
	"attuned3":-1
};
obj_player.vars.dx = obj_player.x;
obj_player.vars.dy = obj_player.y;

obj_player.vars.inhand = -1;
obj_player.ondraw = function() {
	this.vars.sprite.draw(this.x,this.y);
}
obj_player.onroomstart = function() {

	this.vars.dx = this.x;
	this.vars.dy = this.y;
}
obj_player.onstep = function() {
	let dxd = Math.abs(this.vars.dx-this.x);
	if(this.vars.dx < this.x) { this.vars.dx+=dxd/2; }
	if(this.vars.dx > this.x) { this.vars.dx-=dxd/2; }
	if(Math.abs(this.vars.dx-this.x) < 5) { this.vars.dx = this.x; }
	
	let dyd = Math.abs(this.vars.dy-this.y);
	if(this.vars.dy < this.y) { this.vars.dy+=dyd/2; }
	if(this.vars.dy > this.y) { this.vars.dy-=dyd/2; }
	if(Math.abs(this.vars.dy-this.y) < 5) { this.vars.dy = this.y; }
}
obj_player.inventory = {
	contents: [],
	getItems: function(mapOnly=false) {

		if(mapOnly) { return this.contents.map(obj=>{ return this.name; }); }
		else { return this.contents; }
	},
	addItem: function(item) {
		
		if(typeof item !== "object") { return false; }

		this.contents.push(item);

		if(obj_player.vars.inhand == -1) { obj_player.vars.inhand = 0; }

		return true;
	},
	getItem: function(item) {
 
		for(let i = 0; i < this.contents.length; i++) {

			if(this.contents[i][typeof item === "string" ? "name" : "id"] === item) { return this.contents[i]; }
		}

		return false;
	},
	removeItem: function(item) {

		let th = this;

		let newInvArray = this.contents.filter(obj=>{ return obj[typeof item === "string" ? "name" : "id"] != item; });
		this.contents = newInvArray;

		console.log(obj_player.vars.inhand, this.contents.length);
		if(obj_player.vars.inhand > this.contents.length-1) { obj_player.vars.inhand = this.contents.length-1; }

		return true;
	}
};
obj_player.inventory.push = obj_player.inventory.addItem;

obj_player.onmousedown = function(ev) {

	console.log(ev);

	let x = ev.layerX;
	let y = ev.layerY;
	console.log(x,y);

	if(x > game.engine.canvas.width/2) { obj_player.onkeydown({"key":"d"}); }
	if(x < game.engine.canvas.width/2) { obj_player.onkeydown({"key":"a"}); }
	if(y < game.engine.canvas.height/2) { obj_player.onkeydown({"key":"w"}); }
	if(y > game.engine.canvas.height/2) { obj_player.onkeydown({"key":"s"}); }

	game.getCurrentRoom().getObjectsAt(obj_player.x, obj_player.y+obj_player.collisionBox[1], false, obj_player.collisionBox[2], obj_player.collisionBox[3]).forEach(obj=>{

		if(game.mDistance(obj_player.x,obj_player.y,obj.x,obj.y) < 32) {
			
			if(obj.name == "obj_enemy") { obj_player.onkeydown({"key":"k"}); }
			if(obj.name == "obj_pickup") { obj_player.onkeydown({"key":"e"}); }
		}
	});
}

obj_player.onkeydown = function(ev) {

	let cr = game.getCurrentRoom();

	if(cr.getObject("obj_fireball_helper") !== false) { return; }

	if(ev.key == "[" || ev.key == "]" && this.inventory.contents.length > 0) {

		this.vars.inhand = ev.key == "[" ? ( this.vars.inhand <= 0 ? this.inventory.contents.length -1 : this.vars.inhand-1 ) : ( this.vars.inhand == this.inventory.contents.length-1 ? 0 : this.vars.inhand+1 );
	}
	
	if(ev.key == "u" && this.vars.inhand != -1 && !cr.getObject("obj_fire")) {
		obj_player.inventory.contents[this.vars.inhand].use(); 
	}

	//console.log(this); 

	let cb = this.collisionBox;
	let prevPos = this.x + ',' + this.y;

	if(ev.key == "a" && cr.checkEmpty(-16 + this.x + cb[0], this.y + cb[1], true, cb[2], cb[3])) { this.x -= 16; } 
	if(ev.key == "d" && cr.checkEmpty( 16 + this.x + cb[0], this.y + cb[1], true, cb[2], cb[3])) { this.x += 16; } 
	if(ev.key == "w" && cr.checkEmpty( this.x + cb[0],-12 + this.y + cb[1], true, cb[2], cb[3])) { this.y -= 12; } 
	if(ev.key == "s" && cr.checkEmpty( this.x + cb[0], 12 + this.y + cb[1], true, cb[2], cb[3])) { this.y += 12; }

	let x = this.x;
	let y = this.y;
	if(x < 0 || x > cr.width || y < 0 || y >= cr.height) {


		console.log(this.x,this.y);

		if(this.x > cr.width) { this.x = 4; this.vars.worldCoords[0]++; }
		else if(this.x < 0) { this.x = cr.width - 56; this.vars.worldCoords[0]--; }
		if(this.y < 0) { this.y = cr.height - 56; this.vars.worldCoords[1]--;}
		else if(this.y > cr.height) { this.y = 0; this.vars.worldCoords[1]++; }
		
		//this.x = x < 0 ? cr.width-32 : (x > cr.width ? 32 : x);
		//this.y = y < 0 ? cr.height-48 : (y > cr.height ? 48 : y);
		
		console.log(this.x,this.y);

		this.snapToGrid(16,48);
		console.log(this.x,this.y);

		if(typeof persistentRooms[this.vars.worldCoords[0] + "," + this.vars.worldCoords[1]] == "undefined") {
			pcg_cave(false);
		}
		else {
			game.setCurrentRoom(persistentRooms[this.vars.worldCoords[0] + "," + this.vars.worldCoords[1]]);

			let cols = this.getCollisions(true);
			cols.forEach(obj=>{
				if(obj.name == "obj_wall") { obj.destroy(); }
			});
		}

		//this.x+=4;
	}

	
	if(prevPos !== this.x + ',' + this.y) { sou_footstep[Math.floor(Math.random()*sou_footstep.length)].play(.1);  }

	let cols = cr.getObjectsAt(this.x,this.y,false,32,48);

	cols.forEach(obj=>{

		if(ev.key == "e") { 
		

			if(obj.name == "obj_pickup" && !obj.opened) { obj.open(); }
			if(obj.name == "obj_door") { obj.open(); }
		}


		if(obj.name == "obj_enemy") {

			obj.combat();

				
			if(ev.key == "k") {

				let dice = Math.random() * 6;

				if(dice + this.stats.agi > obj.stats.agi + obj.stats.luck) {
		
					obj.hp -= this.stats.str + dice;
					
					echo("You hit the " + obj.pName + " for " + Math.round(this.stats.str + dice) + " dmg!");

					//sou_punch[Math.floor(Math.random()*sou_punch.length)].play();
					sou_damage_foe.play();
				}
				
			}
		}
	}); 

	

	game.getCurrentRoom().getObjects("obj_enemy").forEach(e=>{e.ai(0);})


} 