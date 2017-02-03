Vue.component('spiral', {
  template: `
    <div class="flex-container">
      <canvas id="canvas"></canvas>
    </div>`
});

// Vue.js
var app = new Vue({
  el: '#spiral',
  data: function() {
    return {
      color: 'blue',
      primes: true,
      width: 0,
      ctx: null,
      windowWidth: 0,
      windowHeight: 0
    }
    
  },
  methods: {
    drawCanvas: function() {
      draw(this.color, this.ctx);
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    }
  },
  watch: {
    color: function(newVal, oldVal) {
      this.ctx.fillStyle = newVal;
    },
    windowWidth: function(newVal, oldVal) {
      this.drawCanvas(this.color, this.ctx);
    },
    windowHeight: function(newVal, oldVal) {
      this.drawCanvas(this.color, this.ctx);
    }
  },
  mounted: function() {
    this.ctx = document.getElementById('canvas').getContext('2d');
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth();
      this.getWindowHeight();
    })
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }
});




// Draw the canvas
function draw(color, ctx) {
  // Number of squares total
  const SQUARES = 9025;
  const START = 1;
  // Side dimensions if 
  const DIMENSION = Math.ceil(Math.sqrt(SQUARES));
  const SHOW_NUMBERS = false;
  const PRIMES = true;
  
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const spacing = 1;
  var squareSize = (screenWidth < screenHeight ? screenWidth : screenHeight) / (DIMENSION * spacing);  
  ctx.canvas.width = ctx.canvas.height = screenWidth < screenHeight ? screenWidth : screenHeight

  var i = START;
  var increment = 1;
  var direction = 0;
  var xTranslation = [1, 0, -1, 0];
  var yTranslation = [0, -1, 0, 1];

  ctx.fillStyle = color;

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

function isPrime(number) {
  for(var i = 2; i < number; i++) {
    if(number % i === 0) {
      return false;
    }
  }
  return number > 1;
}