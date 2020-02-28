const buttons = document.querySelectorAll(".park-bike");
const modal = document.querySelector(".modal");
const yes = document.querySelector(".modal-yes");
const no = document.querySelector(".modal-no");
const spin = document.querySelector(".spinner");

buttons.forEach(e => {
  e.addEventListener("click", event => {
    e.disabled = true;
    spin.style.visibility = "initial";
    const id = event.currentTarget.children[0].innerHTML;
    //console.log("Enter location");
    geolocation().then(geo => {
      //console.log("geolocated");
      const { latitude, longitude } = geo.coords;
      const params = { latitude, longitude, id };
      axios.post("/user/bikes/location/check", params).then(res => {
        //console.log(res.data);
        const incidents = res.data.reports;
        if (incidents.length > 5) {
          //console.log("too much incidents");
          //console.log(modal);
          spin.style.visibility = "hidden";
          modal.style.visibility = "initial";
          modal.style.opacity = "1";
          yes.addEventListener("click", event => {
            axios.post("/user/bikes/location", params).then(res => {
              //console.log("bike-park");
              window.location.href = "/map";
            });
          });
        } else {
          axios.post("/user/bikes/location", params).then(res => {
            //console.log("bike-park");
            window.location.href = "/map";
          });
        }
      });
    });
  });
});

yes.addEventListener("click", event => {
  const id = event.currentTarget.children[0].innerHTML;
  console.log("Enter");
  geolocation().then(geo => {
    console.log("geolocated");
    const { latitude, longitude } = geo.coords;
    const params = { latitude, longitude, id };
    axios.post("/user/bikes/location", params).then(res => {
      console.log("bike-park");
      window.location.href = "/map";
    });
  });
});

no.addEventListener("click", event => {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
  buttons.forEach(e => {
    e.disabled = false;
  });
});
