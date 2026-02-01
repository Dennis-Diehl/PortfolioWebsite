# Portfolio Website

A modern personal portfolio website for Dennis, built with **React 19**, **TypeScript**, **Vite 7**, and **Tailwind CSS v4**. The app is a Single Page Application (SPA) with dedicated views for Home, About, Portfolio, and Contact, including a responsive floating navigation bar.

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
- Modern dark UI styled with **Tailwind CSS**
- Responsive layout for desktop, tablet, and mobile
- Clear separation of layout (navbar, pages) and content

## Tech Stack

- **Framework:** React 19 + React DOM
- **Language:** TypeScript 5.9
- **Bundler / Dev Server:** Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS v4 (via PostCSS)
- **Linting:** ESLint 9 with TypeScript and React plugins

From `package.json`:

- Main dependencies: `react` (v19), `react-dom` (v19), `react-router-dom` (v7)
- Dev dependencies: `vite` (v7), `typescript` (v5.9), `@tailwindcss/postcss`, `eslint` (v9), and others

## Project Structure

Simplified overview of the most important files and folders:

```
src/
├── main.tsx              # Entry point of the React app
├── App.tsx               # Root app component defining routes
├── components/
│   ├── About.tsx         # About page component
│   ├── Contact.tsx       # Contact page component
│   ├── Home.tsx          # Home page component
│   ├── Navbar.tsx        # Navigation bar component
│   └── Portfolio.tsx     # Portfolio/projects overview component
├── assets/
│   └── images/           # Static images and logos
└── styles/
    └── index.css         # Global styles with Tailwind CSS import
```

- `vite.config.ts` – Vite configuration with React plugin
- `postcss.config.js` – PostCSS configuration for Tailwind CSS
- `tsconfig.json` – TypeScript configuration (composite setup)

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

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out my Coding Portfolio! If you have any questions or feedback, feel free to reach out.