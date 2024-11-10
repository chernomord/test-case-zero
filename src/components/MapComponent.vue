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
    markers.forEach(marker => {
      L.marker([marker.lat, marker.lng]).addTo(markerLayerGroup);
    });
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
        // Множество для хранения ID маркеров из старого списка
        const oldMarkerIds = new Set(oldMarkers.map(marker => marker.id));
        // Добавляем только новые маркеры, которых не было в старом списке
        newMarkers
          .filter(marker => !oldMarkerIds.has(marker.id)) // Проверяем, что маркера нет в старом списке
          .forEach(marker => addMarkerToGroup(marker)); // Добавляем только новые маркеры
      },
      { deep: true }
    );
  });

  // Очистка карты при уничтожении компонента
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

    // Удаление `markerLayerGroup` для предотвращения утечек памяти
    if (markerLayerGroup) {
      markerLayerGroup.clearLayers();
      markerLayerGroup.remove();
      markerLayerGroup = null;
    }
  }

  function addMarkerToGroup(marker) {
    L.marker([marker.lat, marker.lng]).addTo(markerLayerGroup);
  }

  function onMapClick(e) {
    const newMarker = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };
    emit('addMarker', newMarker); // Эмитим событие с новым маркером
  }

</script>

<template>
  <div id="map-container">
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
</style>
