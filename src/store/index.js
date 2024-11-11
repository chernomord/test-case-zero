import { createStore } from 'vuex';
import { markersBackend } from '@/services/Backend'
import geocode from "@/services/geocode";

export default createStore({
  state() {
    return {
      markers: [],
    };
  },

  mutations: {
    setMarkers(state, markers) {
      state.markers = markers;
    },

    addMarker(state, marker) {
      state.markers.push(marker);
    },

    removeMarker(state, markerId) {
      state.markers = state.markers.filter(marker => marker.id !== markerId);
    },
  },

  actions: {
    async loadMarkers({ commit }) {
      try {
        // Доступ к экземпляру backendPlugin через rootState
        const markers = await markersBackend.getMarkers();
        commit('setMarkers', markers);
      } catch (error) {
        console.error('Ошибка загрузки маркеров:', error);
      }
    },

    async addMarker({ commit }, marker) {
        const geocodeResp = await geocode.getReverseGeocode(marker.lat, marker.lng)

        if (geocodeResp.address) {
          const savedMarker = await markersBackend.addMarker(marker);
          commit('addMarker', savedMarker);
        } else {
          throw 'Address not found'
        }
    },

    async removeMarker({ commit }, markerId) {
      try {
        await markersBackend.removeMarker(markerId);
        commit('removeMarker', markerId);
      } catch (error) {
        console.error('Ошибка удаления маркера:', error);
      }
    },
  },

  getters: {
    markers(state) {
      return state.markers;
    },
  },
});
