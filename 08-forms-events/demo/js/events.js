'use strict';

// Most basic event listener
function logResize(event) {
  console.log('resize!', event);
}
// window.addEventListener('resize', logResize);

function mouseMoveLogger(event) {
  console.log('mouse move!', event);
}
// window.addEventListener('mousemove', mouseMoveLogger);

function button1Clicked(event) {
  console.log(event);
}
