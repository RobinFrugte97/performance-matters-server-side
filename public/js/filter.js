exports.filter = function(){
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
}
