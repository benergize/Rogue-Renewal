function Item(props) {

	this.name = "";
	this.type = ["misc","potion","weapon","treasure","gear"][0];
	
	this.cursed = false;

	this.consumable = false;
	this.consumeEffect = {
		"hp":0,
		"mp":0,
		"ap":0
	};

	this.useSpecial = -1;
	this.uses = 1;

	this.use = function() {

		if(!this.consumable) { return false; }

		if(this.useSpecial !== -1) { this.useSpecial(); }

		obj_player.hp += this.consumeEffect.hp;
		obj_player.mp += this.consumeEffect.mp;
		obj_player.ap += this.consumeEffect.ap;  

		this.uses--;
		if(this.uses < 1) { obj_player.inventory.removeItem(this.id); }
	}


	this.ranged = ["melee","ranged"][0];
	this.dmg = 1;
	this.specials = [];
	this.stats = {
	
		agi: 0,
		str: 0,
		int: 0,
		sneak: 0,
		cons: 0
	};


	this.equipable = false;
	this.equipSlot = [
		"head",
		"legs",
		"shoulders",
		"ring1",
		"ring2",
		"hands",
		"body",
		"neck",
		"weapon",
		"attuned1",
		"attuned2",
		"attuned3"][0];

	this.equip = function() {
		if(!this.equipable) { return false; }
		obj_player.vars.slots[this.equipSlot] = this.id;
	}

	
	this.id = game.generateID();

	
	for(let v in props) { 
		if(typeof props[v] != "object") { this[v] = props[v]; }
		else { this[v] = {}; for(let vv in props[v]) { this[v][vv] = props[v][vv] } }
	}

	return this;
}