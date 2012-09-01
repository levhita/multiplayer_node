var World = function(config){
	config = config || {};
	var self = {};
	self.map = [];
	
	/** Preload Images **/
	self.tiles= [];
	for (x=0; x<=2; x++) {
		self.tiles[x] = new Image();
		self.tiles[x].src = '/images/'+x+'.png';
	}
	
	/** Setup Canvas **/
	var canvas = document.getElementById('world');
	if (canvas.getContext){
		self.ctx = canvas.getContext('2d');
	}
	
	/** renders the map **/
	self.render = function() {
		for(var i = 0; i < self.map.length; i++) {
			for(var j = 0; j < self.map[i].length; j++){ 
			    self.ctx.drawImage(self.tiles[self.map[i][j]], i*20, j*20);
			}
		}
	};
	
	self.getWorld = function(){
		$.ajax({
			url: 'world/get',
			success: function(data) {
				self.map = data;
			}
		});
	};
	
	return self;
};