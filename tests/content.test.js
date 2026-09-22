import assert from "node:assert/strict";
import test from "node:test";
import { translations } from "../src/data/translations.js";
import { projects } from "../src/data/projects.js";
import { contactEmail, createMailto } from "../src/data/contact.js";

test("both languages cover the same translation keys with non-empty content", () => {
  assert.deepEqual(
    Object.keys(translations.es).sort(),
    Object.keys(translations.en).sort(),
  );
  for (const dictionary of Object.values(translations)) {
    for (const [key, value] of Object.entries(dictionary)) {
      const values = Array.isArray(value) ? value : [value];
      assert.ok(values.length > 0, key);
      for (const item of values)
        assert.ok(typeof item === "string" && item.trim(), key);
    }
  }
});

test("project identifiers are unique and all project text exists in both languages", () => {
  assert.equal(
    new Set(projects.map((project) => project.id)).size,
    projects.length,
  );
  for (const project of projects) {
    const keys = [
      project.role,
      project.summary,
      ...project.tags.flatMap((tag) =>
        tag.translation ? [tag.translation] : [],
      ),
      ...project.details.flatMap((detail) => [detail.title, detail.text]),
    ];
    for (const dictionary of Object.values(translations)) {
      for (const key of keys)
        assert.ok(dictionary[key], `${project.id}: ${key}`);
    }
  }
});

test("contact links preserve accents, line breaks and URL punctuation in either language", () => {
  const data = {
    name: "María & José",
    email: "hello+portfolio@example.com",
    message: "Hola\n¿React & C#? 100% + diseño",
  };
  for (const t of Object.values(translations)) {
    const url = new URL(createMailto(data, t));
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, contactEmail);
    assert.equal(
      url.searchParams.get("subject"),
      `${t.mailSubject} — ${data.name}`,
    );
    assert.equal(
      url.searchParams.get("body"),
      `${t.mailName}: ${data.name}\n${t.mailEmail}: ${data.email}\n\n${t.mailMessage}:\n${data.message}`,
    );
    assert.equal([...url.searchParams].length, 2);
  }
});
