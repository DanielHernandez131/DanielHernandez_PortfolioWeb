import { useEffect, useRef } from "react";
import { animateParticle, repelParticle } from "../utils/particles.js";

/** One frame loop owns SVG transforms; React owns the base composition. */
export default function useParticleMotion(artwork, interactive, animated, composition) {
  const elapsed = useRef(0);

  useEffect(() => {
    const svg = artwork.current;
    if (!svg || (!interactive && !animated)) return;

    const particles = [...svg.querySelectorAll("circle")].map((node) => ({
      node,
      x: Number(node.getAttribute("cx")),
      y: Number(node.getAttribute("cy")),
      transform: "",
    }));
    let frame = null;
    let pointer = null;
    let lastTime = null;
    let visible = true;

    function schedule() {
      if (frame === null && visible && !document.hidden) {
        frame = requestAnimationFrame(paint);
      }
    }

    function paint(time) {
      frame = null;
      if (animated) {
        if (lastTime !== null) elapsed.current += Math.min(time - lastTime, 64) / 1000;
        lastTime = time;
      }
      // Only read layout when a cursor needs conversion; all writes follow.
      const matrix = pointer ? svg.getScreenCTM() : null;
      const local = matrix && pointer
        ? new DOMPoint(pointer.x, pointer.y).matrixTransform(matrix.inverse())
        : null;
      for (const particle of particles) {
        const position = animated
          ? animateParticle(particle.x, particle.y, elapsed.current)
          : particle;
        const displaced = repelParticle(position.x, position.y, local);
        const dx = displaced.x - particle.x;
        const dy = displaced.y - particle.y;
        const transform = dx || dy ? `translate(${dx.toFixed(2)} ${dy.toFixed(2)})` : "";
        if (transform === particle.transform) continue;
        if (transform) particle.node.setAttribute("transform", transform);
        else particle.node.removeAttribute("transform");
        particle.transform = transform;
      }
      if (animated) schedule();
    }

    function clearPointer() {
      pointer = null;
      schedule();
    }

    function move(event) {
      if (!interactive || event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    }

    function syncVisibility() {
      cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
      pointer = null;
      schedule();
    }

    // Freeze offscreen/hidden work; resume without a jump in animation time.
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          syncVisibility();
        })
      : null;
    observer?.observe(svg);
    svg.addEventListener("pointermove", move, { passive: true });
    svg.addEventListener("pointerleave", clearPointer);
    svg.addEventListener("pointercancel", clearPointer);
    window.addEventListener("blur", clearPointer);
    window.addEventListener("scroll", clearPointer, true);
    document.addEventListener("visibilitychange", syncVisibility);
    if (animated) schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      for (const particle of particles) {
        if (particle.transform) particle.node.removeAttribute("transform");
      }
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", clearPointer);
      svg.removeEventListener("pointercancel", clearPointer);
      window.removeEventListener("blur", clearPointer);
      window.removeEventListener("scroll", clearPointer, true);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [artwork, interactive, animated, composition]);
}
