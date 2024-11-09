class Backend {
  constructor(storageKey = 'markers') {
    this.storageKey = storageKey;
  }

  async getMarkers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        resolve(data);
      }, 200);
    });
  }

  async addMarker(marker) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const markers = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        markers.push(marker);
        localStorage.setItem(this.storageKey, JSON.stringify(markers));
        resolve(marker);
      }, 200);
    });
  }

  async removeMarker(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const markers = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const updatedMarkers = markers.filter(marker => marker.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(updatedMarkers));
        resolve();
      }, 200);
    });
  }
}

export default Backend;
