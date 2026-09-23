export const initialMemoryGame = {
  phase: "idle", sequence: [], step: 0, lit: null, score: 0,
};

/** Pure state machine: timers and random choices are supplied by the UI. */
export function memoryGameReducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...initialMemoryGame, phase: "watch", sequence: [action.node] };
    case "light":
      return state.phase === "watch" ? { ...state, lit: action.node } : state;
    case "ready":
      return state.phase === "watch" ? { ...state, phase: "input", lit: null, step: 0 } : state;
    case "press": {
      if (state.phase !== "input") return state;
      if (action.node !== state.sequence[state.step]) {
        return { ...state, phase: "over", lit: null };
      }
      const step = state.step + 1;
      return step === state.sequence.length
        ? { ...state, phase: "success", step, score: state.score + 1 }
        : { ...state, step };
    }
    case "next":
      return state.phase === "success"
        ? { ...state, phase: "watch", sequence: [...state.sequence, action.node], step: 0 }
        : state;
    case "replay":
      return state.phase === "input" || state.phase === "paused"
        ? { ...state, phase: "watch", step: 0, lit: null }
        : state;
    case "pause":
      return ["watch", "input"].includes(state.phase)
        ? { ...state, phase: "paused", lit: null, step: 0 }
        : state;
    default:
      return state;
  }
}
