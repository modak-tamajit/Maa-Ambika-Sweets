# Maa Ambika Sweets (মা অম্বিকা সুইটস) 🍯

> **A high-performance, heritage brand showcase and digital ordering web application for an authentic Bengali confectionery established in 2000 in Kalna, West Bengal.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Performance](https://img.shields.io/badge/Lighthouse-98%2B-00CC66?style=for-the-badge&logo=lighthouse)](https://pagespeed.web.dev/)
[![License](https://img.shields.io/badge/Client_Project-Production-maroon?style=for-the-badge)](#)

---

## 📌 Project Overview

**Maa Ambika Sweets** is a client-commissioned production web platform built to elevate a 25+ year-old heritage confectionery in Kalna, West Bengal. The goal was to bridge traditional Bengali sweetmaking craftsmanship with a modern, high-converting digital presence.

### 🎯 Key Objectives & Deliverables
- **Brand Elevation**: Built a bespoke, luxury editorial design system honouring Bengali cultural aesthetics without using heavy generic UI frameworks.
- **Interactive Scrollytelling**: Engineered a 60 FPS scroll-driven 50-frame animation sequence demonstrating traditional *chhana* and sweet craftsmanship.
- **Conversion & Lead Generation**: Implemented dynamic WhatsApp ordering with auto-formatted messages, celebration enquiry handling, and direct Google Maps routing.
- **Trust & Compliance**: Interactive showcase for government-registered credentials (**FSSAI**, **MSME / UDYAM**, **Trade License**).
- **SEO & Discoverability**: Semantic HTML5, LocalBusiness JSON-LD schema, dynamic XML sitemaps, OpenGraph metadata, and near-perfect Core Web Vitals.

---

## ⚡ Technical Highlights (Resume Showcase)

### 1. Canvas-Based 60 FPS Scrollytelling Engine
- Built a custom **HTML5 Canvas** rendering pipeline that interpolates scroll position across a 50-frame image sequence.
- Implemented **two-phase priority preloading** and cache management to prevent network congestion while eliminating frame stutter.
- Supports **dynamic DPI scaling** (`window.devicePixelRatio`) with edge-to-edge aspect ratio containment.

### 2. Tailored Heritage Design System (Zero UI Bloat)
- Avoided bulky component libraries in favor of **custom CSS architecture** with fluid typography (`clamp()`), harmonious HSL/HEX color tokens, and native micro-interactions.
- **Bilingual Typography**: Seamless integration of Google Fonts (*Cormorant Garamond*, *Inter*, and *Noto Sans Bengali*) loaded with zero layout shift via `next/font`.

### 3. Business Architecture & Scalability
- Clean separation of concerns with a centralized configuration system (`src/config/business.ts`) and typed data models for products, reviews, and legal licenses.
- Decoupled components and section architecture enabling non-technical stakeholders to update sweet menus, pricing, contact details, and license numbers in seconds.

### 4. SEO & Local Business Optimization
- Comprehensive **LocalBusiness Structured Data (JSON-LD)** embedded for enhanced Google Maps & Knowledge Graph search results.
- Automated `sitemap.xml`, `robots.txt`, dynamic canonical tags, and multi-resolution transparent PWA favicons & touch icons.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Library** | [React 19](https://react.dev/) (Server & Client Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | Custom Vanilla CSS with CSS Variables & Fluid Tokens |
| **Media & Assets** | Next.js Optimized Image Pipeline, High-res WebP/PNG Canvas assets |
| **Deployment** | [Vercel](https://vercel.com/) (Edge Network, CI/CD) |

---

## 📁 Repository Structure

```text
├── public/
│   ├── brand/               # Brand logos, emblem seals, transparent favicons & licenses
│   ├── catalogue/           # High-resolution sweet catalogue photography
│   ├── hero/                # 50-frame pre-rendered scrollytelling image sequence
│   ├── sitemap.xml          # Search engine index sitemap
│   └── robots.txt           # Crawling instructions
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, variables & typography scale
│   │   ├── layout.tsx       # Root layout, metadata, SEO schemas & fonts
│   │   └── page.tsx         # Unified single-page application orchestrator
│   ├── components/
│   │   ├── Navbar.tsx       # Glassmorphism header with scroll-detect & mobile menu
│   │   ├── Footer.tsx       # Business directory, licenses & legal accreditation
│   │   └── ProductCard.tsx  # Product showcase card with category badges
│   ├── config/
│   │   └── business.ts      # Single source of truth for business information
│   ├── data/
│   │   ├── licenses.ts      # FSSAI, MSME & Trade License data
│   │   ├── products.ts      # Categorized sweets menu with pricing & descriptions
│   │   └── reviews.ts       # Verified Google customer testimonials
│   └── sections/
│       ├── Preloader.tsx        # Brand opening sequence with smooth exit transition
│       ├── HeroSequence.tsx     # 50-frame interactive canvas engine
│       ├── HeroHeadline.tsx     # Bengali tagline & heritage branding
│       ├── BrandIntro.tsx       # Editorial history & craftsmanship story
│       ├── ProductCatalogue.tsx # Filterable / categorized sweets showcase
│       ├── OurStory.tsx         # Legacy timeline & values
│       ├── WhyMaaAmbika.tsx     # Quality pillars (chhana purity, hygiene)
│       ├── Celebrations.tsx     # Bulk order & festive gifting flow
│       ├── GoogleReviews.tsx    # Customer trust & rating cards
│       ├── Location.tsx         # Interactive Google Maps embed & shop timings
│       ├── Enquiry.tsx          # Direct WhatsApp inquiry handler
│       ├── Instagram.tsx        # Visual social media grid showcase
│       └── FinalCTA.tsx         # Call-to-action banner
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm** / **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/modak-tamajit/Maa-Ambika-Sweets.git
   cd Maa-Ambika-Sweets
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 💼 Key Features & User Flows

- **Direct WhatsApp Ordering**: One-click communication with pre-populated order parameters.
- **Real-Time Opening Hours & Status**: Live operational status based on Kalna local business hours.
- **Verified Review Matrix**: Dynamic rating breakdown showcasing Google Reviews score.
- **Mobile First & Cross-Browser Tested**: Tested across iOS Safari, Android Chrome, Windows, and macOS with responsive fluid breakpoints.

---

## 👨‍💻 Author & Credits

- **Developer**: Tamajit Modak
- **Client**: Maa Ambika Sweets (Rameswarpur, Kalna, West Bengal)
- **Year**: 2026

*Crafted with precision, authentic taste, and modern web engineering.*
