var room1 = new Room("room1",1280,720,16,24, [],[], new Background("",spr_floor,true));

room1.view = {'obj': "obj_player",'x':0,'y':0,'width':640,'height':480};
var pp = new GameObject(
	"pp", 
	128, 240,
	new Sprite("spr_player","game/sprites/people.png",5*25,5*38,25,38,25,38)
);
pp.onkeypress = function(e) {
	console.log(e);
	if(e.key==("e") && game.distance(this.x,this.y,obj_player.x,obj_player.y,false) < 32) {
		
		return echo(game.choose([
			"FLOWER: Hiya.",
			"FLOWER: Being a snakey thing's not so bad.",
			"FLOWER: Need something?",
			"FLOWER: Someday I'll marry a handsome prince." 
		]),3);
	}
}

room1.addObject(obj_player);
room1.addObject(pp);
room1.addObject(obj_roomEditor);
room1.addObject(obj_hudAndEffects);
room1.gridMaps.push(game.getGridMap("gm_room"));
console.log(room1.roomObjects);
 