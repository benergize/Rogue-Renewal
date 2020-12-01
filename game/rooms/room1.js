var room1 = new Room("room1",1280,720,16,24, [],[], new Background("",spr_floor,true));

room1.view = {'obj': "obj_player",'x':0,'y':0,'width':640,'height':480};

room1.addObject(obj_player);
room1.addObject(obj_roomEditor);
room1.addObject(obj_hudAndEffects);
console.log(room1.roomObjects);

game.addRoom(room1);