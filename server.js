/**
 * Module dependencies.
 */

var express = require('express'),
	fs = require('fs');

var app = module.exports = express();

app.use(express.static(__dirname + '/public'));


// Import the routes
fs.readdirSync('routes').forEach(function(file) {
	if (file[0] == '.') return;
	var routeName = file.substr(0, file.indexOf('.'));
	console.log(routeName);
	require('./routes/' + routeName)(app);
});


//example on how to return data
app.get('/hello.txt', function(req, res) {
	var body = 'Yo Whazup!';
	res.send(body);
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});



// Start server
app.listen(3001, function() {
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});