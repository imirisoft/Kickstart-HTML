# Kickstart-HTML

Kickstart HTML is created for designer who hate copy pasting all common stuffs E.g., header, footer, etc., to all the files. This tiny much needed tool help designers to add all common stuffs in partials directory and specific stuffs in views directory. Finished designing! now convert the template to html and handover to developers. Have fun!!

## Installation

Make sure your system is configured with [Nodejs], [NPM] and [Gulp]

### Configuration

Create public directory under your application root

```
$ npm install nodemon -g
```
```
$ npm install
```
```
$ bower install
```
```
$ Clone [Gulp Less Watcher] to the application root
```

### Run the Application
```
$ nodemon app.js
```

* By default the application will run in **3000 port** ```http://localhost:3000```. Feel free to add, modify, edit or remove the template
* ```http://localhost:3000/show``` for file that resides in ```views/show.ejs```.

Now you can play with the view files

## Convert all .ejs to .html
ejs to html made easy in just a command, only top level conversion works
* Only files under views directory will work
* Sub-directories of views directory with ejs file does not work

```
$ node app.js html
```
* Now you will see html directory created with all the html stuff. Each time when you run the above command will replace the existing files.

## Contribute to
* Test and Improve performance
* Install updated version to all existing Kickstart-HTML
* Help designers to kickstart the application with few commands with more features

[https://github.com/imirisoft/Kickstart-HTML]

[Nodejs]: <https://nodejs.org>
[NPM]: <https://www.npmjs.com/>
[Gulp]: <http://gulpjs.com/>
[Gulp Less Watcher]: <https://github.com/imirisoft/Gulp-Less-Watcher>
[https://github.com/imirisoft/Kickstart-HTML]: <https://github.com/imirisoft/Kickstart-HTML>