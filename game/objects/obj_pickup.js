function Obj_Pickup(x,y,sprite = new Sprite("spr_pickup","game/sprites/items.png",352,234, 32,48,32,48)) {

	let pickup = new GameObject("obj_pickup",x,y,sprite);

	pickup.ondestroy = function() {
		sou_foundSomethingSm.play();
		return true;
	}

	this.opened = false;

	pickup.open = function() {

	
		this.sprite.sheetX += 32;
		this.opened = true;

		let roll = Math.random() * 100; 
		let item = -1;

		if(roll < 30) { 
			sou_foundSomethingSm.play(); 
			item = new Obj_Potion(Math.random()*20, Math.random()*20, Math.random() * 20)
			obj_player.inventory.push(item);
		}

		if(item === -1) {
			sou_emptyChest.play();
		}

		return echo("Found " + (typeof item.name != "undefined" ? item.name + "." : " nothing."),3);


	}

	pickup.depth = -y;

	return pickup;
}

