/*
	
	S.E.Z. - SifiGame EZ

	V0.3.1
	
	This mod was produced and developed by Matthew W.
	Intended for use in the game "SifiGame" by Jack R.
	
	My Website: http://www.mattshub.com
	Sifi Game on Github: https://github.com/nugyflex/sifigame
	
*/

console.log("Mod Started");

// Config Vars
var mod = {
	enabled: true,
	minimap_icon_size: 2,
	minimap_icon_color_enemy: "red",
	minimap_icon_color_self: "white",
	minimap_border: "blue",
	minimap_background: "black",
	minimap_bordercurve: "200",
	minimap_opacity: 0.7,
	minimap_width: 200,
	minimap_height: 200,
	health_color: "white"
}

var split = []
var consDisplayed = false;
var tracersOn = false;
var infAmmoIsOn = false;
var god = false;

// Set Properties of and Create Canvas
var canvas = document.createElement("canvas");
canvas.id     = "minimap";
canvas.width  = mod.minimap_width;
canvas.height = mod.minimap_height;
canvas.style.zIndex   = 999;
canvas.style.position = "absolute";
canvas.style.border   = "1px solid "+mod.minimap_border;
canvas.style.borderRadius = mod.minimap_bordercurve+"px";
canvas.style.background = mod.minimap_background;
canvas.style.bottom = "0px";
canvas.style.opacity = mod.minimap_opacity;
document.body.appendChild(canvas);

// Set Properties of and Create Console
var console = document.createElement("input");
console.id = "console";
console.style.width = "500px";
console.style.zIndex = 1000;
console.style.position = "absolute";
console.style.bottom = "5px";
console.style.fontSize = "40px";
console.style.display = "none";
console.placeholder = "Enter Console Commands";
document.body.appendChild(console);

// Set Properties of and Create Message Box
var msg = document.createElement("p");
msg.id = "msg";
msg.style.position = "absolute";
msg.style.zIndex = 1001;
msg.style.color = "white";
msg.style.top = "190px";
msg.style.left = "20px";
msg.style.opacity = 0;
msg.style.fontSize = "10px"
msg.innerHTML = "hi there";
document.body.appendChild(msg);

// Animate Message
function message(elem, msgText) {
	elem.innerHTML = msgText;
	$("#msg").animate({
		opacity: 1,
		fontSize: "30px"
	}, 200).delay(2*1000).animate({
		opacity: 0,
		fontSize: "10px"
	}, 200);
}

// Respond to console inputs
function respond(input) {
	split = input.split(" ");

	switch(split[0]) {
		case "print":
			message(msg, input.split("print ")[1]);
			break;
		case "ammo":
			playercollection.array[0].weapons[playercollection.array[0].weaponinuse].ammores = parseInt(split[1]);
			message(msg, "Set ammo to: "+split[1]+".");
			break;
		case "health":
			playercollection.array[0].health = parseInt(split[1]);
			message(msg, "Set health to: "+split[1]+".");
			break;
		case "cash":
			playercollection.array[0].money = parseInt(split[1]);
			message(msg, "Set money to: "+split[1]+".");
			break;
		case "god":
			if (god) {
				god = false;
				message(msg, "Turned off god mode.");
			} else {
				god = true;
				message(msg, "Turned on god mode.");
			}
			break;
		case "tracers":
			if (tracersOn) {
				tracersOn = false;
				message(msg, "Turned off tracers.");
			} else {
				tracersOn = true;
				message(msg, "Turned on tracers.");
			}
			break;
		case "infammo":
			if (infAmmoIsOn) {
				infAmmoIsOn = false;
				message(msg, "Turned off infinite ammo.");
			} else {
				infAmmoIsOn = true;
				message(msg, "Turned on infinite ammo.");
			}
			break;
	}
}

// Event Listeners
console.addEventListener("keydown", function(event) {
	if (event.keyCode == 13) {
		respond($("#console").val());
		$("#console").val("");
		$("#console").css("display", "none");
		consDisplayed = false;
	}
});
window.addEventListener("keydown", function(event) {
	if (event.keyCode == 192) {
		if (consDisplayed) {
			$("#console").css("display", "none");
			consDisplayed = false;
		} else {
			$("#console").css("display", "block");
			consDisplayed = true;
		}
	}
});

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

function sez() {
	
	// Draw Banner and Health
	ctx.save();
	ctx.fillStyle = mod.health_color;
	ctx.fillText("Running S.E.Z. by Matthew W.", game.canvastranslatex+cwidth/2-150, game.canvastranslatey+cheight-600);
	ctx.fillText(playercollection.array[0].health, game.canvastranslatex+cwidth/2-656, game.canvastranslatey+cheight-613)
	ctx.restore();
	
	// Clear Minimap Canvas
	mm.clearRect(0, 0, minimap.width, minimap.height);
	
	// Draw Self On Minimap
	mm.fillStyle = mod.minimap_icon_color_self;
	mm.strokeStyle = mod.minimap_icon_color_self;
	mm.beginPath();
	mm.arc(playercollection.array[0].x/16+50, playercollection.array[0].y/16+75, mod.minimap_icon_size, 0, 2*Math.PI);
	mm.fill();
	mm.stroke();
	
	if (game2.running) {
		
		if (infAmmoIsOn) {
			playercollection.array[0].weapons[playercollection.array[0].weaponinuse].ammo = playercollection.array[0].weapons[playercollection.array[0].weaponinuse].ammomax
		}

		if (god) {
			playercollection.array[0].health = playercollection.array[0].healthmax;
		}

		// Set up colours for enemies and start for loop
		ctx.save();
		mm.fillStyle = mod.minimap_icon_color_enemy;
		mm.strokeStyle = mod.minimap_icon_color_enemy;
		for (var i = 2; i < playercollection.array.length; i++) {

			// Draw Enemies on Minimap
			mm.beginPath();
			mm.arc(playercollection.array[i].x/16+50, playercollection.array[i].y/16+75, mod.minimap_icon_size, 0, 2*Math.PI);
			mm.fill();
			mm.stroke();
			
			if (tracersOn) {
				// Set Colours Of Tracers
				if (lineDistance(playercollection.array[0], playercollection.array[i]) < 200) { ctx.strokeStyle = "red"; }
				if (lineDistance(playercollection.array[0], playercollection.array[i]) > 199 && lineDistance(playercollection.array[i], playercollection.array[i]) < 330) { ctx.strokeStyle = "orange"; }
				if (lineDistance(playercollection.array[0], playercollection.array[i]) > 329) { ctx.strokeStyle = "green"; }
				
				// Draw Tracers
				ctx.beginPath();
				ctx.moveTo(playercollection.array[0].x+playercollection.array[0].width/2, playercollection.array[0].y+playercollection.array[0].height/2);
				ctx.lineTo(playercollection.array[i].x+playercollection.array[i].width/2, playercollection.array[i].y+playercollection.array[i].height/2);
				ctx.stroke();
			}
			
		}
		ctx.restore();
		
	}
}