# performance-matters-server-side

## Slopende Burgemeesters

On this site you can get an overview of how many street the Mayors of Amsterdam destroyed in their term.


Regular loading time: 
![](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/client-side.png)


## Requirements

```
var express = require('express');
var minifyHTML = require('express-minify-html');
var request = require('request');
var ejs = require('ejs');
var fetch = require('node-fetch');
```
This is list of modules you need to include in order to use the tools.

## NPM

Use these command in the command line interface to use all components

- `npm install express --save`
- `npm install --save --production express-minify-html express`
- `npm install ejs`
- `npm install uglify-js -g`
- `npm install -g browserify`
- `npm install node-fetch --save` 


## Bundled JS

I bundled the separate JavaScript files in one file with [browserify](http://browserify.org/).

![](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/bundledjs.png)

## Uglify JS

After bundling the clientside Javascript I used Uglify JavaScript to minify the JavaScript.


## Minified HTML

I had a bunch of whitespace in my html on the client side, after ejs had rendered the html.
I used express-minify-html to minify html.

`npm install --save --production express-minify-html express`

```
var minifyHTML = require('express-minify-html');
 
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
```

You can use the code above to minify your html. You can also use that code to configure how you want to minify your html.

![](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/somewhitespaceremoved.png)


## Audit 

End audit on non-throttled network:

![](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/audit.png)
