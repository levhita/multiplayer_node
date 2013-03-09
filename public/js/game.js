$(document).ready(function(){
	world = new World();
	world.setupCanvas();
	world.updateWorldData();

	window.client = new Faye.Client('http://localhost:3000/faye');
	
	/*client.subscribe('/moves', function(message) {
		world.movePlayer(message.name, message.direction);
		world.render();
	});*/

	client.subscribe('/update_players', function(players) {
		console.log('updated');
		world.updatePlayersData(players);
		world.render();
	});
	
	client.subscribe('/new/player', function(message) {
		world.updateWorldData();
		world.render();
	});

	key('up', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'up'});
		return false;
	});

	key('down', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'down'});
		return false;
	});

	key('left', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'left'});
		return false;
	});

	key('right', function() {
		client.publish('/move', {name:view_config.name, token:view_config.token, direction:'right'});
		return false;
	});

});

function joinGame() {
	var name = $('#name_input').val();
	view_config.name = name;
	$.post('/join', {name:view_config.name, token:view_config.token},
		function(data) {
			location.reload();
		}
	);
}