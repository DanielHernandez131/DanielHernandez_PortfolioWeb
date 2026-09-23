import test from "node:test";
import assert from "node:assert/strict";
import { animateParticle, repelParticle } from "../src/utils/particles.js";

test("inactive and distant pointers preserve the composition", () => {
  assert.deepEqual(repelParticle(250, 250, null), { x: 250, y: 250 });
  assert.deepEqual(repelParticle(250, 250, { x: 0, y: 0 }), { x: 250, y: 250 });
});

test("nearby particles move away, including exact cursor overlap", () => {
  assert.ok(repelParticle(270, 250, { x: 250, y: 250 }).x > 270);
  assert.ok(repelParticle(230, 250, { x: 250, y: 250 }).x < 230);
  const overlap = repelParticle(250, 250, { x: 250, y: 250 });
  assert.ok(Number.isFinite(overlap.x) && Number.isFinite(overlap.y));
  assert.ok(overlap.x > 250);
});

test("repulsion keeps circles within the export bounds", () => {
  const point = repelParticle(480, 480, { x: 470, y: 470 });
  assert.ok(point.x <= 485 && point.y <= 485);
  const opposite = repelParticle(20, 20, { x: 30, y: 30 });
  assert.ok(opposite.x >= 15 && opposite.y >= 15);
});


test("orbital animation starts at the base position and keeps the centre fixed", () => {
  assert.deepEqual(animateParticle(350, 250, 0), { x: 350, y: 250 });
  assert.deepEqual(animateParticle(250, 250, 15), { x: 250, y: 250 });
  assert.notDeepEqual(animateParticle(350, 250, 5), { x: 350, y: 250 });
});

test("animated outer particles stay in frame and can still repel the cursor", () => {
  for (let seconds = 0; seconds < 120; seconds += 0.5) {
    const position = animateParticle(457, 250, seconds);
    assert.ok(position.x > 13 && position.x < 487);
    assert.ok(position.y > 13 && position.y < 487);
    const repelled = repelParticle(position.x, position.y, position);
    assert.ok(repelled.x > position.x);
    assert.ok(repelled.x <= 485 && repelled.y <= 485);
  }
});
