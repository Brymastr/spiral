// Number of squares total
const squares = 100;
const dimension = Math.floor(Math.sqrt(squares));

// Draw the canvas
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  const spacing = 1.1;
  ctx.canvas.width = ctx.canvas.height = screenWidth < screenHeight ? screenWidth : screenHeight

  var squareSize = (screenWidth < screenHeight ? screenWidth : screenHeight) / (dimension * spacing);
  console.log(squareSize);
  ctx.fillStyle = 'blue';
  for(j = 0; j < dimension; j++) {
    for(i = 0; i < dimension; i++) {
      ctx.save();
      ctx.translate(/* x position */ i * squareSize * spacing, /* y position */ j * squareSize * spacing)
      ctx.fillRect(0, 0, /* x length */ squareSize, /* y length */ squareSize);
      ctx.restore();
    }
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
