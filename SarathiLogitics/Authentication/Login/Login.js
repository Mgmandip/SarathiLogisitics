document.addEventListener("DOMContentLoaded", function () {
  // Form Elements
  const submitBtn = document.querySelector(".btn-primary");

  // Input Elements
  const phoneInput = document.querySelector(
    'input[placeholder="Enter your Phone Number"]'
  );
  const passwordInput = document.querySelector(
    'input[placeholder="Enter your Password"]'
  );

  // Utility Functions
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
            top: 20px;
            right: 20px;
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
                .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 15px; }
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

  if (passwordInput)
    addInputValidation(
      passwordInput,
      (v) => v.trim().length >= 2,
      "Please enter your password"
    );

  // Form Submit Handler
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const formData = {
        phone: phoneInput?.value.trim(),
        password: passwordInput?.value.trim(),
      };

      let isValid = true;
      let errors = [];

      if (!formData.phone || !validatePhone(formData.phone)) {
        errors.push("Please enter a valid phone number");
        isValid = false;
      }

      if (!formData.password || formData.password.length < 2) {
        errors.push("Please enter your password");
        isValid = false;
      }

      if (!isValid) {
        showNotification(errors[0], "error");
        return;
      }

      const originalText = this.textContent;
      this.textContent = "Logging in...";
      this.disabled = true;

      setTimeout(() => {
        console.log("Login submitted:", formData);
        [phoneInput, passwordInput].forEach((input) => (input.value = ""));
        this.textContent = originalText;
        this.disabled = false;
        showNotification("Logged in successfully");

        setTimeout(() => {
          window.location.href = "../Home/Home.html";
        }, 2000);
      }, 100);
    });
  }

  console.log("Login Page JS Loaded");
});
