
 // ===== EDIT ME =====
window.EVEREST = {
  // Set to true ONLY after you have a PayPal account and have filled in paypalClientId (or paypalMe) below.
  checkoutEnabled: false,
  siteName: "EVERESTMC",
  discordUrl: "https://discord.everestmc.net/", // your invite link

  // Live market API from the plugin. MUST be https:// (see README).
  snapshotUrl: "https://raw.githubusercontent.com/sanvirpaaji/EverestMC-Store/market-data/companies.json", // filled by the plugin (no port needed)
  apiUrl: "", // e.g. "https://api.everestmc.net/api/companies"
  currency: "USD",
  currencySymbol: "$",
  paypalClientId: "", // PayPal "Live" Client ID (public, safe here). Empty = PayPal.Me fallback
  paypalMe: "", // fallback, e.g. "yourhandle"

  // ===== RANKS: edit name / price / blurb / perks freely, add or delete blocks. =====
  // id = short lowercase code that shows up in PayPal orders (don't use spaces).
  // soon: true = shows a locked "Coming soon" card instead of a buy button.
  ranks: [
    {
      id: "elite",
      name: "Elite",
      price: "2.99",
      blurb: "Rise above the rest and claim your place among the elite.",
      perks: ["Elite tag & basic features"]
    },
    {
      id: "immortal",
      name: "Immortal",
      price: "4.99",
      blurb: "For the legends who stand above even the greatest climbers.",
      perks: ["Immortal tag & variety of features", "Everything in Prestige"]
    },
    {
      id: "everest",
      name: "Everest",
      price: "6.99",
      blurb: "Reach the summit. Claim the ultimate rank on EverestMC.",
      perks: ["Everest tag & all features", "Everything in Immortal"]
    }
  ]
};
