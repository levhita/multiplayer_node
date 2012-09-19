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
world.locatePlayers();


/** Redirects to Game Page **/  
app.get('/', function(req, res){
    res.redirect('index.html');
});

/** returns current player positions **/
app.get('/players/get', function(req, res){
    res.send(world.getPlayers());
});

/** returns current map **/
app.get('/map/get', function(req, res){
    res.send(world.getMap());
});

/** returns current world **/
app.get('/world/get', function(req, res){
    res.send(world.getWorld());
});

var extension = {
    incoming : function(message, callback) {
        if(message.channel === '/join') {
            var player = new Player({clientId:message.clientId, name: message.data.name});
            player.teleport(world);
            world.addPlayer(player);
            server.getClient().publish('/new/player', {update:"bitches"});
        }
        callback(message);
    }
};
server.addExtension(extension);

app.use(server);
app.listen(3000);

console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown");