let spr_floor = new Sprite("spr_floor","game/sprites/tilese2.png",99,0,32,48,32,48,.1);
let spr_floor_shadow = new Sprite("spr_floor_shadow","game/sprites/tilese2.png",165,0,32,48,32,48,.1);
let spr_wall = new Sprite("spr_wall","game/sprites/tilese2.png",0,0,32,48,32,48,.1);
let spr_wall_cave = new Sprite('spr_wall_cave',"game/sprites/tiles.png",254,32,32,48,32,48)
let spr_ceiling = new Sprite("spr_ceiling","game/sprites/tilese2.png",132,0,32,48,32,48,.1); 
let spr_ceiling_cave = new Sprite("spr_ceiling","game/sprites/tiles.png",288,32,32,48,32,48,.1); 
let spr_water = new Sprite("spr_water","game/sprites/tiles.png",[0,32],176,32,48,32,48);
new GameObject("obj_water",0,0,spr_water);