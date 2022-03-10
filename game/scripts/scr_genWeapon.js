


function genWeapon(rarity, setting, lvl) {

	let player = obj_player;
	let itemAgi = -1;
	tilset=-1;
	tileSet=-1;
	spr_bow=-1;
	spr_staff=-1;
	spr_sword=-1;
	spr_knife=-1;
	spr_hammer=-1; 

	//ADJ: DESC, SNEAK, STRENGTH, INT, THREAT ,level
var adj = [
	["PUNGEANT"		,-1,0,0,1,1],
	["LONELY"		,2,.5,0,0,1],
	["POWERFUL"		,0,1,0,1,1],
	["LESS THAN OPTIMAL",0,0,0,-1,1],
	["VENERABLE"	,0,1,0,0,1],
	["OLD FASHIONED",0,0,1,0,1],
	["OLD-SCHOOL"	,0,0,1,0,1],
	["RUNED"		,.7,.7,.7,.7,1],
	["ANCIENT"		,0,-1,1.5,0,1],
	["TRIBAL"		,0,1,0,0,1],
	["NEON"			,-1,0,0,0,1],
	["RENEWING"		,0,1,1,0,1],
	["ONCE RETIRED"	,0,0,0,-1,1],
	["GLEAMING"		,0,.5,0,1.5,1],
	["HOLY"			,-1,0,1,0,1],
	["UNHOLY"		,1,0,0,1,1],
	["MINOR"		,.4,.4,.4,.4,1],
	["INSCRIBED"	,0,0,0,1,1],
	["FAMED"		,0,1,0,1,1],
	["POWER"		,0,1,0,0,1],
	["FOOL'S"		,0,0,0,-1,1],
	["MYTHIC"		,0,0,0,2,1],
	["SHINING"		,0,0,0,.5,1],
	["OLD"			,0,-1,1.5,0,1],
	["LEGENDARY"	,0,1,0,1,1],
	["UNKNOWN"		,0,0,0,.5,1],
	["AVENGING"		,1,1,-1,1,1],
	["TERRIBLY GOOD",0,1,0,0,1],
	["LESSER"		,.5,.5,.5,.5,1],
	["LESSER"		,.5,.5,.5,.5,1],
	["LESSER"		,.5,.5,.5,.5,1],
	["LESSER"		,.5,.5,.5,.5,1],
	
	/*DESC, SNEAK, STRENGTH, INT, THREAT ,level*/
	
	["GREATER"		,2,2,2,2,3],
	["SNEAKS"		,3,0,0,0,3]
	["REMEMBERERS"	,0,0,3,0,3],
	["PEACEKEEPERS",0,2,3,2,3],
	
	["PRESTIGIOUS"	,3.5,3.5,3.5,3.5],
	["MAGRIN"		,0,0,4,0,6],
	["WARRIN"		,0,4,0,0,6],
	["THIEVES"		,4,0,0,0,6],
	["FINDERS"		,1,3,2,2,6],
	
	["EMPORERS"	,6,6,6,6,10]
	
];

var randomNameGenerator = [
	["RO","MER","HA","NO","SO","NER","IF","ITH","DITH","GO","OL","DJ","RO"],
	["HOA","IA","TRA","VA","TH","OL","GON","GEN","IN"],
	["DO","MEIR","SEN","ER"]
]

//Material fname, efficacy
var mat = [
	["WOODEN",1],
	["RUSTED",1],
	["GOLD",4],
	["IRON",5],
	["JELLO",7],
	["ICE",9],
	["ADOBE",3],
	["BRONZE",7],
	["GLASS",12],
	["SILVER",16],
	["MYTHRIL",23]
];

//weapon fname, type (0r,1m), icon
var fname = [
	["SWORD",0,spr_sword],
	["SCREW-DRIVER",0,spr_sword],
	["CROWBAR",0,spr_sword],
	["MALLET",0,spr_hammer],
	["HAMMER",0,spr_hammer],
	["DIRK",0,spr_knife],
	["LONG SWORD",0,spr_sword],
	["SHORT STAFF",0,spr_staff],
	["QUARTER STAFF",0,spr_staff],
	["3/4s STAFF",0,spr_staff],
	["KNIFE",0,spr_knife],
	["DAGGER",0,spr_knife],
	["BOW",1,spr_bow],
	["FLINTLOCK",1,spr_sword],
	["BOOMERANG",1,spr_knife],
	["CROSSBOW",1,spr_bow],
	["DART",1,spr_knife],
	["THROWING KNIVES",1,spr_knife]
];

//BUFFS AND EFFECTS!
/*
//
//-1: None
// 0: Fire damage, two rolls
// 1: 1 point life steal
// 2: 1 point heal
// 3: stun
// 4: 1/8 chance polymorph
// 5: Will save you at low health
// 6: +level str
// 7: 1/32 chance instant kill
*/
//OF WHAT NAPOLEON?
/*
var of = [
	["OF OGON",4],
	["OF THE MOUNTAIN",3],
	["OF THE LOST",5],
	["OF NAZARETH",2],
	["OF MORITANIA",],
	["OF THE CURSED",1],
	["OF RIGHTEOUSNESS",2],
	["OF FURY",6],
	["OF INSANITY",4],
	["OF COURAGE",5],
	["OF ZEAL",6],
	["OF THE EMPORER",3],
	["OF OMAN",0],
	["OF WONDER",3],
	["OF FIRE",0],
	["OF D'AMIR",-1],
	["OF THE FORGOTTEN",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1],
	["",-1]
	
];*/
//^^...of whatever I feel like, gosh!

	let tileset = "";
	setting = tileSet;
	
	//Ah yis this be da script where we be makin' items n shee
	var radj = Math.floor(Math.random() * adj.length);
	
	while(adj[radj][5] > rarity) {radj = Math.floor(Math.random() * adj.length);}
	var rmat = Math.floor(Math.random() * mat.length);
	while(mat[rmat][1] > rarity) {rmat = Math.floor(Math.random() * mat.length);}
	var rname = Math.floor(Math.random() * fname.length);
	//var rof = Math.floor(Math.random() * of.length);
	var rof = ["",""];
	if(tileSet == "forest") { rof = ["OF THE FOREST","ENTANGLED"]}
	if(tileSet == "frozen") { rof = ["OF COLD","SLOWED"]}
	if(tileSet == "badlands") { rof = ["OF THE BADLANDS","POISONED"]}
	if(tileSet == "cavern") { rof = ["OF THE CAVES","TODO"]}
	if(tileSet == "DwarfCity") { rof = ["OF THE DWARVES","TODO"]}
	var itemName = "THE " + adj[radj][0]  + " " + mat[rmat][0] + " " + fname[rname][0] + " " + rof[0];
	if(itemName[itemName.length-1] ==" " ) { itemName = itemName.substring(0,itemName.length-1); }
	var itemStr = 0;
	var itemInt = 0;
	var itemSne = 0;
	var itemThr = 0;
	var itemRange = 0;
	
	itemSne += (adj[radj][1]) + Math.floor(Math.random() * player.level/2) + player.level/2;
	itemInt += (adj[radj][3]) + Math.floor(Math.random() * player.level/2) + player.level/2; 
	itemThr += (adj[radj][4]) + Math.floor(Math.random() * player.level/2) + player.level/2; 
	if(fname[rname][1] == 1) {
		itemRange += ((adj[radj][4]) + Math.floor(Math.random() * player.level/2) + player.level/2) + mat[rmat][1]; 
		itemStr = 0;
	}
	else {
		itemRange = 0;
		itemStr += ((adj[radj][2]) + Math.floor(Math.random() * player.level/2) + player.level/2) + mat[rmat][1]; 
	}
	
	var effect = rof[0];
	var cursed = game.irandom(0,100) < 5;
	
	let item = new Weapon({
		"name": itemName,
		"type":"weapon",
		"ranged": itemRange > 0,
		"stats": {
			agi: itemAgi,
			str: itemStr,
			int: itemInt,
			sneak: itemSne,
			cons: 0
		},
		"effect": effect,
		"cursed": cursed
	});
	
	player.inventory.push(item);
	
	return itemName;
}