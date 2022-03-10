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

	potion.name = (ap == 0 && mp == 0 && hp == 0 ? "Useless " : "") + name;
	potion.consumable = true;
	potion.consumeEffect = {};
	potion.consumeEffect.hp = hp;
	potion.consumeEffect.mp = mp;
	potion.consumeEffect.ap = ap; 
 

	return new Item(potion);
}