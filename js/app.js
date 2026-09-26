/* =========================================================
   CV dynamique — charge data.json et rend toutes les sections.
   Si data.json est introuvable (ouverture locale en file://),
   un jeu de données par défaut est utilisé.
   ========================================================= */

/* ---------- Internationalisation FR / EN ---------- */

const I18N = {
  fr: {
    "nav.apropos": "À propos",
    "nav.experience": "Expérience",
    "nav.competences": "Compétences",
    "nav.projets": "Projets",
    "nav.formation": "Formation",
    "nav.contact": "Contact",
    "nav.theme": "Changer de thème",
    "nav.menu": "Menu",
    "nav.lang": "Voir la version anglaise",
    "hero.hello": "Bonjour, je suis",
    "hero.projects": "Voir mes projets",
    "hero.contact": "Me contacter",
    "hero.available": "Disponible",
    "about.label": "À propos",
    "about.title": "Qui suis-je ?",
    "exp.label": "Parcours",
    "exp.title": "Expérience professionnelle",
    "skills.label": "Savoir-faire",
    "skills.title": "Compétences",
    "projects.label": "Réalisations",
    "projects.title": "Projets",
    "edu.label": "Cursus",
    "edu.title": "Formation",
    "testi.label": "Recommandations",
    "testi.title": "Témoignages",
    "contact.label": "Contact",
    "contact.title": "Parlons de votre projet",
    "block.languages": "Langues",
    "block.trainings": "Formations professionnelles",
    "block.interests": "Centres d'intérêt",
    "form.title": "Envoyez-moi un message",
    "form.name": "Nom",
    "form.name.ph": "Votre nom",
    "form.email": "Email",
    "form.subject": "Sujet",
    "form.subject.ph": "Objet de votre message",
    "form.message": "Message",
    "form.message.ph": "Votre message…",
    "form.submit": "Envoyer le message",
    "form.sending": "Envoi en cours…",
    "form.sendingNote": "Envoi de votre message…",
    "form.ok": "Message envoyé, merci ! Je vous réponds rapidement.",
    "form.err": "L'envoi a échoué. Écrivez-moi directement par email.",
    "footer.backTop": "Revenir en haut",
    "ui.more": "En savoir plus",
    "ui.details": "Détails du projet",
    "ui.code": "Voir le code ↗",
    "ui.demo": "Démo ↗",
    "ui.phone": "Téléphone",
    "ui.searchTitle": "Ce que je recherche",
    "ui.filterAll": "Tout",
    "print.profile": "Profil",
    "print.contact": "Contact",
    "print.skills": "Compétences",
    "print.languages": "Langues",
    "print.interests": "Centres d'intérêt",
    "print.experience": "Expérience professionnelle",
    "print.education": "Formation",
    "print.projects": "Projets",
    "about.basedIn": "Je suis basé à",
    "about.availableIn": "disponible en",
    "about.reachMe": "Vous pouvez me joindre à"
  },
  en: {
    "nav.apropos": "About",
    "nav.experience": "Experience",
    "nav.competences": "Skills",
    "nav.projets": "Projects",
    "nav.formation": "Education",
    "nav.contact": "Contact",
    "nav.theme": "Toggle theme",
    "nav.menu": "Menu",
    "nav.lang": "View the French version",
    "hero.hello": "Hi, I'm",
    "hero.projects": "View my projects",
    "hero.contact": "Contact me",
    "hero.available": "Available",
    "about.label": "About",
    "about.title": "Who am I?",
    "exp.label": "Career path",
    "exp.title": "Professional experience",
    "skills.label": "Expertise",
    "skills.title": "Skills",
    "projects.label": "Projects",
    "projects.title": "Projects",
    "edu.label": "Education",
    "edu.title": "Education",
    "testi.label": "Testimonials",
    "testi.title": "Testimonials",
    "contact.label": "Contact",
    "contact.title": "Let's talk about your project",
    "block.languages": "Languages",
    "block.trainings": "Professional training",
    "block.interests": "Interests",
    "form.title": "Send me a message",
    "form.name": "Name",
    "form.name.ph": "Your name",
    "form.email": "Email",
    "form.subject": "Subject",
    "form.subject.ph": "Message subject",
    "form.message": "Message",
    "form.message.ph": "Your message…",
    "form.submit": "Send message",
    "form.sending": "Sending…",
    "form.sendingNote": "Sending your message…",
    "form.ok": "Message sent, thank you! I'll get back to you shortly.",
    "form.err": "Sending failed. Please email me directly.",
    "footer.backTop": "Back to top",
    "ui.more": "Learn more",
    "ui.details": "Project details",
    "ui.code": "View code ↗",
    "ui.demo": "Demo ↗",
    "ui.phone": "Phone",
    "ui.searchTitle": "What I'm looking for",
    "ui.filterAll": "All",
    "print.profile": "Profile",
    "print.contact": "Contact",
    "print.skills": "Skills",
    "print.languages": "Languages",
    "print.interests": "Interests",
    "print.experience": "Professional experience",
    "print.education": "Education",
    "print.projects": "Projects",
    "about.basedIn": "I am based in",
    "about.availableIn": "available for",
    "about.reachMe": "You can reach me at"
  }
};

let LANG = "fr";

function t(key) {
  const dict = I18N[LANG] || I18N.fr;
  if (dict[key] != null) return dict[key];
  return I18N.fr[key] != null ? I18N.fr[key] : key;
}

const DEFAULT_DATA = {
  profile: {
    name: "Prénom NOM",
    initials: "PV",
    roles: ["Développeur Full-Stack", "Développeur Web", "Ingénieur Logiciel"],
    tagline: "Je conçois des applications web modernes, rapides et faciles à utiliser.",
    bio: "Passionné par le développement web depuis plusieurs années, je transforme des idées en produits concrets. J'aime le travail en équipe, l'apprentissage continu et les défis techniques.",
    photo: "",
    location: "Ville, Pays",
    mobility: "",
    travel: "",
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
  search: null,
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

/* Email obfusqué dans les sources : tableau de codes + offset. */
const EMAIL_KEY = 5;
let CONTACT_EMAIL = "";

function deobfuscateEmail(v) {
  if (Array.isArray(v)) return v.map((n) => String.fromCharCode(n - EMAIL_KEY)).join("");
  return String(v || "");
}

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

  const mob = qs("#mobilityChip");
  if (mob) {
    const bits = [];
    if (p.location) bits.push('<span class="meta-ico">📍</span>' + escapeHtml(p.location));
    if (p.mobility) bits.push('<span class="meta-ico">🌐</span>' + escapeHtml(p.mobility));
    mob.innerHTML = bits.join('<span class="meta-sep">·</span>');
    mob.hidden = bits.length === 0;
  }

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

/* Découpe un texte en paragraphes : une ligne vide sépare deux blocs. */
function toParagraphs(text) {
  return String(text || "")
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => "<p>" + escapeHtml(t) + "</p>")
    .join("");
}

function renderAbout(d) {
  const p = d.profile;
  const bio = qs("#aboutBio");
  const email = deobfuscateEmail(d.contact.email);
  let blocks = toParagraphs(p.bio);

  if (p.location) {
    let place = t("about.basedIn") + " <strong>" + escapeHtml(p.location) + "</strong>";
    if (p.mobility) place += ", " + t("about.availableIn") + " <strong>" + escapeHtml(String(p.mobility).toLowerCase()) + "</strong>";
    if (p.travel) place += ", " + escapeHtml(p.travel);
    blocks += "<p>" + place + ".</p>";
  }
  if (email) {
    blocks +=
      "<p>" + t("about.reachMe") + ' <a href="mailto:' + email +
      '" style="color:var(--accent-2)">' + escapeHtml(email) + "</a>.</p>";
  }
  bio.innerHTML = blocks;
}

function renderSearch(d) {
  const card = qs("#searchCard");
  if (!card) return;
  const s = d.search;
  if (!s || !s.text) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  setText("searchTitle", s.title || t("ui.searchTitle"));
  setText("searchText", s.text);
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

/* Une compétence porte un pourcentage dans data.json (0-100) qui pilote
   la largeur ET la couleur du remplissage. Le chiffre n'est jamais affiché :
   haut = bleu, moyen = orange, bas = rouge. */
const SKILL_BANDS = [
  { min: 67, band: "haut" },
  { min: 34, band: "moyen" },
  { min: 0, band: "bas" }
];

function skillLevel(pct) {
  const v = Math.max(0, Math.min(100, Number(pct) || 0));
  const hit = SKILL_BANDS.find((b) => v >= b.min) || SKILL_BANDS[SKILL_BANDS.length - 1];
  return { value: v, band: hit.band };
}

function renderSkills(d) {
  const grid = qs("#skillsList");
  grid.innerHTML = (d.skills || [])
    .map((cat) =>
      '<div class="skill-card"><h4><span class="skill-emoji">⚡</span>' + escapeHtml(cat.category) + "</h4>" +
      '<div class="skill-list">' +
      cat.items
        .map((s) => {
          const lv = skillLevel(s.level);
          return '<span class="sk"><span class="sk-fill ' + lv.band + '" data-level="' + lv.value + '"></span>' +
            '<span class="sk-label">' + escapeHtml(s.name) + "</span></span>";
        })
        .join("") +
      "</div></div>"
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

function renderTrainings(d) {
  qs("#trainingList").innerHTML = (d.trainings || [])
    .map((t) =>
      '<details class="chip-card">' +
      "<summary>" + escapeHtml(t.name) +
      "<small>" + escapeHtml(t.org) + (t.year ? " · " + escapeHtml(t.year) : "") + "</small></summary>" +
      (t.detail ? '<div class="chip-detail">' + escapeHtml(t.detail) + "</div>" : "") +
      "</details>"
    )
    .join("");
}

function renderInterests(d) {
  qs("#interestsList").innerHTML = (d.interests || [])
    .map((i) => {
      if (typeof i === "string") return '<span class="chip">' + escapeHtml(i) + "</span>";
      return (
        '<details class="chip-card"><summary>' + escapeHtml(i.name) + "</summary>" +
        '<div class="chip-detail">' + escapeHtml(i.detail || "") + "</div></details>"
      );
    })
    .join("");
}

function renderProjects(d) {
  const list = qs("#projectsList");
  const filtersBox = qs("#projectFilters");
  const projects = d.projects || [];

  const ALL_CATS = "*";
  const cats = [{ key: ALL_CATS, label: t("ui.filterAll") }]
    .concat([...new Set(projects.map((p) => p.category).filter(Boolean))]
      .map((c) => ({ key: c, label: c })));
  filtersBox.innerHTML = cats
    .map((c, i) => '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-filter="' + c.key + '">' + escapeHtml(c.label) + "</button>")
    .join("");

  function inject(key) {
    const filtered = key === ALL_CATS ? projects : projects.filter((p) => p.category === key);
    list.innerHTML = filtered
      .map((p) =>
        '<article class="project-card"><span class="project-cat">' + escapeHtml(p.category) + "</span>" +
        (p.status ? '<span class="project-status">' + escapeHtml(p.status) + "</span>" : "") +
        '<h4 class="project-title">' + escapeHtml(p.title) + "</h4>" +
        '<p class="project-desc">' + escapeHtml(p.description) + "</p>" +
        '<div class="project-tags">' + (p.tags || []).map((tag) =>
          '<span class="tag">' + escapeHtml(tag) + "</span>").join("") + "</div>" +
        (p.detail && p.detail.length
          ? '<details class="project-detail"><summary>' + (p.link || p.demo ? t("ui.more") : t("ui.details")) + "</summary>" +
            p.detail.map((d) => "<p>" + escapeHtml(d) + "</p>").join("") + "</details>"
          : "") +
        '<div class="project-links">' +
        (p.link ? '<a href="' + p.link + '" target="_blank" rel="noopener">' + t("ui.code") + "</a>" : "") +
        (p.demo ? '<a href="' + p.demo + '" target="_blank" rel="noopener">' + t("ui.demo") + "</a>" : "") +
        "</div></article>"
      )
      .join("");
  }

  inject(ALL_CATS);

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
  const email = deobfuscateEmail(c.email);
  const items = [
    { icon: ICONS.email, label: "Email", value: email, href: "mailto:" + email },
    { icon: ICONS.phone, label: t("ui.phone"), value: c.phone, href: "tel:" + c.phone.replace(/\s/g, "") },
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

function renderTestimonials(d) {
  const section = qs("#temoignages");
  const list = qs("#testimonialsList");
  const items = (d.testimonials || []).filter(
    (t) => t && (t.nom || t.prenom) && t.contenu
  );
  if (!items.length) {
    section.style.display = "none";
    return;
  }
  section.style.display = "";
  list.innerHTML = items
    .map((t) => {
      const initials = ((t.prenom || "") + " " + (t.nom || "")).trim()
        .split(" ")
        .map((w) => w[0] ? w[0].toUpperCase() : "")
        .slice(0, 2)
        .join("");
      const name = [t.prenom, t.nom].filter(Boolean).join(" ");
      return (
        '<article class="testimonial-card reveal">' +
        '<div class="tquote">”</div>' +
        "<p class=\"tcontent\">" + escapeHtml(t.contenu) + "</p>" +
        '<footer class="tauthor">' +
        '<span class="tavatar">' + escapeHtml(initials) + "</span>" +
        '<span class="tmeta"><strong>' + escapeHtml(name) + "</strong>" +
        (t.poste ? "<small>" + escapeHtml(t.poste) + "</small>" : "") +
        "</span>" +
        (t.linkedin
          ? '<a class="tlinkedin" href="' + t.linkedin + '" target="_blank" rel="noopener">LinkedIn ↗</a>'
          : "") +
        "</footer></article>"
      );
    })
    .join("");
}

/* ---------- Aperçu imprimable (PDF 1 page) ---------- */

function renderPrint(d) {
  const p = d.profile;
  const c = d.contact;
  const email = deobfuscateEmail(c.email);

  const contactItems = [
    p.location && { tag: "📍", text: p.location },
    p.mobility && { tag: "🌐", text: p.mobility },
    email && { tag: "✉", text: email },
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
          .map((s) => {
            const lv = skillLevel(s.level);
            return '<span class="pkw"><span class="pkw-fill ' + lv.band +
              '" style="width:' + lv.value + '%"></span>' +
              '<span class="pkw-label">' + escapeHtml(s.name) + "</span></span>";
          })
          .join("") +
        "</div>"
    )
    .join("");

  const languages = (d.languages || [])
    .map((l) => "<li><strong>" + escapeHtml(l.name) + "</strong> — " + escapeHtml(l.level) + "</li>")
    .join("");

  const interests = (d.interests || [])
    .map((i) => '<span class="pint">' + escapeHtml(typeof i === "string" ? i : i.name) + "</span>")
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
        (pr.status ? ' <em class="pproj-wip">' + escapeHtml(pr.status) + "</em>" : "") +
        '</span><small>' + escapeHtml(pr.category) + "</small></span>"
    )
    .join("");

  const search = d.search && d.search.text
    ? '<section class="pbox"><h2>' + escapeHtml(d.search.title || t("ui.searchTitle")) +
      '</h2><p class="psearch">' + escapeHtml(d.search.text) + "</p></section>"
    : "";

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
      ? '<section class="pbox"><h2>' + t("print.profile") + '</h2><div class="pprofil">' + toParagraphs(p.bio) + "</div></section>"
      : "") +

    '<section class="pbox"><h2>' + t("print.contact") + '</h2><ul class="pcontact">' +
    contactItems.map((i) => "<li><em>" + i.tag + "</em> " + escapeHtml(i.text) + "</li>").join("") +
    "</ul></section>" +

    '<section class="pbox"><h2>' + t("print.skills") + "</h2>" + skills + "</section>" +

    (languages ? '<section class="pbox"><h2>' + t("print.languages") + '</h2><ul class="plangs">' + languages + "</ul></section>" : "") +

    (interests ? '<section class="pbox"><h2>' + t("print.interests") + '</h2><div class="pinterests">' + interests + "</div></section>" : "") +

    "</aside>" +

    '<section class="pmain">' +

    (experience ? '<section class="pbox"><h2>' + t("print.experience") + "</h2>" + experience + "</section>" : "") +

    search +

    (education ? '<section class="pbox"><h2>' + t("print.education") + "</h2>" + education + "</section>" : "") +

    (projects ? '<section class="pbox"><h2>' + t("print.projects") + '</h2><div class="pprojects">' + projects + "</div></section>" : "") +

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
  document.querySelectorAll(".sk-fill").forEach((el) => io.observe(el));
}

let roleTimer = null;

function setupRoleRotator(roles) {
  const el = qs("#heroRole");
  let i = 0;
  (function tick() {
    el.textContent = roles[i % roles.length];
    i++;
    roleTimer = setTimeout(tick, 2600);
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

function setupContactForm() {
  const form = qs("#contactForm");
  if (!form) return;
  form.action = "https://formsubmit.co/" + CONTACT_EMAIL;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const note = qs("#formNote");
    const btn = form.querySelector("button[type=submit]");
    const data = Object.fromEntries(new FormData(form).entries());
    btn.disabled = true;
    btn.textContent = t("form.sending");
    note.hidden = false;
    note.className = "form-note";
    note.textContent = t("form.sendingNote");
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + CONTACT_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        form.reset();
        note.classList.remove("error");
        note.textContent = t("form.ok");
      } else {
        note.classList.add("error");
        note.textContent = t("form.err") + " " + (json.message || "");
      }
    } catch (err) {
      note.classList.add("error");
      note.textContent = t("form.err");
    } finally {
      btn.disabled = false;
      btn.textContent = t("form.submit");
    }
  });
}

/* ---------- Chargement des données ---------- */

const DATA_FILE = { fr: "data.json", en: "data.en.json" };

async function loadData() {
  const file = DATA_FILE[LANG] || DATA_FILE.fr;
  try {
    const res = await fetch(file, { cache: "no-store" });
    if (!res.ok) throw new Error("status " + res.status);
    const remote = await res.json();
    return deepMerge(DEFAULT_DATA, remote);
  } catch (err) {
    console.warn(file + " introuvable, utilisation des données par défaut :", err);
    return DEFAULT_DATA;
  }
}

function renderAll(data) {
  CONTACT_EMAIL = deobfuscateEmail(data.contact.email);

  applyI18n();
  renderHero(data);
  renderAbout(data);
  renderSearch(data);
  renderExperience(data);
  renderSkills(data);
  renderLanguages(data);
  renderTrainings(data);
  renderInterests(data);
  renderProjects(data);
  renderEducation(data);
  renderContact(data);
  renderFooter(data);
  renderTestimonials(data);
  renderPrint(data);

  setupRoleRotator(data.profile.roles);
  setupSkillsAnimation();
}

function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      el.setAttribute(attr, t(key));
    });
  });
  const btn = qs("#langBtn");
  if (btn) {
    btn.textContent = LANG === "fr" ? "EN" : "FR";
    btn.setAttribute("title", t("nav.lang"));
    btn.setAttribute("aria-label", t("nav.lang"));
  }
}

function detectLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "fr") return q;
  const stored = localStorage.getItem("cv-lang");
  if (stored === "en" || stored === "fr") return stored;
  return "fr";
}

function setupLang() {
  qs("#langBtn").addEventListener("click", async () => {
    const next = LANG === "fr" ? "en" : "fr";
    localStorage.setItem("cv-lang", next);
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    history.replaceState(null, "", url);
    LANG = next;
    stopRoleRotator();
    renderAll(await loadData());
  });
}

function stopRoleRotator() {
  if (roleTimer) {
    clearTimeout(roleTimer);
    roleTimer = null;
  }
}

(async function init() {
  LANG = detectLang();
  renderAll(await loadData());

  setupTheme();
  setupNav();
  setupContactForm();
  setupReveal();
  setupLang();
})();