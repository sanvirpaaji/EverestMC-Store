// ===== EDIT ME =====
window.EVEREST = {
  // Set to true ONLY after you have a PayPal account and have filled in paypalClientId (or paypalMe) below.
  checkoutEnabled: false,
  siteName: "EVERESTMC",
  discordUrl: "https://discord.everestmc.com/",          // your invite link
  // Live market API from the plugin. MUST be https:// (see README).
  apiUrl: "",                                   // e.g. "https://api.everestmc.net/api/companies"
  currency: "USD",
  currencySymbol: "$",
  paypalClientId: "",                           // PayPal "Live" Client ID (public, safe here). Empty = PayPal.Me fallback
  paypalMe: "",                                 // fallback, e.g. "yourhandle"
  // ===== RANKS: edit name / price / blurb / perks freely, add or delete blocks. =====
  // id = short lowercase code that shows up in PayPal orders (don't use spaces).
  // soon: true = shows a locked "Coming soon" card instead of a buy button.
  ranks: [
    { id: "elite",  name: "Elite",  price: "1.99",  blurb: "The grounded starting rank. Tough, capable, ready for the climb.", perks: ["Sherpa tag & chat color", "Starter perks"] },
    { id: "prestige", name: "Prestige", price: "2.99", blurb: "For climbers who survived the Khumbu Icefall and kept moving.",    perks: ["Icefang tag & chat color", "Everything in Sherpa"] },
    { id: "immortal",    name: "Immortal", price: "3.99", blurb: "Strongest climbers who never back down. Always ready for more.", perks: [] },
    { id: "everest",    name: "Everest", price: "4.99", blurb: "Those at the top of the mountain. Conquerors of the world beneath them.", perks: [] },
  ]
};
