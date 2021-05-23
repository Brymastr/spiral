<script lang="ts">
  import Canvas from './lib/Canvas.svelte';
  import Control from './lib/Control.svelte';
  import { onMount } from 'svelte';

  interface StorageData {
    zoom: number;
    start: number;
    end: number;
    color: string;
  }

  const localStorageKey = 'spiral.dorsay.dev';

  const defaultData: StorageData = {
    zoom: 7,
    start: 1,
    end: 1000,
    color: '#23b3b0',
  };

  let zoom = defaultData.zoom;
  let start = defaultData.start;
  let end = defaultData.end;
  let color = defaultData.color;
  let primes = '01101010001010';
  let ready = false;

  onMount(async () => {
    let localData = localStorage.getItem(localStorageKey);
    if (!localData) {
      localData = setStorage(defaultData);
    }

    const allPrimesResponse = await fetch('primes.dat');
    const allPrimes = await allPrimesResponse.text();

    const newData: StorageData = JSON.parse(localData);

    zoom = newData.zoom;
    start = newData.start;
    end = newData.end;
    color = newData.color;
    primes = allPrimes;

    ready = true;
  });

  $: {
    if (ready) setStorage({ zoom, start, end, color });
  }

  function setStorage(data: StorageData) {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(localStorageKey, stringifiedData);
    return stringifiedData;
  }
</script>

<main>
  <Control bind:zoom bind:start bind:end bind:color />
  <Canvas {zoom} {start} {end} {color} {primes} />
</main>

<style>
  :global(body) {
    margin: 0;
  }
  main {
    height: 100vh;
    width: 100vw;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1b2631;
  }
</style>
