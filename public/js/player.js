(function (global){

/*
Good idea but i'm passing the world where i need it.

if ( typeof window  === 'undefined' ) {
	var World  = require('./public/js/world').World;
}*/

var Player = function(config){
	config = config || {};
	var self = {};
	
	self.x			= config.x || -1;
	self.y			= config.y || -1;
	self.name		= config.name || 'unnamed';
	self.token		= config.token || '';
	self.direction  = config.direction || 'down';
	self.status 	= config.status || 'walk';
	

	/*self.toJSON = function () {
		return {self.x, self.y, self.name, self.clientId};
	}*/

	self.locate = function(x,y) {
		self.x = x;
		self.y = y;
	};
	
	self.teleport = function(world){
		do{
			do {
				do {
					random_x = Math.floor(Math.random()* world.width);
					random_y = Math.floor(Math.random()* world.height);
				} while(world.isOccupied(random_x,random_y));
			} while(!world.isWalkable(random_x,random_y));
		} while(world.isTarget(random_x,random_y));
		self.locate(random_x, random_y);
	};
	
	self.move = function(direction, world) {
		var x = self.x,
			y = self.y;
		
		self.direction = direction;
		
		if(direction=='left') {
			x = self.x-1;
		} else if(direction=='right') {
			x = self.x+1;
		} else if(direction=='up') {
			y = self.y-1;
		} else if(direction=='down') {
			y = self.y+1;
		} 
		if(world.isTarget(x, y)) {
		    process.faye_server.getClient().publish('/winner', {name: self.name});
			world.restart();
			return true;
		}
		if (world.isWalkable(x, y) && !world.isOccupied(x, y) ) {
			self.x = x;
			self.y = y;
			return true;
		}
		return true;
	};
	
	self.setName = function(name) {
		self.name=name;
	};
	
	self.getPosition = function() {
		return {x:self.x, y:self.y};
	};
	
	return self;
};

global.Player = Player;
}(typeof window  === 'undefined' ? exports : window));