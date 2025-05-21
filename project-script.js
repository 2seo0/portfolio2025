document.addEventListener("DOMContentLoaded", () => {
  // Hashtag bounce animation
  const tags = document.querySelectorAll(".hashtag-bubbles span");

  tags.forEach(tag => {
    tag.addEventListener("mouseenter", () => {
      tag.classList.add("bounce");
      tag.addEventListener("animationend", () => {
        tag.classList.remove("bounce");
      }, { once: true });
    });
  });

  // Sidebar scroll tracking
  const sections = document.querySelectorAll("section[id], .development, .character-sheet, .backstory, .context-used, .poster");
  const navLinks = document.querySelectorAll(".sidebar-nav a");

  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const id = section.id;
      if (!id) return;

      const offset = section.offsetTop - 150;
      const height = section.offsetHeight;

      if (scrollY >= offset && scrollY < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(id)) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});
