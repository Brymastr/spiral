Vue.component('spiral', {
  template: `
    <div class="flex-container">
      <canvas id="canvas"></canvas>
    </div>`
});

Vue.component('controls', {
  props: ['color', 'squares', 'start'],
  template: `
    <div id="controls">
      <input type="number" id="numberOfSquares" placeholder="Squares" v-bind:value="squares"/>
      <input type="number" id="startingNumber" placeholder="Starting number"/>
      <input type="text" id="squareColor" placeholder="Color"/>
    </div>`,
  data: function() {
    return {}
  }
});

// Vue.js
var app = new Vue({
  el: '#spiral',
  data: function() {
    return {
      params: {
        color: null,
        primes: true,
        ctx: null,
        width: 0,
        height: 0,
        squares: 10,
        start: 1
      }
    }
  },
  methods: {
    drawCanvas: function() {
      draw(this.params);
    },
    getWindowWidth: function(event) {
      this.params.width = window.innerWidth;
    },
    getWindowHeight: function(event) {
      this.params.height = window.innerHeight;
    }
  },
  watch: {
    'params.color': function(newVal) {
      this.params.ctx.fillStyle = newVal;
      this.drawCanvas();
    },
    'params.width': function(newVal) {
      this.drawCanvas();
    },
    'params.height': function(newVal) {
      this.drawCanvas();
    },
    'params.squares': function(newVal) {
      this.drawCanvas();
    },
    'params.start': function(newVal) {
      this.drawCanvas();
    }
  },
  mounted: function() {
    this.params.ctx = document.getElementById('canvas').getContext('2d');
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
function draw(params) {
  
  // Parameters
  const SQUARES = params.squares;
  const screenWidth = params.width;
  const screenHeight = params.height;
  const START = 1;
  const SHOW_NUMBERS = false;
  const PRIMES = true;
  const SPACING = 1;
  const CANVAS = params.ctx;
  const DIMENSION = Math.ceil(Math.sqrt(SQUARES));
  var squareSize = (screenWidth < screenHeight ? screenWidth : screenHeight) / (DIMENSION * SPACING);
  CANVAS.canvas.width = CANVAS.canvas.height = screenWidth < screenHeight ? screenWidth : screenHeight;

  var i = START;
  var increment = 1;
  var direction = 0;
  const xTranslation = [1, 0, -1, 0];
  const yTranslation = [0, -1, 0, 1];

  CANVAS.fillStyle = params.color;

  CANVAS.translate((DIMENSION - 1) / 2 * (SPACING * squareSize), (DIMENSION - 1) / 2 * (SPACING * squareSize));
  if(SHOW_NUMBERS) CANVAS.fillText(i, 0, 0);
  CANVAS.fillRect(0, 0, squareSize, squareSize);
  ++i;

  maxSquares:
  while(1) {                            // Total number of squares
    for(j = 0; j < 2; j++) {            // Change direction every two loops of j
      for(k = 0; k < increment; k++) {  // increases by one every two loops of j
        translate = {x: xTranslation[direction % 4] * squareSize * SPACING, y: yTranslation[direction % 4] * squareSize * SPACING};
        CANVAS.save();
        CANVAS.translate(translate.x, translate.y);
        PRIMES ? isPrime(i) && CANVAS.fillRect(0, 0, squareSize, squareSize) : CANVAS.fillRect(0, 0, squareSize, squareSize);
        if(SHOW_NUMBERS) CANVAS.fillText(i, 0, 0);
        if(++i > SQUARES) break maxSquares;
      }
      direction++;
    }
    increment++;
  }
}

function isPrime(number) {
  for(var i = 2; i < number; i++)
    if(number % i === 0) return false;
  return number > 1;
}