$(document).ready(function(){
	world = new World();
	world.setupCanvas();
	world.updateWorldData();

	window.client = new Faye.Client('http://localhost:3000/faye');
	
	client.subscribe('/moves', function(message) {
		world.movePlayer(message.name, message.direction);
		world.render();
	});
	
	client.subscribe('/new/player', function(message) {
		world.updateWorldData();
		world.render();
	});

	key('up', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'up'});
	});

	key('down', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'down'});
	});

	key('left', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'left'});
	});

	key('right', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'right'});
	});

});

function joinGame() {
	var name = $('#name_input').val();
	
	view_config.name = name;
	console.log(view_config);
	$.post('/join', {name:view_config.name, token:view_config.token},
		function(data) {
			console.log(data);
			location.reload();
		}
	);
}