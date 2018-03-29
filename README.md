# performance-matters-server-side

## Slopende Burgemeesters

On this site you can get an overview of how many street the Mayors of Amsterdam destroyed in their term.

[Client side](https://robinfrugte97.github.io/project1-quick-hack-prototype/)


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

Use this command in the command line interface to use all components

- `npm install`


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


## Audit after performance updates

End audit on non-throttled network:

![](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/audit.png)


## Service worker

The main purpose of the site is to have an overview of the amount of streets each mayor of Amsterdam has destroyed or was destroyed during their term. To make sure you are still able to have an overview even if your network is offline, I use a service worker.
In my case, the service worker caches a couple of important files no matter what:
- The offline page
- The main css file
- The bundled JavaScript file

Furthermore, the service worker caches the pages you visit. Should your netwerk be offline, the service worker is able to give you the pages that have been cached in the past. If you visit a page that has not been cached yet when offline, the service worker will server you the offline page.

![offlinepage](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/offlinepage.png)

### Notify user

When the user visits a page while their network is offline, the user will keep a notification in the bottom of their screen to remind them they are currently visiting an offline version of the page.

![offlinenotification](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/offlinenotification.png)

## Audit after service worker

This is the performance audit after implementing the service worker:

![](https://github.com/RobinFrugte97/performance-matters-server-side/blob/master/screenshots/newaudits.png)

