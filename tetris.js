const canv = document.getElementById("c");
const body = document.getElementById("b");
const d = canv.getContext("2d");
const s = 20;
d.fillStyle = "#00ff00";
taken = [];
current = [];
window.shifted = false;
function Block(x,y){
	d.fillRect(x*s,y*s,s,s);
	this.x = x;
	this.y = y;
	current.push(this);
}
a = new Block(4,-2);
b = new Block(4,-1);
c = new Block(4,0);
f = new Block(5,0);
function updateCurrentFrame(){
	if(groundCollision() == true){
		for(i = 0; i < 4; i++){
			taken.push([current[i].x, current[i].y]);
		}
		checkLine();
		for(i = 0; i < 3; i++){
			if(current[i].y < 0){
				window.clearInterval(updatecurrentinterval);
				video = document.createElement("video");
				video.style.position = "fixed";
				video.style.width = "100%";
				video.style.height = "100%";
				source = document.createElement("source");
				source.src = "https://ia601602.us.archive.org/11/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4#t=1";
				source.type = "video/mp4";
				video.setAttribute("muted", "");
				video.setAttribute("autoplay", "");
				video.appendChild(source);
				body.appendChild(video);
				video.play();
				video.removeAttribute("muted");
				return;
			}
		}
		current = [];
		rand = Math.random();
		if(rand < 0.1){
			a = new Block(4,-2);
			b = new Block(4,-1);
			c = new Block(4,0);
			f = new Block(5,0);
		}
		else if(rand >=  0.1 && rand < 0.2){
			a = new Block(4,-3);
			b = new Block(4,-2);
			c = new Block(4,-1);
			f = new Block(4,0);
		}
		else if(rand >= 0.2 && rand < 0.3){
			a = new Block(3,0);
			b = new Block(4,0);
			c = new Block(5,0);
			f = new Block(6,0);
		}
		else if(rand >= 0.3 && rand < 0.4){
			a = new Block(4,-2);
			b = new Block(5,-2);
			c = new Block(4,-1);
			f = new Block(4,0);
		}
		else if(rand >= 0.4 && rand < 0.5){
			a = new Block(4,-2);
			b = new Block(5,-2);
			c = new Block(4,-1);
			f = new Block(4,0);
		}
		else if(rand >= 0.5 && rand < 0.6){
			a = new Block(4,-2);
			b = new Block(4,-1);
			c = new Block(5,-1);
			f = new Block(4,0);
		}
		else if(rand >= 0.6 && rand < 0.7){
			a = new Block(3,0);
			b = new Block(4,0);
			c = new Block(4,-1);
			f = new Block(5,0);
		}
		else if(rand >= 0.7 && rand < 0.8){
			a = new Block(3,0);
			b = new Block(4,0);
			c = new Block(5,0);
			f = new Block(5,-1);
		}
		else if(rand >= 0.8 && rand < 0.9){
			a = new Block(3,-1);
			b = new Block(3,0);
			c = new Block(4,0);
			f = new Block(5,0);
		}
		else if(rand >= 0.9){
			a = new Block(3,-2);
			b = new Block(4,-2);
			c = new Block(4,-1);
			f = new Block(4,0);
		}
		return;
	}
	d.clearRect(0, 0,10*s,24*s);
	for(i = 0; i < 4; i++){
		current[i].y++;
		d.fillRect(current[i].x*s,current[i].y*s,s,s);
	}
	for(i = 0; i < taken.length; i++){
		d.fillRect(taken[i][0]*s,taken[i][1]*s,s,s);
	}
}
var updatecurrentinterval = setInterval(updateCurrentFrame, 200);
function keyDown(e){
	code = e.keyCode || e.which;
	if(code == 37 && shifted == false){
		shift(false);
		shifted = true;
	}
	else if(code == 39 && shifted == false){
		shift(true);
		shifted = true;
	}
}
function keyUp(e){
	code = e.keyCode || e.which;
	if(code == 37 || code == 39){
		shifted = false;
	}
}
function shift(dir){
	if(sideCollision(dir) == true)return;
	if(dir == 0){
		d.clearRect(0, 0,10*s,24*s);
		for(i = 0; i < current.length; i++){
			current[i].x--;
			d.fillRect(current[i].x*s,current[i].y*s,s,s);
		}
	}
	else{
		d.clearRect(0, 0,10*s,24*s);
		for(i = 0; i < current.length; i++){
			current[i].x++;
			d.fillRect(current[i].x*s,current[i].y*s,s,s);
		}
	}
	for(i = 0; i < taken.length; i++){
		d.fillRect(taken[i][0]*s,taken[i][1]*s,s,s);
	}
}
function sideCollision(dir){
	for(i = 0; i < 4; i++){
		if((current[i].x <= 0 && dir == 0) || (current[i].x >= 9 && dir == 1)){
			return true;
		}
	}
	for(i = 0; i < taken.length; i++){
		for(j = 0; j < 4; j++){
			if((current[j].x + 1 == taken[i][0] || current[j].x - 1== taken[i][0]) && current[j].y == taken[i][1]){
				return true;
			}
		}
	}
	return false;
}
function groundCollision(){
	for(i = 0; i < 4; i++){
		if(current[i].y >= 23){
			return true;
		}
	}
	for(i = 0; i < taken.length; i++){
		for(j = 0; j < 4; j++){
			if(current[j].y + 1 == taken[i][1] && current[j].x == taken[i][0]){
				return true;
			}
		}
	}
	return false;
}
function checkLine(){
	rows = new Array(24);
	for(i = 0; i < 24; i++){
		rows[i] = 0;
	}
	for(i = 0; i < taken.length; i++){
		rows[taken[i][1]]++;
	}
	lines = [];
	for(i = 23; i >= 0; i--){
		if(rows[i] == 10){
			lines.push(i);
		}
	}
	for(i = lines.length - 1; i >= 0; i--){
		for(j = taken.length - 1; j >= 0; j--){
			if(taken[j][1] == lines[i]){
				taken.splice(j,1);
			}
		}
		for(j = 0; j < taken.length; j++){
			if(taken[j][1] < lines[i]){
				taken[j][1]++;
			}
		}
	}
}