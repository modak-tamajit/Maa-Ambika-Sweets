export const BUSINESS = {
  name: {
    english: 'Maa Ambika Sweets',
    bengali: 'মা অম্বিকা সুইটস',
  },
  tagline: {
    bengali: 'সাধ্যের মধ্যে স্বাদ বদল',
    english: 'A Legacy Crafted in Sweetness',
  },
  established: 2000,

  // ──────────────────────────────────────────────
  // CONTACT DETAILS — Verified Owner Contact
  // ──────────────────────────────────────────────
  phone: '+91 98005 75051',
  whatsapp: '+919800575051',
  email: 'maaambikasweets@gmail.com',

  // ──────────────────────────────────────────────
  // SOCIAL — Official Instagram
  // ──────────────────────────────────────────────
  instagram: 'https://www.instagram.com/maa_ambika_sweets?igsi=MXZlNW5sM3F2bTJtMA%3D%3D',
  instagramHandle: 'maa_ambika_sweets',

  // ──────────────────────────────────────────────
  // LOCATION — Verified coordinates
  // ──────────────────────────────────────────────
  address: {
    full: 'Boinchi - Kalna Rd, Rameswarpur, Kalna, Rameswarpur P, West Bengal 713409',
    street: 'Boinchi - Kalna Rd',
    locality: 'Rameswarpur',
    city: 'Kalna',
    district: 'Purba Bardhaman',
    state: 'West Bengal',
    pincode: '713409',
    country: 'India',
  },
  coordinates: {
    lat: 23.216115,
    lng: 88.3528455,
  },
  googleMaps: {
    embedUrl:
      'https://www.google.com/maps?q=23.216115,88.3528455&z=17&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=23.216115,88.3528455',
    listingUrl: 'https://maps.app.goo.gl/uEWsNzJKfQiRAJ5a9',
  },

  // ──────────────────────────────────────────────
  // OPENING HOURS — Verify and update
  // ──────────────────────────────────────────────
  hours: [
    { days: 'Monday – Sunday', time: '8:00 AM – 10:00 PM' },
  ],
  hoursNote: 'Open all days',

  // ──────────────────────────────────────────────
  // SEO — Update canonical URL after deployment
  // ──────────────────────────────────────────────
  seo: {
    title: 'Maa Ambika Sweets | Authentic Bengali Sweets in Kalna | Monojit Modak',
    description:
      'Discover authentic Bengali sweets crafted with traditional flavours and fresh ingredients at Maa Ambika Sweets in Kalna, West Bengal. A local tradition of sweetness, made for everyday moments and special celebrations.',
    canonical: 'https://www.maaambikasweets.live',
  },
} as const;

export type Business = typeof BUSINESS;
