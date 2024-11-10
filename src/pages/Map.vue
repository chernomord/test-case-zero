<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MarkersList from "@/components/MarkersList.vue";
import MapComponent from "@/components/MapComponent.vue";

const store = useStore();

const markers = computed(() => store.getters.markers);

onMounted(() => {
  store.dispatch('loadMarkers');
});

const onAddMarker = (marker) => {
  console.log(marker);
  store.dispatch('addMarker', marker);
}

</script>

<template>
  <v-container>
    <h1>Map Page</h1>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <MarkersList :markers="markers"/>
        </v-col>
        <v-col cols="12" md="8">
          <MapComponent
            :markers="markers"
            @add-marker="onAddMarker"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped lang="sass">

</style>
