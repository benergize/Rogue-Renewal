function Obj_Potion(hp, mp, ap) {

	let potion = {}

	let name = "Potion";

	mp = Math.random() > .5 ? Math.round(mp) : 0;
	ap = Math.random() > .5 ? Math.round(ap) : 0;
	hp = Math.random() > .5 ? Math.round(hp) : 0;

	if(hp < 0) { name = "Poison"; }
	else if(hp > 0) { name = "Healing Potion"; }

	if(mp < 0) { name = "Depleting " + name; }
	else if(mp > 0) { name = "Renewing " + name; }

	if(ap < 0) { name += " of Sapping"; }
	if(ap > 0) { name += " of Refreshing"; }

	potion.name = name;
	potion.effect = {};
	potion.effect.hp = hp;
	potion.effect.mp = mp;
	potion.effect.ap = ap;
	potion.id = game.generateID();

	potion.use = function() {
		obj_player.hp += this.effect.hp;
		obj_player.mp += this.effect.mp;
		obj_player.ap += this.effect.ap;

		obj_player.inventory.removeItem(this.id);
	}

	return potion;
}