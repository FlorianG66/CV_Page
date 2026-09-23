/* =========================================================
   CV dynamique — charge data.json et rend toutes les sections.
   Si data.json est introuvable (ouverture locale en file://),
   un jeu de données par défaut est utilisé.
   ========================================================= */

const DEFAULT_DATA = {
  profile: {
    name: "Prénom NOM",
    initials: "PV",
    roles: ["Développeur Full-Stack", "Développeur Web", "Ingénieur Logiciel"],
    tagline: "Je conçois des applications web modernes, rapides et faciles à utiliser.",
    bio: "Passionné par le développement web depuis plusieurs années, je transforme des idées en produits concrets. J'aime le travail en équipe, l'apprentissage continu et les défis techniques.",
    photo: "",
    location: "Ville, Pays",
    availability: "Disponible",
    stats: [
      { value: "5+", label: "Années d'expérience" },
      { value: "30+", label: "Projets réalisés" },
      { value: "10+", label: "Clients satisfaits" }
    ]
  },
  contact: {
    email: "prenom.nom@email.com",
    phone: "+33 6 00 00 00 00",
    github: "https://github.com/ton-compte",
    linkedin: "https://www.linkedin.com/in/ton-profil",
    website: "https://tonsite.com"
  },
  experience: [],
  skills: [],
  languages: [],
  projects: [],
  education: [],
  interests: [],
  footer: "© 2026 — CV développé avec HTML, CSS & JavaScript"
};

const ICONS = {
  email: "✉️",
  phone: "📞",
  github: "🐙",
  linkedin: "💼",
  website: "🌐",
  location: "📍"
};

const COLORS = ["", "cyan", "pink"];

/* ---------- Utilitaires ---------- */

function deepMerge(base, override) {
  const out = { ...base };
  if (!override) return out;
  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === "object"
    ) {
      out[key] = deepMerge(base[key], override[key]);
    } else {
      out[key] = override[key];
    }
  }
  return out;
}

const qs = (s, scope) => (scope || document).querySelector(s);
const qsa = (s, scope) => Array.from((scope || document).querySelectorAll(s));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function setText(id, value) {
  const el = qs("#" + id);
  if (el && value) el.textContent = value;
}

/* ---------- Rendu ---------- */

function renderHero(d) {
  const p = d.profile;
  setText("heroName", p.name);
  setText("heroTagline", p.tagline);
  setText("navName", p.name);
  setText("navLogo", p.initials);
  setText("availabilityText", p.availability);
  document.title = p.name + " — " + p.roles[0];

  if (p.photo) {
    qs("#photoPlaceholder").innerHTML = '<img src="' + p.photo + '" alt="Photo de profil" />';
  } else {
    qs("#photoPlaceholder").textContent = p.initials;
  }

  const socials = qs("#heroSocials");
  socials.innerHTML = Object.entries(d.contact)
    .filter(([k]) => ["github", "linkedin", "website"].includes(k))
    .filter(([, v]) => v)
    .map(([k, v]) =>
      '<a class="social-link" href="' + v + '" target="_blank" rel="noopener">' +
      ICONS[k] + " " + escapeHtml(cleanDomain(v)) + "</a>"
    )
    .join("");

  const stats = qs("#statsRow");
  stats.innerHTML = p.stats
    .map((s) =>
      '<div class="stat"><div class="stat-value">' + escapeHtml(s.value) +
      "</div><div class=\"stat-label\">" + escapeHtml(s.label) + "</div></div>"
    )
    .join("");
}

function cleanDomain(url) {
  return String(url).replace(/^https?:\/\//, "").replace(/\/$/, "").replace("www.", "");
}

function renderAbout(d) {
  const bio = qs("#aboutBio");
  let html =
    escapeHtml(d.profile.bio) +
    " Je suis basé(e) à <strong>" + escapeHtml(d.profile.location) + "</strong>.";
  if (d.contact.email) {
    html +=
      ' Vous pouvez me joindre à <a href="mailto:' + d.contact.email +
      '" style="color:var(--accent-2)">' + escapeHtml(d.contact.email) + "</a>.";
  }
  bio.innerHTML = html;
}

function renderExperience(d) {
  const list = qs("#experienceList");
  list.innerHTML = (d.experience || [])
    .map((e, i) =>
      '<div class="card timeline-item"><div class="tl-head">' +
      '<div><div class="tl-row">' + escapeHtml(e.role) + "</div>" +
      '<div class="tl-company">' + escapeHtml(e.company) + " · " + escapeHtml(e.location) + "</div></div>" +
      '<span class="tl-period">' + escapeHtml(e.period) + "</span></div>" +
      '<p class="tl-desc">' + escapeHtml(e.description) + "</p>" +
      '<div class="tl-tags">' + (e.tags || []).map((t) =>
        '<span class="tag ' + COLORS[i % COLORS.length] + '">' + escapeHtml(t) + "</span>").join("") +
      "</div></div>"
    )
    .join("");
}

function renderSkills(d) {
  const grid = qs("#skillsList");
  grid.innerHTML = (d.skills || [])
    .map((cat) =>
      '<div class="skill-card"><h4><span class="skill-emoji">⚡</span>' + escapeHtml(cat.category) + "</h4>" +
      cat.items
        .map((s) =>
          '<div class="skill"><div class="skill-bar-head">' +
          '<span class="skill-name">' + escapeHtml(s.name) + "</span>" +
          '<span class="skill-level">' + s.level + "%</span></div>" +
          '<div class="skill-bar"><div class="skill-bar-fill" data-level="' + s.level + '"></div></div></div>'
        )
        .join("") +
      "</div>"
    )
    .join("");
}

function renderLanguages(d) {
  qs("#languagesList").innerHTML = (d.languages || [])
    .map((l) =>
      '<span class="chip">' + escapeHtml(l.name) + "<small>" + escapeHtml(l.level) + "</small></span>"
    )
    .join("");
}

function renderInterests(d) {
  qs("#interestsList").innerHTML = (d.interests || [])
    .map((i) => '<span class="chip">' + escapeHtml(i) + "</span>")
    .join("");
}

function renderProjects(d) {
  const list = qs("#projectsList");
  const filtersBox = qs("#projectFilters");
  const projects = d.projects || [];

  const cats = ["Tout", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  filtersBox.innerHTML = cats
    .map((c, i) => '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-filter="' + c + '">' + c + "</button>")
    .join("");

  function inject(cat) {
    const filtered = cat === "Tout" ? projects : projects.filter((p) => p.category === cat);
    list.innerHTML = filtered
      .map((p) =>
        '<article class="project-card"><span class="project-cat">' + escapeHtml(p.category) + "</span>" +
        '<h4 class="project-title">' + escapeHtml(p.title) + "</h4>" +
        '<p class="project-desc">' + escapeHtml(p.description) + "</p>" +
        '<div class="project-tags">' + (p.tags || []).map((t) =>
          '<span class="tag">' + escapeHtml(t) + "</span>").join("") + "</div>" +
        '<div class="project-links">' +
        (p.link ? '<a href="' + p.link + '" target="_blank" rel="noopener">Voir le code ↗</a>' : "") +
        (p.demo ? '<a href="' + p.demo + '" target="_blank" rel="noopener">Démo ↗</a>' : "") +
        "</div></article>"
      )
      .join("");
  }

  inject("Tout");

  qsa(".filter-btn", filtersBox).forEach((btn) => {
    btn.addEventListener("click", () => {
      qsa(".filter-btn", filtersBox).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      inject(btn.dataset.filter);
    });
  });
}

function renderEducation(d) {
  const list = qs("#educationList");
  list.innerHTML = (d.education || [])
    .map((e) =>
      '<div class="card timeline-item"><div class="tl-head">' +
      '<div><div class="tl-row">' + escapeHtml(e.degree) + "</div>" +
      '<div class="tl-company">' + escapeHtml(e.school) + " · " + escapeHtml(e.place) + "</div></div>" +
      '<span class="tl-period">' + escapeHtml(e.period) + "</span></div>" +
      '<p class="tl-desc">' + escapeHtml(e.description) + "</p></div>"
    )
    .join("");
}

function renderContact(d) {
  const c = d.contact;
  const items = [
    { icon: ICONS.email, label: "Email", value: c.email, href: "mailto:" + c.email },
    { icon: ICONS.phone, label: "Téléphone", value: c.phone, href: "tel:" + c.phone.replace(/\s/g, "") },
    { icon: ICONS.github, label: "GitHub", value: cleanDomain(c.github), href: c.github },
    { icon: ICONS.linkedin, label: "LinkedIn", value: cleanDomain(c.linkedin), href: c.linkedin }
  ].filter((i) => i.value);

  qs("#contactList").innerHTML = items
    .map((i) =>
      '<a class="contact-card" href="' + i.href + '" target="_blank" rel="noopener">' +
      '<span class="contact-icon">' + i.icon + "</span>" +
      '<span><span class="contact-label">' + i.label + "</span><br />" +
      '<span class="contact-value">' + escapeHtml(i.value) + "</span></span></a>"
    )
    .join("");
}

function renderFooter(d) {
  setText("footerText", d.footer);
}

/* ---------- Aperçu imprimable (PDF 1 page) ---------- */

function renderPrint(d) {
  const p = d.profile;
  const c = d.contact;

  const contactItems = [
    p.location && { tag: "📍", text: p.location },
    c.email && { tag: "✉", text: c.email },
    c.phone && { tag: "☏", text: c.phone },
    c.linkedin && { tag: "in", text: cleanDomain(c.linkedin) },
    c.github && { tag: "gh", text: cleanDomain(c.github) },
    c.website && { tag: "🌐", text: cleanDomain(c.website) }
  ].filter(Boolean);

  const experience = (d.experience || [])
    .map(
      (e) =>
        '<article class="pe"><div class="pe-head"><div>' +
        '<div class="pe-role">' + escapeHtml(e.role) + "</div>" +
        '<div class="pe-company">' + escapeHtml(e.company) +
        (e.location ? " · " + escapeHtml(e.location) : "") + "</div></div>" +
        '<span class="pe-period">' + escapeHtml(e.period) + "</span></div>" +
        (e.description ? "<p>" + escapeHtml(e.description) + "</p>" : "") +
        "</article>"
    )
    .join("");

  const skills = (d.skills || [])
    .map(
      (cat) =>
        '<div class="pcat"><div class="pcat-title">' + escapeHtml(cat.category) + "</div>" +
        cat.items
          .map(
            (s) =>
              '<div class="ps"><div class="ps-head"><span>' + escapeHtml(s.name) + "</span></div>" +
              '<div class="ps-bar"><span style="width:' + Math.min(100, Number(s.level) || 0) + '%"></span></div></div>'
          )
          .join("") +
        "</div>"
    )
    .join("");

  const languages = (d.languages || [])
    .map((l) => "<li><strong>" + escapeHtml(l.name) + "</strong> — " + escapeHtml(l.level) + "</li>")
    .join("");

  const interests = (d.interests || [])
    .map((i) => '<span class="pint">' + escapeHtml(i) + "</span>")
    .join("");

  const education = (d.education || [])
    .map(
      (e) =>
        '<div class="ped"><div class="ped-head">' +
        '<div class="ped-degree">' + escapeHtml(e.degree) + "</div>" +
        '<span class="ped-period">' + escapeHtml(e.period) + "</span></div>" +
        '<div class="ped-school">' + escapeHtml(e.school) +
        (e.place ? " · " + escapeHtml(e.place) : "") + "</div></div>"
    )
    .join("");

  const projects = (d.projects || [])
    .map(
      (pr) =>
        '<span class="pproj"><span class="pproj-title">' + escapeHtml(pr.title) +
        '</span><small>' + escapeHtml(pr.category) + "</small></span>"
    )
    .join("");

  qs("#printArea").innerHTML =
    '<section class="pheader">' +
    '<div class="pheader-main">' +
    "<h1>" + escapeHtml(p.name) + "</h1>" +
    '<div class="ptitle">' + escapeHtml((p.roles || []).slice(0, 3).join("  |  ")) + "</div>" +
    (p.tagline ? '<p class="ptagline">' + escapeHtml(p.tagline) + "</p>" : "") +
    "</div>" +
    (p.availability
      ? '<div class="pavailable"><span class="pdot"></span>' + escapeHtml(p.availability) + "</div>"
      : "") +
    "</section>" +

    '<div class="pbody">' +
    '<aside class="paside">' +

    (p.bio
      ? '<section class="pbox"><h2>Profil</h2><p class="pprofil">' + escapeHtml(p.bio) + "</p></section>"
      : "") +

    '<section class="pbox"><h2>Contact</h2><ul class="pcontact">' +
    contactItems.map((i) => "<li><em>" + i.tag + "</em> " + escapeHtml(i.text) + "</li>").join("") +
    "</ul></section>" +

    '<section class="pbox"><h2>Compétences</h2>' + skills + "</section>" +

    (languages ? '<section class="pbox"><h2>Langues</h2><ul class="plangs">' + languages + "</ul></section>" : "") +

    (interests ? '<section class="pbox"><h2>Centres d\'intérêt</h2><div class="pinterests">' + interests + "</div></section>" : "") +

    "</aside>" +

    '<section class="pmain">' +

    (experience ? '<section class="pbox"><h2>Expérience professionnelle</h2>' + experience + "</section>" : "") +

    (education ? '<section class="pbox"><h2>Formation</h2>' + education + "</section>" : "") +

    (projects ? '<section class="pbox"><h2>Projets</h2><div class="pprojects">' + projects + "</div></section>" : "") +

    "</section></div>" +

    '<div class="pfoot">' + escapeHtml(d.footer) + "</div>";
}

/* ---------- Interactions ---------- */

function setupReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function setupSkillsAnimation() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          setTimeout(() => { fill.style.width = fill.dataset.level + "%"; }, 150);
          io.unobserve(fill);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".skill-bar-fill").forEach((el) => io.observe(el));
}

function setupRoleRotator(roles) {
  const el = qs("#heroRole");
  let i = 0;
  (function tick() {
    el.textContent = roles[i % roles.length];
    i++;
    setTimeout(tick, 2600);
  })();
}

function setupTheme() {
  const stored = localStorage.getItem("cv-theme");
  if (stored === "light") document.documentElement.classList.add("light");
  syncThemeIcons();
  qs("#themeToggle").addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    localStorage.setItem("cv-theme", document.documentElement.classList.contains("light") ? "light" : "dark");
    syncThemeIcons();
  });
}

function syncThemeIcons() {
  const light = document.documentElement.classList.contains("light");
  qs("#iconMoon").classList.toggle("hidden", light);
  qs("#iconSun").classList.toggle("hidden", !light);
}

function setupNav() {
  const nav = qs("#nav");
  const burger = qs("#burger");
  const links = qs("#navLinks");

  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 10));

  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") links.classList.remove("open");
  });

  const sections = qsa("main section[id]");
  const navAnchors = qsa(".nav-links a");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s));

  qs("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function setupPdf() {
  qs("#pdfBtn").addEventListener("click", () => window.print());
}

/* ---------- Chargement des données ---------- */

async function loadData() {
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("status " + res.status);
    const remote = await res.json();
    return deepMerge(DEFAULT_DATA, remote);
  } catch (err) {
    console.warn("data.json introuvable, utilisation des données par défaut :", err);
    return DEFAULT_DATA;
  }
}

(async function init() {
  const data = await loadData();

  renderHero(data);
  renderAbout(data);
  renderExperience(data);
  renderSkills(data);
  renderLanguages(data);
  renderInterests(data);
  renderProjects(data);
  renderEducation(data);
  renderContact(data);
  renderFooter(data);
  renderPrint(data);

  setupRoleRotator(data.profile.roles);
  setupTheme();
  setupNav();
  setupPdf();
  setupReveal();
  setupSkillsAnimation();
})();