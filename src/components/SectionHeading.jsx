import RichText from "./RichText.jsx";

/** Shared heading for sections with an eyebrow, title and supporting copy. */
export default function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div data-reveal className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>
          <span>{title}</span>
          <span>.</span>
        </h2>
      </div>
      <p>
        <RichText text={lead} />
      </p>
    </div>
  );
}
