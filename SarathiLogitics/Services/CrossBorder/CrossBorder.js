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
  // Form Elements
  const submitBtn = document.querySelector(".btn-primary");

  // Input Elements
  const pickupInput = document.querySelector(
    'input[placeholder="Enter pickup address"]'
  );
  const deliveryInput = document.querySelector(
    'input[placeholder="Enter delivery address"]'
  );


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

    // Add keyframes only once
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

    // Inserts into shipping form
    container.style.position = "relative";
    container.appendChild(notification);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      });

    // Auto remove
    setTimeout(() => {
      if (container.contains(notification)) {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  function addInputValidation(input, validationFn, errorMessage) {
    input.addEventListener("blur", function () {
      if (this.value && !validationFn(this.value)) {
        this.style.borderColor = "#ef4444";
        this.style.background = "#fef2f2";
        const existingError = this.parentNode.querySelector(".error-message");
        if (existingError) existingError.remove();
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.cssText =
          "color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;";
        errorDiv.textContent = errorMessage;
        this.parentNode.appendChild(errorDiv);
      } else {
        this.style.borderColor = "#10b981";
        this.style.background = "#f0fdf4";
        const existingError = this.parentNode.querySelector(".error-message");
        if (existingError) existingError.remove();
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "#dc2626";
      this.style.background = "#ffffff";
      const existingError = this.parentNode.querySelector(".error-message");
      if (existingError) existingError.remove();
    });
  }

  // Form Submit Handler
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const formData = {
        pickup: pickupInput?.value.trim(),
        delivery: deliveryInput?.value.trim(),
      };

      let isValid = true;
      let errors = [];

      if (!formData.pickup || formData.pickup.length < 2) {
        errors.push("Please enter pickup address");
        isValid = false;
      }

      if (!formData.delivery || formData.delivery.length < 2) {
        errors.push("Please enter delivery address");
        isValid = false;
      }      

      if (!isValid) {
        showNotification(errors[0], "error");
        return;
      }

      const originalText = this.textContent;
      this.textContent = "Booking Order...";
      this.disabled = true;

      setTimeout(() => {
        console.log("Order Booked:", formData);
        [pickupInput, deliveryInput].forEach((input) => (input.value = ""));
        this.textContent = originalText;
        this.disabled = false;
        showNotification("Order Booked Sucessfully");

        setTimeout(() => {
          window.location.href = "../TrackOrder/TrackOrder.html";
        }, 2000);
      }, 100);
    });
  }

  console.log("Track Order JS Loaded");
});


const learnMoreButtons = document.querySelectorAll(".learnMoreBtn");

learnMoreButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetPage = this.dataset.target;
    window.location.href = targetPage;
  });
});

