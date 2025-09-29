// ===== LANDING PAGE JAVASCRIPT =====

// DOM Elements
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");

// ===== MOBILE NAVIGATION TOGGLE =====
function toggleMobileNav() {
  navMenu.classList.toggle("active");

  // Animate hamburger menu
  const bars = navToggle.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    if (navMenu.classList.contains("active")) {
      if (index === 0) {
        bar.style.transform = "rotate(45deg) translate(5px, 5px)";
      } else if (index === 1) {
        bar.style.opacity = "0";
      } else if (index === 2) {
        bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
      }
    } else {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    }
  });
}

// ===== CLOSE MOBILE NAV WHEN CLICKING LINKS =====
function closeMobileNav() {
  navMenu.classList.remove("active");
  const bars = navToggle.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.style.transform = "none";
    bar.style.opacity = "1";
  });
}

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
function smoothScrollToSection(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    const headerHeight = header.offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  // Close mobile nav if open
  closeMobileNav();
}

// ===== SCROLL EFFECTS =====
function handleScroll() {
  const scrollY = window.scrollY;

  // Header background opacity based on scroll
  if (scrollY > 50) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
  }

  // Update active navigation link based on scroll position
  updateActiveNavLink();

  // Reveal animations for elements coming into view
  revealOnScroll();
}

// ===== UPDATE ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
  const scrollPos = window.scrollY + header.offsetHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const correspondingNavLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`
    );

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all nav links
      navLinks.forEach((link) => link.classList.remove("active"));
      // Add active class to current section's nav link
      if (correspondingNavLink) {
        correspondingNavLink.classList.add("active");
      }
    }
  });
}

// ===== REVEAL ELEMENTS ON SCROLL =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".service-card, .testimonial-card, .about-text, .contact-info, .contact-form"
  );
  const windowHeight = window.innerHeight;
  const revealPoint = 50;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = revealPoint;

    if (elementTop < windowHeight - elementVisible) {
      if (!element.classList.contains("revealed")) {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.6s ease-out";

        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          element.classList.add("revealed");
        }, 100);
      }
    }
  });
}

// ===== CONTACT FORM HANDLING =====
function handleFormSubmission(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData);

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    // Show success message
    showNotification(
      "Message sent successfully! We'll get back to you soon.",
      "success"
    );

    // Reset form
    form.reset();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  // Remove any existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#6366f1"
        };
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Handle close button
  const closeButton = notification.querySelector(".notification-close");
  closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        line-height: 1;
    `;

  const notificationContent = notification.querySelector(
    ".notification-content"
  );
  notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;

  closeButton.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

// ===== FLOATING ANIMATION FOR HERO CARDS =====
function initFloatingAnimation() {
  const cards = document.querySelectorAll(".floating-card");

  cards.forEach((card, index) => {
    // Add random floating effect with different delays
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;

    card.style.animationDelay = `${randomDelay}s`;
    card.style.animationDuration = `${randomDuration}s`;

    // Add hover effect
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.1) rotate(5deg)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .testimonial-card, .stat"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// ===== TYPING EFFECT FOR HERO TITLE =====
function initTypingEffect() {
  const titleElement = document.querySelector(".hero-title");
  if (!titleElement) return;

  const text = titleElement.innerHTML;
  titleElement.innerHTML = "";
  titleElement.style.borderRight = "2px solid white";

  let index = 0;
  const typeSpeed = 100;

  function typeText() {
    if (index < text.length) {
      if (text.charAt(index) === "<") {
        // Handle HTML tags
        const tagEnd = text.indexOf(">", index);
        const tag = text.substring(index, tagEnd + 1);
        titleElement.innerHTML += tag;
        index = tagEnd + 1;
      } else {
        titleElement.innerHTML += text.charAt(index);
        index++;
      }

      setTimeout(typeText, typeSpeed);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        titleElement.style.borderRight = "none";
      }, 1000);
    }
  }

  // Start typing effect after page load
  setTimeout(typeText, 1000);
}

// ===== PERFORMANCE OPTIMIZATION =====
let isScrolling = false;

function optimizedScrollHandler() {
  if (!isScrolling) {
    requestAnimationFrame(() => {
      handleScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
  // Navigation toggle
  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileNav);
  }

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScrollToSection);
  });

  // Scroll events
  window.addEventListener("scroll", optimizedScrollHandler);

  // Contact form
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmission);
  }

  // Resize handler for mobile navigation
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileNav();
    }
  });

  // Close mobile nav when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileNav();
    }
  });

  // Handle escape key for mobile nav
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
    }
  });
}

// ===== LOADING ANIMATION =====
function initLoadingAnimation() {
  // Add fade-in effect to main sections
  const mainSections = document.querySelectorAll("section");
  mainSections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Landing Page Initialized");

  // Initialize all features
  initEventListeners();
  initFloatingAnimation();
  initIntersectionObserver();
  initLoadingAnimation();

  // Initialize typing effect (optional - can be disabled for simpler effect)
  // initTypingEffect();

  // Initial scroll check
  handleScroll();
  revealOnScroll();

  // Add smooth scroll behavior fallback for browsers that don't support CSS scroll-behavior
  if (!CSS.supports("scroll-behavior", "smooth")) {
    document.documentElement.style.scrollBehavior = "auto";
  }
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===== EXPORT FOR POTENTIAL MODULE USE =====
window.LandingPage = {
  toggleMobileNav,
  closeMobileNav,
  showNotification,
  isInViewport,
  debounce,
  throttle,
};

console.log("📄 Landing Page JavaScript Loaded Successfully!");
