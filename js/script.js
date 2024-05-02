// toggle active hum-menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika menu di klik
document.querySelector("#hum-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// toggle class active form-search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toggle class active shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
// ketika di klik
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// klik di luar elemen
const humMenu = document.querySelector("#hum-menu");
const hb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!humMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!hb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
  e.preventDefault();
});

// modal box
// const itemDetailModal = document.querySelector("#item-detail-modal");
// const itemDetailButtons = document.querySelectorAll(".item-detail-button");

// itemDetailButtons.forEach((btn) => {
//   btn.onclick = (e) => {
//     itemDetailModal.style.display = "flex";
//     e.preventDefault();
//   };
// });

// // klik tombol close modal
// document.querySelector(".modal .close-icon").onclick = (e) => {
//   itemDetailModal.style.display = "none";
//   e.preventDefault();
// };

// // klik luar modal
// window.onclick = (e) => {
//   if (e.target === itemDetailModal) {
//     itemDetailModal.style.display = "none";
//   }
// };
