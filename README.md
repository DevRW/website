# DevRW Website

The public website for **DevRW** — a Kigali-based community of software developers building open source tools for Africa.

Live at: [dev.rw](https://dev.rw)

---

## Stack

No build step. No framework. No bundler.

| Layer | What |
|---|---|
| Markup | Plain HTML5 — 6 pages |
| Styles | `css/style.css` — hand-written, ~32KB, no dependencies |
| Scripts | `js/app.js` — ~120 lines of vanilla JS |
| Forms | Google Forms (embedded via lazy-loaded iframes) |
| Jobs | Public Google Sheet |
| Community | WhatsApp — [chat.whatsapp.com/GJoStt3riS3LoH4fMsYKgx](https://chat.whatsapp.com/GJoStt3riS3LoH4fMsYKgx) |

Fonts: [Ubuntu](https://fonts.google.com/specimen/Ubuntu) · [Roboto](https://fonts.google.com/specimen/Roboto) · [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono) — loaded from Google Fonts.

---

## Running locally

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

Or use any static file server — no compilation required.

---

## File structure

```
devrw-website/
├── index.html          # Home — hero, stats, community, AI, projects, sustain, principles, voices, CTA
├── community.html      # Community — benefits, AI study circle, join form, voices
├── projects.html       # Open source — Rwanda Locations Library, Itegure, member projects, AI WIP
├── about.html          # About — story, values, AI focus, track record
├── jobs.html           # Jobs — links to Google Sheet, role-type index, apply via form
├── contact.html        # Contact — mode-switch (hire / project) with inline Google Forms
├── css/
│   └── style.css       # Full design system — tokens, components, layout, dark mode
├── js/
│   └── app.js          # Nav toggle, modal open/close, lazy iframe load, contact mode switcher, copy buttons
└── images/
    └── logo.png        # Favicon + OG image
```

---

## Google Forms integration

Each modal on the site embeds a Google Form via a lazy-loaded `<iframe>`. The iframes use `data-src` instead of `src` so they only load when a modal is opened.

| Form | Embed URL |
|---|---|
| Developer pool submission | `https://docs.google.com/forms/d/e/1FAIpQLSe0LymG8jKHbgDqLnW4m3MiSK0lPQuZufXfqiV2xXDoUFmPxg/viewform?embedded=true` |
| Request developer CVs | `https://docs.google.com/forms/d/e/1FAIpQLSdEf4OOU0VOoF6FisQEi0T2ObteHG8_snebPa9UbfoCCKoyrA/viewform?embedded=true` |
| Start a project | `https://docs.google.com/forms/d/e/1FAIpQLSdCod8kHjNHzRF1lpxDQbyI0mwlW9Asa9B03yl_jrZvwfvj2w/viewform?embedded=true` |
| Submit open source project | `https://docs.google.com/forms/d/e/1FAIpQLScxgaZa7jaRb4QtfKVZnNo_J00A3W6Kfnax2rKXXqkA4cJo8w/viewform?embedded=true` |
| Join community | `https://docs.google.com/forms/d/e/1FAIpQLSeSfUPJr7sRqjRDeEzBAPWjFj4bw7SlR9ZOpu8woPzTH52KTw/viewform?embedded=true` |

**To update a form:** replace the `data-src` value on the relevant `<iframe>` element across all pages. Use `grep -rn "1FAIpQL"` to find every occurrence.

---

## Google Sheet — live job openings

The jobs page links to a public Google Sheet for active openings.

**Sheet:** `https://docs.google.com/spreadsheets/d/1znh84cfdT88ITB74C9DbuCdLhOMFGJn7TLOJwYZhqYQ/edit?usp=sharing`

Columns: Role title · Company · Type · Location · Stack / Skills · Posted date · Apply link · Status · Notes

To update the sheet URL site-wide:
```bash
sed -i '' 's|1znh84cfdT88ITB74C9DbuCdLhOMFGJn7TLOJwYZhqYQ|<new-sheet-id>|g' jobs.html contact.html
```

---

## Adding a community member project

1. Open `projects.html` and find the `<tbody>` inside the `id="member-projects"` section.
2. Add a new `<tr>` following the same pattern as the existing `text-db-query-ai` row.
3. Also add a row to `index.html` inside the community-members table (section `02b`).

---

## Design system

The design uses CSS custom properties defined at `:root` in `css/style.css`.

**Key tokens:**
```css
--bg: #0A0E0C          /* page background */
--mint: #10D078        /* primary accent */
--ember: #FF7A4E       /* secondary accent */
--ink: #EFEFE6         /* primary text */
--display: 'Ubuntu'    /* heading font */
--body: 'Roboto'       /* body font */
--mono: 'Ubuntu Mono'  /* code / labels */
```

**Key component classes:** `.cards`, `.sec-head`, `.cta-block`, `.proj-table`, `.job`, `.modal-overlay`, `.btn--primary`, `.badge--mint`, `.eyebrow`, `.stat`, `.codeblock`

Full component reference: see `css/style.css` — each section is labelled with a `/* --- NAME --- */` comment.

---

## Deploying

The site is static HTML. Any host that serves files works — Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a plain VPS with nginx.

No build command. Publish directory: `/` (repo root).

For nginx:
```nginx
server {
    root /var/www/devrw-website;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

---

## Community

- **WhatsApp:** [chat.whatsapp.com/GJoStt3riS3LoH4fMsYKgx](https://chat.whatsapp.com/GJoStt3riS3LoH4fMsYKgx)
- **GitHub:** [github.com/DevRW](https://github.com/DevRW)
- **Twitter / X:** [@devsInRW](https://twitter.com/devsInRW)
- **Email:** hello@dev.rw

---

## License

MIT — see individual open source projects for their own licences.
