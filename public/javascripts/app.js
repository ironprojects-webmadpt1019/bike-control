document.addEventListener("DOMContentLoaded", () => {
  // the mapbox map
  const map = setMap();
  //geolocate the user
  geolocation().then(geo => {
    const { latitude, longitude } = geo.coords;
    const center = [longitude, latitude];
    map.setCenter(center);
  });
});
