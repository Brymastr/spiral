<script lang="ts">
  import { onMount } from "svelte";

  export let zoom: number;
  export let start: number;
  export let end: number;
  export let color: string;

  let controlContainer: HTMLElement;
  let ready = false;

  onMount(() => {
    controlContainer.style.setProperty("--canvas-color", color);
    ready = true;
  });

  $: {
    if (ready) {
      document
        .getElementById("control")
        .style.setProperty("--canvas-color", color);
    }
  }
</script>

<template>
  <div id="control" bind:this={controlContainer}>
    <h1>Ulam Spiral</h1>
    <label for="zoom">Zoom</label>
    <input
      id="zoom"
      class="slider"
      type="range"
      min="1"
      max="9"
      bind:value={zoom}
    />
    <label for="start">Starting Number</label>
    <input id="start" type="number" min="1" max="100000" bind:value={start} />
    <label for="end">Ending Number</label>
    <input id="end" type="number" min="14" max="32452843" bind:value={end} />
    <label for="color">Color</label>
    <input id="color" type="color" bind:value={color} />
  </div>
</template>

<style>
  #control {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    box-shadow: 2px 2px 4px #868686;
    border-radius: 5px;
    padding: 10px;
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 10px;
    --width: 300px;
    --slider-height: 15px;
    --canvas-color: black;
    width: var(--width);
    opacity: 0.7;
    transition: opacity 0.2s, box-shadow 0.2s;
  }

  #control:hover {
    opacity: 1;
    box-shadow: 5px 5px 8px #868686;
  }

  h1 {
    grid-column: span 2;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  label,
  input {
    width: calc(var(--width) / 2.2);
  }

  input[type="range"] {
    width: calc(var(--input-width) + 5px);
    margin-left: 0;
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

  #color {
    cursor: pointer;
  }
</style>
