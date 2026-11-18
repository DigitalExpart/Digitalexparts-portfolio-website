# Digital Expert — Portfolio & Digital Partner Studio

A dark, cinematic, motion-first portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP** (`ScrollTrigger`, `SplitText`, `Flip`), **Lenis**, and **Three.js**.

Designed for a remote digital partner working both **solo** and with a **vetted specialist team** across website design & development, no-code platforms (Wix, Squarespace, WordPress, Webflow), UI/UX design, graphic design & branding, email marketing, and AI video production.

---

## Tech Stack

- **Framework:** Next.js `16.4.6` (App Router, Turbopack)
- **Language & Styling:** TypeScript + Tailwind CSS v4 + CSS design tokens
- **Animation & Scroll:** GSAP `3.15.1` (`ScrollTrigger`, `SplitText`, `Flip`) + Lenis `1.3.27`
- **WebGL Hero & Hover Shader:** Three.js `0.187.0` (dynamically imported) + lightweight WebGL displacement ripple shader
- **Contact Delivery:** Next.js API Route (`POST /api/contact`) supporting **Resend** or **Formspree** + honeypot spam protection

---

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file (optional for local preview):**
   ```bash
   cp .env.example .env.local
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Verification scripts:**
   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

---

## Environment Variables

Copy `.env.example` to `.env.local` (or set these in Vercel Project Settings -> Environment Variables):

| Variable | Description | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL for metadata, sitemap & OG tags | Recommended |
| `RESEND_API_KEY` | Resend API key for contact form email delivery | Option 1 |
| `CONTACT_TO_EMAIL` | Destination email address for contact inquiries | Option 1 |
| `CONTACT_FROM_EMAIL` | Verified sender address (defaults to `Digital Expert <onboarding@resend.dev>`) | Optional |
| `FORMSPREE_ENDPOINT` | Formspree form endpoint URL (used if `RESEND_API_KEY` is omitted) | Option 2 |

> **Local dev note:** If neither Resend nor Formspree variables are configured while `NODE_ENV !== "production"`, `POST /api/contact` validates the form, logs a structured preview in the server terminal, and returns `{ ok: true, provider: "dev-preview" }`.

---

## Personalizing Content & Theme

1. **Personal placeholders (`src/data/site.ts`):**
   Replace the square-bracket placeholders in `src/data/site.ts`:
   - `[YOUR NAME]`
   - `[YOUR EMAIL]`
   - `[CALENDLY URL]`
   - `[FIVERR URL]`
   - `[UPWORK URL]`
   - `[LOCATION]`
   - Social links (`[LINKEDIN URL]`, `[X URL]`, `[DRIBBBLE URL]`, `[BEHANCE URL]`)

2. **Electric accent color (`src/styles/tokens.css`):**
   Change `--accent: #b6ff4a;` (and `--accent-soft` / `--accent-glow` if desired) in `src/styles/tokens.css` to re-theme the entire site globally.

---

## How to Add a Project

All portfolio items live in a single typed file: **`src/data/projects.ts`**.

1. Add your cover image(s) (and optional muted `.mp4`/`.webm` hover preview) inside `public/images/projects/`.
2. Append a new `ProjectItem` object to the `PROJECTS` array in `src/data/projects.ts`:
   ```ts
   {
     slug: "your-project-slug",
     index: "07",
     title: "Project Title",
     tagline: "One-line outcome-driven summary.",
     category: "Websites", // "Websites" | "UI/UX" | "Branding" | "Email" | "AI Video"
     year: "2026",
     client: "Client Name",
     engagementModel: "Solo", // or "Solo + Vetted Team"
     role: "Lead Designer & Developer",
     tools: ["Next.js", "GSAP", "Figma"],
     timeline: "3 weeks",
     posterImage: "/images/projects/your-cover.jpg",
     videoPreview: "/videos/optional-hover-clip.mp4", // optional
     accentHue: "#B6FF4A",
     challenge: "...",
     process: ["Step 1", "Step 2", "Step 3"],
     results: ["Result 1", "Result 2"],
     metrics: [{ label: "Conversion", value: "+48%" }],
     galleryImages: ["/images/projects/your-cover.jpg"],
   }
   ```
3. The new project automatically appears in:
   - Homepage **Selected Work** (`src/components/home/SelectedWorkSection.tsx`)
   - `/work` **GSAP Flip** filterable archive
   - `/work/[slug]` static case-study detail route (`generateStaticParams`)
   - `/sitemap.xml`

---

## Deploying to Vercel

### Option A: Git Integration (Recommended)
1. Push this repository to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Set your Environment Variables (`NEXT_PUBLIC_SITE_URL`, plus `RESEND_API_KEY` + `CONTACT_TO_EMAIL` or `FORMSPREE_ENDPOINT`).
4. Deploy — Vercel auto-detects Next.js and builds with zero extra config.

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```
