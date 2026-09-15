# Voice Acting Game (voiceactinggame.lol)

A fast, statically rendered Next.js site for **voiceactinggame.lol**: a 1:1 rebuild of the
playvoicegames.com front end, with two original, playable voice games written from scratch.

## Stack

- Next.js 16 (App Router, Turbopack) with React 19 and TypeScript
- Tailwind CSS v4 plus a hand-written design system in `src/config/style/voiceactinggame.css`
- Self-hosted DM Sans (`next/font/local`) so builds never depend on the Google Fonts CDN
- three.js for the 3D T-Rex runner, Web Audio + autocorrelation for pitch detection
- Standalone output so the deploy platform can build a small runtime image

## Layout

```
src/app/[locale]/(landing)   route files (one folder per URL) + blog + legal pages
src/app/[locale]/layout.tsx  html shell, fonts, favicon and hreflang tags
src/app/sitemap.ts           sitemap covering every page and blog post
src/shared/blocks/voiceactinggame
  site.tsx                   header, footer and shared link primitives
  sections.tsx               section, card grid, review, step and platform blocks
  blog.tsx                   post records plus the blog index and article renderer
  json-ld.tsx                WebSite, Organization, ItemList, VideoGame, FAQ and Article schema
  trex-run-3d.tsx            voice-controlled Three.js runner
  vocal-range-test.tsx       microphone pitch tracker and range ladder
src/assets/fonts             self-hosted woff2 used by next/font/local
public/voiceactinggame       screenshots, app icons, badges and the OG preview image
```

## Pages

- `/` - landing page listing every voice game
- `/voice-over-game` - overview of the browser dub studio
- `/game/dino-game`, `/game/vocal-range-test`, `/game/voice-through`,
  `/game/scream-chicken`, `/game/mandarin-challenge`, `/game/say-the-word-on-beat`
- `/blog` and four guides, `/about`, `/privacy` and the two Choicer Dub Studio legal pages

## Games

- `/game/dino-game` - Three.js voxel endless runner. Jump with your voice (mic loudness),
  Space, Enter or a tap, with obstacles, a speed ramp-up, score and a localStorage best run.
  The mic is calibrated for about a second on start so ambient noise does not trigger jumps.
- `/game/vocal-range-test` - Web Audio pitch tracker. Autocorrelation over a 2048 sample
  window finds the fundamental; confirmed notes extend your low/high range, which is mapped
  onto the note ladder (C2-D6) and compared against the singer ranges shown below it.

Both widgets request microphone access on user action only and degrade to click/keyboard
input when the mic is blocked.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
```

## Environment

Every variable is optional; the site falls back to the production domain. Useful overrides
are `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_LOGO`,
`NEXT_PUBLIC_APP_FAVICON` and `NEXT_PUBLIC_APP_PREVIEW_IMAGE` (see `src/config/index.ts`).

## Deployment

The repo ships a `Dockerfile` (node:22-alpine, `node server.js` on port 3000). The deploy
platform builds the image, provisions DNS and terminates TLS; `NEXT_PUBLIC_APP_URL` should
be set to the public origin so canonical URLs, the sitemap and Open Graph tags stay absolute.
