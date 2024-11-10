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
  <v-list>
    <v-list-item
      v-for="marker in markers"
      :key="marker.id"
    >
      <v-list-item-title>Маркер №{{ marker.id }}</v-list-item-title>
      <v-list-item-subtitle>{{ marker.lat }}, {{ marker.lng }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="sass">

</style>
