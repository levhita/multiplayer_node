(function (global){
var Game = function(config){
	config = config || {};
	var self = {};
	
	self.players = config.players || [];
	self.world   = [];
	
	
	self.tick = function() {
		// I needed add tick here
	};
	
	return self;
};

global.Game = Game;
}(typeof window  === 'undefined' ? exports : window));