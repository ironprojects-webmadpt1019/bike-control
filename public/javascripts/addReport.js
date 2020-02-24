const buttons = document.querySelectorAll(".report");

buttons.forEach(e => {
  e.addEventListener("click", event => {
    const type = e.innerHTML;
    console.log("Enter");
    geolocation().then(geo => {
      console.log("geolocated");
      const { latitude, longitude } = geo.coords;
      const params = { latitude, longitude, type };
      axios.post("http://localhost:3000/map/add/report", params).then(res => {
        console.log("report created");
        window.location.href = "/map";
      });
    });
  });
});
