import { useEffect } from "react";

/** Enhance existing content; unsupported browsers keep every element visible. */
export default function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !("IntersectionObserver" in window)) return;

    const elements = [...root.querySelectorAll("[data-reveal]")];
    const revealed = new Set();
    let observer;

    function reveal(element) {
      element.classList.remove("reveal-pending");
      revealed.add(element);
      observer?.unobserve(element);
    }

    function setup() {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
      if (preference.matches) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

      elements.forEach((element) => {
        // Preserve the initial viewport, restored scroll position and focused content.
        if (revealed.has(element) || element.getBoundingClientRect().top < window.innerHeight || element.contains(document.activeElement)) return;
        element.classList.add("reveal-pending");
        observer.observe(element);
      });
    }

    function handleFocus(event) {
      const element = event.target.closest("[data-reveal]");
      if (element) reveal(element);
    }

    setup();
    preference.addEventListener("change", setup);
    root.addEventListener("focusin", handleFocus);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", setup);
      root.removeEventListener("focusin", handleFocus);
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [rootRef]);
}
