// ===== EDIT ME =====
window.EVEREST = {
  // Set to true ONLY after you have a PayPal account and have filled in paypalClientId (or paypalMe) below.
  checkoutEnabled: false,
  siteName: "EVERESTMC",
  javaIp: "play.everestmc.net",
  javaNote: "1.8+",
  eaglerIp: "eagler.everestmc.net",
  eaglerNote: "1.12.2",
  discordUrl: "https://discord.everestmc.net/",
  deliveryNote: "Purchases are applied to your Minecraft username after payment is confirmed. Need help? Open a ticket on Discord.",
  // Market data: the plugin saves it to GitHub; leave apiUrl empty (Folium can't open ports).
  snapshotUrl: "https://raw.githubusercontent.com/sanvirpaaji/EverestMC-Store/market-data/companies.json",
  apiUrl: "",
  currency: "USD",
  currencySymbol: "$",
  paypalClientId: "",                           // PayPal "Live" Client ID (public, safe here). Empty = PayPal.Me fallback
  paypalMe: "",                                 // fallback, e.g. "yourhandle"

  // ===== RANKS: name / price / blurb. Add or delete freely (then fix the `v` lists in `features` to match). =====
  ranks: [
    { id: "elite",    name: "Elite",    price: "2.99", blurb: "Rise above the rest and claim your place among the elite." },
    { id: "immortal", name: "Immortal", price: "4.99", blurb: "For the legends who stand above even the greatest climbers." },
    { id: "everest",  name: "Everest",  price: "6.99", blurb: "Reach the summit. Claim the ultimate rank on EverestMC." }
  ],

  // ===== RANK FEATURES (placeholders: REPLACE WITH YOUR REAL PERKS) =====
  // One row per feature. `v` has one value per rank, in the same order as `ranks` above:
  // true = included, false = not included, "text" = included with a detail (shown on cards + comparison table).
  features: [
    { name: "Rank tag", v: ["Elite", "Immortal", "Everest"] },
    { name: "Features", v: ["Basic features", "Variety of features", "All features"] },
    { name: "Colored chat",             v: [true, true, true] },
    { name: "Homes",                    v: ["3", "6", "10"] },
    { name: "Monthly crate keys",       v: ["2 Common", "2 Rare", "2 Epic"] },
    { name: "Rank kit",                 v: ["Elite kit", "Immortal kit", "Everest kit"] },
    { name: "Portable ender chest",     v: [true, true, true] },
    { name: "Fly at spawn",             v: [false, true, true] },
    { name: "Priority support",         v: [false, true, true] },
    { name: "Exclusive cosmetics",      v: [false, false, true] },
    { name: "Exclusive Everest title",  v: [false, false, true] }
  ],

  // ===== STORE CATALOG (ALL PLACEHOLDERS: names, sizes and prices). id = no spaces. =====
  catalog: [
    { id: "keys", name: "Crate Keys", items: [
      { id: "key-common5",   name: "Common Key x5",     price: "2.99",  blurb: "Five keys for the Common crate." },
      { id: "key-common15",  name: "Common Key x15",    price: "7.99",  blurb: "Fifteen Common keys, better value." },
      { id: "key-rare5",     name: "Rare Key x5",       price: "4.99",  blurb: "Five keys for the Rare crate." },
      { id: "key-rare15",    name: "Rare Key x15",      price: "12.99", blurb: "Fifteen Rare keys, better value." },
      { id: "key-epic5",     name: "Epic Key x5",       price: "7.99",  blurb: "Five keys for the Epic crate." },
      { id: "key-epic15",    name: "Epic Key x15",      price: "19.99", blurb: "Fifteen Epic keys, better value." },
      { id: "key-legend3",   name: "Legendary Key x3",  price: "9.99",  blurb: "Three keys for the Legendary crate." },
      { id: "key-legend10",  name: "Legendary Key x10", price: "24.99", blurb: "Ten Legendary keys, our best deal." } ] },
    { id: "coins", name: "Coins", items: [
      { id: "coins-1k",   name: "1,000 Coins",   price: "1.99",  blurb: "A small top-up." },
      { id: "coins-5k",   name: "5,000 Coins",   price: "7.99",  blurb: "Enough to start trading on the market." },
      { id: "coins-10k",  name: "10,000 Coins",  price: "14.99", blurb: "A solid stack of in-game currency." },
      { id: "coins-25k",  name: "25,000 Coins",  price: "29.99", blurb: "Great for founding a company." },
      { id: "coins-50k",  name: "50,000 Coins",  price: "54.99", blurb: "For serious market players." },
      { id: "coins-100k", name: "100,000 Coins", price: "99.99", blurb: "The largest coin pack." } ] },
    { id: "bundles", name: "Bundles", items: [
      { id: "bundle-starter", name: "Starter Bundle", price: "14.99", blurb: "Keys and coins to get you moving." },
      { id: "bundle-climber", name: "Climber Bundle", price: "29.99", blurb: "A bigger haul of keys and coins." },
      { id: "bundle-summit",  name: "Summit Bundle",  price: "59.99", blurb: "Our biggest bundle of keys and coins." } ] }
  ]
};
