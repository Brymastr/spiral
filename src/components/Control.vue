<template>
  <div id="control">
    <h1 class="title">Ulam Spiral</h1>
    <div class="body">
      <div>
        <label>Zoom</label>
        <input
          id="zoom"
          class="slider"
          type="range"
          min="1"
          max="9"
          :value="zoom"
          @input="updateZoom"
        />
      </div>
      <div>
        <label>Starting Number</label>
        <input id="start" type="number" min="1" max="100000" :value="start" @input="updateStart" />
      </div>
      <div>
        <label>Ending Number</label>
        <input id="end" type="number" min="14" max="32452843" :value="end" @input="updateEnd" />
      </div>
      <div>
        <label>Color</label>
        <input id="color" type="color" :value="color" @input="updateColor" />
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
  mounted: function() {
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
  box-shadow: 5px 5px 8px #768879;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  --slider-height: 10px;
  --input-width: 150px;
  --label-width: 150px;
  --canvas-color: green;
}

h1 {
  padding: 0;
  margin: 0;
}

.body {
  text-align: start;
}

.body div {
  padding: 5px 0;
}

label {
  display: inline-block;
  min-width: var(--label-width);
}

/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: var(--input-width); /* Full-width */
  height: var(--slider-height); /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: var(--slider-height); /* Set a specific slider handle width */
  height: var(--slider-height); /* Slider handle height */
  background-color: var(--canvas-color); /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: var(--slider-height); /* Set a specific slider handle width */
  height: var(--slider-height); /* Slider handle height */
  background-color: var(--canvas-color); /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
