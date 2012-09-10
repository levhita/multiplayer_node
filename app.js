var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var faye   = require('faye');
var server = new faye.NodeAdapter({mount: '/faye'});

var Player = require('./public/js/player').Player;
var World  = require('./public/js/world').World;
var Game   = require('./models/game').Game;

var messages = [],
	ress     = [],

world = new World();
world.generateMap();
world.addPlayer(new Player());
world.addPlayer(new Player());
world.addPlayer(new Player());
world.addPlayer(new Player());
world.locatePlayers();
	
/** Redirects to Game Page **/	
app.get('/', function(req, res){
	res.redirect('index.html');
});

/** returns current world **/
app.get('/world/get', function(req, res){
	res.send(world.getWorld());
});

/** returns current player positions **/
app.get('/players/get', function(req, res){
	res.send(world.getPlayers());
});

/** returns current map **/
app.get('/map/get', function(req, res){
	res.send(world.getMap());
});

app.get('/player/new/:name/:x/:y', function(req, res){
	var Player = new Player({name:req.params.name, x:req.params.x, y:req.params.y});
	world.addPlayer(Player);
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