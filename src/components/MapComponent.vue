<script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';

  // Определяем входные параметры и событие
  const props = defineProps({
    markers: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['addMarker']);

  const map = ref(null);
  const isAddMarkerMode = ref(false);
  let markerLayerGroup = null; // Слой для группировки маркеров
  let markersWatcher = null;   // Ссылка на вотчер для props.markers

  // Функция для добавления маркеров на карту
  const addMarkersToMap = (markers) => {
    // Удаляем предыдущие маркеры, если они есть
    if (markerLayerGroup) {
      markerLayerGroup.clearLayers();
    }

    // Создаем новый слой для маркеров
    markerLayerGroup = L.layerGroup().addTo(map.value);

    // Добавляем каждый маркер из массива markers
    markers.forEach(marker => { addMarkerToGroup(marker) });
  };

  const centerMapOnUserLocation = (map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.value.setView([latitude, longitude], 13); // Устанавливаем центр карты по локации
        },
        (error) => {
          console.error("Ошибка при получении локации пользователя:", error);
        }
      );
    } else {
      console.error("Geolocation API не поддерживается вашим браузером.");
    }
  };

  // Инициализация карты
  onMounted(() => {
    initMap(map)

    centerMapOnUserLocation(map)

    addMarkersToMap(props.markers)
    markersWatcher = watch(
      () => [...props.markers],
      (newMarkers, oldMarkers) => {
        const oldMarkerIds = new Set(oldMarkers.map(marker => marker.id));
        // Добавляем только новые маркеры, которых не было в старом списке
        newMarkers
          .filter(marker => !oldMarkerIds.has(marker.id)) // Проверяем, что маркера нет в старом списке
          .forEach(marker => addMarkerToGroup(marker)); // Добавляем только новые маркеры
      },
      { deep: true }
    );
  });

  onUnmounted(() => {
    removeMap(map);

    if (markersWatcher) {
      markersWatcher(); // Убираем вотчер
      markersWatcher = null;
    }
  });

  function initMap(map) {
    if (!map.value) {
      map.value = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map.value);
      map.value.on('click', onMapClick)
    }
  }

  function removeMap(map) {
    if (map.value) {
      map.value.removeEventListener('click', onMapClick);
      map.value.remove();
      map.value = null;
    }

    if (markerLayerGroup) {
      markerLayerGroup.clearLayers();
      markerLayerGroup.remove();
      markerLayerGroup = null;
    }
  }

  function addMarkerToGroup(marker) {
    L.marker([marker.lat, marker.lng]).addTo(markerLayerGroup).bindTooltip(
      `<strong>ID: ${marker.id}</strong><br>Lat: ${marker.lat}, Lng: ${marker.lng}`,
      {
        permanent: false,
        direction: 'top',
        offset: L.point(-15, -12)
      }
    );
  }

  function onMapClick(e) {
    if (isAddMarkerMode.value) {
      const newMarker = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      emit('addMarker', newMarker);
    }
  }

  function addMarkerToggle() {
    isAddMarkerMode.value = !isAddMarkerMode.value;
  }

</script>

<template>
  <div id="map-container">
    <div class="button-container">
      <v-btn
        icon="mdi-plus"
        size="small"
        class="bg-blue-darken-1"
        :class="{'bg-green': isAddMarkerMode}"
        @click="addMarkerToggle"/>
    </div>
    <div id="map"></div>
  </div>
</template>

<style>
  #map-container {
    width: 100%;
    height: 500px;
    position: relative;
  }

  #map {
    width: 100%;
    height: 100%;
  }

  .button-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .map-outlined {
    outline: 6px darkgreen solid;
  }
</style>
