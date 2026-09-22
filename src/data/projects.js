/**
 * Project content is independent of card markup. Keep IDs stable for React keys.
 * role, summary and details reference translations.js; tags contain either a
 * literal label or a translation key. visual selects optional ProjectVisual art.
 */
export const projects = [
  {
    id: "place-between",
    name: "Place Between",
    visual: "pb",
    role: "pbRole",
    summary: "pbSummary",
    tags: [
      { label: "React" },
      { label: "JavaScript" },
      { label: "Python" },
      { label: "Flask" },
      { label: "SQLAlchemy" },
      { label: "JWT" },
    ],
    details: [
      { title: "myContribution", text: "pbContribution" },
      { title: "challenge", text: "pbChallenge" },
    ],
  },
  {
    id: "oniria",
    name: "Oniria",
    visual: "oniria",
    role: "oniriaRole",
    summary: "oniriaSummary",
    tags: [
      { label: "Unity" },
      { label: "C#" },
      { label: "Game Design" },
      { translation: "mechanics" },
      { translation: "psychology" },
    ],
    details: [
      { title: "idea", text: "oniriaIdea" },
      { title: "approach", text: "oniriaApproach" },
    ],
  },
];
