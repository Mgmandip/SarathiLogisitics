/* Navbar Button */
function booknow() {
  window.location.href = "../BookNow/BookNow.html";
}

function backhome() {
  window.location.href = "../Home/Home.html";
}

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

  // Delivery Inputs
  const deliverynameInput = document.querySelectorAll(
    'input[placeholder="eg. Archie Rai"]'
  )[1];
  const deliveryemailInput = document.querySelectorAll(
    'input[placeholder="eg. archierai28@gmail.com"]'
  )[1];
  const deliveryphoneInput = document.querySelectorAll(
    'input[placeholder="eg. +977 123 456 789"]'
  )[1];
  const deliverycityInput = document.querySelectorAll(
    'input[placeholder="eg. Lalitpur"]'
  )[1];
  const deliveryprovinceInput = document.querySelectorAll(
    'input[placeholder="eg. Bagmati"]'
  )[1];
  const deliveryaddressInput = document.querySelectorAll(
    'input[placeholder="eg. Dholahiti, Lalitpur"]'
  )[1];

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

    container.style.position = "relative";
    container.appendChild(notification);

    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.animation = "slideOut 0.4s ease-in";
        setTimeout(() => notification.remove(), 300);
      });

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

  // Input validations for Pickup
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

  // Input validations for Delivery
  if (deliverynameInput)
    addInputValidation(
      deliverynameInput,
      (v) => v.trim().length >= 2,
      "Name must be at least 2 characters long"
    );
  if (deliveryemailInput)
    addInputValidation(
      deliveryemailInput,
      validateEmail,
      "Please enter a valid email address"
    );
  if (deliveryphoneInput)
    addInputValidation(
      deliveryphoneInput,
      validatePhone,
      "Please enter a valid phone number"
    );
  if (deliverycityInput)
    addInputValidation(
      deliverycityInput,
      (v) => v.trim().length >= 2,
      "Provide valid city"
    );
  if (deliveryprovinceInput)
    addInputValidation(
      deliveryprovinceInput,
      (v) => v.trim().length >= 2,
      "Provide valid province"
    );
  if (deliveryaddressInput)
    addInputValidation(
      deliveryaddressInput,
      (v) => v.trim().length >= 2,
      "Provide valid address"
    );

  // Form Submit Handler
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const formData = {
        pickup: {
          name: pickupnameInput?.value.trim(),
          email: pickupemailInput?.value.trim(),
          phone: pickupphoneInput?.value.trim(),
          city: pickupcityInput?.value.trim(),
          province: pickupprovinceInput?.value.trim(),
          address: pickupaddressInput?.value.trim(),
        },
        delivery: {
          name: deliverynameInput?.value.trim(),
          email: deliveryemailInput?.value.trim(),
          phone: deliveryphoneInput?.value.trim(),
          city: deliverycityInput?.value.trim(),
          province: deliveryprovinceInput?.value.trim(),
          address: deliveryaddressInput?.value.trim(),
        },
      };

      let isValid = true;
      let errors = [];

      function checkField(value, validateFn, errorMsg) {
        if (!value || (validateFn && !validateFn(value))) {
          errors.push(errorMsg);
          isValid = false;
        }
      }

      // Pickup Validation
      checkField(
        formData.pickup.name,
        (v) => v.length >= 2,
        "Please enter a valid Pickup name"
      );
      checkField(
        formData.pickup.email,
        validateEmail,
        "Please enter a valid Pickup email"
      );
      checkField(
        formData.pickup.phone,
        validatePhone,
        "Please enter a valid Pickup phone"
      );
      checkField(
        formData.pickup.city,
        (v) => v.length >= 2,
        "Please enter a valid Pickup city"
      );
      checkField(
        formData.pickup.province,
        (v) => v.length >= 2,
        "Please enter a valid Pickup province"
      );
      checkField(
        formData.pickup.address,
        (v) => v.length >= 2,
        "Please enter a valid Pickup address"
      );

      // Delivery Validation
      checkField(
        formData.delivery.name,
        (v) => v.length >= 2,
        "Please enter a valid Delivery name"
      );
      checkField(
        formData.delivery.email,
        validateEmail,
        "Please enter a valid Delivery email"
      );
      checkField(
        formData.delivery.phone,
        validatePhone,
        "Please enter a valid Delivery phone"
      );
      checkField(
        formData.delivery.city,
        (v) => v.length >= 2,
        "Please enter a valid Delivery city"
      );
      checkField(
        formData.delivery.province,
        (v) => v.length >= 2,
        "Please enter a valid Delivery province"
      );
      checkField(
        formData.delivery.address,
        (v) => v.length >= 2,
        "Please enter a valid Delivery address"
      );

      if (!isValid) {
        showNotification(errors[0], "error");
        return;
      }

      const originalText = this.textContent;
      this.textContent = "Book Order";
      this.disabled = true;

      setTimeout(() => {
        console.log("Form submitted:", formData);

        // Resets all fields
        [
          pickupnameInput,
          pickupemailInput,
          pickupphoneInput,
          pickupcityInput,
          pickupprovinceInput,
          pickupaddressInput,
          deliverynameInput,
          deliveryemailInput,
          deliveryphoneInput,
          deliverycityInput,
          deliveryprovinceInput,
          deliveryaddressInput,
        ].forEach((input) => {
          if (input) input.value = "";
        });

        this.textContent = originalText;
        this.disabled = false;

        showNotification("Order Booked Successfully");

        setTimeout(() => {
          window.location.href = "../TrackOrder/TrackOrder.html";
        }, 4000);
      }, 1000);
    });
  }

  console.log("Registration Page JS Loaded");
});


