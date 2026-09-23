import test from "node:test";
import assert from "node:assert/strict";
import { advanceFor, eventFor, catRaceReducer as reduce, initialRace, FINISH } from "../src/utils/catRace.js";

const players = [{ cat: "alive", ai: false, number: 1 }, { cat: "quantum", ai: true, number: 2 }];
const start = (racers = players) => reduce(initialRace, { type: "start", players: racers });
const roll = (state, die) => reduce(reduce(state, { type: "roll", die }), { type: "resolve" });

test("each cat applies exactly its advancement and event abilities for all six dice", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((d) => advanceFor("alive", d)), [3, 2, 3, 4, 5, 6]);
  for (const cat of ["dead", "quantum"]) {
    assert.deepEqual([1, 2, 3, 4, 5, 6].map((d) => advanceFor(cat, d)), [1, 2, 3, 4, 5, 6]);
  }
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((d) => eventFor("alive", d)), [-1, -2, 0, 0, 1, 2]);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((d) => eventFor("dead", d)), [1, -2, 0, 0, 1, 2]);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map((d) => eventFor("quantum", d)), [-1, 0, 0, 0, 1, 2]);
});

test("a turn requires two dice and duplicate roll/resolve actions cannot advance twice", () => {
  const pending = reduce(start(), { type: "roll", die: 1 });
  assert.equal(pending.players[0].position, 0);
  assert.equal(reduce(pending, { type: "roll", die: 6 }), pending);
  const moved = reduce(pending, { type: "resolve" });
  assert.equal(moved.phase, "event");
  assert.equal(moved.players[0].position, 3);
  assert.equal(reduce(moved, { type: "resolve" }), moved);
  assert.equal(reduce(moved, { type: "next" }), moved);
  const ended = roll(moved, 1);
  assert.equal(ended.players[0].position, 2);
  assert.equal(ended.phase, "complete");
  const next = reduce(ended, { type: "next" });
  assert.equal(next.turn, 1);
  assert.equal(next.move, null);
  assert.equal(next.event, null);
});

test("negative events cannot go behind the start", () => {
  const state = start([{ cat: "dead", number: 1 }, { cat: "alive", number: 2 }]);
  const ended = roll(roll(state, 1), 2);
  assert.equal(ended.players[0].position, 0);
});

test("victory is resolved after the event, including overshoot and exact finish", () => {
  const nearFinish = start();
  nearFinish.players[0].position = 17;
  const onLine = roll(nearFinish, 3);
  assert.equal(onLine.winner, null);
  assert.equal(onLine.phase, "event");
  assert.equal(roll(onLine, 2).players[0].position, 18);
  assert.equal(roll(onLine, 2).winner, null);
  const winner = roll(onLine, 3);
  assert.equal(winner.winner, 0);
  assert.equal(winner.phase, "finished");
  assert.equal(reduce(winner, { type: "next" }), winner);
  const overshot = roll(roll(nearFinish, 6), 2);
  assert.equal(overshot.winner, 0);
  assert.equal(overshot.players[0].position, FINISH);
});

test("three local players take turns in order; restarting clears race state", () => {
  let state = start(["alive", "dead", "quantum"].map((cat, i) => ({ cat, number: i + 1 })));
  for (let i = 0; i < 3; i++) {
    assert.equal(state.turn, i);
    state = reduce(roll(roll(state, 2), 4), { type: "next" });
  }
  assert.equal(state.turn, 0);
  assert.equal(state.round, 2);
  assert.deepEqual(reduce(state, { type: "setup" }), initialRace);
  const restarted = reduce(state, { type: "start", players });
  assert.deepEqual(restarted.players.map((p) => p.position), [0, 0]);
});

test("invalid die results are ignored and automated players use identical rules", () => {
  let state = start();
  for (const die of [0, 7, 1.5, NaN]) assert.equal(reduce(state, { type: "roll", die }), state);
  state = reduce(roll(roll(state, 2), 4), { type: "next" });
  const ended = roll(roll(state, 2), 2);
  assert.equal(ended.players[1].position, 2);
  assert.equal(ended.event.delta, 0);
});
