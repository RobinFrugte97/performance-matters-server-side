(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var sparqlquery = `
  PREFIX dc: <http://purl.org/dc/elements/1.1/>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX wd: <http://www.wikidata.org/entity/>
  PREFIX p: <http://www.wikidata.org/prop/>
  PREFIX ps: <http://www.wikidata.org/prop/statement/>
  PREFIX pq: <http://www.wikidata.org/prop/qualifier/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

  SELECT DISTINCT ?person
 (SAMPLE(?image) as ?image)
  (SAMPLE(?title) as ?title)
  ?name ?start ?end
  WHERE {
   SERVICE <https://query.wikidata.org/sparql>
    {
     ?person p:P39 ?bn .
     ?person rdfs:label ?name .
     ?bn ps:P39 wd:Q13423495 .
     ?bn pq:P580 ?start .
     ?bn pq:P582 ?end .
     FILTER(lang(?name) = 'nl')
    }
   ?url dc:subject ?pers .
   ?pers owl:sameAs ?person .
   ?url foaf:depiction ?image .
   ?url dc:title ?title .
  }
  ORDER BY ?start
`;

var encodedquery = encodeURIComponent(sparqlquery);
var queryurl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';


exports.filter = fetch(queryurl)
.then((resp) => resp.json())
.then(function(data) {
  var rows = data.results.bindings;
    var filterInput = document.getElementById("userInput");
    filterInput.onkeyup = function(e){
      var value = e.currentTarget.value;
      var filteredBurgemeesters = [];
      for (i = 0; i < rows.length; ++i) {
        var name = rows[i]['name']['value'].toLowerCase();
        newName = name.indexOf(value);
        if (newName > -1) {
          var allDiv = document.querySelectorAll('div');
          for (j = 0; j < allDiv.length; ++j){
            allDiv[j].setAttribute('Style', 'display: none;')
            if (allDiv[j].classList.contains(rows[i]['name']['value'].slice(-4))) {
              filteredBurgemeesters.push(allDiv[j]);
            }
          }
          for (k = 0; k < filteredBurgemeesters.length; ++k) {
            filteredBurgemeesters[k].setAttribute('Style', 'display: block;')
          }
        }
      }
    }
    var filteredBurgemeesters = [];

})


if (navigator.onLine === false) {
  var offlineBar = document.getElementById("offline");
  offlineBar.setAttribute('Style', 'display: block; height: 3em;');
}

},{}]},{},[1]);
