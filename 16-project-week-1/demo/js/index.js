/* globals Papa */

// Load list of states into <select id="states">
function loadStates(states) {
  var statesEl = document.getElementById('states');
  for(var i = 0; i < states.length; i++) {
    var state = states[i];

    var optionEl = document.createElement('option');
    optionEl.value = state['Abbreviation'];
    optionEl.innerText = state['State'];
    statesEl.appendChild(optionEl);
  }
}

// Load data on window load
function loadData() {

  var csvUrl = 'data/states.csv';
  Papa.parse(csvUrl, {

    // Download CSV data from csvUrl
    download: true,

    // Use CSV header row
    header: true,

    // When CSV data are available...
    complete: function(results) {
      console.log('CSV loaded:', results.data);

      // results.data is an array of objects
      // object keys are from CSV header row
      loadStates(results.data);
    }
  });

}

window.addEventListener('load', loadData);
