# For Evie 💜

A purple, responsive countdown website for Evie's birthday (10 February) and anniversary (22 February).

## Run
Open `index.html` in a browser. No build tools, accounts, database or API keys needed.

## Deploy at evie.jsspec.uk
1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js`.
2. In repository Settings → Pages, deploy from `main` / root.
3. In Pages → Custom domain, enter `evie.jsspec.uk` and save.
4. At the DNS provider for `jsspec.uk`, create a CNAME with host `evie` and target `jessplayz2021.github.io`.
5. Once DNS and certificate provisioning complete, enable Enforce HTTPS.

## Notes
- Dates recur every year, using the visitor's device-local time zone.
- On the exact calendar day, the countdown switches to a celebration message with purple confetti.
- To preview a celebration before the date, temporarily change the `month` and `day` for an event in `script.js` to today's date, then change them back before publishing.
- The anniversary countdown measures time until the next 22 February, not years together (no starting year was supplied).
- Google Fonts require internet; system font fallbacks work offline.
