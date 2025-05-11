document.addEventListener("DOMContentLoaded", () => {
  const tags = document.querySelectorAll(".hashtag-bubbles span");

  tags.forEach(tag => {
    tag.addEventListener("mouseenter", () => {
      tag.classList.add("bounce");

      // Remove the class after animation ends to reset
      tag.addEventListener("animationend", () => {
        tag.classList.remove("bounce");
      }, { once: true });
    });
  });
});