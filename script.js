const C = window.EVEREST, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const el = (t, txt, cls) => { const e = document.createElement(t); if (txt != null) e.textContent = txt; if (cls) e.className = cls; return e; };
const money = n => new Intl.NumberFormat("en-US", { style: "currency", currency: C.currency }).format(n);
$$(".dc").forEach(a => a.href = C.discordUrl);
$$(".delivery").forEach(e => e.textContent = C.deliveryNote);
const dlg = $("#co"); let current = null, ppReady = null;

/* ---------- Cards ---------- */
const perksFor = i => C.features.filter(f => f.v[i]).map(f => f.v[i] === true ? f.name : f.name + ": " + f.v[i]);
function card(r, i, ranked) {
  const c = el("div", null, "card");
  if (ranked) { const top = el("div", null, "ctop"); top.append(el("span", String(i + 1).padStart(2, "0"), "num"), el("span", "AVAILABLE", "tag")); c.append(top); }
  c.append(el("h3", r.name), el("div", C.currencySymbol + r.price, "price"), el("p", r.blurb));
  const perks = ranked ? perksFor(i) : [];
  if (perks.length) { const ul = el("ul"); perks.forEach(p => ul.append(el("li", p))); c.append(ul); }
  const b = el("button", C.checkoutEnabled ? "Buy " + r.name : "Checkout opening soon", "btn");
  if (C.checkoutEnabled) b.onclick = () => openCheckout(r); else { b.disabled = true; b.style.opacity = ".45"; b.style.cursor = "not-allowed"; }
  c.append(b); return c;
}
if ($("#rankGrid")) C.ranks.forEach((r, i) => { const c = card(r, i, true); c.classList.add("reveal"); $("#rankGrid").append(c); });
if ($("#rankPreview")) C.ranks.forEach(r => { const a = el("a", null, "chip"); a.href = "ranks.html"; a.append(el("b", r.name), el("span", C.currencySymbol + r.price)); $("#rankPreview").append(a); });
if ($("#cmp")) {
  const t = $("#cmp"), hr = el("tr"); hr.append(el("th", "Feature")); C.ranks.forEach(r => hr.append(el("th", r.name))); t.createTHead().append(hr);
  const tb = t.createTBody();
  C.features.forEach(f => { const tr = el("tr"); tr.append(el("td", f.name)); f.v.forEach(v => tr.append(el("td", v === true ? "\u2713" : v === false ? "\u2013" : v, v === true ? "yes" : v === false ? "no" : ""))); tb.append(tr); });
  const pr = el("tr", null, "prow"); pr.append(el("td", "Price")); C.ranks.forEach(r => pr.append(el("td", C.currencySymbol + r.price))); tb.append(pr);
}
if ($("#tabs")) {
  const tabs = $("#tabs");
  const showCat = k => { $$(".tab").forEach((b, j) => b.classList.toggle("on", j === k)); $("#items").replaceChildren(...C.catalog[k].items.map(it => card(it, 0, false))); };
  C.catalog.forEach((cat, k) => { const b = el("button", cat.name, "tab"); b.onclick = () => { showCat(k); history.replaceState(null, "", "#" + cat.id); }; tabs.append(b); });
  showCat(Math.max(0, C.catalog.findIndex(c => c.id === location.hash.slice(1))));
}

/* ---------- Server IPs (Java + Eaglercraft) + status ---------- */
function copyText(t, btn) {
  const done = () => { const o = btn.textContent; btn.textContent = "Copied!"; setTimeout(() => btn.textContent = o, 1800); };
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
  function fallback() { const x = document.createElement("textarea"); x.value = t; document.body.append(x); x.select(); document.execCommand("copy"); x.remove(); done(); }
}
$$(".ips").forEach(box => [["Java", C.javaIp, C.javaNote], ["Eaglercraft", C.eaglerIp, C.eaglerNote]].forEach(([label, ip, note]) => {
  if (!ip) return;
  const row = el("div", null, "ipbox"), b = el("button", "Copy", "btn sm"); b.onclick = () => copyText(ip, b);
  const lb = el("span", label, "iplabel"); if (note) lb.append(el("small", note)); row.append(lb, el("code", ip), b); box.append(row);
}));
async function loadStatus() {
  try {
    const d = await (await fetch("https://api.mcstatus.io/v2/status/java/" + encodeURIComponent(C.javaIp))).json();
    $$(".players").forEach(e => e.textContent = d.online ? d.players.online + " / " + d.players.max + " online" : "Server offline");
    $$(".pdot").forEach(e => e.className = "dot pdot " + (d.online ? "live" : "off"));
  } catch { $$(".players").forEach(e => e.textContent = ""); }
}
if (C.javaIp) { loadStatus(); setInterval(loadStatus, 60000); }

/* ---------- Checkout ---------- */
const validName = () => /^[A-Za-z0-9_]{3,16}$/.test($("#user").value.trim());
function loadPayPal() {
  if (ppReady) return ppReady;
  return ppReady = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://www.paypal.com/sdk/js?client-id=" + encodeURIComponent(C.paypalClientId) + "&currency=" + C.currency;
    s.onload = res; s.onerror = rej; document.head.append(s);
  });
}
async function openCheckout(r) {
  if (!C.checkoutEnabled) return; // safety net: checkout is switched off in config.js
  current = r; $("#coTitle").textContent = r.name + " - " + C.currencySymbol + r.price;
  $("#err").textContent = ""; $("#ok").textContent = ""; $("#pp").replaceChildren(); dlg.showModal();
  if (!C.paypalClientId) {
    if (!C.paypalMe) { $("#err").textContent = "Checkout isn't configured yet."; return; }
    const a = el("a", "Pay with PayPal", "btn");
    a.onclick = e => { if (!validName()) { e.preventDefault(); $("#err").textContent = "Enter a valid Minecraft username first."; } else { a.href = `https://paypal.me/${encodeURIComponent(C.paypalMe)}/${r.price}${C.currency}`; a.target = "_blank"; } };
    $("#pp").append(a, el("p", "Put your username (and the rank) in the PayPal note.", "ok")); return;
  }
  try { await loadPayPal(); } catch { $("#err").textContent = "Couldn't load PayPal. Try again."; return; }
  paypal.Buttons({
    onClick: (d, a) => validName() ? (($("#err").textContent = ""), a.resolve()) : (($("#err").textContent = "Enter a valid Minecraft username (3-16 letters, numbers, _)."), a.reject()),
    createOrder: (d, a) => a.order.create({ purchase_units: [{ description: "EverestMC " + current.name + " rank for " + $("#user").value.trim(), custom_id: $("#user").value.trim() + ":" + current.id, amount: { currency_code: C.currency, value: current.price } }] }),
    onApprove: (d, a) => a.order.capture().then(() => { $("#pp").replaceChildren(); $("#ok").textContent = "Payment received! " + current.name + " will be applied to " + $("#user").value.trim() + " shortly."; }),
    onError: () => { $("#err").textContent = "Payment failed or was cancelled."; }
  }).render("#pp");
}

/* ---------- Live market ---------- */
const DEMO = [{ id: 1, name: "Summit Mining Co", owner: "Steve", treasury: 5200, totalShares: 100, sharePrice: 52, members: 4 }, { id: 2, name: "Icefall Logistics", owner: "Alex", treasury: 1800, totalShares: 100, sharePrice: 18, members: 2 }];
async function get(url) {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(url + (url.startsWith("http") ? "?t=" + Date.now() : ""), { signal: ctl.signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } finally { clearTimeout(t); }
}
async function loadMarket() {
  let data = null, live = false, updated = null, src = "";
  if (location.search.includes("demo")) data = DEMO;
  else for (const [url, isLive] of [[C.apiUrl, true], [C.snapshotUrl, false], ["data/companies.json", false]]) {
    if (!url) continue;
    try { data = await get(url); live = isLive; src = url; break; } catch (e) { console.warn("Market source failed:", url, e); }
  }
  if (data && !Array.isArray(data)) { updated = data.updated ? new Date(String(data.updated).replace(/(\.\d{3})\d+/, "$1")) : null; data = data.companies; }
  if (src === "data/companies.json" && data && !data.length) data = null; // empty local placeholder = no real data
  if (updated && isNaN(updated)) updated = null;
  render(data, live, updated);
}
function render(data, live, updated) {
  const age = updated ? Math.round((Date.now() - updated) / 60000) : null, fresh = live || (age !== null && age < 30);
  $("#dot").className = "dot " + (fresh ? "live" : "off");
  $("#stat").textContent = live ? "Live - updates every 30s" : age !== null ? "Updated " + (age < 1 ? "just now" : age + " min ago") + (fresh ? "" : " (server may be offline)") : (data ? "Showing a saved snapshot" : "Market data unavailable right now");
  const rows = $("#rows"), stats = $("#stats"); rows.replaceChildren(); stats.replaceChildren();
  if (!data || !data.length) { const tr = el("tr"), td = el("td", "No companies to show yet.", "empty"); td.colSpan = 7; tr.append(td); rows.append(tr); return; }
  const top = data.reduce((a, b) => b.sharePrice > a.sharePrice ? b : a);
  [[data.length, "Companies"], [money(data.reduce((s, c) => s + c.treasury, 0)), "Total treasury"], [money(top.sharePrice), "Top share: " + top.name]]
    .forEach(([v, l]) => { const d = el("div", null, "stat"); d.append(el("b", v), el("span", l)); stats.append(d); });
  data.forEach((c, i) => {
    const tr = el("tr"); // textContent only: company names are player-controlled
    [i + 1, c.name, c.owner, c.members, c.totalShares].forEach(v => tr.append(el("td", v, "n")));
    const sp = el("td", money(c.sharePrice), "n"), bar = el("div", null, "bar"), fill = el("i"); fill.style.width = Math.max(4, Math.round(100 * c.sharePrice / (top.sharePrice || 1))) + "%"; bar.append(fill); sp.append(bar);
    tr.append(sp, el("td", money(c.treasury), "n"));
    rows.append(tr);
  });
}
if ($("#rows")) { loadMarket(); setInterval(loadMarket, 30000); }

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
$$(".reveal").forEach(e => io.observe(e));
