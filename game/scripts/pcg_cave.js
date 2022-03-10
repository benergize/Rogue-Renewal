function pcg_cave(movePlayer=true) {
	
	let room = new Room(game.generateID(),1280,720,16,24, [],[], new Background("",spr_floor,true));
	room.view = {'obj': "obj_player",'x':0,'y':0,'width':640,'height':480};
	
	room.addObject(obj_player);
	room.addObject(obj_hudAndEffects);

	game.setCurrentRoom(room);

	lines = [];
	points = [];

	if(!movePlayer) {
	
		lines.push([obj_player.x,obj_player.y,game.snap(game.irandom(1280),32),obj_player.y]);
		lines.push([obj_player.x,obj_player.y,obj_player.x,game.snap(game.irandom(720),48)]);
		console.log(lines);
	}

	for(let f = 0; f < 25; f++) {
		
		let x1 = game.snap(game.irandom(1280),32);
		let x2 = game.snap(game.irandom(1280),32);
		let y1 = game.snap(game.irandom(720),48);
		let y2 = y1;
	
		lines.push([x1,y1,x2,y2]);
	}
	
	for(let f = 0; f < 25; f++) {
		
		let x1 = game.snap(game.irandom(1280),32);
		let x2 = x1;
		let y1 = game.snap(game.irandom(720),48);
		let y2 = game.snap(game.irandom(720),48);
	
		lines.push([x1,y1,x2,y2]);
	}
	lines.forEach(line=>{
		let x = line[0];
		let y = line[1];
		let f = 0;

		let roll = Math.round(Math.random()*20);
		if(roll < 3) { room.roomObjects.push(new Obj_Pickup(x,y)); }
		else if(roll > 19) { room.roomObjects.push(new Obj_Enemy(Math.round(x/32)*32,Math.round(y/48)*48)); }

		while((x != line[2] || y != line[3]) && f < 50) {

			points.push(x+","+y);
			points.push(x+","+(y+1));
			points.push((x+1)+","+y);

			x += 32 * (x==line[2] ? 0 : (line[2] > line[0] ? 1 : -1));
			y += 48 * (y==line[3] ? 0 : (line[3] > line[1] ? 1 : -1));
			f++;
		}
	});
	
	for(let x = 0; x < 1280; x += 32) {
		for(let y = 0; y < 720; y+=48){ 
			if(points.indexOf(x+","+y) == -1 && game.mDistance(x,y,obj_player.x,obj_player.y) > 48) {
				room.roomObjects.push(new Obj_Wall(x,y))
			}
		}
	}
	
	obj_player.x = lines[0][0];
	obj_player.y = lines[0][1] - 4;
	obj_player.setDepth(-9999);
	
	room.generateNodes();
	obj_hudAndEffects.generateGraph(); 

	persistentRooms[obj_player.vars.worldCoords[0] + "," + obj_player.vars.worldCoords[1]] = room;
}