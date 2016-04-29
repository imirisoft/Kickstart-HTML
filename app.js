"use strict";
var express = require('express'),
	app = express(),
	glob = require('glob'),
	path = require('path'),
	ejs = require('ejs'),
	fs = require('fs-extra'),
	config;

// throw all your configurations here
config = {
	port: process.env.PORT || 3000,
	html: './html/',
	bower_components: './bower_components',
	source_assets: './public/',
	destination_assets: './html',
	converter: false
};

// The converter
process.argv.forEach((val, index, array) => {
	if(val=='html') {
		config.converter = true;
		// EJS to HTML generator
		glob('./views/*.ejs', {}, function(er, files) {
			var html_dir = config.html;
			// Read all the file - only top root will be fetched
			files.forEach(function(file_path) {
				// Read the content of each file
				fs.readFile(file_path, 'utf8', function(err, data) {
					var matches, tag_len, i=0, html_file = path.basename(file_path, '.ejs');
					// Get the tags - ejs
					matches = data.match(/\<% include (.*?)\ %>/g);
					// Match through all the tags to replace with the content
					tag_len = matches.length;
					matches.forEach(function(partial_file_path) {
						let tag = partial_file_path;
						// Replace the matching tags prefix and suffix with none
						partial_file_path = partial_file_path.replace('<% include ', '')
										.replace(' %>', '');
						// now read the content of partial
						fs.readFile(`./views/${partial_file_path}`, 'utf8', function(err, partial_data) {
							i++;
							// Replace the tags
							data = data.replace(tag,partial_data);
							// Find the last tag in the template
							if(i==tag_len) {
								// Create directory if not exists
								if(!fs.existsSync(html_dir)) {
									fs.mkdirSync(html_dir);	
								}
								// Write the replaced tag to html
								fs.writeFile(`${html_dir}${html_file}.html`, data);
							}
						});

					});
				});
			});
		});
		// Copy the assets
		fs.copy(config.source_assets, config.destination_assets);
		return;
	}
});

// Listing to the custom port
var listener = app.listen(config.port, function() {
	// You can code now with fun
	console.log('You application started and running at ' + config.port);
});

if(config.converter) {
	listener.close();
}

app.set('view engine', 'ejs');

app.use(express.static('public'));

// Get all the template files
glob('./views/*.ejs', {}, function(er, files) {
	files.forEach(function(file_path) {
		let route_name = path.basename(file_path, '.ejs');
		let route = (route_name=='index')?'/':`/${route_name}`;
		// Dynamically build up the routes
		app.get(route, function(req, res) {
			res.render(route_name);
		});
	});
});