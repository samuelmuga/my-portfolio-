# 🚀 Samuel Waweru — Portfolio

A modular, production-ready **React + Vite** portfolio with **live HTML previews** of GitHub projects.

## ✨ Features

- ⚛️ **Modular React components** — Header, Hero, About, Services, Portfolio, Contact, Footer
- 🐙 **Live GitHub integration** — repositories fetched directly from the GitHub API
- 👁️ **HTML Preview** — open any repo in a live in-page iframe preview (via `htmlpreview.github.io` / GitHub Pages)
- 📱 Fully responsive (mobile drawer nav, fluid layouts)
- 🎨 Modern design system with CSS variables, gradient hero, smooth scroll
- 📝 Contact form (wired for Google Apps Script, demo mode otherwise)
- 🪶 Lightweight — no UI framework, just React + Vite

## 📂 Project Structure

```
my-portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── config.js               # ← edit your name, GitHub user, skills, services
    ├── styles/index.css        # design system + all component styles
    ├── hooks/
    │   └── useGitHubRepos.js   # GitHub API data hook
    ├── utils/
    │   └── github.js           # preview URL + language color helpers
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Services.jsx
        ├── Portfolio.jsx
        ├── RepoCard.jsx
        ├── PreviewModal.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## 🛠️ Getting Started

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## ✏️ Customize

Open `src/config.js` and update:

- `profile` — your name, roles, email, GitHub username
- `about` — bio and skill list
- `services` — the services you offer
- `github.username` — your GitHub handle (repos load automatically)
- `contact.scriptURL` — optional Google Apps Script webhook to enable the contact form

## 🔗 Live preview sources

For each repo the preview button tries, in order:
1. **GitHub Pages** (`https://<user>.github.io/<repo>`) when the repo is published
2. **Raw HTML preview** (`htmlpreview.github.io`) for any repo with an `index.html` at its root

Repos without a renderable page show a disabled **Preview** button.

## 📦 Deploy

Build with `npm run build` and host the `dist/` folder on GitHub Pages, Netlify, Vercel, or any static host.
