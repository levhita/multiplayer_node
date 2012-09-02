var World = function(config){
	config = config || {};
	var self = {};
	
	self.players  = config.players || [];
	self.map = config.map || [];
	
	self.getWorld = function () {
		return {map: self.map, players:self.players};
	};
	
	self.getMap = function () {
		return self.map;
	};
	
	self.getPlayers = function () {
		return self.players;
	};
	
	self.addPlayer = function(player) {
		self.players.push(player);
	};
	
	self.generateMap = function(){
		/** Random map probably oriented wrong...**/
		for(var i=0; i<=40; i++) {
			self.map.push([]);
			for(var j = 0; j <= 30; j++){ 
				block = (Math.floor(Math.random()*10)<8)?0:1;
				self.map[i].push(block); 
			}
		}
		/** Randomly Put the objective **/ 
		self.map[Math.floor(Math.random()*41)][Math.floor(Math.random()*31)]=2;
		
		/** Put players **/
		for(var i=0; i<self.players.lenght; i++) {
			do{
				do {
					do {
						random_x = Math.floor(Math.random()*41);
						random_y = Math.floor(Math.random()*31);
					} while(self.isOccupied(random_x,random_y));
				} while(!self.isWalkable(random_x,random_y));
			} while(self.isTarget(random_x,random_y));
			self.players[i].teleport(random_x, random_y);
		}
	};
	
	self.isWalkable = function(x,y) {
		return (self.map[x][y] != 1);
	};
	
	self.isTarget = function(x,y) {
		return (self.map[x][y] == 2);
	};
	
	self.isOccupied = function(x,y){
		for(var i=0; i<self.players.lenght; i++) {
			if (self.players[i].x==x && self.players[i].y==y) {
				return true;
			}
		} 
		return false;
	};
	
	return self;
};

module.exports = World;