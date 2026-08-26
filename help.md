# Maa Ambika Sweets — Owner's Maintenance Manual (`help.md`)

Welcome to the **Maa Ambika Sweets** website maintenance guide. This document is designed for the business owner and non-technical maintainers. If you ever need to update contact numbers, add new sweets to the catalogue, modify opening hours, or deploy updates, this guide gives you exact, step-by-step instructions.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [How to Run Locally](#2-how-to-run-locally)
3. [How to Build the Project](#3-how-to-build-the-project)
4. [How to Deploy to Vercel (Recommended)](#4-how-to-deploy-to-vercel-recommended)
5. [How to Deploy to GitHub Pages](#5-how-to-deploy-to-github-pages)
6. [Project Folder Structure](#6-project-folder-structure)
7. [Brand Assets & Logo Protection](#7-brand-assets--logo-protection)
8. [Hero Scroll Sequence (The 50 Frames)](#8-hero-scroll-sequence-the-50-frames)
9. [Product Catalogue (Adding & Editing Sweets)](#9-product-catalogue-adding--editing-sweets)
10. [Contact Information (Phone, Email, WhatsApp)](#10-contact-information-phone-email-whatsapp)
11. [WhatsApp Enquiry Form](#11-whatsapp-enquiry-form)
12. [Google Maps & Location](#12-google-maps--location)
13. [Google Customer Reviews](#13-google-customer-reviews)
14. [Registered & Licensed Badges (FSSAI, MSME, Trade License)](#14-registered--licensed-badges-fssai-msme-trade-license)
15. [Instagram Configuration](#15-instagram-configuration)
16. [Colors & Visual Tokens](#16-colors--visual-tokens)
17. [Typography & Fonts](#17-typography--fonts)
18. [SEO & Search Engine Setup](#18-seo--search-engine-setup)
19. [Favicon Management](#19-favicon-management)
20. [Adding Future Sections](#20-adding-future-sections)
21. [Quick Reference: "I want to change X → Edit Y"](#21-quick-reference-i-want-to-change-x--edit-y)
22. [Troubleshooting Common Issues](#22-troubleshooting-common-issues)
23. [Critical "Do-Not-Break" Rules](#23-critical-do-not-break-rules)
24. [Complete Asset Inventory](#24-complete-asset-inventory)

---

## 1. Project Overview

This website is a **production-ready, static-first web application** built for **Maa Ambika Sweets (মা অম্বিকা সুইটস)**, established in **2000** in Rameswarpur, Kalna, West Bengal.

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Pure CSS with design tokens sampled directly from the authoritative brand identity (Cream, Maroon, Gold).
- **Hero**: A scroll-driven canvas frame scrubber playing 50 high-resolution frames of traditional rasogolla preparation.
- **Backend / Cost**: **100% Free**. No paid backend, no database subscription, and no paid form APIs. The WhatsApp enquiry form runs entirely client-side.

---

## 2. How to Run Locally

To preview and edit the website on your personal computer:

1. Open your terminal (PowerShell, Command Prompt, or Terminal).
2. Navigate to the project directory:
   ```bash
   cd "t:/maa ambika sweets"
   ```
3. Install dependencies (only needed the first time):
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit: `http://localhost:3000`

---

## 3. How to Build the Project

To compile and validate the production-ready static export:

```bash
npm run build
```

This creates an optimized `out/` folder containing static HTML, CSS, JavaScript, and images that can be hosted on any web server for free.

To check for any code or type errors before building:
```bash
npx tsc --noEmit
npm run lint
```

---

## 4. How to Deploy to Vercel (Recommended)

Vercel provides free, high-speed hosting with automatic SSL certificates.

### Step-by-Step Deployment:
1. Push this codebase to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New Project** and select your repository (`maa-ambika-sweets`).
4. Keep the default settings (Framework Preset: **Next.js**).
5. Click **Deploy**.
6. In ~60 seconds, your site will be live on your `.vercel.app` domain or custom domain (e.g. `maaambikasweets.com`).

---

## 5. How to Deploy to GitHub Pages

If you prefer hosting on GitHub Pages:

1. Open `next.config.ts`.
2. If deploying to a repository subpath (e.g., `https://username.github.io/maa-ambika-sweets/`), set `basePath`:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: { unoptimized: true },
     trailingSlash: true,
     basePath: '/maa-ambika-sweets', // Change to your exact repository name
   };
   ```
3. Run `npm run build`.
4. Deploy the generated `out/` folder to the `gh-pages` branch of your repository.

---

## 6. Project Folder Structure

The project strictly organizes assets and code by section:

```
maa-ambika-sweets/
├── public/                     ← Public static assets
│   ├── brand/                  ← Official logo and favicon files
│   │   ├── logo.png            ← Transparent brand emblem (DO NOT MODIFY)
│   │   ├── logo-reference.png  ← Cream reference logo (DO NOT MODIFY)
│   │   └── favicon/            ← Cream-background browser icons
│   ├── hero/                   ← 50 sequence frames (1.jpg to 50.jpg)
│   ├── catalogue/              ← Place your product photographs here
│   ├── story/                  ← Story-related images (future use)
│   ├── celebrations/           ← Occasion images (future use)
│   └── instagram/              ← Social assets (future use)
│
├── src/                        ← Source code
│   ├── config/
│   │   └── business.ts         ← ⭐ SINGLE SOURCE OF TRUTH for phone, address, hours
│   ├── data/
│   │   ├── products.ts         ← ⭐ ADD / EDIT SWEETS HERE
│   │   ├── reviews.ts          ← ⭐ ADD GENUINE GOOGLE REVIEWS HERE
│   │   └── licenses.ts         ← ⭐ UPDATE FSSAI / MSME / TRADE LICENSE NUMBERS
│   ├── components/             ← Reusable UI blocks (Navbar, Footer, ProductCard)
│   ├── sections/               ← Homepage sections in sequential order
│   └── app/
│       ├── layout.tsx          ← Root HTML, SEO tags, font loading
│       ├── page.tsx            ← Homepage assembly
│       └── globals.css         ← CSS variables, colors, typography
│
├── help.md                     ← This manual
├── README.md                   ← Project summary
└── next.config.ts              ← Next.js static build configuration
```

---

## 7. Brand Assets & Logo Protection

- **Emblem Path**: `public/brand/logo.png`
- **Brand Reference**: `public/brand/logo-reference.png`

### ⚠️ IMPORTANT BRAND IDENTITY RULES:
- **Do NOT** redraw, recolor, filter, distort, or AI-regenerate the logo.
- **Do NOT** change the established date from **EST. 2000**.
- **Do NOT** mention ancestral history claims prior to 2000. This website represents the specific Maa Ambika Sweets establishment founded in 2000.

---

## 8. Hero Scroll Sequence (The 50 Frames)

- **Location**: `public/hero/`
- **Files**: `1.jpg`, `2.jpg`, `3.jpg`, ... `50.jpg`

### How It Works:
The hero section is a canvas-based frame scrubber. As the user scrolls down, the frame advances from `1.jpg` to `50.jpg`. When scrolling up, it naturally reverses from `50.jpg` to `1.jpg`. When the user stops scrolling, the animation stops.

### Replacing the Sequence:
If you take a new set of 50 sequence photographs in the future:
1. Name the frames sequentially: `1.jpg`, `2.jpg`, `3.jpg`, ... `50.jpg`.
2. Place them into `public/hero/`, replacing the old files.
3. Keep JPEG dimensions consistent across all 50 frames.
4. Run `npm run build` to publish.

---

## 9. Product Catalogue (Adding & Editing Sweets)

All product information is managed in one single file:
👉 `src/data/products.ts`

### How to Add a New Sweet:

1. **Add the image**: Save your sweet's photograph as a `.jpg` or `.png` inside `public/catalogue/` (for example: `public/catalogue/misti-doi.jpg`).
2. **Open `src/data/products.ts`** in your text editor.
3. **Add an entry** to the `products` array:

```typescript
export const products: Product[] = [
  {
    id: 'misti-doi',
    nameEnglish: 'Misti Doi',
    nameBengali: 'মিষ্টি দই',
    descriptionEnglish: 'Classic earthen pot sweet curd fermented to golden, creamy perfection.',
    descriptionBengali: 'মাটির ভাঁড়ে জমানো খাঁটি দুধের লালচে মিষ্টি দই।',
    image: 'misti-doi.jpg',
    category: 'Curd & Dairy',
  },
  {
    id: 'kacha-golla',
    nameEnglish: 'Nolen Gur Kacha Golla',
    nameBengali: 'নলেন গুড়ের কাঁচাগোল্লা',
    descriptionEnglish: 'Soft, melt-in-mouth fresh chhana infused with aromatic date palm jaggery.',
    descriptionBengali: 'তাজা ছানা ও খেজুরের নলেন গুড়ের সুবাসে তৈরি নরম মিষ্টি।',
    image: 'kacha-golla.jpg',
    category: 'Seasonal Sweets',
  }
];
```

4. Save the file and rebuild (`npm run build`). The sweet card will appear automatically in the catalogue grid!

---

## 10. Contact Information (Phone, Email, WhatsApp)

All business details are centralized in:
👉 `src/config/business.ts`

To update your contact information:
1. Open `src/config/business.ts`.
2. Edit the corresponding fields:

```typescript
phone: '+91 98765 43210',        // Your shop phone number
whatsapp: '+919876543210',       // Your business WhatsApp number (with country code)
email: 'contact@maaambikasweets.com', // Your contact email
```

3. Save the file. Every section on the website (Navbar, Footer, Enquiry form, CTA) will update instantly.

---

## 11. WhatsApp Enquiry Form

- **Component**: `src/sections/Enquiry.tsx`
- **Config**: Uses `BUSINESS.whatsapp` from `src/config/business.ts`.

### How It Works:
When a customer enters their Name, Phone, Email, and Message and clicks **Send Enquiry via WhatsApp**, the browser automatically formats the text into:

```text
*New Enquiry — Maa Ambika Sweets*

*Name:* Subhashish Roy
*Phone:* 9830012345
*Email:* subhashish@gmail.com
*Message:* Enquiring about 50 boxes of Rasogolla for Sunday reception.
```

It then opens WhatsApp (`https://wa.me/...`) with this pre-filled message. It works on both mobile phones and desktop computers with WhatsApp Web.

---

## 12. Google Maps & Location

- **Verified Coordinates**: `23.216115, 88.3528455`
- **Address**: `Boinchi - Kalna Rd, Rameswarpur, Kalna, Rameswarpur P, West Bengal 713409`
- **File**: `src/config/business.ts`

The interactive map embed is configured to pinpoint this exact shop location without requiring any paid Google API keys.

---

## 13. Google Customer Reviews

- **Data File**: `src/data/reviews.ts`

### ⚠️ Review Policy:
Never fabricate customer reviews or invent star ratings. Only add genuine reviews left by real customers on your Google Maps listing.

### How to Add a Verified Review:
1. Open `src/data/reviews.ts`.
2. Add a review object:

```typescript
export const reviews: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Anirban Mukherjee',
    rating: 5,
    relativeTimeDescription: '1 month ago',
    text: 'One of the best sweet shops in Kalna. Their Misti Doi and soft Rasogolla are unmatched in quality.',
  },
];
```

*Note: When `reviews` is empty, the website gracefully shows an invitation card linking directly to your live Google Maps reviews page.*

---

## 14. Registered & Licensed Badges (FSSAI, MSME, Trade License)

- **Data File**: `src/data/licenses.ts`
- **Display**: Located in the website footer.

### How to Update Your License Numbers:
Open `src/data/licenses.ts` and replace the placeholder numbers:

```typescript
export const licenses: LicenseItem[] = [
  {
    id: 'fssai',
    authority: 'FSSAI',
    subtitle: 'Licensed Food Business',
    registrationNumber: 'FSSAI No. 12824005000123', // Enter your actual 14-digit FSSAI number
  },
  {
    id: 'msme',
    authority: 'MSME / UDYAM',
    subtitle: 'Registered Business',
    registrationNumber: 'UDYAM-WB-05-0012345',      // Enter your actual UDYAM registration
  },
  {
    id: 'trade',
    authority: 'Trade License',
    subtitle: 'Valid Business Registration',
    registrationNumber: 'Kalna Municipality Reg. No. 5432/2024',
  },
];
```

---

## 15. Instagram Configuration

- **File**: `src/config/business.ts`
- **Key**: `BUSINESS.instagram`

Set your official Instagram URL:
```typescript
instagram: 'https://www.instagram.com/maaambikasweets_kalna',
```

---

## 16. Colors & Visual Tokens

The authoritative color palette is defined in `src/app/globals.css`:

```css
:root {
  --color-cream: #F8EED9;       /* Exact warm cream background from brand reference */
  --color-cream-light: #FAF2E3; /* Alternate surface tone */
  --color-cream-dark: #ECE0C7;  /* Deep cream border/accents */
  --color-maroon: #58150F;      /* Authoritative deep maroon from brand emblem */
  --color-maroon-dark: #3F0E0A; /* Darker maroon for hover states */
  --color-gold: #D6A664;        /* Warm gold sampled from emblem artwork */
  --color-gold-muted: #B88540;  /* Muted gold for labels and badges */
  --color-text: #2A0E10;        /* Deep maroon-neutral text for high contrast */
  --color-text-light: #522729;  /* Secondary body text */
  --color-muted: #825E50;       /* Muted Bengali and subtitle text */
  --color-surface: #FCF6EC;     /* Card background surface */
  --color-border: #E8D8C0;      /* Card and divider borders */
}
```

---

## 17. Typography & Fonts

The site uses three curated typefaces loaded in `src/app/layout.tsx`:
1. **Cormorant Garamond**: Editorial serif for headlines and elegance.
2. **Inter**: Modern sans-serif for UI, buttons, and body copy.
3. **Noto Sans Bengali**: High-legibility Unicode font for Bengali language text.

All fonts are self-hosted and bundled at build time with zero external runtime dependencies.

---

## 18. SEO & Search Engine Setup

Search engine metadata is located in:
- `src/config/business.ts` (`seo` section)
- `src/app/layout.tsx` (Open Graph, Twitter cards, and Schema.org `SweetShop` JSON-LD)
- `public/robots.txt`
- `public/sitemap.xml`

When deploying to your custom domain, update `BUSINESS.seo.canonical` in `src/config/business.ts` to `https://your-domain.com`.

---

## 19. Favicon Management

Favicon assets are stored in:
`public/brand/favicon/`

All icons are rendered on a solid **#F5F0E8 warm cream background** behind the brand emblem.

If you ever regenerate favicons, ensure the background remains the `#F5F0E8` cream tone rather than white or transparent.

---

## 20. Adding Future Sections

Each homepage section is a standalone React component inside `src/sections/`.
To add a new section:
1. Create `src/sections/YourNewSection.tsx`.
2. Import and place it in the desired order inside `src/app/page.tsx`.

---

## 21. Quick Reference: "I want to change X → Edit Y"

| I want to change... | Edit this file / folder |
|---|---|
| **Phone number** | `src/config/business.ts` (`phone`) |
| **WhatsApp number** | `src/config/business.ts` (`whatsapp`) |
| **Shop email** | `src/config/business.ts` (`email`) |
| **Opening hours** | `src/config/business.ts` (`hours`) |
| **Shop address** | `src/config/business.ts` (`address`) |
| **Instagram link** | `src/config/business.ts` (`instagram`) |
| **Add a new sweet** | 1. Put image in `public/catalogue/`<br>2. Add item in `src/data/products.ts` |
| **Delete or edit a sweet** | `src/data/products.ts` |
| **Add a verified Google review** | `src/data/reviews.ts` |
| **Update FSSAI / MSME / Trade License** | `src/data/licenses.ts` |
| **Hero 50-frame animation** | `public/hero/` (`1.jpg` ... `50.jpg`) |
| **Brand logo** | `public/brand/logo.png` |
| **Website colors** | `src/app/globals.css` (`:root` variables) |
| **SEO title & description** | `src/config/business.ts` (`seo`) |

---

## 22. Troubleshooting Common Issues

### Issue 1: Hero images do not advance when scrolling
- **Cause**: Images in `public/hero/` might have incorrect filenames.
- **Fix**: Ensure all 50 files are named strictly `1.jpg`, `2.jpg`, `3.jpg`, ... `50.jpg` (lowercase `.jpg`).

### Issue 2: Product image is broken or missing
- **Cause**: Image name in `products.ts` does not match the file in `public/catalogue/`.
- **Fix**: Check `public/catalogue/` to ensure the exact filename matches `image: 'your-sweet.jpg'`.

### Issue 3: WhatsApp enquiry button doesn't open the chat
- **Cause**: The phone number in `src/config/business.ts` has missing country code.
- **Fix**: Ensure `whatsapp` starts with `+91` followed by the 10-digit mobile number without spaces (e.g. `+919876543210`).

### Issue 4: Map is showing a generic area
- **Cause**: Coordinates were altered.
- **Fix**: Ensure `coordinates` in `src/config/business.ts` are set to `lat: 23.216115, lng: 88.3528455`.

### Issue 5: Build failure on `npm run build`
- **Cause**: TypeScript syntax error (e.g., missing comma in `products.ts` or `business.ts`).
- **Fix**: Run `npx tsc --noEmit` in terminal to see the exact line number of any syntax mistakes.

---

## 23. Critical "Do-Not-Break" Rules

1. **NEVER alter or AI-regenerate the logo** — always use the supplied brand asset.
2. **NEVER claim establishment prior to 2000** — this specific branch was established in 2000.
3. **NEVER fabricate fake customer reviews or ratings**.
4. **NEVER add background audio, sound effects, or auto-playing music**.
5. **NEVER convert the hero into an automated video or CSS timer animation** — the frame progression must always be driven by user scroll.
6. **NEVER add paid third-party backend requirements** — keep the site static, fast, and free to host.

---

## 24. Complete Asset Inventory

| Asset Name | File Path | Description | Safe to replace? |
|---|---|---|---|
| **Brand Logo (Transparent)** | `public/brand/logo.png` | Official emblem of Maa Ambika Sweets | ⚠️ Brand asset — do not alter artwork |
| **Brand Logo Reference** | `public/brand/logo-reference.png` | Full identity with Bengali typography | ⚠️ Brand reference — do not alter |
| **Hero Frames 1–50** | `public/hero/1.jpg` to `50.jpg` | Sequential frames of rasogolla preparation | ✅ Safe to replace with another 50-frame sequence |
| **Favicon 16x16** | `public/brand/favicon/favicon-16x16.png` | Browser tab icon with cream background | ✅ Safe to regenerate if logo updates |
| **Favicon 32x32** | `public/brand/favicon/favicon-32x32.png` | Browser tab icon with cream background | ✅ Safe to regenerate if logo updates |
| **Apple Touch Icon** | `public/brand/favicon/apple-touch-icon.png` | iOS home screen icon (180x180) | ✅ Safe to regenerate |
| **Web Manifest** | `public/brand/favicon/site.webmanifest` | PWA web app manifest metadata | ✅ Safe to edit |
| **Product Catalogue Images** | `public/catalogue/*` | Photographs of individual sweets | ✅ Safe to add, delete, or replace |

---

*Document prepared for Maa Ambika Sweets. For technical questions, refer to this guide.*
