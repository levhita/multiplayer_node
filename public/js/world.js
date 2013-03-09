(function (global){
var World = function(config){
	config = config || {};
	var self = {};
	
	self.players  = config.players || [];
	self.map = config.map || [];
	self.changed = false;
	
	self.getWorld = function () {
		return {map: self.map, players:self.players};
	};

	self.lifeCycle = function(faye_server) {
		setTimeout(function(){
		    self.life_cycle = setInterval( function() {
		        if(world.changed) {
		            process.faye_server.getClient().publish('/update_players', world.getPlayers());
		            world.changed = false;
		        }
		    }, 50);    
		}, 100);
	}
	
	self.getMap = function () {
		return self.map;
	};
	
	self.getPlayers = function () {
		return self.players;
	};
	
	self.addPlayer = function(player) {
		self.players.push(player);
	};
	
	self.restart = function(){
		clearInterval(self.life_cycle);
		self.init();
		self.lifeCycle();
		process.faye_server.getClient().publish('/restart',{});
	}

	self.init = function(){
		self.generateMap();
		self.locatePlayers();
	}
	
	self.generateMap = function(){
		var x, y;

		self.map = [];

		/** Random map probably oriented wrong...**/
		for(var x=0; x<40; x++) {
			self.map.push([]);
			for(var y = 0; y<30; y++){ 
				block = (Math.floor(Math.random()*10)<8)?0:1;
				self.map[x].push(block); 
			}
		}
		/** Randomly Put the objective **/ 
		self.map[Math.floor(Math.random()*40)][Math.floor(Math.random()*30)]=2;
	};
	
	self.locatePlayers = function() {
		for(var i=0; i<self.players.length; i++) {
			self.players[i].teleport(self);
		}
	};
	
	self.movePlayer = function (name, direction, token) {
		for(var i=0; i<self.players.length; i++) {
			if (self.players[i].name==name){
				if(token === undefined || token === self.players[i].token) {
					if(self.players[i].move(direction, self)){
						self.changed = true;
						return true;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	}
	
	self.isWalkable = function(x,y) {
		if(x<0 || x>=40){
			return false;
		}
		if(y<0 || y>=30){
			return false;
		}
		return (self.map[x][y] != 1);
	};
	
	self.isTarget = function(x,y) {
		return (self.map[x][y] == 2);
	};
	
	self.isOccupied = function(x,y) {
		for(var i=0; i<self.players.length; i++) {
			if (self.players[i].x==x && self.players[i].y==y) {
				return true;
			}
		} 
		return false;
	};

	/** Functions for the browser **/
	self.setupCanvas = function() {
		/** Preload Images **/
		self.tiles    = [];
		total_images  = 4;
		loaded_images = 0;
		for (x=0; x<total_images; x++) {
			self.tiles[x] = new Image();
			self.tiles[x].onload = function() {
	            if(++loaded_images >= total_images) {
	                self.render(); //When all images where loaded, render.
	            }
			};
			self.tiles[x].src = '/images/'+x+'.png';
		}
		
		/** Setup Canvas **/
		var canvas = document.getElementById('world');
		if (canvas.getContext){
			self.ctx = canvas.getContext('2d');
		}
	};
	
	/** renders the map **/
	self.render = function() {
		/** Render Map **/
		for(var i = 0; i < self.map.length; i++) {
			for(var j = 0; j < self.map[i].length; j++){ 
			    self.ctx.drawImage(self.tiles[self.map[i][j]], i*20, j*20);
			}
		}
		
		/** Render players **/
		for(var i=0; i<self.players.length; i++) {
			self.ctx.drawImage(self.tiles[3], self.players[i].x*20, self.players[i].y*20);
		}
	};
	
	/** Connections with web services **/
	/** Gets full world data **/
	self.updateWorldData = function(){
		$.ajax({
			url: '/world/get',
			success: function(data) {
				self.map = data.map;
				self.players = [];
				data.players.forEach(function(player){
					self.players.push(new Player(player));
				});
			}
		});
	};
	
	/** Gets only the map **/
	self.updateMapData = function(){
		$.ajax({
			url: '/map/get',
			success: function(data) {
				self.map = data;
			}
		});
	};
	
	/** Gets players positions **/
	self.updatePlayersData = function(players){
		self.players = [];
		players.forEach(function(player){
			self.players.push(new Player(player));
		});
	};
	
	return self;
};

global.World = World;
}(typeof window  === 'undefined' ? exports : window));