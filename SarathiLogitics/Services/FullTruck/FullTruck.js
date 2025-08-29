/* Navbar Button */
function booknow() {
  window.location.href = "../../BookNow/BookNow.html";
}

const learnMoreButtons = document.querySelectorAll(".learnMoreBtn");

learnMoreButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetPage = this.dataset.target;
    window.location.href = targetPage;
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Form Elements
  const registrationForm = document.querySelector(".shipping-form");
  const submitBtn = document.querySelector(".btn-primary");

  // Input Elements
  const nameInput = document.querySelector(
    'input[placeholder="Name"]'
  );
  const companyInput = document.querySelector(
    'input[placeholder="Company Name"]'
  );
  const emailInput = document.querySelector(
    'input[placeholder="Email"]'
  );
  const phoneInput = document.querySelector(
    'input[placeholder="Phone Number"]'
  );
  const addressInput = document.querySelector(
    'input[placeholder="Address"]'
  );

  // Utility Functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^(\+977|977)?[- ]?[9][6-8][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  }

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

    // Inserts into shipping form
    container.style.position = "relative";
    container.appendChild(notification);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.animation = "slideOut 0.4s ease-in";
        setTimeout(() => notification.remove(), 300);
      });

    // Auto remove
    setTimeout(() => {
      if (container.contains(notification)) {
        notification.style.animation = "slideOut 0.4s ease-in";
        setTimeout(() => notification.remove(), 300);
      }
    }, 6000);
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
        name: nameInput?.value.trim(),
        company: companyInput?.value.trim(),
        email: emailInput?.value.trim(),
        phone: phoneInput?.value.trim(),
        address: addressInput?.value.trim(),
      };

      let isValid = true;
      let errors = [];

      if (!formData.name || formData.name.length < 2) {
        errors.push("Please enter a valid name");
        isValid = false;
      }
      if (!formData.email || !validateEmail(formData.email)) {
        errors.push("Please enter a valid email address");
        isValid = false;
      }
      if (!formData.phone || !validatePhone(formData.phone)) {
        errors.push("Please enter a valid phone number");
        isValid = false;
      }
      if (!formData.company || formData.company.length < 2) {
        errors.push("Please enter a valid company");
        isValid = false;
      }
      if (!formData.address || formData.address.length < 2) {
        errors.push("Please enter a valid address");
        isValid = false;
      }

      if (!isValid) {
        showNotification(errors[0], "error");
        return;
      }

      const originalText = this.textContent;
      this.textContent = "Submit";
      this.disabled = true;

      setTimeout(() => {
        console.log("Form submitted:", formData);

        // Reset form
        if (nameInput) nameInput.value = "";
        if (companyInput) companyInput.value = "";
        if (emailInput) emailInput.value = "";
        if (phoneInput) phoneInput.value = "";
        if (addressInput) addressInput.value = "";

        // Reset button
        this.textContent = originalText;
        this.disabled = false;

        // Show success message
        showNotification(
          "Thank you for contacting us. We’ll get back to you soon."
        );

        [
          nameInput,
          companyInput,
          emailInput,
          phoneInput,
          addressInput,
        ].forEach((input) => {
          if (input) {
            input.style.borderColor = "#e5e7eb";
            input.style.background = "#ffffff";
          }
        });

        setTimeout(() => {
          window.location.href = "#";
        }, 3000);
      }, 1000);
    });
  }

  console.log("Registration Page JS Loaded");
});

