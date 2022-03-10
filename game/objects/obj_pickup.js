function Obj_Pickup(x,y,sprite = spr_chest) {

	let pickup = new GameObject("obj_pickup",x,y,sprite);

	pickup.ondestroy = function() {
		sou_foundSomethingSm.play();
		return true;
	}

	pickup.opened = false;
	pickup.scroll = true;//Math.random() > .1;

	if(pickup.scroll) {
		
		pickup.item = genScroll();
		pickup.sprite = spr_scroll;
	}

	pickup.open = function() {

		if(!this.scroll) {

		
			this.sprite = spr_chest_open;
			this.opened = true;

			let roll = Math.random() * 100; 
			this.item = -1;

			if(roll > 90) {
				sou_foundSomethingMd.play(); 
				this.item = genWeapon(1);
				obj_player.inventory.addItem(this.item);

			}
			else if(roll > 30) { 
				sou_foundSomethingSm.play(); 
				this.item = new Obj_Potion(Math.random()*20, Math.random()*20, Math.random() * 20)
				obj_player.inventory.addItem(this.item);
			}

			if(this.item === -1) {
				sou_emptyChest.play();
			}
		}
		else {
			obj_player.inventory.addItem(this.item);
			sou_foundSomethingMd.play(); 
			this.destroy();
		}

		return echo("Found " + (typeof this.item.name != "undefined" ? this.item.name + "." : " some gold!"),3);


	}
	

	pickup.depth = -y;

	return pickup;
}

