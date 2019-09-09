<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  name: 'Canvas',
  props: {},
  methods: {
    draw: function() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const dimensions = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ];
      canvas.width = dimensions[0];
      canvas.height = dimensions[1];

      ctx.fillStyle = 'green';
      ctx.fillRect(10, 10, 10, 10);
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      this.draw();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* canvas {
  width: 100vw;
  height: 100vh;
  display: block;
} */
</style>
