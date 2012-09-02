var World = function(config){
	config = config || {};
	var self = {};
	self.map = [];
	self.players =[];
	
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
		/** Render Map **/
		for(var i = 0; i < self.map.length; i++) {
			for(var j = 0; j < self.map[i].length; j++){ 
			    self.ctx.drawImage(self.tiles[self.map[i][j]], i*20, j*20);
			}
		}
		/** Render players **/
		for(var i=0; i<self.players.length; i++) {
			console.log(self.players[i]);
			self.ctx.drawImage(self.tiles[3], self.players[i].x*20, self.players[i].y*20);
		}
	};
	
	/** Gets full world data **/
	self.getWorld = function(){
		$.ajax({
			url: 'world/get',
			success: function(data) {
				self.map = data.map;
				self.players = data.players;
			}
		});
	};
	
	/** Gets only the map **/
	self.getMap = function(){
		$.ajax({
			url: 'map/get',
			success: function(data) {
				self.map = data;
			}
		});
	};
	
	/** Gets players positions **/
	self.getPlayers = function(){
		$.ajax({
			url: 'players/get',
			success: function(data) {
				self.players = data;
			}
		});
	};
	
	return self;
};