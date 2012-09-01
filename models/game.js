var Game = function(config){
	config = config || {};
	var self = {};
	
	self.players      = config.players || [];
	self.map	= config.map || [
	        	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
	        	                 [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
	        	                 [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
	        	                ];
	
	self.world = [];
	
	return self;
};