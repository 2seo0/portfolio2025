// 🔊 Sounds
const buttonSound = new Audio('asset/button.mp3');
const flipSound = new Audio('asset/flip.mp3');
const bgMusic = new Audio('asset/background-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5; // optional: adjust initial volume

// 🔗 Elements
const openBtn = document.getElementById("open-button");
const openingScreen = document.getElementById("opening-screen");
const profileScreen = document.getElementById("profile-screen");
const flipHint = document.getElementById("flip-hint");
const unlockedText = document.getElementById("unlocked-text");
const loadingText = document.getElementById("loading-text");
const emailBtn = document.getElementById("email-quest-btn");
const coinDisplay = document.getElementById("coin-count");
const scoreDisplay = document.getElementById("score");
const musicToggleBtn = document.getElementById("music-toggle");

// 🎵 Music control
let musicStarted = false;
let isMuted = false;

function tryPlayMusic() {
  if (!musicStarted) {
    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(err => {
      console.warn("Music blocked until user interacts:", err);
    });
  }
}

function toggleMusic() {
  if (!musicStarted) {
    tryPlayMusic();
  } else {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    updateMusicIcon();
  }
}

function updateMusicIcon() {
  if (musicToggleBtn) {
    musicToggleBtn.textContent = isMuted ? "🔇 Music Off" : "🔊 Music On";
  }
}

// Attach toggle button if it exists
if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", toggleMusic);
}

// 📈 Coins
let coinCount = 1;
function updateCoins(amount = 1) {
  coinCount += amount;
  if (coinDisplay) {
    coinDisplay.textContent = `× ${coinCount}`;
  }
}

// 📈 Score
let score = 0;
function updateScore(amount = 10) {
  score += amount;
  scoreDisplay.textContent = score.toString().padStart(6, '0');
}

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

// 🎠 Swiper setup
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

// 🎨 Project card hover
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
  } else {
    openingScreen.classList.remove("js-hidden");
    openingScreen.classList.add("visible");

    // 🔁 Loading bar logic
    let percent = 0;
    const interval = setInterval(() => {
      percent += 1;
      if (loadingText) loadingText.textContent = `Loading... ${percent}%`;
      if (percent >= 100) clearInterval(interval);
    }, 30);

    setTimeout(() => {
      openBtn.style.display = "block";
    }, 3100);
  }

  // 🕹️ Start passive score timer
  setInterval(() => {
    updateScore(15);
  }, 10000);

  // 🎵 Allow music after any user interaction
  document.addEventListener("click", tryPlayMusic, { once: true });
});

// 🔓 Unlock button click
openBtn.addEventListener("click", () => {
  openingScreen.classList.remove("visible");
  openingScreen.classList.add("hidden");
  profileScreen.classList.remove("hidden");
  profileScreen.classList.add("visible");
  localStorage.setItem("designerUnlocked", "true");
  tryPlayMusic();
});

// 📢 Play click sounds + coins
document.addEventListener('DOMContentLoaded', () => {
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      buttonSound.cloneNode().play();
      updateCoins();
    });
  });
});

// 🧩 Global interaction: coins
document.addEventListener('click', (e) => {
  const interactiveTag = ["BUTTON", "A"];
  if (interactiveTag.includes(e.target.tagName)) {
    updateCoins();
  }

  if (e.target.closest(".card-flip-container")) {
    updateCoins();
  }
});

// ⏰ Clock UI
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  document.getElementById("clock-time").textContent = `${hours}:${mins}`;
}
updateClock();
setInterval(updateClock, 30000);


// 📬 Email Quest Buttons + Quest Progress Feedback
const gmailBtn = document.getElementById("gmail-btn");
const copyEmailBtn = document.getElementById("copy-email-btn");
const copyMsg = document.getElementById("copy-msg");

// ✅ Marks quest progress as complete
function markQuestComplete() {
  const questProgress = document.querySelector(".quest-progress");
  if (questProgress) {
    questProgress.textContent = "1/1";
    questProgress.style.color = "green";
  }
}

// 📨 Mailto fallback
if (emailBtn) {
  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'seoyounglee17@gmail.com';
    const subject = encodeURIComponent('Canvally Portfolio — Accept Quest');
    const body = encodeURIComponent("Hi Isabelle,\n\nI'd love to accept the quest you've offered!\n\n[Write your message here]");
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;
      markQuestComplete();
    } catch (err) {
      alert("Could not open your mail client. Try Gmail or copy the address below!");
    }
  });
}

// 📧 Gmail Fallback
if (gmailBtn) {
  gmailBtn.addEventListener('click', () => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=seoyounglee17@gmail.com&su=Canvally Portfolio — Accept Quest&body=Hi Isabelle,%0A%0AI'd love to accept the quest you've offered!%0A%0A[Write your message here]`;
    window.open(gmailLink, '_blank');
    markQuestComplete();
  });
}

// 📋 Copy-to-Clipboard
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const emailField = document.getElementById("manual-email");
    emailField.select();
    emailField.setSelectionRange(0, 99999);
    document.execCommand("copy");

    // Show copy message
    copyMsg.classList.remove("js-hidden");
    setTimeout(() => copyMsg.classList.add("js-hidden"), 2000);

    markQuestComplete();
  });
}

