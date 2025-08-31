/* Navbar Button */
function booknow() {
  window.location.href = "../BookNow/BookNow.html";
}

document.addEventListener("DOMContentLoaded", function () {
  // Form Elements
  const contactForm = document.querySelector(".shipping-form");
  const submitBtn = document.querySelector(".btn-primary");
  const newsletterForm = document.querySelector(".newsletter-submit");
  const bookNowBtn = document.querySelector(".ship-btn");

  // Input Elements
  const nameInput = document.querySelector(
    'input[placeholder="Enter your Name"]'
  );
  const emailInput = document.querySelector(
    'input[placeholder="Enter your Email Address"]'
  );
  const phoneInput = document.querySelector(
    'input[placeholder="Enter your Phone Number"]'
  );
  const messageInput = document.querySelector(
    'textarea[placeholder="Message"]'
  );
  const newsletterInput = document.querySelector(".newsletter input");

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
    // Removes existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Creates notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#f59e0b"
            };
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

    // Animation keyframes
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .notification-close:hover {
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto removes after 5 seconds
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

        // Removes existing error message
        const existingError = this.parentNode.querySelector(".error-message");
        if (existingError) existingError.remove();

        // Error message
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.cssText =
          "color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;";
        errorDiv.textContent = errorMessage;
        this.parentNode.appendChild(errorDiv);
      } else {
        this.style.borderColor = "#10b981";
        this.style.background = "#f0fdf4";

        // Removes error message
        const existingError = this.parentNode.querySelector(".error-message");
        if (existingError) existingError.remove();
      }
    });

    input.addEventListener("focus", function () {
      this.style.borderColor = "#dc2626";
      this.style.background = "#ffffff";

      // Removes error message on focus
      const existingError = this.parentNode.querySelector(".error-message");
      if (existingError) existingError.remove();
    });
  }

  // Input validations
  if (nameInput) {
    addInputValidation(
      nameInput,
      (value) => value.trim().length >= 2,
      "Name must be at least 2 characters long"
    );
  }

  if (emailInput) {
    addInputValidation(
      emailInput,
      validateEmail,
      "Please enter a valid email address"
    );
  }

  if (phoneInput) {
    addInputValidation(
      phoneInput,
      validatePhone,
      "Please enter a valid Nepali phone number"
    );

    // Phone number formatting
    phoneInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.startsWith("977")) {
        value = "+977 " + value.substring(3);
      } else if (value.length === 10 && value.startsWith("9")) {
        value = "+977 " + value;
      }
      this.value = value;
    });
  }

  // Contact Form Submit Handler
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Form data
      const formData = {
        name: nameInput?.value.trim(),
        email: emailInput?.value.trim(),
        phone: phoneInput?.value.trim(),
        message: messageInput?.value.trim(),
      };

      // Validation
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

      if (!formData.message || formData.message.length < 10) {
        errors.push("Please enter a message (at least 10 characters)");
        isValid = false;
      }

      if (!isValid) {
        showNotification(errors[0], "error");
        return;
      }

      // Shows loading state
      const originalText = this.textContent;
      this.textContent = "Sending...";
      this.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        console.log("Form submitted:", formData);

        // Resets form
        if (nameInput) nameInput.value = "";
        if (emailInput) emailInput.value = "";
        if (phoneInput) phoneInput.value = "";
        if (messageInput) messageInput.value = "";

        // Reset button
        this.textContent = originalText;
        this.disabled = false;

        // Shows success message
        showNotification(
          "Thank you! Your message has been sent successfully. We will get back to you soon.",
          "success"
        );

        // Resets input styles
        [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
          if (input) {
            input.style.borderColor = "#e5e7eb";
            input.style.background = "#ffffff";
          }
        });
      }, 2000);
    });
  }

  // Newsletter Form Handler
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = newsletterInput?.value.trim();

      if (!email) {
        showNotification("Please enter your email address", "error");
        return;
      }

      if (!validateEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Shows loading state
      const submitBtn = this.querySelector(".newsletter-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      setTimeout(() => {
        console.log("Newsletter subscription:", email);

        // Reset form
        newsletterInput.value = "";

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        showNotification(
          "Successfully subscribed to our newsletter!",
          "success"
        );
      }, 1500);
    });
  }

  // Scroll Animation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Hover effects to form inputs
  document.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("mouseenter", function () {
      if (!this.matches(":focus")) {
        this.style.borderColor = "#f97316";
      }
    });

    input.addEventListener("mouseleave", function () {
      if (!this.matches(":focus")) {
        this.style.borderColor = "#e5e7eb";
      }
    });
  });

  // Character counter
  if (messageInput) {
    const wrapper = messageInput.parentNode;
    const counter = document.createElement("div");
    counter.className = "char-counter";
    counter.style.cssText =
      "text-align: right; font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;";
    wrapper.appendChild(counter);

    function updateCounter() {
      const length = messageInput.value.length;
      counter.textContent = `${length}/500 characters`;

      if (length > 500) {
        counter.style.color = "#ef4444";
        messageInput.value = messageInput.value.substring(0, 500);
      } else if (length > 400) {
        counter.style.color = "#f59e0b";
      } else {
        counter.style.color = "#6b7280";
      }
    }

    messageInput.addEventListener("input", updateCounter);
    updateCounter();
  }

  // Loading animation to buttons
  function addLoadingState(button) {
    button.addEventListener("click", function () {
      if (!this.disabled) {
        this.style.position = "relative";
        this.style.overflow = "hidden";

        const ripple = document.createElement("div");
        ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = event.clientX - rect.left - size / 2 + "px";
        ripple.style.top = event.clientY - rect.top - size / 2 + "px";

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      }
    });
  }

  // Ripple effect to buttons
  [
    submitBtn,
    bookNowBtn,
    ...document.querySelectorAll(".newsletter-btn"),
  ].forEach((btn) => {
    if (btn) addLoadingState(btn);
  });

  // Ripple animation CSS
  if (!document.querySelector("#ripple-styles")) {
    const style = document.createElement("style");
    style.id = "ripple-styles";
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Initialize page
  console.log(
    "Sarathi Logistics Contact Page - JavaScript Loaded Successfully"
  );

  // Fade-in animation to hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(20px)";
    heroContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 100);
  }
});

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
