# Portfolio Website

A modern personal portfolio website for Dennis, built with **React 19**, **TypeScript**, **Vite 7**, and **Tailwind CSS v4**. The app is a scroll-snap single-page application with sections for Home, About, Projects, and Contact, navigated via anchor links.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build & Deployment](#build--deployment)
- [Code Quality](#code-quality)
- [License](#license)

## Features

- **Scroll-snap single-page layout** with smooth section-based navigation via anchor links (`#home`, `#about`, `#projects`, `#contact`)
- **macOS Dock-style navbar** — fixed vertical sidebar with magnifier effect and IntersectionObserver-based active section highlighting
- **Typewriter effect** on the Home section with looping text animation
- **Marquee tech-stack display** showcasing skills with animated scrolling rows
- **Framer Motion animations** for section transitions and interactive elements
- **Contact form** powered by EmailJS for direct email sending
- **3D tilt effect** on project cards via custom `useTilt` hook
- Modern dark UI styled with **Tailwind CSS v4**
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- **Framework:** React 19 + React DOM
- **Language:** TypeScript 5.9
- **Bundler / Dev Server:** Vite 7
- **Styling:** Tailwind CSS v4 (via PostCSS)
- **Animations:** Framer Motion
- **Icons:** Font Awesome (React)
- **Contact Form:** EmailJS (`@emailjs/browser`)
- **Linting:** ESLint 9 with TypeScript and React plugins

## Project Structure

Simplified overview of the most important files and folders:

```
src/
├── main.tsx                    # Entry point of the React app
├── App.tsx                     # Root component rendering all scroll-snap sections
├── components/
│   ├── Home/
│   │   ├── Home.tsx            # Home section with hero content
│   │   └── TypewriterLoop.tsx  # Looping typewriter text animation
│   ├── About/
│   │   ├── About.tsx           # About section
│   │   ├── TechCard.tsx        # Individual tech stack card
│   │   └── MarqueeRow.tsx      # Animated marquee row for tech icons
│   ├── Projects/
│   │   ├── Projects.tsx        # Projects section
│   │   ├── ProjectCard.tsx     # Individual project card with tilt effect
│   │   └── ProjectDetail.tsx   # Expanded project detail view
│   ├── Navbar.tsx              # Fixed vertical sidebar navigation (dock-style)
│   └── Contact.tsx             # Contact section with EmailJS form
├── data/
│   ├── navLinks.ts             # Navigation link definitions
│   ├── projects.ts             # Project data
│   ├── socialLinks.ts          # Social media link data
│   └── techStack.ts            # Tech stack items for About section
├── hooks/
│   ├── useActiveSection.ts     # IntersectionObserver hook for active nav highlighting
│   └── useTilt.ts              # 3D tilt effect hook for cards
├── assets/
│   └── images/                 # Static images, logos, and icons
└── styles/
    └── index.css               # Global styles with Tailwind CSS import and scroll-snap
```

- `vite.config.ts` — Vite configuration with React plugin
- `postcss.config.js` — PostCSS configuration for Tailwind CSS
- `tsconfig.json` — TypeScript configuration (strict mode)

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

This generates an optimized production build in the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

Starts a local server that serves the content from `dist/`, which is useful for testing the production build before deployment.

### Deployment

The site is deployed on **Vercel**. Every push to `main` triggers an automatic production deployment.

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
