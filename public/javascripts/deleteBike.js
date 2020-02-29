const button = document.querySelectorAll(".delete");
const modalDelete = document.querySelector(".modal");
const titleDelete = modalDelete.children[0];
const msgDelete = modalDelete.children[1];
const yesDelete = document.querySelector(".modal-yes");
const noDelete = document.querySelector(".modal-no");
const wrapperDelete = document.querySelector(".wrapper");

button.forEach(e => {
  e.addEventListener("click", event => {
    e.disabled = true;
    wrapperDelete.style.visibility = "initial";
    wrapperDelete.style.opacity = "1";
    const idDelete = event.currentTarget.children[0].innerHTML;
    titleDelete.innerHTML = `Are you sure?`;
    msgDelete.innerHTML = "This is a change you can´t undo";
    modalDelete.style.visibility = "initial";
    modalDelete.style.opacity = "1";
    yesDelete.innerHTML = "Yes";
    noDelete.innerHTML = "No";
    noDelete.addEventListener("click", event => {
      buttons.forEach(e => {
        e.disabled = false;
        modalDelete.style.visibility = "hidden";
        modalDelete.style.opacity = "0";
        wrapperDelete.style.visibility = "hidden";
        wrapperDelete.style.opacity = "0";
      });
    });
    yesDelete.addEventListener("click", event => {
      axios.get(`/user/bikes/delete/${idDelete}`).then(res => {
        window.location.href = "/user/bikes";
      });
    });
  });
});
