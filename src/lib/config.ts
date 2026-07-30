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
  address: "Werribee, VIC",
  hours: "Tue – Sun, 11am – 9pm",
  instagram: "https://www.instagram.com/ganesh_dosa_melbourne/",
  facebook: "https://www.facebook.com/profile.php?id=61592175580887",
  serviceAreas: [
    "Melbourne CBD",
    "Werribee",
    "Wyndham Vale",
    "Hoppers Crossing",
    "Point Cook",
    "Tarneit",
    "Truganina",
    "Laverton",
    "Altona",
    "Footscray",
    "Yarraville",
    "Williamstown",
    "Sunshine",
    "St Albans",
    "Deer Park",
    "Caroline Springs",
    "Melton",
    "Bacchus Marsh",
    "Keilor",
    "Essendon",
    "Brunswick",
    "Coburg",
    "Preston",
    "Northcote",
    "Fitzroy",
    "Carlton",
    "Richmond",
    "South Yarra",
    "St Kilda",
    "Prahran",
    "Caulfield",
    "Glen Eira",
    "Oakleigh",
    "Clayton",
    "Springvale",
    "Noble Park",
    "Dandenong",
    "Cranbourne",
    "Frankston",
    "Mornington",
    "Cheltenham",
    "Bentleigh",
    "Brighton",
    "Hawthorn",
    "Kew",
    "Camberwell",
    "Glen Waverley",
    "Mount Waverley",
    "Box Hill",
    "Doncaster",
    "Ringwood",
    "Croydon",
    "Lilydale",
    "Mooroolbark",
    "Mitcham",
    "Nunawading",
    "Blackburn",
    "Reservoir",
    "Thomastown",
    "Epping",
    "South Morang",
    "Whittlesea",
    "Craigieburn",
    "Mickleham",
    "Sunbury",
    "Broadmeadows",
    "Fawkner",
    "Heidelberg",
    "Bundoora",
    "Mill Park",
    "Lalor",
  ],
} as const;

export const liveCounter = {
  pricePerPerson: 20, // AUD
  minGuests: 30,
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
    minGuests: 20,
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
    minGuests: 30,
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
