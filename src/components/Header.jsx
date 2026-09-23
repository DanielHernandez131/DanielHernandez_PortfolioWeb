import { useEffect, useRef, useState } from "react";
import Brand from "./Brand.jsx";

export default function Header({ t, profile, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);
  const links = [
    ["proyectos", t.navProjects], ["experiencia", t.navExperience],
    ["tecnologias", t.navTech],
    ...(profile === "web" ? [["laboratorio", t.navLab]] : []),
  ];

  useEffect(() => setMenuOpen(false), [profile]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 721px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setMenuOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);

  return (
    <header ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
    }}>
      <Brand t={t} />
      <nav className="desktop-nav" aria-label={t.navigationLabel}>
        {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
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
        <button ref={toggle} type="button" className="menu-toggle"
          aria-expanded={menuOpen} aria-controls="mobile-navigation"
          aria-label={menuOpen ? t.closeMenu : t.openMenu}
          onClick={() => setMenuOpen((value) => !value)}>
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" data-open={menuOpen}
        aria-label={t.navigationLabel} onClick={() => setMenuOpen(false)}>
        {[...links, ["contacto", t.navContact]].map(([id, label], index) => (
          <a key={id} href={`#${id}`}><span aria-hidden="true">0{index + 1}</span>{label}<b aria-hidden="true">↗</b></a>
        ))}
      </nav>
    </header>
  );
}
