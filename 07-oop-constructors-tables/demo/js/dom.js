'use strict';

var marvelList = document.getElementById('marvel');
console.log(marvelList);

var civilWarLI = document.createElement('li');
civilWarLI.textContent = 'Captain America: Civil War';
marvelList.appendChild(civilWarLI);

var gg = ['Guardians: Vol 1', 'Guardians: Vol 2'];
for(var i = 0; i < gg.length; i++) {
  var movieName = gg[i];

  console.log(movieName);

  var movieElement = document.createElement('li');
  movieElement.textContent = movieName;
  marvelList.appendChild(movieElement);
}

var footer = document.createElement('footer');

var copyrightParagraph = document.createElement('p');
copyrightParagraph.textContent = 'Copyright 2018';
footer.appendChild(copyrightParagraph);

document.body.appendChild(footer);

// Query the list items?
var marvelNodes = document.querySelectorAll('li');
console.log(marvelNodes);

for(var j = 0; j < marvelNodes.length; j++) {
  var marvelNode = marvelNodes[j];

  marvelNode.style.backgroundColor = 'blue';
  marvelNode.style.color = 'pink';

  marvelNode.textContent = j + ': ' + marvelNode.textContent;
  console.log(marvelNode.style);

}
