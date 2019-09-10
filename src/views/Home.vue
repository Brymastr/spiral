<template>
  <div class="home">
    <Canvas />
  </div>
</template>

<script>
// @ is an alias to /src
import Canvas from '@/components/Canvas.vue';
import Control from '@/components/Control.vue';

export default {
  name: 'home',
  components: {
    Canvas,
    Control,
  },
};
</script>
