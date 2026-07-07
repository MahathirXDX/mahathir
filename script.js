/* ==========================================================================
   script.js
   এই ফাইলে config.js থেকে ডাটা নিয়ে পুরো পেজে বসানো হয়, এবং আগের
   Sticky Navbar / Mobile Menu / Scroll-to-top / Rotating Text ফিচারগুলো
   অক্ষত রাখা হয়েছে। কনটেন্ট পরিবর্তন করতে হলে এই ফাইলে হাত দেওয়ার দরকার নেই —
   শুধু config.js পরিবর্তন করুন।
   ========================================================================== */

// সোশ্যাল আইকনের ম্যাপিং (key -> Font Awesome ক্লাস)
const SOCIAL_ICON_MAP = {
  facebook: "fab fa-facebook-f",
  whatsapp: "fab fa-whatsapp",
  telegram: "fab fa-telegram",
  github:   "fab fa-github",
  linkedin: "fab fa-linkedin-in",
  email:    "fa fa-envelope"
};

function buildSocialIcons(container, extraClass) {
  container.innerHTML = "";
  Object.keys(siteConfig.socials).forEach((key) => {
    const value = siteConfig.socials[key];
    if (!value) return;
    const a = document.createElement("a");
    a.href = key === "email" ? `mailto:${value}` : value;
    if (extraClass) a.className = extraClass;
    const icon = document.createElement("i");
    icon.className = SOCIAL_ICON_MAP[key] || "fa fa-link";
    a.appendChild(icon);
    container.appendChild(a);
  });
}

function renderContent() {
  // ---------- Navbar ----------
  document.getElementById("brand-logo").textContent = siteConfig.brand;
  buildSocialIcons(document.getElementById("nav-social-icons"));

  // ---------- Hero / Home ----------
  document.getElementById("hero-greeting").textContent = siteConfig.hero.greeting;
  document.getElementById("hero-name").textContent = siteConfig.hero.name;
  document.getElementById("hero-location").textContent = siteConfig.hero.location;
  const heroBtn = document.getElementById("hero-btn");
  heroBtn.textContent = siteConfig.hero.buttonText;
  heroBtn.onclick = () => {
    const target = document.querySelector(siteConfig.hero.buttonLink);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  // ---------- About ----------
  document.getElementById("about-img").src = siteConfig.about.image;
  document.getElementById("about-heading").textContent = siteConfig.about.heading;
  document.getElementById("about-text").textContent = siteConfig.about.paragraph;
  document.getElementById("about-cv-link").href = siteConfig.about.cvLink;
  document.getElementById("about-cv-btn").textContent = siteConfig.about.cvButtonText;

  // ---------- Skills ----------
  document.getElementById("skills-heading").textContent = siteConfig.skills.heading;
  document.getElementById("skills-text").textContent = siteConfig.skills.paragraph;
  document.getElementById("skills-years").textContent = siteConfig.skills.yearsExperience;
  document.getElementById("skills-years-label").innerHTML = siteConfig.skills.yearsLabel.replace(" ", " <br> ");

  const skillsBoxes = document.getElementById("skills-boxes");
  skillsBoxes.innerHTML = "";
  siteConfig.skills.list.forEach((skill) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
      <div class="topic">${skill.name}</div>
      <div class="per">${skill.percent}%</div>
    `;
    skillsBoxes.appendChild(box);
  });

  // ---------- Services ----------
  const servicesBoxes = document.getElementById("services-boxes");
  servicesBoxes.innerHTML = "";
  siteConfig.services.forEach((service) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
      <div class="icon"><i class="${service.icon}"></i></div>
      <div class="topic">${service.topic}</div>
      <p>${service.text}</p>
    `;
    servicesBoxes.appendChild(box);
  });

  // ---------- Projects ----------
  document.getElementById("projects-heading").textContent = siteConfig.projects.heading;
  document.getElementById("projects-text").textContent = siteConfig.projects.paragraph;
  const projectsBoxes = document.getElementById("projects-boxes");
  projectsBoxes.innerHTML = "";
  siteConfig.projects.list.forEach((project) => {
    const card = document.createElement("div");
    card.className = "box project-box";
    const tags = (project.tags || [])
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-img">
      <div class="topic">${project.title}</div>
      <p>${project.description}</p>
      <div class="tags">${tags}</div>
      <a href="${project.link}" target="_blank" rel="noopener" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
    `;
    projectsBoxes.appendChild(card);
  });

  // ---------- Contact ----------
  document.getElementById("contact-heading").textContent = siteConfig.contact.heading;
  document.getElementById("contact-subheading").textContent = siteConfig.contact.subheading;
  buildSocialIcons(document.getElementById("contact-social-icons"), "f-con");
  const contactBtn = document.getElementById("contact-btn");
  contactBtn.textContent = siteConfig.contact.buttonText;
  contactBtn.onclick = () => {
    if (siteConfig.socials.email) {
      window.location.href = `mailto:${siteConfig.socials.email}`;
    }
  };

  // ---------- Footer ----------
  document.getElementById("footer-name").textContent = siteConfig.footer.name;
  document.getElementById("footer-year").textContent = siteConfig.footer.year;
}

renderContent();

// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
window.onscroll = function() {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Side Navigation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function() {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};
cancelBtn.onclick = function() {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// Rotating role text on Home section (uses roles from config.js)
const text = document.querySelector(".text-three");
const roles = siteConfig.hero.roles && siteConfig.hero.roles.length
  ? siteConfig.hero.roles
  : ["Web Developer"];
let roleIndex = 0;
const rotateRoles = () => {
  roleIndex = (roleIndex + 1) % roles.length;
  text.textContent = roles[roleIndex];
};
text.textContent = roles[0];
setInterval(rotateRoles, 2500);
// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

const text = document.querySelector(".text-three");

        const textLoad = () => {
            setTimeout(() => {
                text.textContent = "Web Designer";
            }, 2000);
            setTimeout(() => {
                text.textContent = "Web Developer";
            }, 4000);
            setTimeout(() => {
                text.textContent = "Blogger";
            }, 6000); //1s = 1000 milliseconds
        }

        textLoad();
        setInterval(textLoad, 7000);
