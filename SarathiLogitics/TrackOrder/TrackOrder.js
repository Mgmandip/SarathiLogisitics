/* Navbar Button */
function booknow() {
  window.location.href = "../BookNow/BookNow.html";
}


const orderData = {
  sender: {
    name: "Archie Rai",
    contact: "9860377498",
    email: "archierai28@gmail.com",
    address: "Dholahiti, Lalitpur",
    city: "Lalitpur"
  },
  receiver: {
    name: "Sujal Thapa",
    contact: "987654321",
    email: "sujalthapa@gmail.com",
    address: "Baneshwor, Kathmandu",
    city: "Kathmandu"
  },
  order: {
    item: "Documents",
    weight: "1kg"
  }
};

// Function to render order details
function renderOrderDetails(order) {
  const container = document.querySelector(".order-details");

  container.innerHTML = `
    <div class="sender">
      <h1 class="sender-header">Sender</h1>
      <div class="sender-information">
        <h1>Name: <span>${order.sender.name}</span></h1>
        <h1>Contact Number: <span>${order.sender.contact}</span></h1>
        <h1>Email: <span>${order.sender.email}</span></h1>
        <h1>Address: <span>${order.sender.address}</span></h1>
        <h1>City: <span>${order.sender.city}</span></h1>
      </div>
    </div>

    <div class="receiver">
      <h1 class="receiver-header">Receiver</h1>
      <div class="receiver-information">
        <h1>Name: <span>${order.receiver.name}</span></h1>
        <h1>Contact Number: <span>${order.receiver.contact}</span></h1>
        <h1>Email: <span>${order.receiver.email}</span></h1>
        <h1>Address: <span>${order.receiver.address}</span></h1>
        <h1>City: <span>${order.receiver.city}</span></h1>
      </div>
    </div>

    <div class="orderitem">
      <h1 class="orderitem-header">Order</h1>
      <div class="orderitem-information">
        <h1>Order Item: <span>${order.order.item}</span></h1>
        <h1>Weight/Quantity: <span>${order.order.weight}</span></h1>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".order-circle");
  const progressFill = document.getElementById("progressFill");

  let currentStep = 1; // number of active steps (1-5)

  circles.forEach((circle, index) => {
    if (index < currentStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const totalSteps = circles.length;
  const progressHeight = ((currentStep -1) / (totalSteps -1)) * 90;
  progressFill.style.height = progressHeight + "%";
});


/* Form Validation */
document.addEventListener("DOMContentLoaded", function () {
  // Button
  const trackBtn = document.querySelector(".primary-btn");

  // Input
  const cnInput = document.querySelector("#trackingIdInput");

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

    notification.querySelector(".notification-close").addEventListener("click", () => {
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

        // Redirect to track order page
        setTimeout(() => {
          window.location.href = "../TrackOrder/TrackOrder.html";
        }, 2000);
      }, 800);
    });
  }

  console.log("Track Order JS Loaded");
});
