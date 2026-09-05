/* ==========================================================
   MOBILE NAVIGATION
   Opens and closes the menu on smaller screens.
   ========================================================== */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  // Helps screen readers understand whether the menu is open.
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after the visitor selects a link.
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

/* ==========================================================
   PACKAGE SELECTION
   Automatically selects the chosen package in the form.
   ========================================================== */

const packageSelect = document.querySelector("#package-select");
const packageLinks = document.querySelectorAll("[data-package]");

packageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    packageSelect.value = link.dataset.package;
  });
});

/* ==========================================================
   BOOKING FORM
   Turns the form information into a pre-filled email.
   ========================================================== */

const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector(".form-status");

bookingForm.addEventListener("submit", (event) => {
  // Prevent the page from refreshing.
  event.preventDefault();

  // Collect all the information entered into the form.
  const formData = new FormData(event.currentTarget);

  // Create the email subject.
  const subject = encodeURIComponent(
    `Project enquiry — ${formData.get("package")}`,
  );

  // Create the email message.
  const message = `Hi Homesick Creative,

Name: ${formData.get("name")}
Email: ${formData.get("email")}
Service: ${formData.get("service")}
Package: ${formData.get("package")}

Project details:
${formData.get("details")}`;

  // Convert the message into a format that works inside a URL.
  const body = encodeURIComponent(message);

  formStatus.textContent = "Opening your email app…";

  // Open the visitor's default email application.
  window.location.href =
    `mailto:hello@homesickcreative.com?subject=${subject}&body=${body}`;
});
