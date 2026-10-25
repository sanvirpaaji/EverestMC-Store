const C = window.EVEREST, $ = s => document.querySelector(s);
const el = (t, txt, cls) => { const e = document.createElement(t); if (txt != null) e.textContent = txt; if (cls) e.className = cls; return e; };
const money = n => new Intl.NumberFormat("en-US", { style: "currency", currency: C.currency }).format(n);
$("#dc1").href = $("#dc2").href = C.discordUrl;

/* ---------- Ranks + checkout ---------- */
const dlg = $("#co"); let current = null, ppReady = null;
C.ranks.forEach((r, i) => {
  const c = el("div", null, "card reveal" + (r.soon ? " locked" : ""));
  const top = el("div", null, "ctop"); top.append(el("span", String(i + 1).padStart(2, "0"), "num"), el("span", r.soon ? "COMING SOON" : "AVAILABLE", "tag"));
  c.append(top, el("div", r.soon ? "?" : r.name[0], "badge"), el("h3", r.name), el("div", r.soon ? "Coming soon" : C.currencySymbol + r.price, "price"), el("p", r.blurb));
  const ul = el("ul"); r.perks.forEach(p => ul.append(el("li", p))); c.append(ul);
  const open = C.checkoutEnabled && !r.soon;
  const b = el("button", open ? "Buy " + r.name : (r.soon ? "Locked" : "Checkout opening soon"), "btn");
  if (open) b.onclick = () => openCheckout(r); else { b.disabled = true; b.style.opacity = ".45"; b.style.cursor = "not-allowed"; }
  c.append(b);
  $("#rankGrid").append(c);
});
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
async function get(url) { const r = await fetch(url, { signal: AbortSignal.timeout(6000), cache: "no-store" }); if (!r.ok) throw 0; return r.json(); }
async function loadMarket() {
  let data, live = false;
  try {
    if (location.search.includes("demo")) data = DEMO;
    else if (C.apiUrl) { data = await get(C.apiUrl); live = true; }
    else data = await get("data/companies.json");
  } catch { try { data = await get("data/companies.json"); } catch { data = null; } }
  render(data, live);
}
function render(data, live) {
  $("#dot").className = "dot " + (live ? "live" : "off");
  $("#stat").textContent = live ? "Live - updates every 30s" : (data ? "Showing last saved snapshot (server API not connected)" : "Market data unavailable right now");
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
loadMarket(); setInterval(loadMarket, 30000);

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(e => io.observe(e));
