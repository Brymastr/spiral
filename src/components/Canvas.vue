<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Canvas',
  props: {},
  data: () => ({
    windowWidth: 0,
    windowHeight: 0,
    canvas: null,
    ctx: null,
    primes: '',
  }),
  computed: {
    ...mapState('Primes', ['primes']),
    ...mapState('Control', ['zoom', 'start', 'end', 'color']),
    size() {
      const minSize = 0.5;
      const maxSize = 20;
      const minZoom = 1;
      const maxZoom = 9;
      let zoom = this.zoom;
      if (this.zoom < minZoom) zoom = minZoom;
      else if (this.zoom > maxZoom) zoom = maxZoom;
      const percent = (zoom - minZoom) / (maxZoom - minZoom);
      const size = percent * (maxSize - minSize) + minSize;
      return size;
    },
  },
  watch: {
    zoom() {
      this.draw();
    },
    color() {
      this.draw();
    },
    start() {
      this.draw();
    },
    end() {
      this.draw();
    },
  },
  methods: {
    ...mapActions('Primes', ['getPrimes', 'isPrime']),
    getWindowWidth: function() {
      this.windowWidth = document.documentElement.clientWidth;
    },
    isPrime(num) {
      return this.primes[num - 1] == '1';
    },
    getWindowHeight: function() {
      this.windowHeight = document.documentElement.clientHeight;
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
      let runningCount = this.start;

      this.ctx.fillStyle = this.color;

      countReached: while (true) {
        for (let i = 0; i < maxDistance; i++) {
          if (directions[direction] === 'r') currentX += this.size;
          else if (directions[direction] === 'u') currentY -= this.size;
          else if (directions[direction] === 'l') currentX -= this.size;
          else if (directions[direction] === 'd') currentY += this.size;
          if (runningCount++ >= this.end) break countReached;
          if (this.isPrime(runningCount)) {
            this.ctx.fillRect(currentX, currentY, this.size, this.size);
          }
          // this.ctx.fillText(runningCount, currentX + 5, currentY + 10);
        }
        if (++changeDistance % 2 === 0) maxDistance++;
        if (++direction === 4) direction = 0;
      }
    },
  },
  mounted: async function() {
    this.primes = await this.getPrimes();
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
