// Project data is stored as objects and rendered dynamically into the page.
const projects = [
  { title: "TechFest 2026 Website", category: "Web", icon: "✦", description: "A responsive college tech-fest website with event information and participant registration.", technologies: ["HTML", "CSS", "JavaScript"], url: "https://github.com/" },
  { title: "Web Vulnerability Scanner", category: "Security", icon: "⌘", description: "A learning project exploring common web security checks and safer development practices.", technologies: ["Python", "Cybersecurity"], url: "https://github.com/" },
  { title: "Student Project Repository", category: "Database", icon: "▤", description: "A concept for organising and accessing student projects with searchable project details.", technologies: ["Database", "JavaScript"], url: "https://github.com/" }
];

const projectGrid = document.querySelector("#projectGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const renderProjects = (filter = "All") => {
  const visibleProjects = projects.filter(project => filter === "All" || project.category === filter);
  projectGrid.innerHTML = visibleProjects.map(({title, category, icon, description, technologies, url}) => `
    <article class="project-card">
      <div class="project-art" aria-hidden="true">${icon}</div>
      <div class="project-content">
        <p class="eyebrow">${category} PROJECT</p>
        <h3>${title}</h3><p>${description}</p>
        <div class="tags">${technologies.map(tech => `<span class="tag">${tech}</span>`).join("")}</div>
        <a class="project-link" href="${url}" target="_blank" rel="noopener">View repository ↗</a>
      </div>
    </article>`).join("");
};

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});
renderProjects();

// Mobile navigation toggle.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

// Theme preference persists after refresh using localStorage.
const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀" : "☾";
});

// Validate form using regular expressions; no reload or backend submission.
const contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const nameValid = /^[A-Za-z][A-Za-z .'-]{1,49}$/.test(name);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const messageValid = message.length >= 10;
  document.querySelector("#nameError").textContent = nameValid ? "" : "Enter a name (at least 2 characters).";
  document.querySelector("#emailError").textContent = emailValid ? "" : "Enter a valid email address.";
  document.querySelector("#messageError").textContent = messageValid ? "" : "Message must contain at least 10 characters.";
  const status = document.querySelector("#formStatus");
  if (nameValid && emailValid && messageValid) {
    status.textContent = "Looks good! This demo validates your message but does not send it to a server.";
    contactForm.reset();
  } else {
    status.textContent = "Please fix the highlighted fields.";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
