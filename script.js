// Button click sound
const buttonSound = new Audio('asset/button.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      const clickSound = buttonSound.cloneNode();
      clickSound.play();
    });
  });
});

// Tabs functionality
const tabs = document.querySelectorAll(".tabs button");
const panels = document.querySelectorAll(".tab-panel");
const tabContent = document.querySelector(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.textContent.toLowerCase();
    panels.forEach(panel => {
      panel.classList.toggle("active", panel.dataset.tab === selected);
    });

    const colorKey = tab.dataset.color || selected;
    tabContent.classList.add("active-tab");
    tabContent.setAttribute("data-color", colorKey);
  });
});

// Opening screen logic
const openBtn = document.getElementById("open-button");
const openingScreen = document.getElementById("opening-screen");
const profileScreen = document.getElementById("profile-screen");
const flipSound = new Audio('asset/flip.mp3');

openBtn.addEventListener("click", () => {
  openingScreen.classList.remove("visible");
  openingScreen.classList.add("hidden");
  profileScreen.classList.remove("hidden");
  profileScreen.classList.add("visible");

  localStorage.setItem("designerUnlocked", "true");
});

window.addEventListener("DOMContentLoaded", () => {
  const hasOpened = localStorage.getItem("designerUnlocked") === "true";
  if (hasOpened) {
    openingScreen.classList.remove("visible", "js-hidden");
    openingScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");
    profileScreen.classList.add("visible");
  } else {
    openingScreen.classList.remove("js-hidden");
    openingScreen.classList.add("visible");
  }
});

// Flip card logic
const flipContainer = document.querySelector(".card-flip-container");

if (flipContainer) {
  flipContainer.addEventListener("click", (e) => {
    const isInteractive = e.target.closest("button, a, .tabs");
    const swiperSlide = flipContainer.closest(".swiper-slide");

    // Flip only if the card is centered (active slide)
    if (!isInteractive && swiperSlide.classList.contains("swiper-slide-active")) {
      flipContainer.classList.toggle("flipped");
      flipSound.play();
    }
  });
}




// Swiper init (for card navigation via keyboard and scroll)
const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 0,
  loop: false,
  slideToClickedSlide: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    forceToAxis: true,
    sensitivity: 1,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
  }
});


