# EverestMC Store (static, GitHub Pages)
Files: `index.html`, `style.css`, `script.js`, `config.js` (edit this one), `logo.webp`, `favicon.png`, `data/companies.json`. Matches your repo's existing file names; keep your own `wrangler.toml` (and any CNAME).
Preview the market layout with `?demo` on the URL. Keep your existing `CNAME` file in the repo.

## Easy edits (all in `config.js`)
Rank names, prices, descriptions and perks, plus `checkoutEnabled` (keep `false` until PayPal is set up).

## Live market: see the step-by-step in the chat reply / below
1. In the server's `plugins/EverestMarket/config.yml` set `web-api: enabled: true`, `port: 8642`, `cors-origin: "https://store.everestmc.net"`, restart, and look for "web API listening" in the console.
2. Make `http://<server>:8642/api/companies` reachable over **HTTPS** (browsers block http from an https site). How depends on your host.
3. Put the final https URL in `apiUrl` in `config.js`, commit, and check the market page says "Live".
Until then the page shows `data/companies.json`.

## PayPal (when you have an account)
1. developer.paypal.com > Apps & Credentials > **Live** > create app > copy the **Client ID** into `paypalClientId` (never the Secret).
2. Set `checkoutEnabled: true`. Orders record `custom_id` = `username:rankid`; you give the rank manually when PayPal emails you.
Static sites can't verify payments, so never auto-grant ranks from the browser. Later: PayPal webhook > Cloudflare Worker > server RCON.
