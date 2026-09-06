# Team Resolution — Application Site

A React + Vite site with one job: get applications from Team Resolution
into a Google Sheet.

## Run it locally

```bash
npm install
npm run dev
```

## Before you launch

1. **Wire up Google Sheets.** Follow `google-apps-script/README.md` step by
   step, then paste your Web App URL into `src/config.js` as
   `APPLICATION_ENDPOINT`.
2. **Set your contact numbers.** Edit `CONTACT_NUMBERS` in `src/config.js` —
   they show up in the footer and are already wired to `tel:` links.
3. **Swap the software/equipment icons** if you want real brand marks
   instead of the placeholder icons in `src/data/options.js` (currently
   using generic lucide-react icons so nothing shipped with a borrowed
   logo).

## Deploy

Build a production bundle with:

```bash
npm run build
```

This outputs static files to `dist/` — drag that folder into Vercel,
Netlify, GitHub Pages, or any static host.

## Project structure

```
src/
  components/        Nav, Hero, ApplicationForm, ChipSelect,
                      Showcase, CircularGallery, Footer
  data/options.js     Department / software / equipment lists
  data/showcase.js     Portfolio cards shown in the "Why Join" gallery
  lib/submitApplication.js   Builds the payload and posts it to Apps Script
  config.js           Contact numbers + the Apps Script endpoint (edit this)
google-apps-script/
  Code.gs             Paste into Apps Script — appends rows to your Sheet
  README.md           Full setup walkthrough
```

## Editing the portfolio ("Why Join Team Resolution") section

The gallery is [CircularGallery from React Bits](https://reactbits.dev) — a
WebGL deck you drag, swipe, or scroll through, with cards moving smoothly
as they pass. Cards render flat (no curve) with the image, a title, and a
short description stacked underneath. Content comes from
`src/data/showcase.js`:

```js
{
  id: "event-cinematography",   // unique, used as the React key
  title: "Event Cinematography",
  tag: "Video",                 // not shown by this gallery — kept for later use
  description: "Multi-cam coverage for weddings, fests, and brand events.",
  image: p1,                    // import an image at the top of the file
  video: true,                  // not shown by this gallery — kept for later use
}
```

`Showcase.jsx` maps that array down to the `{ image, text, description }`
shape the gallery expects. Add, remove, or reorder entries and it re-lays
itself out. To swap in real work, drop images in `src/assets/showcase/`,
import them at the top of `showcase.js`, and point each card's `image` at
one. The four shipped images are original placeholder graphics (not real
photos), so replacing all of them before launch is worth doing. Keep
descriptions to one short sentence or two — they wrap automatically, but
very long text will make the card tall.

Tuning knobs live in `Showcase.jsx` where `<CircularGallery ... />` is
called: `bend={0}` keeps the deck straight (set it above 0 to bring back a
curve), `scrollSpeed` / `scrollEase` control drag responsiveness and
smoothness, and `font` / `descriptionColor` control the label styling.
Card size is controlled in `CircularGallery.jsx`'s `onResize` (the `860` /
`780` multipliers), and the light-sweep highlight lives in that same
file's card fragment shader if you want it faster, slower, or gone.

Note: this gallery renders to a single WebGL canvas, so there's no
built-in click-to-expand lightbox — dragging/scrolling is the whole
interaction. Say the word if you'd like a click-to-enlarge modal added on
top.

## What's built vs. what's a placeholder

- The application form, multi-select chips, the drag/swipe portfolio
  gallery, animations, and Sheets wiring are fully functional.
- Software/equipment icons and the four showcase images are generic
  stand-ins (original graphics, not real logos or photos) — swap them for
  the real thing whenever you're ready.
