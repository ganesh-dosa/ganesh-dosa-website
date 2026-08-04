// Editable business configuration for Dosa Ganesh.
// Update these values as the client confirms details.

export const business = {
  name: "Ganesh Dosa",
  tagline: "Made for your celebration",
  city: "Melbourne",
  region: "Victoria, Australia",
  phone: "+61 416 175 868",
  whatsapp: "61416175868", // digits only, no +
  email: "sales@ganeshdosa.com.au",
  address: "5 Glen St, Werribee, VIC",
  hours: "7 days\nMon – Fri: 3:00 PM – 11:00 PM\nSat – Sun: 9:00 AM – Midnight",
  instagram: "https://www.instagram.com/ganesh_dosa_melbourne/",
  facebook: "https://www.facebook.com/profile.php?id=61592175580887",
  get serviceAreas() {
    return Object.keys(suburbDistanceKm);
  },
} as const;

// Approximate driving distance (km) from our address (5 Glen St, Werribee) to
// each serviced suburb. These are good-faith estimates, not geocoded/verified -
// review and adjust before relying on them for pricing at scale, especially
// suburbs near a delivery-fee tier boundary (10km / 50km).
export const suburbDistanceKm: Record<string, number> = {
  "Werribee": 0,
  "Hoppers Crossing": 5,
  "Wyndham Vale": 6,
  "Point Cook": 10,
  "Tarneit": 8,
  "Truganina": 12,
  "Laverton": 15,
  "Altona": 18,
  "Williamstown": 20,
  "Deer Park": 20,
  "Sunshine": 22,
  "Yarraville": 24,
  "Footscray": 25,
  "St Albans": 25,
  "Caroline Springs": 25,
  "Melbourne CBD": 32,
  "Melton": 28,
  "Keilor": 30,
  "Bacchus Marsh": 35,
  "Sunbury": 38,
  "Essendon": 35,
  "Broadmeadows": 40,
  "Brunswick": 38,
  "Fawkner": 40,
  "Coburg": 40,
  "Craigieburn": 45,
  "Mickleham": 48,
  "Preston": 42,
  "Reservoir": 43,
  "Northcote": 40,
  "Fitzroy": 36,
  "Carlton": 34,
  "Heidelberg": 42,
  "Bundoora": 45,
  "Thomastown": 45,
  "Epping": 48,
  "Mill Park": 47,
  "Lalor": 46,
  "South Morang": 50,
  "Whittlesea": 55,
  "Richmond": 37,
  "South Yarra": 36,
  "St Kilda": 38,
  "Prahran": 37,
  "Hawthorn": 38,
  "Kew": 40,
  "Camberwell": 42,
  "Caulfield": 40,
  "Glen Eira": 41,
  "Brighton": 40,
  "Bentleigh": 44,
  "Cheltenham": 48,
  "Oakleigh": 45,
  "Clayton": 48,
  "Box Hill": 45,
  "Doncaster": 43,
  "Blackburn": 44,
  "Nunawading": 46,
  "Mitcham": 48,
  "Ringwood": 50,
  "Croydon": 53,
  "Mooroolbark": 55,
  "Lilydale": 58,
  "Glen Waverley": 50,
  "Mount Waverley": 48,
  "Springvale": 50,
  "Noble Park": 52,
  "Dandenong": 55,
  "Cranbourne": 65,
  "Frankston": 60,
  "Mornington": 70,
};

export const liveCounter = {
  pricePerPerson: 20, // AUD
  minGuests: 25,
  maxGuests: 150,
  leadTimeDays: 5, // absolute minimum
  recommendedLeadTimeDays: 10, // strongly recommended
  varieties: 10,
  inclusions: [
    "Unlimited dosas, served fresh from a live counter",
    "10 dosa varieties",
    "Idli, medu vada & masala tea",
    "Chef and service staff on-site",
    "Chutneys, sambar and accompaniments",
  ],
  // Configurable add-ons.
  addons: [
    { id: "travel", label: "Travel surcharge", note: "$30 one way beyond 10km · up to 100km from Melbourne CBD" },
    { id: "cutlery", label: "Plates, cutlery, cups & glasses", note: "$2 per person" },
    { id: "staff", label: "Additional staff", note: "Extra chef or service staff" },
    { id: "time", label: "Additional service time", note: "Beyond standard service window" },
    { id: "setup", label: "Setup requirements", note: "Marquee, power, water access" },
  ],
} as const;

export const delivery = {
  tier1RadiusKm: 50,   // within 50km: $60
  tier1Charge: 60,
  tier2Charge: 100,    // beyond 50km: $100
  maxRadiusKm: 150,
  note: "Delivery is $60 within 50km of your venue. Beyond 50km, a flat $100 delivery charge applies.",
} as const;

export const liveCounterDelivery = {
  freeRadiusKm: 10,
  chargeAbove: 30,
  maxRadiusKm: 150,
  note: "Delivery is free within 10km of your venue. Beyond 10km, a flat $30 delivery charge applies.",
} as const;

export const payments = {
  depositPercent: 20, // minimum advance
  allowFullUpfront: true,
  gateway: "stripe" as const,
  note: "A minimum 20% deposit is required to confirm your booking. You may choose to pay the full amount in advance. Secure payments via Stripe.",
} as const;

// Google Forms integration — booking submissions are POSTed to a Google Form
// so responses are collected in a Google Sheet automatically.
//
// SETUP (one-off, ~5 min):
//   1. Create a Google Form with these fields (short answer / paragraph):
//      Name, Email, Phone, Suburb, Service, Guests, Date, Time,
//      Event Type, Extras, Distance (km), Payment, Total (AUD), Notes.
//   2. Open the form, view page source, and search for `entry.` — each
//      question has an `entry.XXXXXXXXX` id. Paste them below.
//   3. Copy the form URL — the ID is the long token between `/d/e/` and
//      `/viewform`. Paste it as `formId`.
//   4. In the form's Responses tab, click the Sheets icon to auto-collect
//      submissions in a spreadsheet.
export const googleForm = {
  formId: "REPLACE_WITH_GOOGLE_FORM_ID",
  fields: {
    name: "entry.1000001",
    email: "entry.1000002",
    phone: "entry.1000003",
    suburb: "entry.1000004",
    service: "entry.1000005",
    guests: "entry.1000006",
    date: "entry.1000007",
    time: "entry.1000008",
    eventType: "entry.1000009",
    extras: "entry.1000010",
    distanceKm: "entry.1000011",
    payment: "entry.1000012",
    total: "entry.1000013",
    notes: "entry.1000014",
  },
} as const;


export const inStore = {
  basePrice: 150, // AUD, for base guest count
  baseGuests: 10,
  additionalGuestPrice: null as number | null, // TBC
  maxCapacity: null as number | null, // TBC
  sessionDurationMinutes: null as number | null, // TBC
  includedMenu: [
    "Unlimited dosas",
    "Selection of chutneys & sambar",
    "Hosted at the Dosa Ganesh premises",
  ],
  availableTimes: [] as string[], // TBC
} as const;

export const cateringPackages = [
  {
    id: "package-1",
    name: "Package 1",
    tagline: "A warm, homely South Indian spread.",
    priceFrom: 22, // per person
    minGuests: 25,
    items: [
      "Vegetable biryani (veg pulao)",
      "Mango dal",
      "Plain rice",
      "Gutti vankaya (stuffed brinjal)",
      "Rasam",
      "Sambar",
      "Papadam",
    ],
    onTray: ["Mix pakoda", "Mirchi pakoda", "Kesari bath"],
  },
  {
    id: "package-2",
    name: "Package 2",
    tagline: "A generous celebration menu with signature South Indian flavours.",
    priceFrom: 25, // per person
    minGuests: 25,
    items: [
      "Vegetable biryani (veg pulao)",
      "Tamarind rice",
      "Curd rice",
      "Okra fry",
      "Gutti vankaya (stuffed brinjal)",
      "Rasam",
      "Papadam",
    ],
    onTray: ["Mix pakoda", "Mirchi pakoda", "Kesari bath"],
  },
  {
    id: "package-3",
    name: "Package 3 — South Indian Feast",
    tagline: "An authentic South Indian banquet for special occasions.",
    priceFrom: 30, // per person
    minGuests: 25,
    items: [
      "Mor kuzhambu",
      "Bisi bele bath",
      "Poriyal",
      "Kottu curry",
      "Raw banana fry",
      "Papadam",
      "Rasam",
      "Sambar",
      "Kesari bath (sweet)",
    ],
    onTray: ["Mix pakoda", "Mirchi pakoda"],
  },
] as const;

export const menu = {
  dosas: [
    { name: "Plain Dosa", desc: "The classic — thin, crisp, golden." },
    { name: "Masala Dosa", desc: "Spiced potato filling with house chutneys." },
    { name: "Mysore Masala Dosa", desc: "Fiery red chutney with potato masala." },
    { name: "Podi Dosa", desc: "Dusted with fragrant lentil-chilli podi." },
    { name: "Onion Dosa", desc: "Crisp dosa loaded with sweet onion and curry leaves." },
    { name: "Pizza Dosa", desc: "A playful twist — cheese, tomato and herbs." },
    { name: "Paneer Dosa", desc: "Spiced paneer bhurji filling." },
    { name: "Cheese Dosa", desc: "A family favourite — melted cheese, crisp shell." },
    { name: "Ghee Dosa", desc: "Extra crisp, brushed generously with ghee." },
    { name: "Chocolate Dosa", desc: "For the kids (and the young at heart)." },
  ],
  sides: [
    { name: "Idli", desc: "Steamed rice cakes, feather-light." },
    { name: "Medu Vada", desc: "Golden lentil doughnuts." },
    { name: "Mirchi Pakoda", desc: "Battered green chillies, crisp-fried." },
    { name: "Kesari Bath", desc: "Semolina sweet with saffron and ghee." },
  ],
} as const;


export const faqs = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 10 days ahead so we can plan staff, ingredients and travel. The absolute minimum is 5 days — anything shorter cannot be accepted.",
  },
  {
    q: "Where do you operate?",
    a: "We service events across greater Melbourne. Travel beyond the CBD may attract a small surcharge — we'll confirm this when you book.",
  },
  {
    q: "How many guests can you cater for?",
    a: "Our live counter serves 30–150 guests. For larger events, get in touch and we'll tailor a solution.",
  },
  {
    q: "What's included in the live counter package?",
    a: "AUD $20 per person includes unlimited dosas, 10 varieties, chutneys and sambar, plus idli, medu vada and masala tea (pending final confirmation). Chef and service staff are included.",
  },
  {
    q: "Do you cater for dietary requirements?",
    a: "Our menu is fully vegetarian. Most items are naturally gluten-free (rice/lentil batter). Let us know about allergies and we'll do our best to accommodate.",
  },
  {
    q: "How do I confirm my booking?",
    a: "Submit a booking enquiry and we'll be in touch within 24 hours to confirm details, pricing and deposit.",
  },
] as const;
