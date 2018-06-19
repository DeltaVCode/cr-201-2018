/* globals Chart */
'use strict';

function getNextImage() {
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];

  return image;
}

var voteCount = 0;
function displayImages() {
  if (voteCount >= 5) {
    console.log('display results now!');
    showResults();
    return;
  }

  // Display image1
  var image1 = getNextImage();
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;
  img1.currentPlaceholder = image1;

  var image2 = getNextImage();
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentPlaceholder = image2;
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event) {
    voteCount++;

    console.log('click #' + voteCount, event.target.currentPlaceholder); 

    displayImages();
  });
}

function Placeholder(name, src, testShowCount, testVoteCount) {
  this.name = name;
  this.src = src;
  this.showCount = testShowCount || 0;
  this.voteCount = testVoteCount || 0;

  Placeholder.all.push(this);
}
Placeholder.all = [];

new Placeholder('placekitten.com', 'https://placekitten.com/g/150/150', 7, 2);
new Placeholder('fillmurray.com', 'http://fillmurray.com/150/150', 10, 10);
new Placeholder('placecage.com', 'http://placecage.com/150/150', 6, 3);

// Add temporary random vote/show counts
for (var i = 0; i < Placeholder.all.length; i++) {
  Placeholder.all[i].voteCount = Math.floor(Math.random() * 50);
  Placeholder.all[i].showCount = Math.floor(Math.random() * 100);
}

console.log('all Placeholders', Placeholder.all);

window.addEventListener('load', displayImages);

function showResults() {
  var ul = document.getElementById('results');
  // reset list
  ul.innerHTML = '';

  for(var i = 0; i < Placeholder.all.length; i++) {
    var current = Placeholder.all[i];

    var li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.voteCount + ' votes';
    ul.appendChild(li);
  }

  showResultChart();
}

function showResultChart() {
  var canvas = document.getElementById('resultsCanvas');

  // Un-hide our Canvas
  canvas.style.display = 'block';

  var ctx = canvas.getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: [],
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Voting Results'
      }
    }
  });
}