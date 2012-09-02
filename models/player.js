var Player = function(config){
	config = config || {};
	var self = {};
	
	self.x		= config.x || -1;
	self.y		= config.y || -1;
	self.name	= config.name || 'unnamed';
	
	self.teleport = function(x,y) {
		self.x = x;
		self.y = y;
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

module.exports = Player;