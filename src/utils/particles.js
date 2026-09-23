/** Local repulsion in SVG coordinates, bounded to keep the artwork in frame. */
export function repelParticle(x, y, pointer) {
  if (!pointer) return { x, y };
  const dx = x - pointer.x;
  const dy = y - pointer.y;
  const distanceSquared = dx * dx + dy * dy;
  if (distanceSquared >= 10000) return { x, y };
  const distance = Math.sqrt(distanceSquared);
  const force = Math.max(0, 1 - distance / 100) ** 2 * 38;
  return {
    x: Math.min(485, Math.max(15, x + (distance ? dx / distance : 1) * force)),
    y: Math.min(485, Math.max(15, y + (distance ? dy / distance : 0) * force)),
  };
}

/** Time-based orbital drift and breathing; independent of display refresh rate. */
export function animateParticle(x, y, seconds) {
  const angle = seconds * 0.16;
  const scale = 1 + Math.sin(seconds * 0.8) * 0.035;
  const dx = x - 250;
  const dy = y - 250;
  return {
    x: 250 + (dx * Math.cos(angle) - dy * Math.sin(angle)) * scale,
    y: 250 + (dx * Math.sin(angle) + dy * Math.cos(angle)) * scale,
  };
}
