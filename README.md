# Aakash Prajapati — Developer Portfolio

A personal portfolio showcasing my work and experience as a full-stack developer. Built with React and TypeScript, it brings together selected projects, technical skills, services, and contact options in a responsive, interactive experience.

## Highlights

- **Project showcase** — featured work with project details and case-study content.
- **Interactive sections** — profile, technology stack, code showcase, engineering services, and contact form.
- **3D hero visual** — Three.js scene loaded separately and initialized when the hero is visible on devices that support fine pointer input and do not request reduced motion.
- **Responsive and motion-aware** — adapts across screen sizes and skips decorative cursor/3D motion for touch and reduced-motion users.
- **Useful interactions** — command palette, resume preview, copy-email actions, sound controls, and toast feedback.
- **Accessible foundations** — semantic section structure, keyboard-accessible controls, and reduced-motion support for selected effects.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Three.js
- Lucide icons

## Getting Started

### Requirements

- Node.js (a current LTS release is recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

### Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. The build command runs the TypeScript project build before bundling with Vite.

### Lint

```bash
npm run lint
```

## Project Structure

```text
.
├── public/                 # Static public assets, including the resume
├── src/
│   ├── assets/             # Imported assets
│   ├── components/
│   │   ├── 3d/             # Three.js hero visualization
│   │   ├── common/         # Shared UI and interactions
│   │   ├── layout/         # Navigation and footer
│   │   └── sections/       # Portfolio page sections
│   ├── data/               # Portfolio content
│   ├── utils/              # Shared utility functions
│   ├── App.tsx             # Page composition and lazy-loaded sections
│   ├── index.css           # Tailwind entry and global styles
│   └── main.tsx            # React application entry point
├── index.html
└── vite.config.ts
```

## Performance Notes

- Main page sections and on-demand UI (such as the command palette and resume modal) are split into lazy-loaded chunks.
- The Three.js hero is a separate chunk. It is deferred until the hero is visible and omitted for touch-only or reduced-motion environments.
- The decorative custom cursor is limited to fine-pointer devices and disabled when reduced motion is requested.
- Vite separates major vendor libraries into cacheable chunks.

To inspect the current production bundle, run `npm run build` and review the emitted file sizes in the output.

## Updating Portfolio Content

Most personal details, project entries, skills, services, and other portfolio content are maintained in `src/data/portfolioData.ts`. Update that data file to change the displayed content; update the corresponding component when changing section structure or behavior.

The resume PDF is served from `public/AAKASH_RESUME.pdf`. Replace it with the updated PDF while keeping the filename, or update the components that link to it.

## Deployment

Build the project with `npm run build` and deploy the generated `dist/` directory to a static hosting provider that supports Vite-built sites. Configure the provider to serve `index.html` for the site entry point.

## License

No license is currently specified. Contact the author before reusing this project's source or assets.
