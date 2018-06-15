function f1() {
  var x = 'f1';

  f2();
}

function f2() {
  var y = 'f2';

  f3(y);
}

function f3(y) {
  var z = y + 'f3';
  console.log(z);

  console.log('hello from f3!');

  foo;
  throw new Error('this is broken');
}

try {
  f1();
  f2();
  f3();
  console.log('done without errors!');
} catch (err) {
  console.error(err);
  document.body.innerHTML = '<h1>Something terrible happened! ' + err.name + '</h1>';
} finally {
  console.log('done done, regardless of errors');
}


var clickCount = 0;
document.addEventListener('click', function handleClick(event) {
  // debugger; // don't leave this in your code!
  console.log('click', event);
  document.querySelector('h1').innerText = ++clickCount;
  document.body.appendChild(document.createElement('span'));
});
