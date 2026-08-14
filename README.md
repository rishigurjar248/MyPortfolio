# Rishi — Portfolio

A single portfolio site assembled from your two uploaded projects, in the section
order shown in your reference image:

1. **Hero** — "Building Beyond Possible." (cursor-reveal portrait) — from `rishi-portfolio`
2. **Intro** — "Hey, I'm Rishi…" — from `rishi-portfolio`
3. **Technical Skills** — tabbed skill bars — from `portfolio-export`
4. **My Projects** — filterable project grid — from `portfolio-export`
5. **Coding Stats** — LeetCode / GitHub / competitive programming — from `portfolio-export`
6. **Testimonials** — "What people are saying" marquee — from `rishi-portfolio`
7. **Services** — "Six ways to work together" horizontal scroll — from `rishi-portfolio`
8. **Contact** — "Get In Touch" form — from `portfolio-export`
9. **Footer** — yellow marquee footer — from `rishi-portfolio`

The Skills / Projects / Coding Stats / Contact sections render on a light theme
(`.light` wrapper in `src/index.css`), while the rest of the page keeps the dark
theme from `rishi-portfolio` — matching the alternating light/dark look in your
reference image.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Notes / things to personalize

- **Contact details & socials** live in `src/lib/contact.js` (WhatsApp number,
  GitHub/LinkedIn/Instagram) and `src/data/portfolio.ts`… actually `src/data/portfolio.ts`
  is TypeScript-flavored data consumed by JS components — edit the values, the
  syntax works fine under Vite/JS.
- **Resume link** — `src/components/Navbar.jsx` and `Hero.jsx` point at a Google
  Drive file ID. Swap `RESUME_FILE_ID` for your own, or point it at `/resume.pdf`
  in `public/`.
- **Intro portrait** — currently a placeholder block in `src/components/Intro.jsx`.
  Drop a photo at `public/images/intro-portrait.jpg` and swap the placeholder for
  an `<img>` tag (a comment in the file shows exactly how).
- **Hero portrait images** — `public/images/Base_image_desktop.png` and
  `Reveal_image_desktop.png` are your uploaded photos, wired up to the interactive
  cursor-reveal effect already.
- **Projects / skills / stats data** — all in `src/data/portfolio.ts`.
- **Services cards** — `src/data/services.js`.
- **Testimonials** — hardcoded in `src/components/Testimonials.jsx` (swap in real
  quotes whenever you have them — there's already a "+ Feedback" button in the
  navbar that opens a WhatsApp-powered testimonial form for collecting new ones).

## Stack

React 18 + Vite + Tailwind CSS v4, GSAP + Lenis (hero/nav/services/reveal
animations) and Framer Motion (skills/projects/stats/contact animations),
lucide-react icons.
