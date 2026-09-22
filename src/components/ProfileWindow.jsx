/*
 * Highlights only the syntax used in the two display snippets.
 */
function HighlightedCode({ text }) {
  return text
    .split(/(\/\/[^\n]*|"[^"\n]*"|\b(?:const|class)\b)/g)
    .map((token, index) => {
      const color = token.startsWith("//")
        ? "muted"
        : token.startsWith('"')
          ? "lime"
          : /^(const|class)$/.test(token)
            ? "purple"
            : undefined;
      return color ? (
        <span key={index} className={color}>
          {token}
        </span>
      ) : (
        token
      );
    });
}

export default function ProfileWindow({ t, profile, onProfileChange }) {
  // These are illustrative profile snippets.
  const code =
    profile === "web"
      ? `// ${t.profileCommentWeb}
const developer = {
  name: "Daniel Hernández",
  role: "Full-Stack Developer",
  stack: [
    "JavaScript", "HTML", "CSS",
    "Python", "Flask", "SQL"
  ],
  approach: [${t.profileApproach.map((word) => `"${word}"`).join(", ")}]
};`
      : `// ${t.profileCommentGame}
class GameDeveloper {
  string name = "Daniel";
  string engine = "Unity";
  string[] languages = { "C#", "Java", "C++" };
  string[] interests = {
    ${t.profileInterests.map((word) => `"${word}"`).join(",\n    ")}
  };
}`;

  return (
    <div className="code-scene">
      <div className="orbit-label">{t.logicCreativity}</div>
      <div className="code-window">
        <div className="window-bar">
          <div className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>developer.profile</span>
          <span>{"{ }"}</span>
        </div>
        <div className="code-tabs">
          {["web", "game"].map((value) => (
            <button
              key={value}
              type="button"
              className={profile === value ? "selected" : ""}
              aria-pressed={profile === value}
              onClick={() => onProfileChange(value)}
            >
              {value === "web" ? "full-stack.ts" : "game-dev.cs"}
            </button>
          ))}
        </div>
        <div className="code-content">
          <div className="line-numbers" aria-hidden="true">
            {/* A fixed gutter keeps the editor illustration stable across profiles. */}
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i}>{String(i + 1).padStart(2, "0")}</div>
            ))}
          </div>
          <pre>
            <HighlightedCode text={code} />
          </pre>
        </div>
        <div className="window-footer">
          <span>⌘ portfolio / profile</span>
          <span className="lime">UTF-8</span>
        </div>
      </div>
      <div className="code-note">
        <span>↳</span>
        <span>{t.codeNote}</span>
      </div>
    </div>
  );
}
