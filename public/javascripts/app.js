document.addEventListener("DOMContentLoaded", async () => {
  // the mapbox map
  const map = setMap();
  //geolocate the user
  geolocation().then(geo => {
    const { latitude, longitude } = geo.coords;
    const center = [longitude, latitude];
    map.setCenter(center);
  });
  //add user location point(bottom)
  map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    }),
    "bottom-left"
    );

  map.on("load", function() {
    reportsApi.get().then(res => {
      const reports = res.data;

      const data = reports.map(e => ({
        type: "Feature",
        geometry: e.location
      }));

      map.addSource("reports", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data
        }
      });
      map.addLayer({
        id: "population",
        type: "circle",
        source: "reports",
        paint: {
          // make circles larger as the user zooms from z12 to z22
          "circle-radius": {
            base: 1.75,
            stops: [
              [12, 2],
              [22, 180]
            ]
          },
          "circle-color": "#ffffff"
        }
      });
    });
  });
});
