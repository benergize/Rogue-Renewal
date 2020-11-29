function echo(txt,time=3) {

	let text = new GameObject("obj_echo",30,440);
	text.fadeOut = false;
	text.alpha = 1;
	text.ondraw = function() {
 
		if(this.fadeOut) {
			this.alpha -= .05;
			if(this.alpha <= 0) { this.destroy(); }
		}
		game.engine.ctx.font = '13px Georgia';
		game.engine.ctx.fillStyle = 'rgba(0,0,0,' + this.alpha + ")";
		game.engine.ctx.fillText(txt, this.x+2, this.y+3);
		game.engine.ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ")";
		game.engine.ctx.fillText(txt, this.x, this.y);

	}
	text.depth = -999999999;

	setTimeout(function(){ text.fadeOut = true;}, time * 1000, text);

	game.getCurrentRoom().getObjects("obj_echo").forEach(obj=>{obj.y -= 30;});

	return game.getCurrentRoom().addObject(text);
}