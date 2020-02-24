const btn = document.querySelector(".hamburger-button");
const ovl = document.querySelector(".overlay");
const add = document.querySelector(".add-button");
const ovlAdd = document.querySelector(".overlay-add");

btn.addEventListener("click", evt => {
  btn.classList.toggle("active");
  ovl.classList.toggle("visible");
});

add.addEventListener("click", evt => {
  add.classList.toggle("active");
  ovlAdd.classList.toggle("visible");
});
