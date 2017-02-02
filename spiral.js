// Number of squares total
const SQUARES = 9025;
const START = 1;
// Side dimensions if 
const DIMENSION = Math.ceil(Math.sqrt(SQUARES));
const SHOW_NUMBERS = false;
const PRIMES = true;

// Draw the canvas
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const spacing = 1.1;
  var squareSize = (screenWidth < screenHeight ? screenWidth : screenHeight) / (DIMENSION * spacing);  
  ctx.canvas.width = ctx.canvas.height = screenWidth < screenHeight ? screenWidth : screenHeight

  ctx.fillStyle = 'blue';
  var i = START;
  var increment = 1;
  var direction = 0;
  var xTranslation = [1, 0, -1, 0];
  var yTranslation = [0, -1, 0, 1];

  ctx.translate((DIMENSION - 1) / 2 * (spacing * squareSize), (DIMENSION - 1) / 2 * (spacing * squareSize))
  if(SHOW_NUMBERS) ctx.fillText(i, 0, 0);
  ctx.fillRect(0, 0, squareSize, squareSize);  
  ++i;
  maxSquares:
  while(1) {                                 // Total number of squares
    for(j = 0; j < 2; j++) {            // Change direction every two loops of j
      for(k = 0; k < increment; k++) {  // increases by one every two loops of j
        translate = {x: xTranslation[direction % 4] * squareSize * spacing, y: yTranslation[direction % 4] * squareSize * spacing}
        ctx.save();
        ctx.translate(translate.x, translate.y);
        PRIMES ? isPrime(i) && ctx.fillRect(0, 0, squareSize, squareSize) : ctx.fillRect(0, 0, squareSize, squareSize);
        if(SHOW_NUMBERS) ctx.fillText(i, 0, 0);
        i++;
        if(i > SQUARES) break maxSquares;
      }
      
      direction++;
    }
    increment++;
  }

}

var addEvent = function(object, type, callback) {
  if(!object) return;
  if(object.addEventListener) object.addEventListener(type, callback, false);
  else if(object.attachEvent) object.attachEvent('on' + type, callback);
  else object['on'+type] = callback;
};
window.onload = draw();
addEvent(window, 'resize', draw);

function isPrime(number) {
  for(var i = 2; i < number; i++) {
    if(number % i === 0) {
      return false;
    }
  }
  return number > 1;
}