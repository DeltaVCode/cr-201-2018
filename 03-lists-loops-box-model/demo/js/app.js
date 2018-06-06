'use strict';

// this is illegal!
/*
foo = 'bar';

console.log('foo is ' + foo);
*/

/*
var answer = prompt('Do you think yes or no?');
var sanitizedAnswer = answer.toUpperCase().trim();

// Don't do this:
if (answer === 'Y' || answer === 'y'
     || answer === 'yes' || answer === 'YES'
     || answer === 'Yes' || answer === 'yEs') {
  alert('yes!');
}
// Do this instead for checking regardless of case
else if (sanitizedAnswer === 'N'
        || sanitizedAnswer === 'NO') {
  alert(answer + ' means no!');
}
else {
  alert('I did not recognize that response!');
}
*/

var guess = prompt('What is my favorite number?');
console.log('Guess is: ' + guess);
var guessCount = 1;

while (guess !== '2') {

  if (guess === null) {
    console.log('Guess is null; breaking');

    // Escape the loop!
    break;
  }

  var promptWarning = 'Wrong!';
  if (guess > 2) {
    promptWarning = 'Too high!';
  } else if (guess < 0) {
    promptWarning = 'Weirdos like negative numbers!';
  } else {
    promptWarning = 'Too low!';
  }
  console.log(promptWarning);

  guess = prompt(promptWarning + ' Try again: what is my favorite number?');

  console.log('Guess is: ' + guess);

  guessCount = guessCount + 1;

  console.log('guessCount is ' + guessCount);
  console.log('end of while loop');
}

console.log('while loop exited');

if (guess === null) {
  alert('wimp');
} else {
  console.log('not a wimp');

  if (guessCount === 1) {
    alert('Right on the first try!'); 
  } else {
    alert('It took ' + guessCount + ' guesses to get it right!');
  }

}

