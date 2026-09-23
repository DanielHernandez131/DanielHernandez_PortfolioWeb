import { useEffect, useRef, useState } from "react";
import { translations } from "./data/translations.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Technologies from "./components/Technologies.jsx";
import Laboratory from "./components/Laboratory.jsx";
import Social from "./components/Social.jsx";
import Contact from "./components/Contact.jsx";
import Brand from "./components/Brand.jsx";

import useScrollReveal from "./hooks/useScrollReveal.js";

export default function App() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);
  // Keep shared preferences here; sections receive translated copy through props.
  // Stable component identities preserve form values and native disclosure state.
  const [language, setLanguage] = useState("es");
  const [profile, setProfile] = useState("web");
  const t = translations[language];

  useEffect(() => {
    // Expose the active language to assistive technology and browser tools.
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    // CSS owns the theme; React only selects the profile that activates it.
    document.body.dataset.stack = profile;
  }, [profile]);

  return (
    <>
      <Header
        t={t}
        language={language}
        onLanguageChange={() => setLanguage(language === "es" ? "en" : "es")}
      />
      <main ref={mainRef}>
        <Hero t={t} profile={profile} onProfileChange={setProfile} />
        <Projects t={t} />
        <Experience t={t} />
        <Technologies t={t} />
        <Laboratory t={t} />
        <Social t={t} />
        <Contact t={t} />
      </main>
      <footer className="wrap">
        <Brand t={t} footer />
        <span>© {new Date().getFullYear()} Daniel Hernández</span>
        <a href="#inicio">{t.backTop}</a>
      </footer>
    </>
  );
}
