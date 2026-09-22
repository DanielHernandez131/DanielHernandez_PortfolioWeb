export const contactEmail = "d.hernandezt.96@gmail.com";

/**
 * Builds a localized email draft without sending or storing visitor data.
 * Encode each query value separately to preserve newlines, accents and &/#/+
 * characters without turning message content into additional URL parameters.
 */
export function createMailto({ name, email, message }, t) {
  const subject = `${t.mailSubject} — ${name}`;
  const body = `${t.mailName}: ${name}\n${t.mailEmail}: ${email}\n\n${t.mailMessage}:\n${message}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
