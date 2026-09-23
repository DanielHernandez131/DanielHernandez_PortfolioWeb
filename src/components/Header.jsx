import Brand from "./Brand.jsx";

export default function Header({ t, language, onLanguageChange }) {
  return (
    <header>
      <Brand t={t} />
      <nav aria-label={t.navigationLabel}>
        <a href="#proyectos">{t.navProjects}</a>
        <a href="#experiencia">{t.navExperience}</a>
        <a href="#tecnologias">{t.navTech}</a>
        <a href="#laboratorio">{t.navLab}</a>
      </nav>
      <div className="header-actions">
        <button
          className="language-toggle"
          type="button"
          onClick={onLanguageChange}
          aria-label={
            language === "es"
              ? "Change language to English"
              : "Cambiar idioma a español"
          }
        >
          <span className={language === "es" ? "active-lang" : ""}>ES</span>
          <span>/</span>
          <span className={language === "en" ? "active-lang" : ""}>EN</span>
        </button>
        <a className="nav-contact" href="#contacto">
          <span>{t.navContact}</span> <b>↗</b>
        </a>
      </div>
    </header>
  );
}
