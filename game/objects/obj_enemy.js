function Obj_Enemy(x,y) {

	let foe = new GameObject("obj_enemy", x, y, spr_badguy);
	//foe.collisionBox = [0,0,30,46]

	foe.agro = false;

	foe.playerLastX = -1;
	foe.playerLastY = -1;
	foe.collisionBox = [0,20,32,18];


	foe.ai = function(spd=3) {

		if(obj_player.x != this.playerLastX || obj_player.y != this.playerLastY) {


			let croom = game.getCurrentRoom();

			this.generatePath(obj_player.x,obj_player.y+24,croom.gridX,croom.gridY);

			console.log('newpath',this.path);
			this.playerLastX = obj_player.x;
			this.playerLastY = obj_player.y;
		}

		this.pathStep(spd);
	}

	foe.onstep = foe.ai;
	return foe;
}