import { useEffect, useReducer, useRef } from "react";
import { initialMemoryGame, memoryGameReducer } from "../utils/memoryGame.js";

const randomNode = () => Math.floor(Math.random() * 4);

export default function MemoryGame({ t, active }) {
  const board = useRef(null);
  const [game, dispatch] = useReducer(memoryGameReducer, initialMemoryGame);

  useEffect(() => {
    if (!active) dispatch({ type: "pause" });
    const pauseWhenHidden = () => {
      if (document.hidden) dispatch({ type: "pause" });
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [active]);

  useEffect(() => {
    if (!active || game.phase !== "watch") return;
    board.current?.focus({ preventScroll: true });
    // A clear on/off interval lets repeated nodes remain distinguishable.
    const timers = [];
    game.sequence.forEach((node, index) => {
      timers.push(setTimeout(() => dispatch({ type: "light", node }), 600 + index * 950));
      timers.push(setTimeout(() => dispatch({ type: "light", node: null }), 1250 + index * 950));
    });
    timers.push(setTimeout(() => dispatch({ type: "ready" }), 600 + game.sequence.length * 950));
    return () => timers.forEach(clearTimeout);
  }, [active, game.phase, game.sequence]);

  const statuses = {
    idle: t.gameIdle, watch: t.gameWatch, input: t.gameTurn,
    success: t.gameSuccess, over: t.gameOver, paused: t.gamePaused,
  };
  const currentRound = Math.max(1, game.sequence.length);

  function handleKey(event) {
    // Shortcuts only belong to this focused game; never intercept the page/forms.
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
    if (/^[1-4]$/.test(event.key)) {
      event.preventDefault();
      dispatch({ type: "press", node: Number(event.key) - 1 });
    }
  }

  return (
    <div className="lab-workspace memory-game" onKeyDown={handleKey}>
      <div className="lab-stage memory-stage">
        <div className="lab-stage-label"><span>EXPERIMENT / 002</span><span>REACT + PLAY</span></div>
        <div ref={board} tabIndex={0} className="memory-board" role="group" aria-label={t.gameBoard}>
          <svg className="memory-connections" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="200" cy="200" r="133" />
            <path d="M200 67 333 200 200 333 67 200Z M200 67V333 M67 200H333" />
          </svg>
          <div className="memory-core" aria-hidden="true"><span>{t.gameRound}</span><strong>{String(currentRound).padStart(2, "0")}</strong></div>
          {[0, 1, 2, 3].map((node) => (
            <button key={node} type="button" className={`memory-node memory-node-${node}`}
              data-lit={game.lit === node} aria-disabled={game.phase !== "input"}
              aria-label={`${t.gameNode} ${node + 1}`}
              onClick={() => dispatch({ type: "press", node })}>
              <span>{node + 1}</span>
            </button>
          ))}
        </div>
        <div className="memory-status" role="status" aria-live="polite" aria-atomic="true">
          <span>{statuses[game.phase]}</span>
          {game.phase === "watch" && <strong>{game.lit === null ? "·" : game.lit + 1}</strong>}
          {game.phase === "input" && <strong>{game.step} / {game.sequence.length}</strong>}
        </div>
      </div>
      <div className="lab-controls">
        <span className="eyebrow">MEMORY × INTERACTION</span>
        <h3>{t.gameTitle}</h3>
        <p>{t.gameDescription}</p>
        <div className="memory-score"><span>{t.gameScore}</span><strong>{String(game.score).padStart(2, "0")}</strong></div>
        <ol className="memory-instructions">
          <li>{t.gameRule1}</li><li>{t.gameRule2}</li><li>{t.gameRule3}</li>
        </ol>
        <p className="memory-key-hint">{t.gameKeys}</p>
        <div className="lab-actions">
          {(game.phase === "idle" || game.phase === "over") && <button type="button" className="button primary"
            onClick={() => dispatch({ type: "start", node: randomNode() })}>{game.phase === "idle" ? t.gameStart : t.gameRestart} ↗</button>}
          {game.phase === "success" && <button type="button" className="button primary"
            onClick={() => dispatch({ type: "next", node: randomNode() })}>{t.gameNext} →</button>}
          {(game.phase === "input" || game.phase === "paused") && <button type="button" className="button primary"
            onClick={() => dispatch({ type: "replay" })}>{game.phase === "paused" ? t.gameResume : t.gameReplay} ↺</button>}
          {!["idle", "over"].includes(game.phase) && <button type="button" className="lab-reset"
            onClick={() => dispatch({ type: "start", node: randomNode() })}>{t.gameRestart}</button>}
        </div>
        <details><summary>{t.labHow}<b aria-hidden="true">+</b></summary><p>{t.gameHow}</p></details>
      </div>
    </div>
  );
}
