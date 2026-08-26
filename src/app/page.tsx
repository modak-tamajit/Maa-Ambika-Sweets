'use client';

import React, { useState } from 'react';
import Preloader from '@/sections/Preloader';
import Navbar from '@/components/Navbar';
import HeroSequence from '@/sections/HeroSequence';
import HeroHeadline from '@/sections/HeroHeadline';
import BrandIntro from '@/sections/BrandIntro';
import ProductCatalogue from '@/sections/ProductCatalogue';
import OurStory from '@/sections/OurStory';
import WhyMaaAmbika from '@/sections/WhyMaaAmbika';
import Celebrations from '@/sections/Celebrations';
import GoogleReviews from '@/sections/GoogleReviews';
import Location from '@/sections/Location';
import Enquiry from '@/sections/Enquiry';
import Instagram from '@/sections/Instagram';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [initialFramesReady, setInitialFramesReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      {/* Brand Preloader */}
      {!preloaderDone && (
        <Preloader
          isReady={initialFramesReady}
          onFinish={() => setPreloaderDone(true)}
        />
      )}

      {/* Global Fixed Header */}
      <Navbar />

      {/* Hero Section: 50-frame Scroll-driven Canvas Sequence */}
      <HeroSequence
        onInitialFramesReady={() => setInitialFramesReady(true)}
      />

      {/* Section 1: Hero Headline (সাধ্যের মধ্যে স্বাদ বদল) */}
      <HeroHeadline />

      {/* Section 2: Brand Introduction */}
      <BrandIntro />

      {/* Section 3: Product Catalogue (data-driven) */}
      <ProductCatalogue />

      {/* Section 4: Our Story (Since 2000 in Kalna) */}
      <OurStory />

      {/* Section 5: Why Maa Ambika (Craftsmanship & Purity) */}
      <WhyMaaAmbika />

      {/* Section 6: Celebrations & Bulk Orders */}
      <Celebrations />

      {/* Section 7: Google Reviews */}
      <GoogleReviews />

      {/* Section 8: Location & Interactive Map */}
      <Location />

      {/* Section 9: Direct WhatsApp Enquiry */}
      <Enquiry />

      {/* Section 10: Instagram Showcase */}
      <Instagram />

      {/* Section 11: Final Call to Action */}
      <FinalCTA />

      {/* Footer with Registered & Licensed Compliance details */}
      <Footer />
    </main>
  );
}
