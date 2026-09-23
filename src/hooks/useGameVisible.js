import { useEffect, useState } from "react";

/** Suspend timers when a game is hidden, offscreen or in a background tab. */
export default function useGameVisible(root, active) {
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setOnScreen(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, [root]);
  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  return active && onScreen && tabVisible;
}
