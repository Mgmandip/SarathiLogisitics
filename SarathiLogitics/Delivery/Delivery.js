document.addEventListener("DOMContentLoaded", function () {
  // Form Elements
  const registrationForm = document.querySelector(".shipping-form");
  const submitBtn = document.querySelector(".btn-primary");

  // Input Elements for Pickup
  const pickupnameInput = document.querySelector(
    'input[placeholder="eg. Archie Rai"]'
  );
  const pickupemailInput = document.querySelector(
    'input[placeholder="eg. archierai28@gmail.com"]'
  );
  const pickupphoneInput = document.querySelector(
    'input[placeholder="eg. +977 123 456 789"]'
  );
  const pickupcityInput = document.querySelector(
    'input[placeholder="eg. Lalitpur"]'
  );
  const pickupprovinceInput = document.querySelector(
    'input[placeholder="eg. Bagmati"]'
  );
  const pickupaddressInput = document.querySelector(
    'input[placeholder="eg. Dholahiti, Lalitpur"]'
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

  // Add input validations
  if (pickupnameInput)
    addInputValidation(
      pickupnameInput,
      (v) => v.trim().length >= 2,
      "Name must be at least 2 characters long"
    );
  if (pickupemailInput)
    addInputValidation(
      pickupemailInput,
      validateEmail,
      "Please enter a valid email address"
    );
  if (pickupphoneInput) {
    addInputValidation(
      pickupphoneInput,
      validatePhone,
      "Please enter a valid phone number"
    );
    pickupphoneInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.startsWith("977")) value = "+977 " + value.substring(3);
      else if (value.length === 10 && value.startsWith("9"))
        value = "+977 " + value;
      this.value = value;
    });
  }
  if (pickupcityInput)
    addInputValidation(
      pickupcityInput,
      (v) => v.trim().length >= 2,
      "Provide valid city"
    );
  if (pickupprovinceInput)
    addInputValidation(
      pickupprovinceInput,
      (v) => v.trim().length >= 2,
      "Provide valid province"
    );
  if (pickupaddressInput)
    addInputValidation(
      pickupaddressInput,
      (v) => v.trim().length >= 2,
      "Provide valid address"
    );

  // Form Submit Handler
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const formData = {
        name: pickupnameInput?.value.trim(),
        email: pickupemailInput?.value.trim(),
        phone: pickupphoneInput?.value.trim(),
        city: pickupcityInput?.value.trim(),
        province: pickupprovinceInput?.value.trim(),
        address: pickupaddressInput?.value.trim(),
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
      if (!formData.city || formData.city.length < 2) {
        errors.push("Please enter a valid city");
        isValid = false;
      }
      if (!formData.province || formData.province.length < 2) {
        errors.push("Please enter a valid province");
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
      this.textContent = "Book Order";
      this.disabled = true;

      setTimeout(() => {
        console.log("Form submitted:", formData);

        // Reset form
        if (pickupnameInput) pickupnameInput.value = "";
        if (pickupemailInput) pickupemailInput.value = "";
        if (pickupphoneInput) pickupphoneInput.value = "";
        if (pickupcityInput) pickupcityInput.value = "";
        if (pickupprovinceInput) pickupprovinceInput.value = "";
        if (pickupaddressInput) pickupaddressInput.value = "";

        // Reset button
        this.textContent = originalText;
        this.disabled = false;

        // Show success message
        showNotification(
          "Order Booked Sucessfully"
        );

        [
          pickupnameInput,
          pickupemailInput,
          pickupphoneInput,
          pickupcityInput,
          pickupprovinceInput,
          pickupaddressInput,
        ].forEach((input) => {
          if (input) {
            input.style.borderColor = "#e5e7eb";
            input.style.background = "#ffffff";
          }
        });

        setTimeout(() => {
          window.location.href = "../TrackOrder/TrackOrder.html";
        }, 4000);
      }, 1000);
    });
  }

  console.log("Registration Page JS Loaded");
});
