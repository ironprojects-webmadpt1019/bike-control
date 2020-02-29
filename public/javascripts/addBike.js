const buttons = document.querySelectorAll(".park-bike");
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
    const id = event.currentTarget.children[0].innerHTML;
    geolocation().then(geo => {
      const { latitude, longitude } = geo.coords;
      const params = { latitude, longitude, id };
      axios.post("/user/bikes/location/check", params).then(res => {
        const incidents = res.data.reports;
        if (incidents.length >= 5) {
          spin.style.visibility = "hidden";
          title.innerHTML = `There are ${incidents.length} reported issues within 1km`;
          msg.innerHTML = "Are you sure you want to park here?";
          modal.style.visibility = "initial";
          modal.style.opacity = "1";
          yes.addEventListener("click", event => {
            axios.post("/user/bikes/location", params).then(res => {
              window.location.href = "/map";
            });
          });
        } else {
          spin.style.visibility = "hidden";
          title.innerHTML = `There are only ${incidents.length} reported issues within 1km`;
          msg.innerHTML =
            "You're probably safe, if anything happens do not hessitate to report it";
          yes.innerHTML = "Ok!";
          no.innerHTML = "I'll wait";
          modal.style.visibility = "initial";
          modal.style.opacity = "1";
          yes.addEventListener("click", event => {
            axios.post("/user/bikes/location", params).then(res => {
              window.location.href = "/map";
            });
          });
        }
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
