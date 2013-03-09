
var express = require('express')
, http      = require('http')
, faye      = require('faye');

var Player  = require('./public/js/player').Player
, World     = require('./public/js/world').World
, Game      = require('./models/game').Game
, Utils     = require('./public/js/utils').Utils;

var app = express();
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({secret:'asdfsdf'}));
    app.use(express.bodyParser());
});

var messages = [],
    ress     = [],

world = new World();
world.generateMap();
world.locatePlayers();

/** Redirects to Game Page **/  
app.get('/', function(req, res){
    var data = {}
    if(req.session.name === undefined) {
        data.logged_in = false;
        req.session.token = data.token = Utils.makeId(7);
        data.token = req.session.token;
        data.name = 'unnamed';
    } else {
        data.logged_in = true;
        data.token = req.session.token;
        data.name = req.session.name;
    }
    res.render('index.ejs', data);
});


app.post('/join', function(req, res){
    var player = {},
        name = '';
    if(req.session.name === undefined &&  req.body.token === req.session.token ) {
        name = req.session.name = req.body.name;
        player = new Player({name: req.body.name, token: req.body.token});
        player.teleport(world);
        world.addPlayer(player);
        faye_server.getClient().publish('/update_players', world.getPlayers());
    }
    res.send({status: 'success'});
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

var server = http.createServer(app);
var faye_server = new faye.NodeAdapter({mount: '/faye'});

var extension = {
    incoming : function(message, callback) {
       /* if(message.channel === '/join') {
            var player = new Player({clientId:message.clientId, name: message.data.name});
            player.teleport(world);
            world.addPlayer(player);
            server.getClient().publish('/new/player', {playername:message.data.name});
        }*/

        if(message.channel === '/move') {
            world.movePlayer(message.data.name, message.data.direction, message.data.token);
            //faye_server.getClient().publish('/moves', {name:message.data.name, direction:message.data.direction});
        }

        callback(message);
    }
};
faye_server.addExtension(extension);
server.listen(3000);
faye_server.attach(server);

setTimeout(function(){
    life_cycle = setInterval( function() {
        if(world.changed) {
            faye_server.getClient().publish('/update_players', world.getPlayers());
            world.changed = false;
        }
    }, 50);    
}, 100);


console.log("Express server running at\n  => http://localhost:3000/\nCTRL + C to shutdown");