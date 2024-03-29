function Obj_Enemy(x,y, props={}) {

	let foe = new GameObject("obj_enemy", x, y, typeof props.sprite != "undefined" ? props.sprite : spr_badguy);
	//foe.collisionBox = [0,0,30,46]

	foe.agro = false;

	foe.playerLastX = -1;
	foe.playerLastY = -1;
	foe.collisionBox = [0,20,32,18];
	foe.tick = 0;
	foe.hp = 24;
	foe.maxHp = 24;
	foe.dmg = 5;
	foe.stats = {
		str: 3,
		agi: 3,
		const: 1,
		luck:2
	}
	foe.dhp = foe.hp;
	foe.pName = "Ghostly Fencer";

	foe.amIDead = function() {

		if(this.hp <= 0) {
			return this.destroy();
		}
	}

	foe.ai = function(spd=0) {


		this.amIDead();

		this.tick += 5 + (Math.random() * 7);
		console.log(this.tick);

		if(this.tick > 12 && (obj_player.x != this.playerLastX || obj_player.y != this.playerLastY)) {

			let croom = game.getCurrentRoom();

			this.generatePath(obj_player.x,obj_player.y,croom.gridX,croom.gridY);
 
			this.playerLastX = obj_player.x;
			this.playerLastY = obj_player.y;
		}
		if(this.tick > 12) { this.tick=0;}

		this.pathStep(spd);
	}


	foe.combat = function() {

		let dice = Math.random() * 5;

		if(dice > this.stats.luck) {

			sou_punch[Math.floor(Math.random()*sou_punch.length)].play();
			echo(this.pName + " hits you for " + Math.round(this.dmg+dice)+" dmg!")
			obj_player.hp -= this.dmg + dice;
		}
	}

	foe.ondestroy = function() {
		echo("You vanquished " + this.pName + "!")
		sou_kill_foe.play();
	}

	for(let v in props) {
		foe[v] = props[v];
	}
 
	//foe.onstep = foe.ai;
	return foe;
}