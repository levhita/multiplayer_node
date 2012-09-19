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
	self.clientId	= config.clientId || 0;
	

	/*self.toJSON = function () {
		return {self.x, self.y, self.name, self.clientId};
	}*/

	self.locate = function(x,y) {
		console.log(x,y);
		self.x = x;
		self.y = y;
	};
	
	self.teleport = function(world){

		do{
			do {
				do {
					random_x = Math.floor(Math.random()*41);
					random_y = Math.floor(Math.random()*31);
				} while(world.isOccupied(random_x,random_y));
			} while(!world.isWalkable(random_x,random_y));
		} while(world.isTarget(random_x,random_y));
		self.locate(random_x, random_y);
	};
	
	self.move = function(direction) {
		if(direction=='left') {
			self.x = self.x-1;
		} else if(direction=='right') {
			self.x = self.x+1;
		} else if(direction='up') {
			self.y = self.y-1;
		} else if(direction='down') {
			self.y = self.y+1;
		} 
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