<script setup>
import { defineProps } from 'vue';

defineProps({
  markers: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul v-if="markers.length">
    <li v-for="marker in markers" :key="marker.id">{{ marker.id }}</li>
  </ul>
</template>

<style scoped lang="sass">

</style>
