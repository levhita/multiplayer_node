var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var player_module = require('./models/player.js');
var world_module = require('./models/world.js');

var messages = [],
	ress     = [],

WorldInstance = new world_module();
WorldInstance.addPlayer(new player_module());
WorldInstance.addPlayer(new player_module());
WorldInstance.addPlayer(new player_module());
WorldInstance.addPlayer(new player_module());
WorldInstance.generateMap();
	
/** Redirects to Game Page **/	
app.get('/', function(req, res){
	res.redirect('index.html');
});

/** returns current world **/
app.get('/world/get', function(req, res){
	res.send(WorldInstance.getWorld());
});

/** returns current player positions **/
app.get('/players/get', function(req, res){
	res.send(WorldInstance.getPlayers());
});

/** returns current map **/
app.get('/map/get', function(req, res){
	res.send(WorldInstance.getMap());
});

app.get('/player/new/:name/:x/:y', function(req, res){
	var Player = new player_module({name:req.params.name, x:req.params.x, y:req.params.y});
	WorldInstance.addPlayer(Player);
	res.send({code:200})
});


app.get('/mensaje/new/:mensaje', function(req, res){
	messages.push(req.params.mensaje);

	ress.forEach(function(res){
		res.send(messages+'<script>window.location.reload()</script>');
	});

	res.send('mensaje enviado');
});

app.get('/mensaje/list', function(req, res){
	ress.push(res);
});

app.listen(3000);
console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown");