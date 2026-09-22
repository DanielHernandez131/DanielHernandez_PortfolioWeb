import logo from "../../assets/images/cat-eye-logo.png";

export default function Brand({ t, footer = false }) {
  return (
    <a
      className={`quantum-logo${footer ? " footer-logo" : ""}`}
      href="#inicio"
      aria-label={t.homeLabel}
    >
      {/* The link already has an accessible name; the image is decorative. */}
      <img src={logo} alt="" width="48" height="48" />
      <span className="brand-word">DH</span>
    </a>
  );
}
