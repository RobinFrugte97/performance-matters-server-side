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
  window.alert("Dit is een offline versie van de pagina")
}
