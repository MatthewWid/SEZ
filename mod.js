/*
	
	S.E.Z. - SifiGame EZ
	
	This mod was produced and developed by Matthew W.
	Intended for use in the game "SifiGame" by Jack R.
	
	My Website: http://www.mattshub.com
	Sifi Game on Github: https://github.com/nugyflex/sifigame
	
*/

// Config Vars
var minimap_icon_size = 2;
	minimap_icon_color_enemy = "red";
	minimap_icon_color_self = "white";
	minimap_border = "blue";
	minimap_background = "black";
	minimap_bordercurve = "200";
	minimap_opacity = 0.7;
	minimap_width = 200;
	minimap_height = 200;
var health_color = "white";
/*
Defaults:
var minimap_icon_size = 2;
	minimap_icon_color_enemy = "red";
	minimap_icon_color_self = "white";
	minimap_border = "blue";
	minimap_background = "black";
	minimap_bordercurve = "200";
	minimap_opacity = 0.7;
	minimap_width = 200;
	minimap_height = 200;
var health_color = "white";
*/

// Set Properties of and Create Canvas
var canvas = document.createElement('canvas');
canvas.id     = "minimap";
canvas.width  = minimap_width;
canvas.height = minimap_height;
canvas.style.zIndex   = 999;
canvas.style.position = "absolute";
canvas.style.border   = "1px solid "+minimap_border;
canvas.style.borderRadius = minimap_bordercurve+"px";
canvas.style.background = minimap_background;
canvas.style.bottom = "0px";
canvas.style.opacity = minimap_opacity;
document.body.appendChild(canvas);

// Get element and get context of minimap canvas
var minimap = document.getElementById("minimap");
	mm = minimap.getContext("2d");

// Pythagorean Theorem Function
function lineDistance( point1, point2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = point2.x - point1.x;
  xs = xs * xs;
 
  ys = point2.y - point1.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function sez(game) {
	
	// Draw Banner and Health
	ctx.save();
	ctx.fillStyle = health_color;
	ctx.fillText("Running S.E.Z. by Matthew W.", game.canvastranslatex+cwidth/2-150, game.canvastranslatey+cheight-600);
	ctx.fillText(playercollection.array[0].health, game.canvastranslatex+cwidth/2-656, game.canvastranslatey+cheight-613)
	ctx.restore();
	
	// Clear Minimap Canvas
	mm.clearRect(0, 0, minimap.width, minimap.height);
	
	// Draw Self On Minimap
	mm.fillStyle = minimap_icon_color_self;
	mm.strokeStyle = minimap_icon_color_self;
	mm.beginPath();
	mm.arc(playercollection.array[0].x/16+50, playercollection.array[0].y/16+75,minimap_icon_size,0,2*Math.PI);
	mm.fill();
	mm.stroke();
	
	if (game.running) {
		
		// Set up colours for enemies and start for loop
		ctx.save();
		mm.fillStyle = minimap_icon_color_enemy;
		mm.strokeStyle = minimap_icon_color_enemy;
		for (var i = 2; i < playercollection.array.length; i++) {
			
			// Draw Enemies
			mm.beginPath();
			mm.arc(playercollection.array[i].x/16+50, playercollection.array[i].y/16+75,minimap_icon_size,0,2*Math.PI);
			mm.fill();
			mm.stroke();
			
			// Set Colours Of Lines
			if (lineDistance(playercollection.array[0], playercollection.array[i]) < 200) { ctx.strokeStyle = "red"; }
			if (lineDistance(playercollection.array[0], playercollection.array[i]) > 199 && lineDistance(playercollection.array[i], playercollection.array[i]) < 330) { ctx.strokeStyle = "orange"; }
			if (lineDistance(playercollection.array[0], playercollection.array[i]) > 329) { ctx.strokeStyle = "green"; }
			
			// Draw Lines
			ctx.beginPath();
			ctx.moveTo(playercollection.array[0].x+playercollection.array[0].width/2, playercollection.array[0].y+playercollection.array[0].height/2);
			ctx.lineTo(playercollection.array[i].x+playercollection.array[i].width/2, playercollection.array[i].y+playercollection.array[i].height/2);
			ctx.stroke();
			
		}
		ctx.restore();
		
	}
}