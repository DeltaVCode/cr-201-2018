'use strict';

function getNextImage() {
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];

  return image;
}

var voteCount = 0;
function displayImages() {
  if (voteCount >= 25) {
    console.log('display results now!');
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

function Placeholder(name, src) {
  this.name = name;
  this.src = src;

  Placeholder.all.push(this);
}
Placeholder.all = [];

new Placeholder('placekitten.com', 'https://placekitten.com/g/150/150');
new Placeholder('fillmurray.com', 'http://fillmurray.com/150/150');
new Placeholder('placecage.com', 'http://placecage.com/150/150');

console.log('all Placeholders', Placeholder.all);

window.addEventListener('load', displayImages);