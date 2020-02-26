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
    //paint UserReports
    reportsApi.get().then(res => {
      const reports = res.data;

      const data = reports.map(e => ({
        type: "Feature",
        geometry: e.location,
        properties: e.properties
      }));

      map.addSource("reports", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data
        }
      });
      map.addLayer({
        id: "reports",
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
          "circle-color": [
            "match",
            ["get", "incident"],
            "Theft",
            "#cf000f",
            "Damage",
            "#f9690e",
            "Other",
            "#eeee00",
            "#ccc"
          ],
          "circle-opacity": 0.5
        }
      });
      map.addLayer(
        {
          id: "reports-heat",
          type: "heatmap",
          source: "reports",
          maxzoom: 14,
          paint: {
            // increase weight as diameter breast height increases
            "heatmap-weight": {
              property: "dbh",
              type: "exponential",
              stops: [
                [1, 0],
                [62, 1]
              ]
            },
            // increase intensity as zoom level increases
            "heatmap-intensity": {
              stops: [
                [11, 1],
                [14, 3]
              ]
            },
            // assign color values be applied to points depending on their density
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(240, 255, 0, 0)",
              0.2,
              "rgba(249, 191, 59, 1)",
              0.4,
              "rgba(243, 156, 18, 1)",
              0.6,
              "rgba(249, 105, 14, 1)",
              0.8,
              "rgba(207, 0, 15, 1)"
            ],
            // increase radius as zoom increases
            "heatmap-radius": {
              stops: [
                [11, 15],
                [14, 20]
              ]
            },
            // decrease opacity to transition into the circle layer
            "heatmap-opacity": {
              default: 1,
              stops: [
                [13, 1],
                [14, 0]
              ]
            }
          }
        },
        "waterway-label"
      );
      map.on("click", "reports", function(e) {
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(e.features[0].properties.incident)
          .addTo(map);
      });
    });

    //paint UserBikess
    bikesApi.get().then(res => {
      const bikes = res.data;
      const data = bikes.map(e => ({
        type: "Feature",
        geometry: e.location,
        properties: { model: e.model }
      }));
      map.addSource("bikes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data
        }
      });
      map.addLayer({
        id: "bikes",
        type: "circle",
        source: "bikes",
        paint: {
          // make circles larger as the user zooms from z12 to z22
          "circle-radius": {
            base: 1.5,
            stops: [
              [12, 2],
              [22, 180]
            ]
          },
          "circle-color": "#00e640",
          "circle-opacity": 0.8
        }
      });
      map.on("click", "bikes", function(e) {
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML("Your bike " + e.features[0].properties.model)
          .addTo(map);
      });
    });
  });
});

/*
map.addLayer(
        {
          id: "reports-heat",
          type: "heatmap",
          source: "reports",
          maxzoom: 15,
          paint: {
            // increase weight as diameter breast height increases
            "heatmap-weight": {
              property: "dbh",
              type: "exponential",
              stops: [
                [1, 0],
                [62, 1]
              ]
            },
            // increase intensity as zoom level increases
            "heatmap-intensity": {
              stops: [
                [11, 1],
                [15, 3]
              ]
            },
            // assign color values be applied to points depending on their density
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(245, 229, 27, 0)",
              0.5,
              "#f9690e",
              0.9,
              "rgba(207, 0, 15, 1)"
            ],
            // increase radius as zoom increases
            "heatmap-radius": {
              stops: [
                [11, 15],
                [15, 20]
              ]
            },
            // decrease opacity to transition into the circle layer
            "heatmap-opacity": {
              default: 1,
              stops: [
                [14, 1],
                [15, 0]
              ]
            }
          }
        },
        "waterway-label"
      );*/
