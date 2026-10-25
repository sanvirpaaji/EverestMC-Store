# EverestMC Store (static, GitHub Pages)
Pages: `index.html` (home), `ranks.html`, `store.html`, `market.html`, `faq.html`. Shared: `style.css`, `script.js`, `config.js` (edit this one), `logo.webp`, `favicon.png`, `robots.txt`, `sitemap.xml`, `wrangler.toml`, `.assetsignore`, `data/companies.json`.
Preview the market layout with `?demo` on the URL. Keep your existing `CNAME` file in the repo.

## Easy edits (all in `config.js`)
Rank names, prices, descriptions and perks, plus `checkoutEnabled` (keep `false` until PayPal is set up).

## Live market on a host that won't open ports (e.g. FoliumHosting)
The updated plugin saves the market data to GitHub itself (outbound only). Steps:
1. GitHub repo > branch dropdown > type `market-data` > Create branch.
2. GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate. Repository access: ONLY `EverestMC-Store`. Permissions: Contents = Read and write. Copy the token.
3. Build the new plugin jar, upload it, then edit `plugins/EverestMarket/config.yml` and add the `github-snapshot:` block (see the plugin's config.yml): `enabled: true` + your token. Restart.
4. Console should say "GitHub snapshot enabled". Wait ~10 min, then open the `snapshotUrl` from `config.js`: you should see JSON.
5. Deploy this site. The market page shows "Updated N min ago".
Keep the token private (it only works on this one repo; set an expiry and renew it).

## PayPal (when you have an account)
1. developer.paypal.com > Apps & Credentials > **Live** > create app > copy the **Client ID** into `paypalClientId` (never the Secret).
2. Set `checkoutEnabled: true`. Orders record `custom_id` = `username:rankid`; give the rank manually when PayPal emails you.
