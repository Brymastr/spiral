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
    count: 100,

    windowWidth: 0,
    windowHeight: 0,
    canvas: null,
    ctx: null,
  }),
  methods: {
    getWindowWidth: function() {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight: function() {
      this.windowHeight = document.documentElement.clientHeight;
    },
    draw: function() {
      this.canvas.width = this.windowWidth;
      this.canvas.height = this.windowHeight;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, 10, 10);
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth();
      this.getWindowHeight();
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d', { alpha: false });
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
