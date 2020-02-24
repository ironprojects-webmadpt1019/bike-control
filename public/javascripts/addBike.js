const buttons = document.querySelectorAll(".park-bike");

buttons.forEach(e => {
  e.addEventListener("click", event => {
    const id = event.currentTarget.children[0].innerHTML;
    console.log("Enter");
    geolocation().then(geo => {
      console.log("geolocated");
      const { latitude, longitude } = geo.coords;
      const params = { latitude, longitude, id };
      axios
        .post("http://localhost:3000/user/bikes/location", params)
        .then(res => {
          console.log("bike-park");
          window.location.href = "/map";
        });
    });
  });
});
