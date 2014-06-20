/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/first-men/**/*.css',
  //'linker/bower_components/leaflet-dist/leaflet.css',
  'linker/bower_components/Bootflat/css/bootstrap.min.css',
  'linker/bower_components/Bootflat/bootflat/css/bootflat.css',
  'linker/bower_components/Bootflat/css/site.css'

   // 'linker/bower_components/Bootflat/**/*.css',
  // 'linker/bower_components/Bootflat/bootflat/css/bootflat.min.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  'js/first-men/**/*.js',
  'linker/bower_components/angular/angular.js',
  'linker/bower_components/angular-resource/angular-resource.js',
  'linker/bower_components/angular-route/angular-route.js',
  'linker/bower_components/angular-cookies/angular-cookies.js',
  'linker/bower_components/angular-mocks/angular-mocks.js',
  'linker/bower_components/angular-sanitize/angular-sanitize.js',
  'linker/bower_components/angular-scenario/angular-scenario.js',
  'linker/bower_components/vintagejs/dist/angular.vintage.js',
  'linker/bower_components/caman/dist/caman.full.js',
  'linker/bower_components/vintagejs/dist/vintage.js',
  'linker/bower_components/glfx-bower/glfx.js',
  // 'linker/bower_components/leaflet-dist/leaflet.js',
  // 'linker/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
  'linker/app/**/*.js',
  // Below, as a demonstration, you'll see the built-in dependencies
  // linked in the proper order order

  // Bring in the socket.io client
  'js/socket.io.js',

  // then beef it up with some convenience logic for talking to Sails.js
  'js/sails.io.js',

  // finally, include a simple boilerplate script that connects a socket
  // to the Sails backend with some example code
  'js/connection.example.js',

  //
  // *->    you might put other dependencies like jQuery or Angular here   <-*
  //

  // All of the rest of your app scripts
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];








// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
