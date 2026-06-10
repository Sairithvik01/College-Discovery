# 🎓 College Discovery

A modern, responsive web application to **discover, compare, and shortlist** the best colleges in India. Built with Next.js 16, React 19, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## ✨ Features

- **🔍 Smart Search & Filters** — Search colleges by name, filter by state, type (Government / Private / Deemed / Autonomous), and fee range
- **📊 College Comparison** — View ratings, NIRF rankings, placement stats, and fee structures side-by-side
- **📄 Detailed College Pages** — In-depth info with tabs for Overview, Courses, and Placements
- **🔐 Auth System** — Sign up / Login modal with form validation
- **📱 Fully Responsive** — Optimized for desktop, tablet, and mobile
- **⚡ Fast & Modern** — Built on Next.js 16 with Turbopack for lightning-fast development

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Shadcn/UI](https://ui.shadcn.com/) | Accessible component primitives |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sairithvik01/SHC.git
cd SHC/college-discovery-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deploying to GitHub Pages

This project is configured for GitHub Pages deployment from the `main` branch.

1. Push the repository to `https://github.com/Sairithvik01/College-Discovery`
2. In GitHub, open **Settings** → **Pages**
3. Set **Source** to **GitHub Actions**
4. Push to `main` or run the **Deploy to GitHub Pages** workflow manually

The live site will be available at:

`https://Sairithvik01.github.io/College-Discovery/`

Notes:

- `public/.nojekyll` is required so GitHub Pages serves the exported Next.js assets in `_next/`
- `trailingSlash: true` keeps route URLs compatible with GitHub Pages folder hosting
- If you still see the GitHub Pages 404 screen, the usual causes are: the workflow has not finished yet, the repository Pages source is not set to **GitHub Actions**, or the URL is missing the `/College-Discovery/` path segment

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## 📁 Project Structure

```
college-discovery-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home — College listing
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── globals.css         # Global styles & Tailwind
│   │   └── colleges/
│   │       └── [id]/
│   │           └── page.tsx    # Dynamic college detail page
│   ├── components/
│   │   ├── common/             # Shared components (SearchInput)
│   │   ├── features/           # Feature components
│   │   │   ├── college-listing-page.tsx
│   │   │   ├── college-card.tsx
│   │   │   ├── college-filters.tsx
│   │   │   ├── college-grid.tsx
│   │   │   ├── auth-modal.tsx
│   │   │   └── detail/         # College detail page components
│   │   └── ui/                 # Shadcn UI primitives
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-colleges.ts     # College data management
│   │   └── use-debounce.ts     # Debounce utility
│   ├── lib/                    # Utilities & data
│   │   ├── mockData.ts         # 12 realistic Indian colleges
│   │   └── utils.ts            # Helper functions
│   ├── providers/              # React context providers
│   │   └── auth-context.tsx    # Authentication state
│   └── types/                  # TypeScript type definitions
│       └── college.ts          # College domain types
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 📊 Data

Currently uses **mock data** with 12 realistic Indian colleges spanning:
- **Types**: Government (IITs, NITs), Private, Deemed, Autonomous
- **Locations**: Maharashtra, Delhi, Rajasthan, Tamil Nadu, Karnataka, Telangana, Gujarat
- **Programs**: Engineering, Management, Research (UG / PG / Doctoral / Diploma)

> **Note**: To connect a real backend API, update the hooks in `src/hooks/use-colleges.ts`.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
