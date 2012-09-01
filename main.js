var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var messages = [],
	ress     = [];
	

app.get('/', function(req, res){
  	res.send('Hello world');
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