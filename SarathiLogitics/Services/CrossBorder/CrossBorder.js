/* Navbar Button */
function booknow() {
  window.location.href = "../../BookNow/BookNow.html";
}

/* Tab Button */
function switchTab(tab) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  tabs.forEach((t) => t.classList.remove("active"));
  buttons.forEach((b) => b.classList.remove("active"));

  document.getElementById(tab + "-tab").classList.add("active");
  document
    .querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`)
    .classList.add("active");
}

/* Form Validation */
document.addEventListener("DOMContentLoaded", function () {
  // Buttons
  const bookBtn = document.querySelector("#ship-tab .btn-primary");
  const trackBtn = document.querySelector("#track-tab .btn-primary");

  // Inputs
  const pickupInput = document.querySelector("#pickupAddress");
  const deliveryInput = document.querySelector("#deliveryAddress");
  const cnInput = document.querySelector('#track-tab input[type="text"]');

  // Notification function
  function showNotification(message, type = "success") {
    const container = document.querySelector(".shipping-form");
    if (!container) return;

    const existingNotification = container.querySelector(".notification");
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    notification.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 100;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
          @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
          .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
          .notification-close { background: none; border: none; color: white; font-size: 18px; cursor: pointer; }
          .notification-close:hover { opacity: 0.7; }
      `;
      document.head.appendChild(style);
    }

    container.style.position = "relative";
    container.appendChild(notification);

    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      });

    setTimeout(() => {
      if (container.contains(notification)) {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Book Order Submit
  if (bookBtn) {
    bookBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const pickup = pickupInput.value.trim();
      const delivery = deliveryInput.value.trim();

      if (!pickup || pickup.length < 2) {
        return showNotification("Please enter pickup address", "error");
      }
      if (!delivery || delivery.length < 2) {
        return showNotification("Please enter delivery address", "error");
      }

      this.textContent = "Booking Order...";
      this.disabled = true;

      setTimeout(() => {
        console.log("Order Booked:", { pickup, delivery });
        pickupInput.value = "";
        deliveryInput.value = "";
        this.textContent = "Book Order";
        this.disabled = false;
        showNotification("Order Booked Successfully");

        setTimeout(() => {
          window.location.href = "../../Delivery/Delivery.html";
        }, 2000);
      }, 800);
    });
  }

  // Track Order Submit
  if (trackBtn) {
    trackBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const cnNumber = cnInput.value.trim();

      if (!cnNumber || cnNumber.length < 5) {
        return showNotification("Please enter a valid CN number", "error");
      }

      this.textContent = "Tracking...";
      this.disabled = true;

      setTimeout(() => {
        console.log("Tracking CN:", cnNumber);
        cnInput.value = "";
        this.textContent = "Track Order";
        this.disabled = false;
        showNotification("Tracking started...");

        setTimeout(() => {
          window.location.href = "../../TrackOrder/TrackOrder.html";
        }, 2000);
      }, 800);
    });
  }

  console.log("Track Order JS Loaded");
});

/* Services Button */
const learnMoreButtons = document.querySelectorAll(".learnMoreBtn");

learnMoreButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetPage = this.dataset.target;
    window.location.href = targetPage;
  });
});


/* Menu */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


/* Carousel Services*/
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".service-container");
  const cards = document.querySelectorAll(".service-one");
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