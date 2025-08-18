/**
 * Sarathi Logistics - Professional JavaScript
 * Handles form validation, mobile menu, and user interactions
 */

class SarathiApp {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupFormValidation()
    this.setupMobileMenu()
  }

  setupEventListeners() {
    // Form submission
    const deliveryForm = document.querySelector(".delivery-form")
    if (deliveryForm) {
      deliveryForm.addEventListener("submit", this.handleFormSubmit.bind(this))
    }

    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", this.handleNewsletterSubmit.bind(this))
    }

    // Real-time validation
    const inputs = document.querySelectorAll(".form-input")
    inputs.forEach((input) => {
      input.addEventListener("blur", this.validateField.bind(this))
      input.addEventListener("input", this.clearErrors.bind(this))
    })
  }

  setupFormValidation() {
    this.validators = {
      required: (value) => value.trim() !== "",
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      phone: (value) => /^(\+977)?[0-9]{10}$/.test(value.replace(/\s/g, "")),
      postal: (value) => /^[0-9]{5}$/.test(value),
    }

    this.errorMessages = {
      required: "This field is required",
      email: "Please enter a valid email address",
      phone: "Please enter a valid phone number",
      postal: "Please enter a valid 5-digit postal code",
    }
  }

  setupMobileMenu() {
    const toggle = document.querySelector(".mobile-menu-toggle")
    const menu = document.querySelector(".nav-menu")

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true"
        toggle.setAttribute("aria-expanded", !isExpanded)
        menu.classList.toggle("mobile-menu-open")
      })
    }
  }

  validateField(event) {
    const field = event.target
    const value = field.value.trim()
    const fieldName = field.name
    const isRequired = field.hasAttribute("required")
    const fieldType = field.type

    let isValid = true
    let errorMessage = ""

    // Required validation
    if (isRequired && !this.validators.required(value)) {
      isValid = false
      errorMessage = this.errorMessages.required
    }
    // Type-specific validation
    else if (value && fieldType === "email" && !this.validators.email(value)) {
      isValid = false
      errorMessage = this.errorMessages.email
    } else if (value && fieldType === "tel" && !this.validators.phone(value)) {
      isValid = false
      errorMessage = this.errorMessages.phone
    } else if (value && fieldName.includes("postal") && !this.validators.postal(value)) {
      isValid = false
      errorMessage = this.errorMessages.postal
    }

    this.displayFieldError(field, isValid ? "" : errorMessage)
    return isValid
  }

  clearErrors(event) {
    const field = event.target
    if (field.value.trim() === "") {
      this.displayFieldError(field, "")
    }
  }

  displayFieldError(field, message) {
    const errorElement = document.getElementById(field.getAttribute("aria-describedby"))
    if (errorElement) {
      errorElement.textContent = message
      field.classList.toggle("error", !!message)
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll(".form-input[required]")
    let isValid = true

    inputs.forEach((input) => {
      if (!this.validateField({ target: input })) {
        isValid = false
      }
    })

    return isValid
  }

  handleFormSubmit(event) {
    event.preventDefault()

    const form = event.target
    const isValid = this.validateForm(form)

    if (isValid) {
      // Show loading state
      const submitBtn = form.querySelector(".btn-primary")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        this.showSuccessMessage("Order booked successfully! You will receive a confirmation email shortly.")
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        form.reset()
      }, 2000)
    } else {
      this.showErrorMessage("Please correct the errors above and try again.")
    }
  }

  handleNewsletterSubmit(event) {
    event.preventDefault()

    const form = event.target
    const emailInput = form.querySelector('input[type="email"]')
    const isValid = this.validators.email(emailInput.value)

    if (isValid) {
      const submitBtn = form.querySelector(".newsletter-btn")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...'
      submitBtn.disabled = true

      setTimeout(() => {
        this.showSuccessMessage("Successfully subscribed to our newsletter!")
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        form.reset()
      }, 1500)
    } else {
      this.displayFieldError(emailInput, this.errorMessages.email)
    }
  }

  showSuccessMessage(message) {
    this.showNotification(message, "success")
  }

  showErrorMessage(message) {
    this.showNotification(message, "error")
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `

    // Add styles if not already present
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style")
      styles.id = "notification-styles"
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          max-width: 400px;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
        }
        .notification-success {
          background-color: #10B981;
          color: white;
        }
        .notification-error {
          background-color: #EF4444;
          color: white;
        }
        .notification-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .notification-close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          margin-left: auto;
          padding: 0.25rem;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `
      document.head.appendChild(styles)
    }

    // Add to DOM
    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 5000)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.remove()
    })
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SarathiApp()
})

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
