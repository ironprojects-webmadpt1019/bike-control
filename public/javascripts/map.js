mapboxgl.accessToken =
  "pk.eyJ1IjoibHVpc21pZmVpam9vIiwiYSI6ImNrNm5mZzI0aDBycHQzbnFzd2Z1MXZmbm8ifQ.ayNgeiCCTcCoVcZ-0aagPQ";

// Set the map on the page
window.setMap = (center, zoom = 10) => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/luismifeijoo/ck6o0g2ir12l31iqo03sgbcv2",
    center,
    zoom
  });
  map.addControl(new mapboxgl.NavigationControl());

  return map;
};
