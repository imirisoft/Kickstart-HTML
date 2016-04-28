var express = require('express'),
	app = express(),
	glob = require('glob'),
	path = require('path'),
	ejs = require('ejs'),
	config;

// throw all your configurations here
config = {
	port: 3000
};

app.set('view engine', 'ejs');

app.use(express.static('bower_components'));
app.use(express.static('public'));

// Get all the template files
glob('./views/*.ejs', {}, function(er, files) {
	files.forEach(function(file_path) {
		var route_name = path.basename(file_path, '.ejs');
		var route = (route_name=='index')?'/':'/'+route_name;
		// Dynamically build up the routes
		app.get(route, function(req, res) {
			res.render(route_name);
		});
	});
});

// Listing to the custom port
app.listen(config.port, function() {
	// You can code now with fun
	console.log('You application started and running at ' + config.port);
});