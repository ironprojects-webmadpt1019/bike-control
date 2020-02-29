const buttons = document.querySelectorAll(".report");
const modal = document.querySelector(".modal");
const title = modal.children[0];
const msg = modal.children[1];
const yes = document.querySelector(".modal-yes");
const no = document.querySelector(".modal-no");
const spin = document.querySelector(".spinner");
const wrapper = document.querySelector(".wrapper");

buttons.forEach(e => {
  e.addEventListener("click", event => {
    e.disabled = true;
    wrapper.style.visibility = "initial";
    wrapper.style.opacity = "1";
    spin.style.visibility = "initial";
    spin.style.opacity = "1";
    const incident = e.innerHTML;
    console.log(incident);
    console.log("Enter");
    geolocation().then(geo => {
      console.log("geolocated");
      const { latitude, longitude } = geo.coords;
      const params = { latitude, longitude, incident };
      spin.style.visibility = "hidden";
      title.innerHTML = `You are adding an incident!!!`;
      msg.innerHTML = `Are you sure you want to report it here?`;
      yes.innerHTML = "Im sure!";
      no.innerHTML = "Ups";
      modal.style.visibility = "initial";
      modal.style.opacity = "1";
      yes.addEventListener("click", event => {
        axios.post("/map/add/report", params).then(res => {
          console.log("report created");
          window.location.href = "/map";
        });
      });
    });
  });
});

no.addEventListener("click", event => {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
  wrapper.style.visibility = "hidden";
  wrapper.style.opacity = "0";
  buttons.forEach(e => {
    e.disabled = false;
  });
});
