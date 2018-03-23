var express = require('express');
var minifyHTML = require('express-minify-html');
var request = require('request');
var ejs = require('ejs');
var fetch = require('node-fetch');
var app = express();
var sparql = require('./config/sparql');
var sparql2 = require('./config/sparql2');
console.log(sparql.queryurl);
console.log(sparql2.queryurl2);

express.static('global')
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', 'views');

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

app.get("/", function (req, res) {
  fetch(sparql.queryurl)
  .then((resp) => resp.json())
  .then(function(data) {
    var rows = data.results.bindings;
    return rows;
  })
  .then(function(rows){
    fetch(sparql2.queryurl2)
    .then((resp) => resp.json())
    .then(function(data2) {
      var streetRows = data2.results.bindings;
      res.render('index.ejs', {rows: rows, streetRows: streetRows});
    })
    .catch(function(error) {
      // if there is any error you will catch them here
      console.log(error);
    });
  })
  .catch(function(error) {
    // if there is any error you will catch them here
    console.log(error);
  });

})
var server = app.listen(3000, function () {
   console.log('server is running on port 3000')
})
