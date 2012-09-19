$(document).ready(function(){
	world = new World();
    world.setupCanvas();
    world.updateWorldData();
    
	window.client = new Faye.Client('http://localhost:3000/faye');
	
	client.subscribe('/moves', function(message) {
		console.log(message);
	    world.movePlayer(message.clientID, message.data.direction);
	    world.render();
	});
	
	client.subscribe('/new/player', function(message) {
		console.log(message);
		world.updateWorldData();
	    world.render();
	});
});

function joinGame() {
  window.client.publish('/join', {
  	name: 'levhita'
  });
}