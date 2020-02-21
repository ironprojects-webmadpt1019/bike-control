const btn = document.querySelector(".hamburger-button");
const ovl = document.querySelector(".overlay");

btn.addEventListener("click", evt => {
  btn.classList.toggle("active");
  ovl.classList.toggle("visible");
});
