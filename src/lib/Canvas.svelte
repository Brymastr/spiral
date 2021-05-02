<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let ready = false;

  onMount(() => {
    ctx = canvas.getContext("2d", { alpha: true });
    draw();
    ready = true;
  });

  $: {
    if (ready && (zoom || primes || color || start || end)) {
      draw();
    }
  }

  const directions = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1],
  ];

  function isPrime(num: number) {
    return primes[num - 1] == "1";
  }

  export let primes = "";
  export let zoom: number;
  export let color: string;
  export let start: number;
  export let end: number;

  function getHeight() {
    return document.documentElement.clientHeight;
  }
  function getWidth() {
    return document.documentElement.clientWidth;
  }

  function getItemSize() {
    const minSize = 0.5;
    const maxSize = 20;
    const minZoom = 1;
    const maxZoom = 9;
    if (zoom < minZoom) zoom = minZoom;
    else if (zoom > maxZoom) zoom = maxZoom;
    const percent = (zoom - minZoom) / (maxZoom - minZoom);
    const size = percent * (maxSize - minSize) + minSize;
    return size;
  }

  function draw() {
    let stretchIndex = 0;
    let stretchLength = 1;
    let stretchTraversed = 0;

    const itemSize = getItemSize();
    const windowWidth = getWidth();
    const windowHeight = getHeight();
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    ctx.fillStyle = color;
    let currentX = windowWidth / 2 - itemSize / 2;
    let currentY = windowHeight / 2 - itemSize / 2;

    for (let i = 0, j = start; j < end; i++, j++) {
      if (isPrime(j)) ctx.fillRect(currentX, currentY, itemSize, itemSize);
      const [xDirection, yDirection] = directions[stretchIndex % 4];
      currentX += xDirection * itemSize;
      currentY += yDirection * itemSize;

      stretchTraversed++;
      if (stretchTraversed >= stretchLength) {
        stretchIndex++;
        stretchTraversed = 0;
        if (stretchIndex % 2 === 0) ++stretchLength;
      }
    }
  }
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    display: block;
    height: 100%;
  }
</style>
