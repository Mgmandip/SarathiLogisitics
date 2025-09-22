function newsbtn() {
  window.location.href = "./Detail.html";
}

function blogbtn() {
  window.location.href = "./Blog.html";
}

function booknow() {
  window.location.href = "../../BookNow/BookNow.html";
}

/* Menu */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
