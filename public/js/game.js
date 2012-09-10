$(document).ready(function(){
	world = new World();
    world.setupCanvas();
    world.updateWorldData(true);
    
	window.client = new Faye.Client('http://localhost:3000/faye');
	
	client.subscribe('/moves', function(message) {
		console.log(message);
	    world.movePlayer(message.clientID, message.data.direction);
	    world.render();
	});
	
	client.subscribe('/moves', function(message) {
		console.log(message);
	    world.movePlayer(message.clientID, message.data.direction);
	    world.render();
	});
});