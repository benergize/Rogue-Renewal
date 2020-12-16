var obj_player = new GameObject(
	"obj_player", 
	128, 240, 
	new Sprite("spr_player","game/sprites/people.png",0,0,25,38,25,38),
	-1,
	-1,
	-1,
	true,
	true,
	[1,24,24,11],
	-1
);
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

obj_player.inventory = {
	contents: [],
	getItems: function(mapOnly=false) {

		if(mapOnly) { return this.contents.map(obj=>{ return this.name; }); }
		else { return this.contents; }
	},
	addItem: function(item) {
		
		if(typeof item !== "object") { return false; }

		this.contents.push(item);
		return true;
	},
	getItem: function(item) {
 
		for(let i = 0; i < this.contents.length; i++) {

			if(this.contents[i][typeof item === "string" ? "name" : "id"] === item) { return item; }
		}

		return false;
	},
	removeItem: function(item) {

		let newInvArray = this.contents.filter(obj=>{ return this.obj[typeof item === "string" ? "name" : "id"] != item; });
		this.contents = newInvArray;
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
	
	//console.log(this); 

	let cr = game.getCurrentRoom();
	let cb = this.collisionBox;
	let prevPos = this.x + ',' + this.y;

	if(ev.key == "a" && cr.checkEmpty(-16 + this.x + cb[0], this.y + cb[1], true, cb[2], cb[3])) { this.x -= 16; } 
	if(ev.key == "d" && cr.checkEmpty( 16 + this.x + cb[0], this.y + cb[1], true, cb[2], cb[3])) { this.x += 16; } 
	if(ev.key == "w" && cr.checkEmpty( this.x + cb[0],-12 + this.y + cb[1], true, cb[2], cb[3])) { this.y -= 12; } 
	if(ev.key == "s" && cr.checkEmpty( this.x + cb[0], 12 + this.y + cb[1], true, cb[2], cb[3])) { this.y += 12; }

	let x = this.x;
	let y = this.y;
	if(x < 0 || x > cr.width || y < 0 || y > cr.height) {


		console.log(this.x,this.y);

		if(this.x > cr.width) { this.x = 4; }
		else if(this.x < 0) { this.x = cr.width - 56; }
		if(this.y < 0) { this.y = cr.height - 56; }
		else if(this.y > cr.height) { this.y = 0; }
		
		//this.x = x < 0 ? cr.width-32 : (x > cr.width ? 32 : x);
		//this.y = y < 0 ? cr.height-48 : (y > cr.height ? 48 : y);
		
		console.log(this.x,this.y);

		this.snapToGrid(16,48);
		console.log(this.x,this.y);

		pcg_cave(false);

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

					sou_punch[Math.floor(Math.random()*sou_punch.length)].play();
				}
				
			}
		}
	}); 

	

	room1.getObjects("obj_enemy").forEach(e=>{e.ai(0);})


} 