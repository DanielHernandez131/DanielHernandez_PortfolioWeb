import { useState } from "react";
import { contactEmail, createMailto } from "../data/contact.js";

export default function Contact({ t }) {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event) {
    // Native required/email validation runs before submit. Read fields only here
    // language changes do not reset the visitor's uncontrolled inputs.
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setPrepared(true);
    // This opens an email draft; the site cannot confirm that it was sent.
    window.location.href = createMailto(data, t);
  }

  return (
    <section className="wrap contact section" id="contacto">
      <div className="eyebrow">{t.contactEyebrow}</div>
      <div className="mt-[25px] grid grid-cols-1 items-start gap-[30px] min-[901px]:grid-cols-[0.85fr_1.15fr] min-[901px]:gap-[75px]">
        <div className="contact-copy min-w-0">
          <h2>
            <span>{t.contactTitle}</span>
            <span>.</span>
          </h2>
          <p>{t.contactLead}</p>
          <a className="break-words" href={`mailto:${contactEmail}`}>
            {contactEmail} ↗
          </a>
        </div>
        <form
          className="contact-form min-w-0"
          onSubmit={handleSubmit}
          onInput={() => setPrepared(false)}
        >
          <label htmlFor="contact-name">{t.formName}</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            placeholder={t.formNamePlaceholder}
          />
          <label htmlFor="contact-email">{t.formEmail}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t.formEmailPlaceholder}
          />
          <label htmlFor="contact-message">{t.formMessage}</label>
          <textarea
            id="contact-message"
            name="message"
            rows="6"
            required
            placeholder={t.formMessagePlaceholder}
          />
          <button className="button primary form-submit" type="submit">
            <span>{t.formSubmit}</span> ↗
          </button>
          <p className="form-status" role="status">
            {prepared ? t.formStatus : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
