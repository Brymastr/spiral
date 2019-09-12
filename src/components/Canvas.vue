<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  name: 'Canvas',
  props: {},
  data: () => ({
    color: 'green',
    zoom: 1,
    start: 1,
    count: 1000000,
    size: 1,

    windowWidth: 0,
    windowHeight: 0,
    canvas: null,
    ctx: null,
  }),
  methods: {
    getPrimes: async function() {
      const result = await fetch('http://192.168.0.119:3000');
      console.log(result);
      const primes = await result.text();
      console.log(primes.length);
    },
    getWindowWidth: function() {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight: function() {
      this.windowHeight = document.documentElement.clientHeight;
    },
    isPrime: function(num) {
      return primes[num - 1] == '1';
    },
    draw: function() {
      this.canvas.width = this.windowWidth;
      this.canvas.height = this.windowHeight;

      const middleX = this.windowWidth / 2 - this.size / 2;
      const middleY = this.windowHeight / 2 - this.size / 2;

      let currentX = middleX;
      let currentY = middleY;
      const directions = ['r', 'u', 'l', 'd'];
      let direction = 0;
      let maxDistance = 1;
      let changeDistance = 0;
      let runningCount = 1;

      this.ctx.fillStyle = this.color;

      countReached: while (true) {
        for (let i = 0; i < maxDistance; i++) {
          if (directions[direction] === 'r') currentX += this.size;
          else if (directions[direction] === 'u') currentY -= this.size;
          else if (directions[direction] === 'l') currentX -= this.size;
          else if (directions[direction] === 'd') currentY += this.size;
          if (this.isPrime(runningCount))
            this.ctx.fillRect(currentX, currentY, this.size, this.size);
          if (runningCount++ === this.count) break countReached;
        }
        if (++changeDistance % 2 === 0) maxDistance++;
        if (++direction === 4) direction = 0;
      }
    },
  },
  mounted: function() {
    this.getPrimes();
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth();
      this.getWindowHeight();
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d', { alpha: true });
      this.draw();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  display: block;
}
</style>
