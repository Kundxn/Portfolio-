# Kundan Singh — Developer Portfolio

A fast, accessible, single-page developer portfolio for **Kundan Singh** (Full Stack Developer | Cloud & DevOps, B.E. CSE Cloud Computing).

## Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Shadcn-style UI primitives (`src/components/ui/*`), Framer Motion (`motion/react`), Lucide Icons
- **Backend / Serverless**:
  - `api/contact.ts` — Vercel Serverless Function for `POST /api/contact` (supports Resend API)
  - `server.ts` — Local/Node Express server wrapping Vite middleware, `/api/contact`, `/resume.pdf`, `/sitemap.xml`, and `/robots.txt`
- **SEO & Accessibility**: Open Graph & Twitter card meta tags, Schema.org `Person` JSON-LD, `public/sitemap.xml`, `public/robots.txt`, semantic landmarks, skip-to-content link, keyboard-navigable modal, `prefers-reduced-motion`, and one-tap Light/Dark theme toggle (dark mode by default)

## Updating Content
All portfolio sections (bio, metrics, experience, projects, skills, certifications, education, and social links) are typed and centralized in `src/data/portfolio.ts`.
To add a new project, append an entry to the `PROJECTS` array in `src/data/portfolio.ts`.
To replace the downloadable resume, overwrite `public/resume.pdf` with your own PDF file.

## Environment Variables
Create a `.env` file locally (see `.env.example`) or add these in your **Vercel Project Settings → Environment Variables**:

- `RESEND_API_KEY`: Optional Resend API key for live email delivery from `/api/contact`
- `CONTACT_TO_EMAIL`: Recipient email (defaults to `kundan55xi@gmail.com`)
- `CONTACT_FROM_EMAIL`: Optional verified Resend sender address
- `APP_URL`: Canonical deployment URL (optional for local `server.ts` sitemap/robots)

## Running Locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Deploying to Vercel
This repository is pre-configured for zero-config Vercel deployment (`vercel.json` + `api/contact.ts` + `public/resume.pdf`):

1. Push the repository to GitHub (or deploy directly with the Vercel CLI: `npx vercel`).
2. Import the project in the Vercel Dashboard — Vercel automatically detects **Vite**, runs `npm run build`, serves `dist/` (including `resume.pdf`, `sitemap.xml`, `robots.txt`, and `src/assets/images/*`), and deploys `api/contact.ts` as a serverless function at `/api/contact`.
3. Optionally add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in Vercel Environment Variables for live email forwarding.
