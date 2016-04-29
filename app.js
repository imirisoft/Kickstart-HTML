"use strict";
var express = require('express'),
	app = express(),
	glob = require('glob'),
	path = require('path'),
	ejs = require('ejs'),
	fs = require('fs'),
	config;

// throw all your configurations here
config = {
	port: 3000,
	html: './html/'
};

// The converter
process.argv.forEach((val, index, array) => {
	if(val=='html') {
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
		return;
	}
});

app.set('view engine', 'ejs');
app.engine('.html', ejs.renderFile);

app.use(express.static('bower_components'));
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

// Listing to the custom port
app.listen(config.port, function() {
	// You can code now with fun
	console.log('You application started and running at ' + config.port);
});