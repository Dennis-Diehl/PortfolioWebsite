# Portfolio Website

A modern personal portfolio website for Dennis, built with **React**, **TypeScript**, **Vite**, and **SCSS (Sass)**. The app is a Single Page Application (SPA) with dedicated views for Home, About, Portfolio, and Contact, including a responsive floating navigation bar.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build & Deployment](#build--deployment)
- [Code Quality](#code-quality)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

- Multi-page navigation with **React Router** (Home, About, Portfolio, Contact)
- Fixed, floating **navbar** with glassmorphism and a hamburger menu on mobile
- Modern dark UI styled with **SCSS**
- Responsive layout for desktop, tablet, and mobile
- Clear separation of layout (navbar, pages) and content

## Tech Stack

- **Framework:** React 19 + React DOM
- **Language:** TypeScript
- **Bundler / Dev Server:** Vite
- **Routing:** React Router DOM
- **Styling:** SCSS (Sass)
- **Linting:** ESLint with TypeScript configuration

From `package.json`:

- Main dependencies: `react`, `react-dom`, `react-router-dom`
- Dev dependencies: `vite`, `typescript`, `sass`, `eslint`, and others

## Project Structure

Simplified overview of the most important files and folders:

- `src/main.tsx` – Entry point of the React app, imports global styles (`index.scss`)
- `src/App.tsx` – Root app component defining routes
- `src/components/Navbar/` – Navbar component and styles (`Navbar.scss`)
- `src/components/Home/` – Home page components
- `src/components/About/` – About page
- `src/components/Portfolio/` – Portfolio/project overview
- `src/components/Contact/` – Contact page
- `src/assets/` – Images, logos, and other static assets

## Getting Started

### Prerequisites

- Node.js (recommended: latest LTS version)
- npm or a compatible package manager

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

By default, the app will be available at `http://localhost:5173` (or another port reported by Vite).

## Build & Deployment

### Create a production build

```bash
npm run build
```

This generates an optimized production build in the `dist/` directory. You can deploy this folder to any static hosting provider (Netlify, Vercel, GitHub Pages, etc.) or your own web server.

### Preview the production build

```bash
npm run preview
```

Starts a local server that serves the content from `dist/`, which is useful for testing the production build before deployment.

## Code Quality

### Linting

```bash
npm run lint
```

Runs ESLint over the codebase to catch style issues and potential errors early.

## Future Improvements

Potential next steps and enhancements:

- Additional animations and hover effects using SCSS
- More portfolio sections (e.g. blog, skills with icons, timeline)
- Internationalization (e.g. language switcher for English / German)
- Contact form integration using a backend or a form service

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out my Coding Portfolio! If you have any questions or feedback, feel free to reach out.
