var World = function(config){
	config = config || {};
	var self = {};
	
	self.players  = config.players || [];
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
	
	/**
	 * Returns the full state of the world
	 * @todo return full world, not just the map
	 */
	self.getWorld = function (){
		return self.map;
	};
	
	return self;
};

module.exports = World;