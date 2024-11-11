import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import MapPage from './Map.vue';
import MarkersList from '@/components/MarkersList.vue';
import MapComponent from '@/components/MapComponent.vue';

describe('MapPage.vue', () => {
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    // Mocking Vuex store
    actions = {
      loadMarkers: jest.fn(),
      addMarker: jest.fn(),
    };

    getters = {
      markers: () => [
        { id: 1, name: 'Marker 1', lat: 51.505, lng: -0.09 },
        { id: 2, name: 'Marker 2', lat: 51.515, lng: -0.1 },
      ],
    };

    store = createStore({
      actions,
      getters,
    });
  });

  it('должен рендерить компонент и отображать заголовок', () => {
    const wrapper = shallowMount(MapPage, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('h1').text()).toBe('Map Page');
  });

  it('должен загружать маркеры при монтировании', () => {
    shallowMount(MapPage, {
      global: {
        plugins: [store],
      },
    });
    expect(actions.loadMarkers).toHaveBeenCalled();
  });

  it('передаёт markers как prop в компонент MarkersList', () => {
    const wrapper = shallowMount(MapPage, {
      global: {
        plugins: [store],
      },
    });
    const markersList = wrapper.findComponent(MarkersList);
    expect(markersList.props('markers')).toEqual(getters.markers());
  });

  it('передаёт markers как prop в компонент MapComponent', () => {
    const wrapper = shallowMount(MapPage, {
      global: {
        plugins: [store],
      },
    });
    const mapComponent = wrapper.findComponent(MapComponent);
    expect(mapComponent.props('markers')).toEqual(getters.markers());
  });

  it('вызывает action addMarker при срабатывании события add-marker от MapComponent', async () => {
    const wrapper = shallowMount(MapPage, {
      global: {
        plugins: [store],
      },
    });

    const mapComponent = wrapper.findComponent(MapComponent);
    const newMarker = { id: 3, name: 'Marker 3', lat: 51.52, lng: -0.12 };

    await mapComponent.vm.$emit('add-marker', newMarker);

    expect(actions.addMarker).toHaveBeenCalledWith(expect.anything(), newMarker, undefined);
  });

  it('отображает сообщение об ошибке при ошибке в addMarker', async () => {
    actions.addMarker.mockImplementationOnce(() => {
      throw new Error('Address not found');
    });

    global.alert = jest.fn(); // Мокаем глобальный alert

    const wrapper = shallowMount(MapPage, {
      global: {
        plugins: [store],
      },
    });

    const mapComponent = wrapper.findComponent(MapComponent);
    const newMarker = { id: 4, name: 'Invalid Marker', lat: 0, lng: 0 };

    await mapComponent.vm.$emit('add-marker', newMarker);

    expect(global.alert).toHaveBeenCalledWith('Ошибка: адрес не найден');
  });
});
