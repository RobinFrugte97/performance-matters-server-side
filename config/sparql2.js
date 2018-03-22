var straatquery = `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
  PREFIX hg: <http://rdf.histograph.io/>

  SELECT DISTINCT ?straat ?label ?end{
    ?straat sem:hasEarliestEndTimeStamp ?end ;
    a hg:Street ;
    rdfs:label ?label .
    FILTER (year(xsd:dateTime(?end)) < 2017)
  }
  ORDER BY ?end
`;

var encodedquery2 = encodeURIComponent(straatquery);

exports.queryurl2 = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedquery2 + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';
