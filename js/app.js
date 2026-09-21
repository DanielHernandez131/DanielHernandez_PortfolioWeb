/**
 * All visible copy lives here so the interface can switch language without
 * duplicating the HTML. Add the same key to both languages when adding text.
 */
const translations = {
  es: {
    navProjects: "Proyectos",
    navExperience: "Experiencia",
    navTech: "Tecnologías",
    navContact: "Hablemos",
    heroEyebrow: "DANIEL HERNÁNDEZ · DEVELOPER",
    heroLine1: "Ideas que se",
    heroLine2: "convierten en",
    heroLine3: "experiencias.",
    heroIntro:
      "Desarrollador <strong>Full-Stack</strong> con alma de <strong>creador de videojuegos.</strong> Conecto código, diseño e interacción para dar vida a productos con propósito.",
    heroExplore: "Explorar proyectos",
    heroAbout: "Un poco sobre mí",
    locationWork: "Web & videojuegos",
    logicCreativity: "LÓGICA + CREATIVIDAD",
    codeNote: "Pensamiento técnico. Sensibilidad de diseño.",
    heroMotto: "CONSTRUIR. APRENDER. VOLVER A CREAR.",
    scroll: "DESCUBRIR ↓",
    projectsEyebrow: "01 / PROYECTOS SELECCIONADOS",
    projectsTitle: "Del concepto al código",
    projectsLead:
      "Dos formas de explorar lo que más me interesa:<br>la tecnología y la experiencia humana.",
    pbVisual1: "Un momento",
    pbVisual2: "para",
    pbVisual3: "reconectar.",
    day: "Día",
    night: "Noche",
    mirror: "Espejo",
    pbCaption: "BIENESTAR · RUTINAS · AUTOCONOCIMIENTO",
    pbRole: "Full-Stack · Proyecto de equipo",
    pbSummary:
      "Una aplicación de bienestar que acompaña al usuario con actividades, registro emocional y visualización de su progreso.",
    exploreProject: "Explorar el proyecto",
    myContribution: "Mi contribución",
    pbContribution:
      "Gestión del proyecto, diseño de la experiencia y desarrollo frontend, en colaboración con el equipo backend.",
    challenge: "El reto",
    pbChallenge:
      "Conectar la rutina Día → Noche → Espejo en una experiencia clara: actividades guiadas, objetivos y seguimiento emocional, con una API REST y acceso autenticado.",
    oniriaClaim: "LAS EMOCIONES CAMBIAN EL JUEGO",
    joy: "Alegría",
    trust: "Confianza",
    fear: "Miedo",
    surprise: "Sorpresa",
    oniriaCaption: "DISEÑO DE MECÁNICAS · EMOCIÓN · INTERACCIÓN",
    oniriaRole: "Videojuegos · Diseño conceptual",
    oniriaSummary:
      "Un concepto de videojuego que explora las emociones como mecánica, inspirado en la rueda emocional de Plutchik.",
    mechanics: "Mecánicas",
    psychology: "Psicología",
    idea: "La idea",
    oniriaIdea:
      "Explorar un sistema de combate vinculado a las emociones, conectando diseño de videojuegos e inteligencia emocional.",
    approach: "El enfoque",
    oniriaApproach:
      "Traducir conceptos emocionales en decisiones y relaciones entre mecánicas. Un proyecto conceptual centrado en cómo se siente y se entiende la interacción.",
    experienceEyebrow: "02 / EXPERIENCIA & FORMACIÓN",
    experienceTitle1: "Entre la lógica",
    experienceTitle2: "y la imaginación",
    about1:
      "Mi punto de partida son los videojuegos. Mi forma de trabajar combina desarrollo web, diseño de interacción y curiosidad por la psicología.",
    about2:
      "Disfruto construyendo en equipo, dando forma a las ideas y buscando que cada interacción tenga sentido.",
    teamDev: "DESARROLLO EN EQUIPO",
    teamTitle: "Full-Stack & gestión de proyecto",
    teamText:
      "Organización del trabajo, diseño de interfaces e implementación frontend en un equipo de tres personas, coordinando la integración con el backend.",
    education: "FORMACIÓN UNIVERSITARIA",
    degree: "Diseño y Desarrollo de Videojuegos",
    degreeText:
      "Formación técnica y creativa aplicada a experiencias interactivas. Trabajo de fin de grado sobre gamificación de la psicología y la inteligencia emocional.",
    creativeInterest: "INTERÉS CREATIVO",
    systemsTitle: "Mecánicas, niveles y sistemas",
    gamesBoardgames: "Videojuegos & juegos de mesa",
    systemsText:
      "Exploración de reglas, interacción y diseño de mecánicas, con los juegos de mesa como espacio para experimentar.",
    techEyebrow: "03 / TECNOLOGÍAS",
    techTitle: "Mi caja de herramientas",
    techLead: "Del navegador al servidor.<br>Y del código al juego.",
    frontendText: "Interfaces claras y adaptables.",
    backendText: "La lógica detrás de la experiencia.",
    gameDevText: "Sistemas que invitan a interactuar.",
    mechanicsDesign: "Diseño de mecánicas",
    onlineEyebrow: "04 / ENCUÉNTRAME ONLINE",
    onlineTitle: "Código, proyectos y conexiones",
    onlineLead: "Puedes seguir mi trabajo<br>o conectar conmigo aquí.",
    linkedinText: "Perfil profesional y contacto",
    githubText: "Código y proyectos en desarrollo",
    contactEyebrow: "05 / CONTACTO",
    contactTitle: "Hablemos",
    contactLead:
      "Si buscas dar vida a una idea de videojuego, construir una experiencia web o colaborar en un proyecto, cuéntame qué tienes en mente.",
    formName: "Nombre",
    formNamePlaceholder: "Ej.: María García",
    formEmail: "Email",
    formEmailPlaceholder: "tu@email.com",
    formMessage: "Tu mensaje",
    formMessagePlaceholder: "Cuéntame sobre tu idea o propuesta...",
    formSubmit: "Preparar mensaje",
    formStatus: "Abriendo tu aplicación de correo…",
    backTop: "Volver arriba ↑",
  },
  en: {
    navProjects: "Projects",
    navExperience: "Experience",
    navTech: "Technologies",
    navContact: "Let's talk",
    heroEyebrow: "DANIEL HERNÁNDEZ · DEVELOPER",
    heroLine1: "Ideas turned",
    heroLine2: "into meaningful",
    heroLine3: "experiences.",
    heroIntro:
      "A <strong>Full-Stack developer</strong> with a <strong>game creator’s mindset.</strong> I connect code, design and interaction to build products with purpose.",
    heroExplore: "Explore projects",
    heroAbout: "A little about me",
    locationWork: "Web & game development",
    logicCreativity: "LOGIC + CREATIVITY",
    codeNote: "Technical thinking. Design sensitivity.",
    heroMotto: "BUILD. LEARN. CREATE AGAIN.",
    scroll: "EXPLORE ↓",
    projectsEyebrow: "01 / SELECTED PROJECTS",
    projectsTitle: "From concept to code",
    projectsLead:
      "Two ways to explore what interests me most:<br>technology and the human experience.",
    pbVisual1: "A moment",
    pbVisual2: "to",
    pbVisual3: "reconnect.",
    day: "Day",
    night: "Night",
    mirror: "Mirror",
    pbCaption: "WELLBEING · ROUTINES · SELF-AWARENESS",
    pbRole: "Full-Stack · Team project",
    pbSummary:
      "A wellbeing application that supports users through activities, emotional check-ins and progress visualization.",
    exploreProject: "Explore the project",
    myContribution: "My contribution",
    pbContribution:
      "Project management, experience design and frontend development, working alongside the backend team.",
    challenge: "The challenge",
    pbChallenge:
      "Connecting the Day → Night → Mirror routine in a clear experience: guided activities, goals and emotional tracking, supported by a REST API and authenticated access.",
    oniriaClaim: "EMOTIONS CHANGE THE GAME",
    joy: "Joy",
    trust: "Trust",
    fear: "Fear",
    surprise: "Surprise",
    oniriaCaption: "MECHANICS DESIGN · EMOTION · INTERACTION",
    oniriaRole: "Game development · Concept design",
    oniriaSummary:
      "A game concept that explores emotions as a mechanic, inspired by Plutchik’s wheel of emotions.",
    mechanics: "Mechanics",
    psychology: "Psychology",
    idea: "The idea",
    oniriaIdea:
      "Exploring an emotion-driven combat system that connects game design with emotional intelligence.",
    approach: "The approach",
    oniriaApproach:
      "Translating emotional concepts into decisions and relationships between mechanics. A concept focused on how interaction feels and is understood.",
    experienceEyebrow: "02 / EXPERIENCE & EDUCATION",
    experienceTitle1: "Between logic",
    experienceTitle2: "and imagination",
    about1:
      "Games are my starting point. My work combines web development, interaction design and curiosity about psychology.",
    about2:
      "I enjoy building with teams, shaping ideas and making every interaction meaningful.",
    teamDev: "TEAM DEVELOPMENT",
    teamTitle: "Full-Stack & project management",
    teamText:
      "Work planning, interface design and frontend implementation in a three-person team, coordinating backend integration.",
    education: "UNIVERSITY EDUCATION",
    degree: "Game Design and Development",
    degreeText:
      "Technical and creative training applied to interactive experiences. Final degree project on gamifying psychology and emotional intelligence.",
    creativeInterest: "CREATIVE INTEREST",
    systemsTitle: "Mechanics, levels and systems",
    gamesBoardgames: "Video games & board games",
    systemsText:
      "Exploring rules, interaction and mechanics design, using board games as a space for experimentation.",
    techEyebrow: "03 / TECHNOLOGIES",
    techTitle: "My toolkit",
    techLead: "From browser to server.<br>And from code to game.",
    frontendText: "Clear, adaptable interfaces.",
    backendText: "The logic behind the experience.",
    gameDevText: "Systems that invite interaction.",
    mechanicsDesign: "Mechanics design",
    onlineEyebrow: "04 / FIND ME ONLINE",
    onlineTitle: "Code, projects and connections",
    onlineLead: "Follow my work<br>or connect with me here.",
    linkedinText: "Professional profile and contact",
    githubText: "Code and projects in progress",
    contactEyebrow: "05 / CONTACT",
    contactTitle: "Let's talk",
    contactLead:
      "Whether you want to bring a game idea to life, build a web experience or collaborate on a project, tell me what you have in mind.",
    formName: "Full name",
    formNamePlaceholder: "e.g. Jane Doe",
    formEmail: "Email address",
    formEmailPlaceholder: "you@email.com",
    formMessage: "Your message",
    formMessagePlaceholder: "Tell me about your idea or proposal...",
    formSubmit: "Prepare message",
    formStatus: "Opening your email application…",
    backTop: "Back to top ↑",
  },
};

/** Code samples shown in the interactive profile window. */
const profiles = {
  es: {
    web: `<span class="muted">// Del concepto a la interacción</span>\n<span class="purple">const</span> developer = {\n  name: <span class="lime">"Daniel Hernández"</span>,\n  role: <span class="lime">"Full-Stack Developer"</span>,\n  stack: [\n    <span class="lime">"JavaScript"</span>, <span class="lime">"HTML"</span>, <span class="lime">"CSS"</span>,\n    <span class="lime">"Python"</span>, <span class="lime">"Flask"</span>, <span class="lime">"SQL"</span>\n  ],\n  approach: [<span class="lime">"Diseñar"</span>, <span class="lime">"Construir"</span>, <span class="lime">"Iterar"</span>]\n};`,
    game: `<span class="muted">// La creatividad también se programa</span>\n<span class="purple">class</span> GameDeveloper {\n  string name = <span class="lime">"Daniel"</span>;\n  string engine = <span class="lime">"Unity"</span>;\n  string[] languages = { <span class="lime">"C#"</span>, <span class="lime">"Java"</span>, <span class="lime">"C++"</span> };\n  string[] interests = {\n    <span class="lime">"Mecánicas"</span>,\n    <span class="lime">"Diseño de niveles"</span>,\n    <span class="lime">"Experiencias interactivas"</span>\n  };\n}`,
  },
  en: {
    web: `<span class="muted">// From concept to interaction</span>\n<span class="purple">const</span> developer = {\n  name: <span class="lime">"Daniel Hernández"</span>,\n  role: <span class="lime">"Full-Stack Developer"</span>,\n  stack: [\n    <span class="lime">"JavaScript"</span>, <span class="lime">"HTML"</span>, <span class="lime">"CSS"</span>,\n    <span class="lime">"Python"</span>, <span class="lime">"Flask"</span>, <span class="lime">"SQL"</span>\n  ],\n  approach: [<span class="lime">"Design"</span>, <span class="lime">"Build"</span>, <span class="lime">"Iterate"</span>]\n};`,
    game: `<span class="muted">// Creativity can be programmed too</span>\n<span class="purple">class</span> GameDeveloper {\n  string name = <span class="lime">"Daniel"</span>;\n  string engine = <span class="lime">"Unity"</span>;\n  string[] languages = { <span class="lime">"C#"</span>, <span class="lime">"Java"</span>, <span class="lime">"C++"</span> };\n  string[] interests = {\n    <span class="lime">"Mechanics"</span>,\n    <span class="lime">"Level design"</span>,\n    <span class="lime">"Interactive experiences"</span>\n  };\n}`,
  },
};

// Small state object: the active language and professional profile.
let language = "es";
let activeProfile = "web";
const code = document.getElementById("code");
const languageToggle = document.getElementById("language-toggle");

/** Updates both the code sample and the page-wide colour theme. */
function renderCode() {
  code.innerHTML = profiles[language][activeProfile];
  document.body.dataset.stack = activeProfile;
}
/** Applies translations to elements marked with data-i18n attributes. */
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document
    .querySelectorAll("[data-i18n]")
    .forEach((el) => (el.textContent = translations[next][el.dataset.i18n]));
  document
    .querySelectorAll("[data-i18n-html]")
    .forEach((el) => (el.innerHTML = translations[next][el.dataset.i18nHtml]));
  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(
      (el) => (el.placeholder = translations[next][el.dataset.i18nPlaceholder]),
    );
  languageToggle.innerHTML =
    next === "es"
      ? '<span class="active-lang">ES</span><span>/</span><span>EN</span>'
      : '<span>ES</span><span>/</span><span class="active-lang">EN</span>';
  languageToggle.setAttribute(
    "aria-label",
    next === "es" ? "Change language to English" : "Cambiar idioma a español",
  );
  renderCode();
}

// Language switcher.
languageToggle.addEventListener("click", () =>
  setLanguage(language === "es" ? "en" : "es"),
);
// Professional profile switcher: Full-Stack (lime) or Game Dev (violet).
document.querySelectorAll("[data-code]").forEach((button) =>
  button.addEventListener("click", () => {
    activeProfile = button.dataset.code;
    document.querySelectorAll("[data-code]").forEach((item) => {
      item.classList.toggle("selected", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    renderCode();
  }),
);

// Build a pre-filled email while keeping the site fully static and serverless.
document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject =
    language === "es"
      ? `Contacto portfolio — ${data.get("name")}`
      : `Portfolio enquiry — ${data.get("name")}`;
  const body =
    language === "es"
      ? `Nombre: ${data.get("name")}\nEmail: ${data.get("email")}\n\nMensaje:\n${data.get("message")}`
      : `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`;
  document.getElementById("form-status").textContent =
    translations[language].formStatus;
  window.location.href = `mailto:d.hernandezt.96@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Keep the footer year current automatically.
document.getElementById("year").textContent = new Date().getFullYear();
setLanguage("es");
