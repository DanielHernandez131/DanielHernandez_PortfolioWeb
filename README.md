<div align="center">
  <img src="assets/images/cat-eye-logo.png" alt="Daniel Hernández cat-eye logo" width="112" />

Daniel Hernández — Developer Portfolio

A bilingual, interactive portfolio connecting full-stack development, game development and experience design.

Live portfolio · LinkedIn · GitHub

</div>

About the project

This portfolio presents my work and background as a Full-Stack Developer and Game Developer. It brings both sides of my profile together through a responsive interface inspired by code editors, interactive systems and the duality of Schrödinger's cat.

The experience includes selected projects, professional and academic background, technologies, social profiles and a direct contact form. Visitors can switch between Spanish and English, as well as between two professional profiles with their own visual identity: lime for Full-Stack and dark violet for Game Development.

Highlights

Fully responsive layout for desktop and mobile devices.

Spanish and English content without page reloads.

Interactive Full-Stack and Game Development profile switcher.

Dynamic lime and violet colour themes.

Expandable project details with independent controls.

Accessible semantic markup and keyboard-friendly interactions.

Contact form that prepares a pre-filled email without requiring a backend.

Lightweight implementation with no frameworks or runtime dependencies.

Featured projects

Place Between

A wellbeing web application designed around a Day → Night → Mirror routine. It combines guided activities, emotional check-ins, goals and progress visualisation in a clear and approachable experience.

Technologies: React, JavaScript, Python, Flask, SQLAlchemy and JWT.

Oniria

A game concept that explores emotions as gameplay mechanics, inspired by Plutchik's wheel of emotions. The project connects game design, emotional intelligence and an emotion-driven combat system.

Technologies: Unity, C#, game design and mechanics design.

Technology overview

Area

Technologies

Frontend

React, JavaScript, HTML5, CSS3, Bootstrap, Vite

Backend

Python, Flask, SQLAlchemy, SQL, REST APIs, JWT

Game Development

Unity, C#, Java, C++, game design, mechanics design

This portfolio itself is built with semantic HTML, modular CSS and vanilla JavaScript.

Run locally

No installation or build process is required. Clone the repository and start a local static server:

git clone https://github.com/DanielHernandez131/REPOSITORY-NAME.git
cd REPOSITORY-NAME
python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

Replace REPOSITORY-NAME with the final name of this repository.

Project structure

.
├── assets/
│   └── images/
│       └── cat-eye-logo.png
├── css/
│   ├── base.css
│   └── components.css
├── js/
│   └── app.js
├── index.html
└── README.md

index.html contains the semantic structure and portfolio content.

css/base.css defines the layout, typography and shared visual foundations.

css/components.css contains component styles, responsive rules and profile themes.

js/app.js manages translations, profile switching and the contact form.

Customisation

All translations are stored in the translations object in js/app.js. Every new translation key should be included in both the es and en objects.

The Full-Stack palette is defined through CSS custom properties in css/base.css. The Game Development theme overrides these properties through body[data-stack="game"] in css/components.css.

The contact form uses a mailto: link to prepare an email in the visitor's preferred email application. Receiving and processing submissions directly would require a form service or a backend endpoint.

Contact

I am open to opportunities and collaborations in full-stack development, frontend development and game development.

LinkedIn

GitHub

d.hernandezt.96@gmail.com

License and brand notice

The source code in this repository is licensed under the MIT License, unless otherwise stated.

The logo, visual identity, written portfolio content, personal information, project artwork and screenshots are © 2026 Daniel Hernández. These materials are not covered by the MIT License and may not be copied, redistributed or used to represent another person, product or organisation without prior written permission. All rights reserved.
