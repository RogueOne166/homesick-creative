/* ==========================================================
   MOBILE NAVIGATION
   Opens and closes the menu on smaller screens.
   ========================================================== */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after selecting a link.
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});


/* ==========================================================
   DARK MODE
   ========================================================== */

const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

// Read the visitor's previous choice.
const savedTheme = localStorage.getItem("homesick-theme");

// Use the saved choice, or the device's preferred theme.
const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

if (
  savedTheme === "dark" ||
  (!savedTheme && prefersDarkMode)
) {
  document.body.classList.add("dark-mode");
}

function updateThemeButton() {
  const isDarkMode =
    document.body.classList.contains("dark-mode");

  themeIcon.textContent = isDarkMode ? "☀" : "☾";

  themeButton.setAttribute(
    "aria-label",
    isDarkMode
      ? "Switch to light mode"
      : "Switch to dark mode",
  );
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDarkMode =
    document.body.classList.contains("dark-mode");

  localStorage.setItem(
    "homesick-theme",
    isDarkMode ? "dark" : "light",
  );

  updateThemeButton();
});






/* ==========================================================
   PACKAGE SELECTION
   Selects the chosen package automatically in the form.
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
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const subject = encodeURIComponent(
    `Project enquiry — ${formData.get("package")}`,
  );

  const message = `Hi Homesick Creative,

Name: ${formData.get("name")}
Email: ${formData.get("email")}
Service: ${formData.get("service")}
Package: ${formData.get("package")}

Project details:
${formData.get("details")}`;

  const body = encodeURIComponent(message);

  formStatus.textContent = "Opening your email app…";

  window.location.href =
    `mailto:hello@homesickcreative.com?subject=${subject}&body=${body}`;
});

/* ==========================================================
   PROJECT GALLERY

   Put your photos and videos inside the assets folder.
   Then add their filenames to the correct project below.

   Image example:
   {
     type: "image",
     src: "./assets/photo.jpg",
     alt: "Description",
     caption: "Photo caption"
   }

   Video example:
   {
     type: "video",
     src: "./assets/video.mp4",
     caption: "Video caption"
   }
   ========================================================== */

const projectGalleries = {
  "after-hours": {
    title: "Events",

    media: [
      {
        type: "image",
        src: "./assets/homesick-hero.png",
        alt: "After Hours event",
        caption: "Event atmosphere",
      },

      // Add more After Hours media here:
      {
         type: "image",
         src: "./assets/event_pics/Bigg Frankii.jpg",
         alt: "MASKARENN",
         caption: "Behind the scenes",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03805 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03817 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03826 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03830 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03879 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03901 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC03964 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04015 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04018 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04231 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04239 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04272 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04289 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04293 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04302 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/DSC04305 copie.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/POSTER 1.jpg",
         caption: "CASSIYA",
       },
       {
         type: "image",
         src: "./assets/event_pics/Prophecy.jpg",
         caption: "MASKARENN",
       },
       {
         type: "image",
         src: "./assets/event_pics/Sayaa.jpg",
         caption: "MASKARENN",
       },
    ],
  },

  "new-rituals": {
    title: "Brand & Corporate",

    media: [
      {
        type: "image",
        src: "./assets/new-rituals.jpg",
        alt: "New Rituals brand photography",
        caption: "Brand photography",
      },

      // Add more New Rituals media here:
       {
         type: "image",
         src: "./assets/corporate_pics/DSC05402.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
              {
         type: "image",
         src: "./assets/corporate_pics/DSC05402.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
              {
         type: "image",
         src: "./assets/corporate_pics/DSC05402.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
              {
         type: "image",
         src: "./assets/corporate_pics/DSC05402.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
       {
         type: "image",
         src: "./assets/corporate_pics/DSC05412.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
              {
         type: "image",
         src: "./assets/corporate_pics/DSC05421.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
              {
         type: "image",
         src: "./assets/corporate_pics/DSC05446.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
              {
         type: "image",
         src: "./assets/corporate_pics/DSC05508.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
       {
         type: "image",
         src: "./assets/corporate_pics/DSC05515.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
       {
         type: "image",
         src: "./assets/corporate_pics/DSC05562.jpg",
         alt: "Corporate",
         caption: "SIALPARIS",
       },
       {
         type: "image",
         src: "./assets/corporate_pics/DSC05565.jpg",
         alt: "Corporate",
         caption: "",
       },
       {
         type: "image",
         src: "./assets/corporate_pics/DSC05568.jpg",
         alt: "Corporate",
         caption: "",
       },
       {
         type: "image",
         src: "./assets/corporate_pics/DSC055610.jpg",
         alt: "Corporate",
         caption: "",
       },
    ],
  },

  "island-frequency": {
    title: "Lifestyle & Editorial",

    media: [
      {
        type: "image",
        src: "./assets/island-frequency.png",
        alt: "Boat floating in clear blue water",
        caption: "Social campaign",
      },

      // Add more Island Frequency media here:
      {
         type: "image",
         src: "./assets/lifestyle_pics/DSC06320.jpg",
         caption: "liverpool",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/DSC06451.jpg",
         caption: "liverpool",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/DSC06457.jpg",
         caption: "liverpool",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/DSC06466.jpg",
         caption: "liverpool",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/DSC06478.jpg",
         caption: "liverpool",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Photo07_4A.jpg",
         caption: "FREE-DIEGO campaign",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Photo24_21A.jpg",
         caption: "FREE-DIEGO campaign",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Photo39_36A.jpg",
         caption: "FREE-DIEGO campaign",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Screenshot 2026-09-07 211453.png",
         caption: "island-frequencies",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Screenshot 2026-09-07 211539.png",
         caption: "island-frequencies",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Screenshot 2026-09-07 211812.png",
         caption: "island-frequencies",
       },
       {
         type: "image",
         src: "./assets/lifestyle_pics/Screenshot 2026-09-07 212048.png",
         caption: "island-frequencies",
       },
       
    ],
  },
};

/* ==========================================================
   GALLERY ELEMENTS
   ========================================================== */

const gallery = document.querySelector("#project-gallery");
const galleryTitle = document.querySelector("#gallery-title");
const galleryMedia = document.querySelector(".gallery-media");
const galleryCaption = document.querySelector(".gallery-caption");
const galleryCount = document.querySelector(".gallery-count");
const previousButton = document.querySelector(".gallery-previous");
const nextButton = document.querySelector(".gallery-next");
const closeButton = document.querySelector(".gallery-close");

let activeProject = null;
let activeIndex = 0;
let galleryTrigger = null;
let touchStartX = 0;

/* ==========================================================
   DISPLAY A PHOTO OR VIDEO
   ========================================================== */

function renderGalleryItem() {
  const item = activeProject.media[activeIndex];

  // Remove the previous photo or video.
  galleryMedia.replaceChildren();

  if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";

    video.setAttribute(
      "aria-label",
      item.caption || activeProject.title,
    );

    galleryMedia.append(video);
  } else {
    const image = document.createElement("img");

    image.src = item.src;
    image.alt = item.alt || "";

    galleryMedia.append(image);
  }

  galleryCaption.textContent = item.caption || "";

  galleryCount.textContent =
    `${activeIndex + 1} / ${activeProject.media.length}`;

  // Hide the arrows if the project contains only one item.
  const hasSeveralItems = activeProject.media.length > 1;

  previousButton.hidden = !hasSeveralItems;
  nextButton.hidden = !hasSeveralItems;
}

/* ==========================================================
   OPEN THE GALLERY
   ========================================================== */

function openGallery(projectKey, trigger) {
  activeProject = projectGalleries[projectKey];

  if (!activeProject || activeProject.media.length === 0) {
    return;
  }

  activeIndex = 0;
  galleryTrigger = trigger;

  galleryTitle.textContent = activeProject.title;

  renderGalleryItem();

  gallery.classList.add("open");
  gallery.setAttribute("aria-hidden", "false");

  document.body.classList.add("gallery-open");

  closeButton.focus();
}

/* ==========================================================
   CLOSE THE GALLERY
   ========================================================== */

function closeGallery() {
  const currentVideo = galleryMedia.querySelector("video");

  // Stop the video when the gallery closes.
  if (currentVideo) {
    currentVideo.pause();
  }

  gallery.classList.remove("open");
  gallery.setAttribute("aria-hidden", "true");

  document.body.classList.remove("gallery-open");

  // Return keyboard focus to the selected project.
  if (galleryTrigger) {
    galleryTrigger.focus();
  }
}

/* ==========================================================
   PREVIOUS OR NEXT ITEM
   ========================================================== */

function changeGalleryItem(direction) {
  if (!activeProject) {
    return;
  }

  activeIndex =
    (
      activeIndex +
      direction +
      activeProject.media.length
    ) % activeProject.media.length;

  renderGalleryItem();
}

/* ==========================================================
   OPEN A PROJECT WHEN CLICKED
   ========================================================== */

document.querySelectorAll("[data-gallery]").forEach((project) => {
  project.addEventListener("click", () => {
    openGallery(project.dataset.gallery, project);
  });

  // Allow Enter and Space to open it with a keyboard.
  project.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      openGallery(project.dataset.gallery, project);
    }
  });
});

/* ==========================================================
   CLOSE BUTTON AND BACKDROP
   ========================================================== */

document
  .querySelectorAll("[data-gallery-close]")
  .forEach((element) => {
    element.addEventListener("click", closeGallery);
  });

/* ==========================================================
   GALLERY ARROWS
   ========================================================== */

previousButton.addEventListener("click", () => {
  changeGalleryItem(-1);
});

nextButton.addEventListener("click", () => {
  changeGalleryItem(1);
});

/* ==========================================================
   KEYBOARD CONTROLS
   ========================================================== */

document.addEventListener("keydown", (event) => {
  if (!gallery.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowLeft") {
    changeGalleryItem(-1);
  }

  if (event.key === "ArrowRight") {
    changeGalleryItem(1);
  }
});

/* ==========================================================
   MOBILE SWIPE CONTROLS
   ========================================================== */

galleryMedia.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);

galleryMedia.addEventListener(
  "touchend",
  (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;

    // Ignore very small movements.
    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {
      changeGalleryItem(-1);
    } else {
      changeGalleryItem(1);
    }
  },
  { passive: true },
);
