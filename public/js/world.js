(function (global){
var World = function(config){
	config = config || {};
	var self = {};
	
	self.players  = config.players || [];
	self.map = config.map || [];
	self.target = config.target || {x:0, y:0};
	
	self.changed = false;
	self.width = 20;
	self.height = 15;
	self.tile_size = 32;
	self.walkable_tiles = 10 ;
	self.total_tiles = 15;
	
	self.getWorld = function () {
		return {map: self.map, target: self.target, players:self.players};
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
		var x, y, random_x, random_y, block;

		self.map = [];

		/** Random map probably oriented wrong...**/
		for(var x=0; x<self.width; x++) {
			self.map.push([]);
			for(var y = 0; y<self.height; y++){ 
				block = 0;
				if (Math.floor(Math.random()*10)>=7) {
					block =	Math.floor(Math.random()*(self.walkable_tiles-1)) + 1;	//Stains
				}
				if (Math.floor(Math.random()*10)>=8) {
					block = Math.floor(Math.random()*(self.total_tiles-self.walkable_tiles))+self.walkable_tiles; // Blocks
				}
				self.map[x].push(block); 
			}
		}

		/** Randomly put the objective **/
		do {
			random_x = Math.floor(Math.random()*self.height);
			random_y = Math.floor(Math.random()*self.width);
		}  while (!world.isWalkable(random_x,random_y));
		self.target = {x:random_x, y:random_y};
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
		if(x<0 || x>=self.width){
			return false;
		}
		if(y<0 || y>=self.height){
			return false;
		}
		return (self.map[x][y] < self.walkable_tiles);
	};
	
	self.isTarget = function(x,y) {
		return (self.target.x==x && self.target.y==y );
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
		var loaded_images   = 0;
		var total_images 	= 6;
		self.tiles = {};
		
		self.tiles.bg = new Image();
		self.tiles.bg.onload = function() {
	        if(++loaded_images >= total_images) {
	            self.render(); //When all images where loaded, render.
	        }
		};
		self.tiles.bg.src = '/images/bg.png'

		self.tiles.husband = new Image();
		self.tiles.husband.onload = function() {
	        if(++loaded_images >= total_images) {
	            self.render(); //When all images where loaded, render.
	        }
		};
		self.tiles.husband.src = '/images/husband.png'

		self.tiles.wife = new Image();
		self.tiles.wife.onload = function() {
	        if(++loaded_images >= total_images) {
	            self.render(); //When all images where loaded, render.
	        }
		};
		self.tiles.wife.src = '/images/wife.png'

		self.tiles.bitch = new Image();
		self.tiles.bitch.onload = function() {
	        if(++loaded_images >= total_images) {
	            self.render(); //When all images where loaded, render.
	        }
		};
		self.tiles.bitch.src = '/images/bitch.png'

		self.tiles.win = new Image();
		self.tiles.win.onload = function() {
	        if(++loaded_images >= total_images) {
	            self.render(); //When all images where loaded, render.
	        }
		};
		self.tiles.win.src = '/images/win.png'

		self.tiles.loss = new Image();
		self.tiles.loss.onload = function() {
	        if(++loaded_images >= total_images) {
	            self.render(); //When all images where loaded, render.
	        }
		};
		self.tiles.loss.src = '/images/loss.png'
		
		/** Setup Canvas **/
		var canvas = document.getElementById('world');
		if (canvas.getContext){
			self.ctx = canvas.getContext('2d');
		}

	};
	
	/*self.win = function() {
		self.ctx.drawImage(self.tiles.bg, 20, 20);
	}*/

	/** renders the map **/
	self.render = function() {
		var directions, img;
		/** Render Map **/
		for(var i = 0; i < self.map.length; i++) {
			for(var j = 0; j < self.map[i].length; j++){ 
			    /*context.drawImage(img,
			    	sx,sy,swidth,
			    	sheight,
			    	x,y,
			    	width,height);*/
			    self.ctx.drawImage(self.tiles.bg,
			   		self.map[i][j]*self.tile_size, 0,
			   		self.tile_size, self.tile_size,
			   		i*self.tile_size, j*self.tile_size,
			   		self.tile_size, self.tile_size
			   	);
			}
		}
		self.ctx.drawImage(self.tiles.husband,
			0,0,
			self.tile_size*2, self.tile_size*2,
			self.target.x*self.tile_size - (self.tile_size/2), self.target.y*self.tile_size - self.tile_size,
			self.tile_size*2, self.tile_size*2
		);		    			

		directions = {up: 0, left: 1, down:2, right: 3};
		/** Render players wrong layering**/
		for(var i=0; i<self.players.length; i++) {
			img = self.tiles.bitch;			
			
			if(self.players[i].token === view_config.token) {
				img = self.tiles.wife;	
			}
			
			self.players[i].x = (self.players[i].x == -1)? 0:self.players[i].x;
			self.players[i].y = (self.players[i].y == -1)? 0:self.players[i].y;
			self.ctx.drawImage(img,
				0,directions[self.players[i].direction]* self.tile_size*2,
				self.tile_size*2, self.tile_size*2,
				self.players[i].x*self.tile_size - (self.tile_size/2), self.players[i].y*self.tile_size - self.tile_size,
				self.tile_size*2, self.tile_size*2
			);
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
				self.target = data.target;
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