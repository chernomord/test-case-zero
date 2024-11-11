export default {
  async getReverseGeocode(lat, lng) {
    return await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=67310aae2c160110891211lor601c22`
    ).then(res => res.json())
  }
}
