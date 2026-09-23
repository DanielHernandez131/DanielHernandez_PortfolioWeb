import test from "node:test";
import assert from "node:assert/strict";
import { initialMemoryGame, memoryGameReducer as reduce } from "../src/utils/memoryGame.js";

const start = () => reduce(initialMemoryGame, { type: "start", node: 2 });
test("playback ignores input, then a correct round scores exactly once", () => {
  const watching = start();
  assert.equal(reduce(watching, { type: "press", node: 2 }), watching);
  const ready = reduce(watching, { type: "ready" });
  const won = reduce(ready, { type: "press", node: 2 });
  assert.equal(won.phase, "success");
  assert.equal(won.score, 1);
  assert.equal(reduce(won, { type: "press", node: 2 }).score, 1);
  const next = reduce(won, { type: "next", node: 0 });
  assert.deepEqual(next.sequence, [2, 0]);
  assert.equal(next.phase, "watch");
});
test("a mistake ends the game and restart clears progress", () => {
  const lost = reduce(reduce(start(), { type: "ready" }), { type: "press", node: 0 });
  assert.equal(lost.phase, "over");
  assert.equal(lost.score, 0);
  const restarted = reduce(lost, { type: "start", node: 1 });
  assert.deepEqual(restarted.sequence, [1]);
  assert.equal(restarted.step, 0);
});
test("pause and replay preserve the sequence and reject stale playback callbacks", () => {
  const paused = reduce(start(), { type: "pause" });
  assert.equal(reduce(paused, { type: "ready" }), paused);
  assert.equal(reduce(paused, { type: "light", node: 1 }), paused);
  const resumed = reduce(paused, { type: "replay" });
  assert.equal(resumed.phase, "watch");
  assert.deepEqual(resumed.sequence, [2]);
});
test("multi-step input requires the entire sequence before awarding a round", () => {
  const state = { ...initialMemoryGame, phase: "input", sequence: [1, 1, 3], score: 2 };
  const first = reduce(state, { type: "press", node: 1 });
  assert.equal(first.phase, "input");
  assert.equal(first.score, 2);
  const second = reduce(first, { type: "press", node: 1 });
  const last = reduce(second, { type: "press", node: 3 });
  assert.equal(last.phase, "success");
  assert.equal(last.score, 3);
});
