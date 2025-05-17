// 🔊 Sounds
const buttonSound = new Audio('asset/button.mp3');
const flipSound = new Audio('asset/flip.mp3');
const bgMusic = new Audio('asset/background-music.mp3');
bgMusic.loop = true;

// 🔗 Elements
const openBtn = document.getElementById("open-button");
const openingScreen = document.getElementById("opening-screen");
const profileScreen = document.getElementById("profile-screen");
const flipHint = document.getElementById("flip-hint");
const unlockedText = document.getElementById("unlocked-text");
const loadingText = document.getElementById("loading-text");
const timerElement = document.getElementById("timer");
const emailBtn = document.getElementById("email-quest-btn");

// 📢 Play click sounds on all buttons
document.addEventListener('DOMContentLoaded', () => {
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      buttonSound.cloneNode().play();
    });
  });
});

// 🧠 Tabs functionality
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

// 🌀 Flip card logic
const flipContainer = document.querySelector(".card-flip-container");
if (flipContainer) {
  flipContainer.addEventListener("click", (e) => {
    const isInteractive = e.target.closest("button, a, .tabs");
    const swiperSlide = flipContainer.closest(".swiper-slide");
    if (!isInteractive && swiperSlide.classList.contains("swiper-slide-active")) {
      flipContainer.classList.toggle("flipped");
      flipSound.play();
    }
  });
}

const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 0,
  loop: false,
  slideToClickedSlide: true,
  keyboard: { enabled: true, onlyInViewport: true },
  mousewheel: { forceToAxis: true, sensitivity: 1 },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    slideChangeTransitionEnd: function () {
      const isMainCard = swiper.slides[swiper.activeIndex].querySelector("#main-card");
      const show = !!isMainCard;
      flipHint.style.display = show ? "block" : "none";
      unlockedText.style.display = show ? "block" : "none";

      const prevBtn = document.getElementById("prev-btn");
      const nextBtn = document.getElementById("next-btn");

      prevBtn.style.opacity = swiper.activeIndex > 0 ? "1" : "0";
      nextBtn.style.opacity = swiper.activeIndex < swiper.slides.length - 1 ? "1" : "0";

      prevBtn.style.pointerEvents = swiper.activeIndex > 0 ? "auto" : "none";
      nextBtn.style.pointerEvents = swiper.activeIndex < swiper.slides.length - 1 ? "auto" : "none";
    }
  }
});

// Run once on load to set correct button visibility
swiper.emit('slideChangeTransitionEnd');

// ⬅️➡️ Carousel nav buttons
document.getElementById("prev-btn").addEventListener("click", () => {
  swiper.slidePrev();
  buttonSound.cloneNode().play();
});
document.getElementById("next-btn").addEventListener("click", () => {
  swiper.slideNext();
  buttonSound.cloneNode().play();
});

// 🎨 Project card hover blush
const projectButton = document.querySelector('.project-button');
const projectCard = document.querySelector('.project-card');
projectButton.addEventListener('mouseenter', () => projectCard.classList.add('blush'));
projectButton.addEventListener('mouseleave', () => projectCard.classList.remove('blush'));

// 🔄 Opening Screen Logic
window.addEventListener("DOMContentLoaded", () => {
  const hasOpened = localStorage.getItem("designerUnlocked") === "true";

  if (hasOpened) {
    openingScreen.classList.remove("visible", "js-hidden");
    openingScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");
    profileScreen.classList.add("visible");
    bgMusic.play();
  } else {
    openingScreen.classList.remove("js-hidden");
    openingScreen.classList.add("visible");

    // 🔁 Loading % counter
    let percent = 0;
    const interval = setInterval(() => {
      percent += 1;
      if (loadingText) loadingText.textContent = `Loading... ${percent}%`;
      if (percent >= 100) clearInterval(interval);
    }, 30);

    // 📬 Show button after bar fills
    setTimeout(() => {
      openBtn.style.display = "block";
    }, 3100);
  }
});

// 🧩 Unlock button click
openBtn.addEventListener("click", () => {
  openingScreen.classList.remove("visible");
  openingScreen.classList.add("hidden");
  profileScreen.classList.remove("hidden");
  profileScreen.classList.add("visible");

  localStorage.setItem("designerUnlocked", "true");

  // ✅ Safe to play music now (user has interacted)
  bgMusic.play().catch(err => {
    console.warn("Music autoplay blocked:", err);
  });
});

// 🕒 Time for Background UI
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  document.getElementById("clock-time").textContent = `${hours}:${mins}`;
}
updateClock();
setInterval(updateClock, 30000);

// 📧 Email Button Function
if (emailBtn) {
  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = 'seoyounglee17@gmail.com';
    const subject = encodeURIComponent('Canvally Portfolio — Accept Quest');
    const body = encodeURIComponent("Hi Isabelle,\n\nI'd love to accept the quest you've offered!\n\n[Write your message here]");

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    try {
      window.location.href = mailtoLink;
    } catch (err) {
      alert("Oops! Could not open your mail client. You can email manually at: seoyounglee17@gmail.com");
    }
  });
}
