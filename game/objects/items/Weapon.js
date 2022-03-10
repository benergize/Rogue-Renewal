function Weapon(props) {

	let weapon = new Item({"type": "weapon", "equipable":true, "equipSlot":"weapon"}); 

	for(let v in props) { 
		if(typeof props[v] != "object") { weapon[v] = props[v]; }
		else { weapon[v] = {}; for(let vv in props[v]) { weapon[v][vv] = props[v][vv] } }
	}

	return weapon;
}