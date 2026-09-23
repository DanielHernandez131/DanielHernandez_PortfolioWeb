export const FINISH = 20;
export const CAT_TYPES = ["alive", "dead", "quantum"];
export const EVENT_KEYS = ["fish", "isotope", "quiet", "quiet", "shortcut", "cheer"];
export const initialRace = {
  phase: "setup", players: [], turn: 0, round: 1,
  move: null, event: null, pending: null, winner: null,
};

export function advanceFor(cat, die) {
  return cat === "alive" && die === 1 ? 3 : die;
}

export function eventFor(cat, die) {
  if (die === 1) return cat === "dead" ? 1 : -1;
  if (die === 2) return cat === "quantum" ? 0 : -2;
  return [0, 0, 0, 0, 1, 2][die - 1];
}

/** Every turn resolves both dice before checking the finish line. */
export function catRaceReducer(state, action) {
  switch (action.type) {
    case "setup":
      return initialRace;
    case "start":
      if (action.players.length < 2 || action.players.length > 3 ||
          action.players.some((player) => !CAT_TYPES.includes(player.cat))) return state;
      return { ...initialRace, phase: "move", players: action.players.map((player) => ({ ...player, position: 0 })) };
    case "roll":
      if (!["move", "event"].includes(state.phase) || !Number.isInteger(action.die) || action.die < 1 || action.die > 6) return state;
      return { ...state, phase: `rolling-${state.phase}`, pending: action.die };
    case "resolve": {
      if (!["rolling-move", "rolling-event"].includes(state.phase)) return state;
      const player = state.players[state.turn];
      const isMove = state.phase === "rolling-move";
      const delta = isMove ? advanceFor(player.cat, state.pending) : eventFor(player.cat, state.pending);
      // Keep advancement beyond 20 until the event resolves; negative positions stop at 0.
      const position = Math.max(0, player.position + delta);
      const won = !isMove && position >= FINISH;
      const players = state.players.map((value, index) => index === state.turn
        ? { ...value, position: isMove ? position : Math.min(FINISH, position) } : value);
      return {
        ...state, players, pending: null,
        [isMove ? "move" : "event"]: { die: state.pending, delta, applied: position - player.position },
        phase: isMove ? "event" : won ? "finished" : "complete",
        winner: won ? state.turn : null,
      };
    }
    case "next":
      if (state.phase !== "complete") return state;
      return { ...state, phase: "move", turn: (state.turn + 1) % state.players.length,
        round: state.round + (state.turn === state.players.length - 1 ? 1 : 0), move: null, event: null };
    default:
      return state;
  }
}
