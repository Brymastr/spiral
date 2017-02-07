Vue.component('spiral', {
  template: `
    <div class="flex-container">
      <canvas id="canvas"></canvas>
    </div>`,
  methods: {

  },
  data: function() {
    return {}
  }
});

// Vue.js
var app = new Vue({
  el: '#spiral',
  data: function() {
    return {
      color: 'blue',
      primes: true,
      width: 0,
      height: 0,
      squares: 9025,
      spacing: 1,
      start: 1,
      numbers: false,
      xTranslation: [1, 0, -1, 0],
      yTranslation: [0, -1, 0, 1],
      ctx: null
    }
  },
  computed: {
    dimension: function() {
      return Math.ceil(Math.sqrt(this.squares));
    },
    squareSize: function() {
      return (this.width < this.height ? this.width : this.height) / (this.dimension * this.spacing)
    }
  },
  methods: {
    getWindowWidth: function(event) {
      this.width = window.innerWidth;
    },
    getWindowHeight: function(event) {
      this.height = window.innerHeight;
    },
    isPrime: function(number) {
      for(let i = 2; i < number; i++)
        if(number % i === 0) return false;
      return number > 1;
    },
    draw: function() {
      if(this.height === 0 || this.width === 0) return;
      this.ctx.canvas.width = this.ctx.canvas.height = this.width < this.height ? this.width : this.height;
      let i = this.start;
      let increment = 1;
      let direction = 0;
      this.ctx.fillStyle = this.color;
      
      this.ctx.translate((this.dimension - 1) / 2 * (this.spacing * this.squareSize), (this.dimension - 1) / 2 * (this.spacing * this.squareSize));
      if(this.numbers) this.ctx.fillText(i, 0, 0);
      this.ctx.fillRect(0, 0, this.squareSize, this.squareSize);
      ++i;
      maxSquares:
      while(true) {                         // Total number of squares
        for(j = 0; j < 2; j++) {            // Change direction every two loops of j
          for(k = 0; k < increment; k++) {  // increases by one every two loops of j
            let translate = {x: this.xTranslation[direction % 4] * this.squareSize * this.spacing, y: this.yTranslation[direction % 4] * this.squareSize * this.spacing};
            this.ctx.save();
            this.ctx.translate(translate.x, translate.y);
            this.primes ? this.isPrime(i) && this.ctx.fillRect(0, 0, this.squareSize, this.squareSize) : this.ctx.fillRect(0, 0, this.squareSize, this.squareSize);
            if(this.numbers) this.ctx.fillText(i, 0, 0);
            if(++i > this.squares) break maxSquares;
          }
          direction++;
        }
        increment++;
      }
    }
  },
  watch: {
    color: function(newVal) {
      this.draw();
    },
    width: function(newVal) {
      this.draw();
    },
    height: function(newVal) {
      this.draw();
    },
    squares: function(newVal) {
      this.draw();
    },
    start: function(newVal) {
      this.draw();
    }
  },
  mounted: function() {
    this.ctx = document.getElementById('canvas').getContext('2d');
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth();
      this.getWindowHeight();
    });
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }
});