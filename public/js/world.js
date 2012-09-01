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
		self.ctx.drawImage(self.tiles[0], 20, 20);
		self.ctx.drawImage(self.tiles[1], 40, 40);
		self.ctx.drawImage(self.tiles[2], 20, 20);
	};
	
	self.getMap(){
		$.ajax({
			url: 'world/get',
			success: function(data) {
				alert(data);
			}
		});
	}
	
	return self;
};