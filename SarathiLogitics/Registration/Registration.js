document.addEventListener("DOMContentLoaded", function () {
  // Form Elements
  const registrationForm = document.querySelector(".shipping-form");
  const submitBtn = document.querySelector(".btn-primary");

  // Input Elements
  const nameInput = document.querySelector(
    'input[placeholder="eg. Archie Rai"]'
  );
  const emailInput = document.querySelector(
    'input[placeholder="eg. archierai28@gmail.com"]'
  );
  const phoneInput = document.querySelector(
    'input[placeholder="eg. +977 123 456 789"]'
  );
  const cityInput = document.querySelector(
    'select[placeholder="eg. Lalitpur"]'
  );
  const provinceInput = document.querySelector(
    'input[placeholder="eg. Bagmati"]'
  );
  const addressInput = document.querySelector(
    'input[placeholder="eg. Dholaity"]'
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
    const existingNotification = document.querySelector(".notification");
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
            position: fixed;
            top: 8.7rem;
            right: 19.6rem;
            background: ${type === "success" ? "#10b981" : "#ef4444"};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
                .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 15px;}
                .notification-close { background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
                .notification-close:hover { background: rgba(255,255,255,0.2); border-radius: 50%; }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.animation = "slideOut 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      });

    setTimeout(() => {
      if (document.body.contains(notification)) {
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

  // Add input validations
  if (nameInput)
    addInputValidation(
      nameInput,
      (v) => v.trim().length >= 2,
      "Name must be at least 2 characters long"
    );
  if (emailInput)
    addInputValidation(
      emailInput,
      validateEmail,
      "Please enter a valid email address"
    );
  if (phoneInput) {
    addInputValidation(
      phoneInput,
      validatePhone,
      "Please enter a valid phone number"
    );
    phoneInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.startsWith("977")) value = "+977 " + value.substring(3);
      else if (value.length === 10 && value.startsWith("9"))
        value = "+977 " + value;
      this.value = value;
    });
  }
  if (cityInput)
    addInputValidation(
      cityInput,
      (v) => v.trim().length >= 2,
      "Provide valid city"
    );
  if (provinceInput)
    addInputValidation(
      provinceInput,
      (v) => v.trim().length >= 2,
      "Provide valid province"
    );
  if (addressInput)
    addInputValidation(
      addressInput,
      (v) => v.trim().length >= 2,
      "Provide valid address"
    );

  // Form Submit Handler
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const formData = {
        name: nameInput?.value.trim(),
        email: emailInput?.value.trim(),
        phone: phoneInput?.value.trim(),
        city: cityInput?.value.trim(),
        province: provinceInput?.value.trim(),
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
      this.textContent = "Register";
      this.disabled = true;

      setTimeout(() => {
        console.log("Form submitted:", formData);

        // Reset form
        if (nameInput) nameInput.value = "";
        if (emailInput) emailInput.value = "";
        if (phoneInput) phoneInput.value = "";
        if (cityInput) cityInput.value = "";
        if (provinceInput) provinceInput.value = "";
        if (addressInput) addressInput.value = "";

        // Reset button
        this.textContent = originalText;
        this.disabled = false;

        // Show success message
        showNotification(
          "Registration complete. Login will be available after admin provides your password."
        );

        [
          nameInput,
          emailInput,
          phoneInput,
          cityInput,
          provinceInput,
          addressInput,
        ].forEach((input) => {
          if (input) {
            input.style.borderColor = "#e5e7eb";
            input.style.background = "#ffffff";
          }
        });

        setTimeout(() => {
          window.location.href = "../Login/Login.html"; 
        }, 3000);
      }, 1000);
    });
  }

  console.log("Registration Page JS Loaded");
});
