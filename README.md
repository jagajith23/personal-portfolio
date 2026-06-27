# Jagajith B — Personal Portfolio

A single-page, animation-driven personal portfolio for Jagajith B (Software Engineer), featuring a scroll-based narrative, dynamic project detail pages, and a few live data widgets.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Smooth scroll:** Lenis (`@studio-freight/lenis`)
- **3D / WebGL:** Three.js
- **Icons:** svgl-react, lucide-react

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# Required for the Clash Royale widget / API route
CLASH_ROYALE_API_KEY=your_supercell_api_token
```

The LeetCode badges and music (iTunes preview) integrations require no API keys.

## Project Structure

```
app/
  api/            # Route handlers (clash-royale, leetcode-badges, spotify)
  project/[id]/   # Dynamic project detail pages
  constants.ts    # Project + career data, shared constants
  index.tsx       # Page composition (sections)
  layout.tsx      # Root layout, fonts, metadata
components/        # Section + UI components
lib/              # Utilities (cn helper)
public/           # Static assets (images, fonts, resume, videos)
```

## Features

- Scroll-spy navigation with an animated active indicator
- Masked text reveals, magnetic buttons, and per-character scroll coloring
- Expandable project grid with dynamic detail pages
- Velocity-based skills marquee
- Live LeetCode badges and an iTunes-preview music widget in the footer

## Deployment

Optimized for deployment on [Vercel](https://vercel.com). Remember to set `CLASH_ROYALE_API_KEY` in the project's environment variables.
