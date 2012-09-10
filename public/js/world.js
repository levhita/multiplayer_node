(function (global){
var World = function(config){
	config = config || {};
	var self = {};
	
	self.players  = config.players || [];
	self.map = config.map || [];
	
	self.getWorld = function () {
		return {map: self.map, players:self.players};
	};
	
	self.getMap = function () {
		return self.map;
	};
	
	self.getPlayers = function () {
		return self.players;
	};
	
	self.addPlayer = function(player) {
		self.players.push(player);
	};
	
	self.generateMap = function(){
		/** Random map probably oriented wrong...**/
		for(var i=0; i<40; i++) {
			self.map.push([]);
			for(var j = 0; j<30; j++){ 
				block = (Math.floor(Math.random()*10)<8)?0:1;
				self.map[i].push(block); 
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
	
	self.isWalkable = function(x,y) {
		return (self.map[x][y] != 1);
	};
	
	self.isTarget = function(x,y) {
		return (self.map[x][y] == 2);
	};
	
	self.isOccupied = function(x,y){
		for(var i=0; i<self.players.lenght; i++) {
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
			console.log(self.players[i]);
			self.ctx.drawImage(self.tiles[3], self.players[i].x*20, self.players[i].y*20);
		}
	};
	
	/** Connections with web services **/
	/** Gets full world data **/
	self.updateWorldData = function(){
		$.ajax({
			url: 'world/get',
			success: function(data) {
				self.map = data.map;
				self.players = data.players;
			}
		});
	};
	
	/** Gets only the map **/
	self.updateMapData = function(){
		$.ajax({
			url: 'map/get',
			success: function(data) {
				self.map = data;
			}
		});
	};
	
	/** Gets players positions **/
	self.updatePlayersData = function(){
		$.ajax({
			url: 'players/get',
			success: function(data) {
				self.players = data;
			}
		});
	};
	
	return self;
};

global.World = World;
}(typeof window  === 'undefined' ? exports : window));