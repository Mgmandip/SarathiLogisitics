/* Navbar Button */
function booknow() {
  window.location.href = "../BookNow/BookNow.html";
}

/* Menu */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


/* Carousel Services*/
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".team-grid");
  const cards = document.querySelectorAll(".team-card");
  const dotsContainer = document.querySelector(".carousel-dotstwo");

  let currentIndex = 0;
  let slideInterval;

  // create dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll("button");

  function goToSlide(index) {
    currentIndex = index;
    grid.scrollTo({
      left: cards[index].offsetLeft - grid.offsetLeft,
      behavior: "smooth",
    });
    updateDots();
  }

  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

    function autoSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    goToSlide(currentIndex);
  }

  // autoplay every 3s
  slideInterval = setInterval(autoSlide, 3000);

  // pause on hover
  grid.addEventListener("mouseenter", () => clearInterval(slideInterval));
  grid.addEventListener(
    "mouseleave",
    () => (slideInterval = setInterval(autoSlide, 3000))
  );

  // update on manual scroll
  grid.addEventListener("scroll", () => {
    const scrollLeft = grid.scrollLeft;
    let newIndex = 0;

    cards.forEach((card, i) => {
      const offset = card.offsetLeft - grid.offsetLeft;
      if (scrollLeft >= offset - card.offsetWidth / 2) {
        newIndex = i;
      }
    });

    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateDots();
    }
  });
});
