// ===== EDIT ME =====
window.EVEREST = {
  // Set to true ONLY after you have a PayPal account and have filled in paypalClientId (or paypalMe) below.
  checkoutEnabled: false,
  siteName: "EVERESTMC",
  discordUrl: "https://discord.everestmc.net/",          // your invite link
  // Live market API from the plugin. MUST be https:// (see README).
  snapshotUrl: "https://raw.githubusercontent.com/sanvirpaaji/EverestMC-Store/market-data/companies.json", // filled by the plugin (no port needed)
  apiUrl: "",                                   // e.g. "https://api.everestmc.net/api/companies"
  currency: "USD",
  currencySymbol: "$",
  paypalClientId: "",                           // PayPal "Live" Client ID (public, safe here). Empty = PayPal.Me fallback
  paypalMe: "",                                 // fallback, e.g. "yourhandle"
  // ===== RANKS: edit name / price / blurb / perks freely, add or delete blocks. =====
  // id = short lowercase code that shows up in PayPal orders (don't use spaces).
  // soon: true = shows a locked "Coming soon" card instead of a buy button.
  ranks: [
    { id: "sherpa",  name: "Sherpa",  price: "9.99",  blurb: "The grounded starting rank. Tough, capable, ready for the climb.", perks: ["Sherpa tag & chat color", "Starter perks"] },
    { id: "icefang", name: "Icefang", price: "19.99", blurb: "For climbers who survived the Khumbu Icefall and kept moving.",    perks: ["Icefang tag & chat color", "Everything in Sherpa"] },
    { id: "more",    name: "More ranks", price: "", soon: true, blurb: "Higher peaks are waiting. More ranks will be revealed soon.", perks: [] }
  ]
};
