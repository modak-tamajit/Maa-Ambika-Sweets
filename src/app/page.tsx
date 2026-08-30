'use client';

import React, { useState, useEffect } from 'react';
import Preloader from '@/sections/Preloader';
import Navbar from '@/components/Navbar';
import HeroSequence from '@/sections/HeroSequence';
import HeroHeadline from '@/sections/HeroHeadline';
import BrandIntro from '@/sections/BrandIntro';
import OurStory from '@/sections/OurStory';
import ProductCatalogue from '@/sections/ProductCatalogue';
import OccasionDiscovery from '@/sections/OccasionDiscovery';
import GIHeritage from '@/sections/GIHeritage';
import Celebrations from '@/sections/Celebrations';
import BulkEnquiry from '@/sections/BulkEnquiry';
import WhyMaaAmbika from '@/sections/WhyMaaAmbika';
import GoogleReviews from '@/sections/GoogleReviews';
import FAQ from '@/sections/FAQ';
import Location from '@/sections/Location';
import Instagram from '@/sections/Instagram';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/components/Footer';
import { faqs } from '@/data/faq';

export default function HomePage() {
  const [initialFramesReady, setInitialFramesReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Ensure page always starts at the top upon refresh / reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Synchronized FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.questionEnglish,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerEnglish,
      },
    })),
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Brand Preloader */}
      {!preloaderDone && (
        <Preloader
          isReady={initialFramesReady}
          onFinish={() => setPreloaderDone(true)}
        />
      )}

      {/* Global Fixed Header */}
      <Navbar />

      {/* 1. Hero Section: 250-frame Scroll-driven Canvas Sequence */}
      <HeroSequence
        onInitialFramesReady={() => setInitialFramesReady(true)}
      />

      {/* 2. Hero Headline (সাধ্যের মধ্যে স্বাদ বদল) */}
      <HeroHeadline />

      {/* 3. Brand Introduction (A Tradition of Pure Taste) */}
      <BrandIntro />

      {/* 4. Our Story (Rooted in Kalna Since 2000) */}
      <OurStory />

      {/* 5. Product Catalogue (Core Sweets Showcase) */}
      <ProductCatalogue />

      {/* 6. Occasion-Based Sweet Discovery */}
      <OccasionDiscovery />

      {/* 7. GI Heritage (Banglar Rasogolla Legacy) */}
      <GIHeritage />

      {/* 8. Celebrations (Weddings, Pujas & Milestones Gallery) */}
      <Celebrations />

      {/* 9. Bulk Order & Celebration Enquiry Helper */}
      <BulkEnquiry />

      {/* 10. Why Maa Ambika (Craftsmanship & Purity Standards) */}
      <WhyMaaAmbika />

      {/* 11. Google Reviews */}
      <GoogleReviews />

      {/* 12. Frequently Asked Questions Accordion */}
      <FAQ />

      {/* 13. Location & Directions */}
      <Location />

      {/* 14. Instagram Showcase */}
      <Instagram />

      {/* 15. Final Call to Action */}
      <FinalCTA />

      {/* 16. Footer with Registered Compliance */}
      <Footer />
    </main>
  );
}
