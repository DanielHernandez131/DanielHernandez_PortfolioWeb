import { useEffect, useReducer, useRef, useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import CatAvatar from "./CatAvatar.jsx";
import RaceDie from "./RaceDie.jsx";
import useGameVisible from "../hooks/useGameVisible.js";
import { CAT_TYPES, EVENT_KEYS, FINISH, initialRace, catRaceReducer } from "../utils/catRace.js";

const rollDie = () => 1 + Math.floor(Math.random() * 6);
const signed = (value) => value > 0 ? `+${value}` : String(value);

export default function CatRace({ t, active }) {
  const root = useRef(null);
  const actionButton = useRef(null);
  const [count, setCount] = useState(1);
  const [cats, setCats] = useState(["alive", "dead", "quantum"]);
  const [race, dispatch] = useReducer(catRaceReducer, initialRace);
  const running = useGameVisible(root, active);
  const player = race.players[race.turn];
  const rolling = race.phase.startsWith("rolling-");
  const catName = (cat) => t[`raceCat_${cat}`];
  const playerName = (value) => value.ai ? t.raceAI : `${t.racePlayer} ${value.number}`;

  useEffect(() => {
    if (!running) return;
    let timer;
    if (rolling) {
      // The chosen result survives pauses: resume never rerolls the die.
      timer = setTimeout(() => dispatch({ type: "resolve" }), 720);
    } else if (player?.ai && ["move", "event"].includes(race.phase)) {
      timer = setTimeout(() => dispatch({ type: "roll", die: rollDie() }), 950);
    }
    return () => clearTimeout(timer);
  }, [running, rolling, race.phase, player]);

  useEffect(() => {
    if (active && (["complete", "finished"].includes(race.phase) ||
        (!player?.ai && ["move", "event"].includes(race.phase)))) {
      actionButton.current?.focus({ preventScroll: true });
    }
  }, [active, race.phase, player?.ai]);

  function start() {
    const players = cats.slice(0, count).map((cat, index) => ({ cat, number: index + 1, ai: false }));
    if (count === 1) {
      const alternatives = CAT_TYPES.filter((cat) => cat !== cats[0]);
      players.push({ cat: alternatives[Math.floor(Math.random() * alternatives.length)], number: 2, ai: true });
    }
    dispatch({ type: "start", players });
  }

  const eventRows = [
    ["1", "fish", "−1"], ["2", "isotope", "−2"], ["3 / 4", "quiet", "0"],
    ["5", "shortcut", "+1"], ["6", "cheer", "+2"],
  ];
  const status = race.phase === "setup" ? t.raceSetup
    : race.phase === "finished" ? `${playerName(race.players[race.winner])} · ${t.raceWins}`
    : race.phase === "complete" ? t.raceTurnComplete
    : rolling ? t.raceRolling
    : player?.ai ? t.raceAIThinking
    : race.phase === "move" ? t.raceRollMove : t.raceRollEvent;

  return (
    <section ref={root} className="wrap section laboratory cat-race" id="carrera-gatos">
      <SectionHeading eyebrow={t.raceEyebrow} title={t.raceTitle} lead={t.raceLead} />
      <div className="race-shell">
        <div className="race-topbar"><span>EXPERIMENT / 003</span><span>{t.raceFound}</span><span>20 / {t.raceSpaces}</span></div>
        {race.phase === "setup" ? (
          <div className="race-setup">
            <div className="race-intro">
              <span className="eyebrow">{t.raceHowTitle}</span>
              <h3>{t.raceTagline}</h3>
              <p>{t.raceInstructions}</p>
              <p className="race-finish-rule">{t.raceFinishRule}</p>
              <table className="race-event-table">
                <caption>{t.raceEventTable}</caption>
                <thead><tr><th>{t.raceDie}</th><th>{t.raceEvent}</th><th>{t.raceEffect}</th></tr></thead>
                <tbody>{eventRows.map(([die, key, delta]) => <tr key={key}><td>{die}</td><td>{t[`raceEvent_${key}`]}</td><td>{delta}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="race-settings">
              <fieldset className="race-player-count">
                <legend>{t.racePlayers}</legend>
                {[1, 2, 3].map((value) => <label key={value} data-selected={count === value}>
                  <input type="radio" name="race-player-count" value={value} checked={count === value} onChange={() => setCount(value)} />
                  {value === 1 ? t.raceSolo : `${value} ${t.racePlayers.toLowerCase()}`}
                </label>)}
              </fieldset>
              <div className="race-choices">
                {Array.from({ length: count }, (_, index) => <div className="race-player-choice" key={index}>
                  <CatAvatar cat={cats[index]} />
                  <div><label htmlFor={`race-cat-${index}`}>{t.racePlayer} {index + 1}</label>
                    <select id={`race-cat-${index}`} value={cats[index]} onChange={(event) => setCats((values) => values.map((cat, i) => i === index ? event.target.value : cat))}>
                      {CAT_TYPES.map((cat) => <option key={cat} value={cat}>{catName(cat)}</option>)}
                    </select>
                  </div>
                </div>)}
              </div>
              <p className="race-mode-note">{count === 1 ? t.raceSoloHelp : t.raceLocalHelp}</p>
              <button type="button" className="button primary" onClick={start}>{t.raceStart} ↗</button>
            </div>
            <div className="race-abilities">
              {CAT_TYPES.map((cat) => <article key={cat} className={`race-ability cat-${cat}`}>
                <CatAvatar cat={cat} /><div><h4>{catName(cat)}</h4><p>{t[`raceAbility_${cat}`]}</p></div>
              </article>)}
            </div>
          </div>
        ) : (
          <div className="race-play">
            <div className="race-board">
              <div className="race-board-heading"><h3>{t.raceTrack}</h3><span>{t.gameRound} {race.round}</span></div>
              <div className="race-track-labels"><span>{t.raceStartLine}</span><span>{t.raceFinishLine} · {FINISH}</span></div>
              {race.players.map((racer, index) => <div key={index} className="race-lane" data-current={race.turn === index}>
                <div className="race-lane-label"><span>{playerName(racer)} <small> / {catName(racer.cat)}</small></span><strong>{Math.min(FINISH, racer.position)} / {FINISH}</strong></div>
                <div className="race-track" role="img" aria-label={`${playerName(racer)}, ${catName(racer.cat)}: ${Math.min(FINISH, racer.position)} / ${FINISH}`}>
                  <div className="race-track-line" aria-hidden="true" />
                  <div className="race-runner-rail" aria-hidden="true">
                    <div className="race-runner" style={{ left: `${Math.min(1, racer.position / FINISH) * 100}%` }}><CatAvatar cat={racer.cat} /></div>
                  </div>
                </div>
              </div>)}
              <div className="race-status" role="status" aria-live="polite" aria-atomic="true">
                <strong>{status}</strong>
                {race.phase !== "finished" && <span>{playerName(player)} · {catName(player.cat)}</span>}
              </div>
              <p className="race-active-ability">{t[`raceAbility_${player.cat}`]}</p>
            </div>
            <div className="race-controls">
              <div className="race-dice-pair">
                <RaceDie value={race.move?.die} rolling={running && race.phase === "rolling-move"} label={`01 / ${t.raceAdvance}`} t={t} />
                <RaceDie value={race.event?.die} rolling={running && race.phase === "rolling-event"} label={`02 / ${t.raceEvent}`} t={t} />
              </div>
              <div className="race-results" aria-live="polite">
                <p>{t.raceAdvance}: <strong>{race.move ? `${race.move.die} → ${signed(race.move.delta)}` : "—"}</strong></p>
                <p>{t.raceEvent}: <strong>{race.event ? `${t[`raceEvent_${EVENT_KEYS[race.event.die - 1]}`]} · ${signed(race.event.delta)}` : "—"}</strong></p>
              </div>
              <div className="race-actions">
                {race.phase === "finished" ? <button ref={actionButton} type="button" className="button primary" onClick={start}>{t.raceAgain} ↺</button>
                  : race.phase === "complete" ? <button ref={actionButton} type="button" className="button primary" onClick={() => dispatch({ type: "next" })}>{t.raceNext} →</button>
                  : <button ref={actionButton} type="button" className="button primary" disabled={rolling || player.ai || !running}
                      onClick={() => dispatch({ type: "roll", die: rollDie() })}>
                      {rolling ? t.raceRolling : player.ai ? t.raceAIThinking : race.phase === "move" ? t.raceRollMove : t.raceRollEvent}
                    </button>}
                <button type="button" className="lab-reset" onClick={() => dispatch({ type: "setup" })}>{t.raceConfigure}</button>
              </div>
              <details><summary>{t.raceHowTitle}<b aria-hidden="true">+</b></summary><p>{t.raceInstructions}</p><p>{t.raceFinishRule}</p>
                <ul>{CAT_TYPES.map((cat) => <li key={cat}><strong>{catName(cat)}:</strong> {t[`raceAbility_${cat}`]}</li>)}</ul>
                <ul>{eventRows.map(([die, key, delta]) => <li key={key}>{die}: {t[`raceEvent_${key}`]} ({delta})</li>)}</ul>
              </details>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
