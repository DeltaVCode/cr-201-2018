/* globals Chart */
'use strict';

window.addEventListener('load', function onLoad() {
  loadFromStorage();

  if (Placeholder.all.length === 0) {
    initialize();
  }
  displayImages();
});

// LOCAL STORAGE!!!

// var json = '{ "name": "Keith", "age": 42, kids: ["Tabitha","Felicity"] }';

function saveAll() {
  localStorage['voteHistory'] = JSON.stringify({ voteCount: Placeholder.voteCount });
  localStorage['placeholders'] = JSON.stringify(Placeholder.all);
  console.log(localStorage);
}

function loadFromStorage() {
  var jsonVoteHistoryString = localStorage['voteHistory'];
  if (jsonVoteHistoryString) {
    var voteHistory = JSON.parse(jsonVoteHistoryString);
    Placeholder.voteCount = voteHistory.voteCount;
    console.log('setting voteCount to ' + Placeholder.voteCount);
  }

  var jsonStringFromStorage = localStorage['placeholders'];
  if (!jsonStringFromStorage)
    return;

  Placeholder.all = [];
  var arrayFromStorage = JSON.parse(jsonStringFromStorage);
  for(var i = 0; i < arrayFromStorage.length; i++) {
    var arrayItem = arrayFromStorage[i];
    new Placeholder(arrayItem.name, arrayItem.src, arrayItem.showCount, arrayItem.voteCount);
  }
  console.log('fromStorage', Placeholder.all);
}



// get the next image for display
// TODO: randomize image order, without repeats
function getNextImage() {
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];

  return image;
}

// display the next images
function displayImages() {
  if (Placeholder.voteCount >= 5) {
    console.log('display results now!');
    showResults();
    return;
  }

  document.getElementById('resultsWrapper').style.display = 'none';

  // TODO: Can this use an array of the images?

  // Display image1
  var image1 = getNextImage();
  image1.showCount++;
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;

  // Let's save the current image so we can update its vote count
  img1.currentPlaceholder = image1;
  // TODO: track that image1 was shown

  // Display image2
  var image2 = getNextImage();
  image2.showCount++;
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentPlaceholder = image2;
  // TODO: track that image2 was shown
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event) {
    // Track click on overall vote count
    Placeholder.voteCount++;

    console.log('click #' + Placeholder.voteCount, event.target.currentPlaceholder);
    // Track that currentPlaceholder received a vote
    event.target.currentPlaceholder.voteCount ++;

    saveAll();

    // After vote, replace images for new vote
    displayImages();
  });
}

function Placeholder(name, src, testShowCount, testVoteCount) {
  this.name = name;
  this.src = src;

  // If testShowCount was not provided, use 0 instead
  this.showCount = testShowCount || 0;
  // If testVoteCount was not provided, use 0 instead
  this.voteCount = testVoteCount || 0;

  // Add this instance to our catalog of all Placeholders
  Placeholder.all.push(this);
}

function initialize() {
  Placeholder.voteCount = 0;
  Placeholder.all = [];

  new Placeholder('placekitten.com', 'https://placekitten.com/g/150/150');
  new Placeholder('fillmurray.com', 'http://fillmurray.com/150/150');
  new Placeholder('placecage.com', 'http://placecage.com/150/150');

  console.log('initialize Placeholders', Placeholder.all);
  saveAll();
}

// Show current results
function showResults() {
  document.getElementById('resultsWrapper').style.display = 'block';

  var ul = document.getElementById('results');
  // reset list
  ul.innerHTML = '';

  // For each placeholder image...
  for(var i = 0; i < Placeholder.all.length; i++) {
    var current = Placeholder.all[i];

    // Add it to <ul id="results">
    var li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.voteCount + ' votes';
    ul.appendChild(li);
  }

  // Also, show chart with current results
  showResultChart();
}

function showResultChart() {
  // Chart must attach to a Canvas
  var canvas = document.getElementById('resultsCanvas');

  // Un-hide our chart Canvas
  canvas.style.display = 'block';

  // Arrays for our different data sets
  // Will have one entry per Placeholder;
  // all arrays should be the same length
  var labels = [];
  var voteCounts = [];
  var showCounts = [];
  var votePercentage = [];

  // For each Placeholder instance...
  for (var i = 0; i < Placeholder.all.length; i++) {
    labels[i] = Placeholder.all[i].name;
    voteCounts[i] = Placeholder.all[i].voteCount;
    showCounts[i] = Placeholder.all[i].showCount;

    // Calculate percentage of times image got votes out of all times shown
    votePercentage[i] = 100 * voteCounts[i] / showCounts[i];
  }

  // Chart operates on the Canvas's 2d context
  var ctx = canvas.getContext('2d');

  // Create a new Chart linked to our Canvas
  new Chart(ctx, {
    // bar chart: http://www.chartjs.org/docs/latest/charts/bar.html
    type: 'bar',

    // Chart data uses the same-sized arrays created above
    data: {
      labels: labels, // product names
      datasets: [
        {
          label: 'Vote Count',
          backgroundColor: 'rgb(200,0,0,0.6)',
          data: voteCounts // product vote counts
        },
        {
          label: 'Show Count',
          backgroundColor: 'rgb(0,0,200,0.4)',
          data: showCounts // product shown counts
        },
        {
          label: 'Vote %',
          data: votePercentage // vote percentage of times shown
        }
      ]
    },
    options: {
      // automatically redraw chart when canvas is resized
      // http://www.chartjs.org/docs/latest/general/responsive.html
      responsive: true,

      // http://www.chartjs.org/docs/latest/axes/cartesian/
      scales: {
        // Our primary X-axis is categories
        // http://www.chartjs.org/docs/latest/axes/cartesian/category.html
        // xAxes: [...] // default xAxes work fine, so no config necessary

        yAxes: [
          // Our primary Y-axis is linear
          // http://www.chartjs.org/docs/latest/axes/cartesian/linear.html
          {
            ticks: {
              beginAtZero: true
            }
          }
          // TODO: secondary Y-axis for Vote %
        ]
      },

      // http://www.chartjs.org/docs/latest/configuration/title.html
      title: {
        display: true,
        text: 'Voting Results'
      }

      // Lots of other configuration options could go here...
      // http://www.chartjs.org/docs/latest/configuration/
    }
  });
}

var resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', function resetClick(event) {
  console.log('reset click', event);
  initialize();
  displayImages();
});
