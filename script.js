
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

document.documentElement.dataset.theme = savedTheme;
themeBtn.textContent = savedTheme === "dark" ? "☀" : "☾";

// Change theme
themeBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("portfolio-theme", newTheme);

  themeBtn.textContent = newTheme === "dark" ? "☀" : "☾";
});

// Mobile navigation
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  menuBtn.textContent =
    navLinks.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal sections when scrolling
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  ".section-heading, .about-card, .skill-card, .project-card, .contact-box, .journey-card"
).forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});

// Add project URLs here
const projectLinks = {
    printcampus: "https://printcampus-v7nv.onrender.com",
    dairy: ""
};

// Open project websites
document.querySelectorAll("[data-link]").forEach(link => {
  link.addEventListener("click", event => {
    const url = projectLinks[link.dataset.link];

    event.preventDefault();

    if (!url) {
      alert("Project link will be added soon.");
      return;
    }

    if (!/^https:\/\//i.test(url)) {
      alert("Please add a valid HTTPS website link.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  });
});
