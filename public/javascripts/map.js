mapboxgl.accessToken =
  "pk.eyJ1IjoibHVpc21pZmVpam9vIiwiYSI6ImNrNm5mZzI0aDBycHQzbnFzd2Z1MXZmbm8ifQ.ayNgeiCCTcCoVcZ-0aagPQ";

window.reportsApi = axios.create({
  baseURL: "/map/reports",
  timeout: 5000
});
window.bikesApi = axios.create({
  baseURL: "/map/bikes",
  timeout: 5000
});

window.locationApi = axios.create({
  baseURL: "/user/bikes/location",
  timeout: 5000
});

// Set the map on the page
window.setMap = (center, zoom = 15) => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/luismifeijoo/ck6o0g2ir12l31iqo03sgbcv2",
    center,
    zoom
  });
  //map.addControl(new mapboxgl.NavigationControl());

  return map;
};
