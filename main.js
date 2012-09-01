var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var world_module = require('./models/world.js');
var player_module = require('./models/player.js');


var messages = [],
	ress     = [];
	WorldInstance = new world_module();
	Players = [];
	
/** Redirects to Game Page **/	
app.get('/', function(req, res){
	res.redirect('index.html');
});
/** returns current map **/

app.get('/world/get', function(req, res){
	res.send(WorldInstance.getWorld());
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