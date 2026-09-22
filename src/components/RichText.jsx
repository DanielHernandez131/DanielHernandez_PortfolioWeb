/**
 * Renders the flat <strong> and <br> markers used in local translation strings.
 * This is deliberately not a general HTML parser: other markup remains text.
 */
export default function RichText({ text }) {
  return text
    .split(/(<strong>.*?<\/strong>|<br\s*\/?>)/g)
    .map((part, index) => {
      if (part.startsWith("<strong>")) {
        return <strong key={index}>{part.slice(8, -9)}</strong>;
      }
      if (/^<br\s*\/?>$/.test(part)) return <br key={index} />;
      return part;
    });
}
