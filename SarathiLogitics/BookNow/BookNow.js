document.addEventListener("DOMContentLoaded", () => {
  /* Tab Switching */
  const switchTab = (tab) => {
    document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));

    const tabContent = document.getElementById(`${tab}-tab`);
    if (tabContent) tabContent.classList.add("active");

    const tabButton = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (tabButton) tabButton.classList.add("active");
  };

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    const tab = btn.dataset.tab;
    btn.addEventListener("click", () => switchTab(tab));
  });

  /* Notification Utility */
  const showNotification = (container, message, type = "success") => {
    if (!container) return;

    const existing = container.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Inline CSS for notification
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

    // Keyframes dynamically if not already present
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

    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
      if (container.contains(notification)) {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  };

  /* Form Handling */
  const handleForm = (formSelector, inputSelectors, redirectUrl) => {
    const form = document.querySelector(formSelector);
    if (!form) return;

    const btn = form.querySelector(".btn-primary");
    const inputs = inputSelectors.map((sel) => form.querySelector(sel));

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const values = inputs.map((input) => input.value.trim());

      for (let i = 0; i < values.length; i++) {
        if (!values[i] || values[i].length < (i === values.length - 1 ? 5 : 2)) {
          const fieldName = i === values.length - 1 ? "CN number" : inputSelectors[i].replace("#", "");
          return showNotification(form, `Please enter a valid ${fieldName}`, "error");
        }
      }

      btn.textContent = btn.textContent.includes("Book") ? "Booking Order..." : "Tracking...";
      btn.disabled = true;

      setTimeout(() => {
        console.log(btn.textContent.includes("Book") ? "Order Booked" : "Tracking CN", values);
        inputs.forEach((input) => (input.value = ""));
        btn.textContent = btn.textContent.includes("Booking") ? "Book Order" : "Track Order";
        btn.disabled = false;
        showNotification(form, btn.textContent.includes("Book") ? "Order Booked Successfully" : "Tracking started...");
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 2000);
      }, 800);
    });
  };

  handleForm("#ship-tab", ["#pickupAddress", "#deliveryAddress"], "../Delivery/Delivery.html");
  handleForm("#track-tab", ['input[type="text"]'], "../TrackOrder/TrackOrder.html");

  console.log("Track Order JS Loaded");
});


/* Menu */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
