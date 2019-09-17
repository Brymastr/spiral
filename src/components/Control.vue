<template>
  <div id="control">
    <h1 class="title">Ulam Spiral</h1>
    <div class="body">
      <div>
        <label>Zoom</label>
        <input class="slider" type="range" min="1" max="9" :value="zoom" @input="updateZoom" />
      </div>
      <div>
        <label>Starting Number</label>
        <input type="number" min="1" max="100000" :value="start" @input="updateStart" />
      </div>
      <div>
        <label>Ending Number</label>
        <input type="number" min="14" max="32452843" :value="end" @input="updateEnd" />
      </div>
      <div>
        <label>Color</label>
        <input type="color" :value="color" @input="updateColor" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Control',
  props: {},
  computed: {
    ...mapState('Control', ['zoom', 'color', 'start', 'end']),
  },
  methods: {
    ...mapActions('Control', ['setZoom', 'setColor', 'setStart', 'setEnd']),
    updateZoom(e) {
      this.setZoom(e.target.value);
    },
    updateColor(e) {
      this.setColor(e.target.value);
      this.setSliderColor();
    },
    updateStart(e) {
      this.setStart(e.target.value);
    },
    updateEnd(e) {
      this.setEnd(e.target.value);
    },
    setSliderColor() {
      document
        .getElementById('control')
        .style.setProperty('--canvas-color', this.color);
    },
  },
  mounted() {
    this.setSliderColor();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#control {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  box-shadow: 2px 2px 4px #929993;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  --slider-height: 15px;
  --input-width: 150px;
  --label-width: 150px;
  --canvas-color: black;
  opacity: 0.7;
  transition: opacity 0.2s, box-shadow 0.2s;
}

input {
  width: var(--input-width);
}

input[type='range'] {
  width: calc(var(--input-width) + 5px);
  margin-left: 0;
}

#control:hover {
  opacity: 1;
  box-shadow: 5px 5px 8px #768879;
}

h1 {
  padding: 0;
  margin: 0;
}

.body {
  text-align: start;
}

.body div {
  padding: 7px 0;
}

label {
  display: inline-block;
  min-width: var(--label-width);
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: var(--input-width);
  height: var(--slider-height);
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--slider-height);
  height: var(--slider-height);
  background-color: var(--canvas-color);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: var(--slider-height);
  height: var(--slider-height);
  background-color: var(--canvas-color);
  cursor: pointer;
}
</style>
