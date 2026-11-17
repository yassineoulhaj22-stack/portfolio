const profileKey = "portfolio_profile";
const projectsKey = "portfolio_projects";

const defaultProfile = {
  fullName: "Yassine Oulhaj",
  profession: "UX/UI Designer",
  email: "yassine.oulhaj@gmail.com",
  phone: "+212 6 00 00 00 00",
  birthDate: "2005-01-01",
  location: "Rabat, Maroc",
  education: "Bac 2024 — PC",
  school: "CMC Rabat",
  bio: "Je suis un designer UX/UI passionné par la création d’expériences digitales fluides, élégantes et utiles. J’aime transformer des idées complexes en interfaces claires et engageantes.",
  linkedin: "#",
  github: "#",
  behance: "#"
};

const defaultProjects = [
  {
    id: crypto.randomUUID(),
    title: "App de gestion de tâches",
    category: "UX/UI",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    description: "Conception d’une application moderne pour organiser et prioriser les tâches quotidiennes."
  },
  {
    id: crypto.randomUUID(),
    title: "Landing page premium",
    category: "Design Web",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    description: "Création d’une landing page élégante et orientée conversion pour une marque premium."
  },
  {
    id: crypto.randomUUID(),
    title: "Dashboard analytique",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    description: "Interface dashboard pour un service de suivi, reporting et analyse de données en temps réel."
  }
];

const profileForm = document.getElementById("profile-form");
const projectForm = document.getElementById("project-form");
const projectsContainer = document.getElementById("projects-container");
const cancelEdit = document.getElementById("cancel-edit");

function getProfile() {
  const profile = localStorage.getItem(profileKey);
  return profile ? JSON.parse(profile) : defaultProfile;
}

function saveProfile(profile) {
  localStorage.setItem(profileKey, JSON.stringify(profile));
}

function getProjects() {
  const projects = localStorage.getItem(projectsKey);
  return projects ? JSON.parse(projects) : defaultProjects;
}

function saveProjects(projects) {
  localStorage.setItem(projectsKey, JSON.stringify(projects));
}

function formatDateForDisplay(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : new Intl.DateTimeFormat("fr-FR").format(date);
}

function renderProfile() {
  const profile = getProfile();

  document.getElementById("fullName").value = profile.fullName || "";
  document.getElementById("profession").value = profile.profession || "";
  document.getElementById("email").value = profile.email || "";
  document.getElementById("phone").value = profile.phone || "";
  document.getElementById("birthDate").value = profile.birthDate || "";
  document.getElementById("location").value = profile.location || "";
  document.getElementById("education").value = profile.education || "";
  document.getElementById("school").value = profile.school || "";
  document.getElementById("bio").value = profile.bio || "";
  document.getElementById("linkedin").value = profile.linkedin || "";
  document.getElementById("github").value = profile.github || "";
  document.getElementById("behance").value = profile.behance || "";

  const profileNameDisplay = document.getElementById("profile-name-display");
  const profileEmailDisplay = document.getElementById("profile-email-display");
  const profileLocationDisplay = document.getElementById("profile-location-display");
  const profileBioDisplay = document.getElementById("profile-bio-display");
  const profileFullnameDisplay = document.getElementById("profile-fullname-display");
  const profileEmailDetail = document.getElementById("profile-email-detail");
  const profilePhoneDisplay = document.getElementById("profile-phone-display");
  const profileBirthDisplay = document.getElementById("profile-birth-display");
  const profileEducationDisplay = document.getElementById("profile-education-display");
  const profileSchoolDisplay = document.getElementById("profile-school-display");

  profileNameDisplay.textContent = profile.fullName || "Yassine Oulhaj";
  profileEmailDisplay.textContent = profile.email || "yassine.oulhaj@gmail.com";
  profileLocationDisplay.textContent = profile.location || "Rabat, Maroc";
  profileBioDisplay.textContent = profile.bio || defaultProfile.bio;
  profileFullnameDisplay.textContent = profile.fullName || "Yassine Oulhaj";
  profileEmailDetail.textContent = profile.email || "yassine.oulhaj@gmail.com";
  profilePhoneDisplay.textContent = profile.phone || "+212 6 00 00 00 00";
  profileBirthDisplay.textContent = formatDateForDisplay(profile.birthDate) || "01/01/2005";
  profileEducationDisplay.textContent = profile.education || "Bac 2024 — PC";
  profileSchoolDisplay.textContent = profile.school || "CMC Rabat";

  const socialLinks = document.querySelectorAll(".socials a, .footer-links a");
  const socialValues = {
    linkedin: profile.linkedin || "#",
    github: profile.github || "#",
    behance: profile.behance || "#"
  };

  const links = Array.from(document.querySelectorAll(".socials a"));
  if (links[0]) links[0].href = socialValues.linkedin;
  if (links[1]) links[1].href = socialValues.behance;
  if (links[2]) links[2].href = socialValues.github;

  const footerLinks = Array.from(document.querySelectorAll(".footer-links a"));
  if (footerLinks[0]) footerLinks[0].href = socialValues.linkedin;
  if (footerLinks[1]) footerLinks[1].href = socialValues.behance;
  if (footerLinks[2]) footerLinks[2].href = socialValues.github;
}

function renderProjects() {
  const projects = getProjects();

  if (!projects.length) {
    projectsContainer.innerHTML = `
      <div class="about-card" style="grid-column: 1 / -1;">
        <p>Aucun projet pour le moment. Ajoute ton premier projet.</p>
      </div>
    `;
    return;
  }

  projectsContainer.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <img class="project-image" src="${project.image}" alt="${project.title}" />
          <div class="project-body">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-actions">
              <a class="project-link" href="${project.link || "#"}" target="_blank" rel="noreferrer">Voir le projet</a>
              <div class="project-manage">
                <button class="icon-btn edit-project" data-id="${project.id}" title="Modifier">✏️</button>
                <button class="icon-btn delete-project" data-id="${project.id}" title="Supprimer">🗑️</button>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".delete-project").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const updated = getProjects().filter((project) => project.id !== id);
      saveProjects(updated);
      renderProjects();
    });
  });

  document.querySelectorAll(".edit-project").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const project = getProjects().find((p) => p.id === id);
      if (!project) return;

      document.getElementById("project-id").value = project.id;
      document.getElementById("project-title").value = project.title;
      document.getElementById("project-category").value = project.category;
      document.getElementById("project-image").value = project.image;
      document.getElementById("project-link").value = project.link || "";
      document.getElementById("project-description").value = project.description;

      document.getElementById("form-title").textContent = "Modifier le projet";
      cancelEdit.classList.remove("hidden");
      window.scrollTo({ top: document.getElementById("projects").offsetTop - 80, behavior: "smooth" });
    });
  });
}

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const profile = getProfile();
  const updatedProfile = {
    ...profile,
    fullName: document.getElementById("fullName").value,
    profession: document.getElementById("profession").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birthDate: document.getElementById("birthDate").value,
    location: document.getElementById("location").value,
    education: document.getElementById("education").value,
    school: document.getElementById("school").value,
    bio: document.getElementById("bio").value,
    linkedin: document.getElementById("linkedin").value,
    github: document.getElementById("github").value,
    behance: document.getElementById("behance").value
  };

  saveProfile(updatedProfile);
  renderProfile();
  alert("Profil enregistré !");
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = document.getElementById("project-id").value;
  const title = document.getElementById("project-title").value.trim();
  const category = document.getElementById("project-category").value.trim();
  const image = document.getElementById("project-image").value.trim();
  const link = document.getElementById("project-link").value.trim();
  const description = document.getElementById("project-description").value.trim();

  const projects = getProjects();

  const newProject = {
    id: id || crypto.randomUUID(),
    title,
    category,
    image,
    link,
    description
  };

  const updatedProjects = id
    ? projects.map((project) => (project.id === id ? newProject : project))
    : [newProject, ...projects];

  saveProjects(updatedProjects);
  renderProjects();

  projectForm.reset();
  document.getElementById("project-id").value = "";
  document.getElementById("form-title").textContent = "Ajouter un projet";
  cancelEdit.classList.add("hidden");
});

cancelEdit.addEventListener("click", () => {
  projectForm.reset();
  document.getElementById("project-id").value = "";
  document.getElementById("form-title").textContent = "Ajouter un projet";
  cancelEdit.classList.add("hidden");
});

renderProfile();
renderProjects();
