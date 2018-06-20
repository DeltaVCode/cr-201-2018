/* globals Chart */
'use strict';

window.addEventListener('load', function onLoad() {
  initializeProducts();
  displayImages();
});

// get the next image for display
// TODO: randomize image order, without repeats
function getNextImage() {
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];

  return image;
}

var voteCount = 0;
// display the next images
function displayImages() {
  if (voteCount >= 5) {
    console.log('display results now!');
    showResults();
    return;
  }

  // TODO: Can this use an array of the images?

  // Display image1
  var image1 = getNextImage();
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;

  // Let's save the current image so we can update its vote count
  img1.currentPlaceholder = image1;
  // TODO: track that image1 was shown

  // Display image2
  var image2 = getNextImage();
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentPlaceholder = image2;
  // TODO: track that image2 was shown
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event) {
    // Track click on overall vote count
    voteCount++;

    console.log('click #' + voteCount, event.target.currentPlaceholder);
    // TODO: track that currentPlaceholder received a vote
    event.target.currentPlaceholder.voteCount ++;

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
Placeholder.all = [];

function initializeProducts() {
new Placeholder('placekitten.com', 'https://placekitten.com/g/150/150', 7, 2);
new Placeholder('fillmurray.com', 'http://fillmurray.com/150/150', 10, 10);
new Placeholder('placecage.com', 'http://placecage.com/150/150', 6, 3);

// TEMP: Add random vote/show counts so chart is interesting
for (var i = 0; i < Placeholder.all.length; i++) {
  Placeholder.all[i].voteCount = Math.floor(5 + Math.random() * 500);
  Placeholder.all[i].showCount = Math.floor(20 + Math.random() * 1000);
}

console.log('all Placeholders', Placeholder.all);
}

// Show current results
function showResults() {
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