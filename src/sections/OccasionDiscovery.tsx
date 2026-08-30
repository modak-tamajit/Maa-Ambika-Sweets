'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products, Product } from '@/data/products';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

interface OccasionCategory {
  id: string;
  title: string;
  bengali: string;
  tagline: string;
  image: string;
}

const occasionCategories: OccasionCategory[] = [
  {
    id: 'wedding',
    title: 'Wedding',
    bengali: 'বিবাহ ও প্রীতিভোজ',
    tagline: 'For Biye, Bou Bhat & wedding celebrations',
    image: '/icons/occasions/wedding.png',
  },
  {
    id: 'annaprashan',
    title: 'Annaprashan',
    bengali: 'অন্নপ্রাশন',
    tagline: "Traditional sweets for a baby's first celebration",
    image: '/icons/occasions/annaprashan.png',
  },
  {
    id: 'durga-puja',
    title: 'Durga Puja',
    bengali: 'পূজা ও উৎসব',
    tagline: 'For Bhog, Dashami & family gatherings',
    image: '/icons/occasions/durga-puja.png',
  },
  {
    id: 'birthday',
    title: 'Birthday',
    bengali: 'শুভ জন্মদিন',
    tagline: 'Sweet treats for birthdays and celebrations',
    image: '/icons/occasions/birthday.png',
  },
  {
    id: 'festivals',
    title: 'Festivals',
    bengali: 'ঋতুভিত্তিক উৎসব',
    tagline: 'Seasonal Bengali favourites',
    image: '/icons/occasions/festivals.png',
  },
];

export default function OccasionDiscovery() {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('wedding');

  const activeCategory = occasionCategories.find((c) => c.id === selectedOccasion) || occasionCategories[0];

  // Dynamically derive recommended sweets from central products.ts dataset
  const recommendedProducts: Product[] = products.filter((p) =>
    p.occasionTags?.includes(selectedOccasion)
  );

  const handleSelectOccasion = (id: string, name: string) => {
    setSelectedOccasion(id);
    trackEvent('occasion_selected', { occasion: id, occasion_name: name });
  };

  const generalOccasionWhatsAppUrl = buildWhatsAppUrl(
    buildWhatsAppMessage({
      occasion: activeCategory.title,
    })
  );

  return (
    <section
      id="occasions"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Curated Collections</span>
          <h2 className="section-title">Looking for something special?</h2>
          <p className="section-subtitle">
            Find sweets that make your occasion a little more memorable.
          </p>
        </div>

        {/* 5 Selectable Occasion Cards */}
        <div
          className="occasion-cards-container"
          role="tablist"
          aria-label="Occasion recommendations"
        >
          {occasionCategories.map((occ) => {
            const isSelected = selectedOccasion === occ.id;
            return (
              <button
                key={occ.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectOccasion(occ.id, occ.title)}
                className={`card-base occasion-tab-card ${isSelected ? 'active' : ''}`}
              >
                {/* Traditional Motif Illustration */}
                <div
                  style={{
                    position: 'relative',
                    width: '52px',
                    height: '52px',
                    marginBottom: '0.65rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={occ.image}
                    alt={occ.title}
                    fill
                    sizes="52px"
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    color: isSelected ? 'var(--color-maroon)' : 'var(--color-text)',
                    marginBottom: '0.18rem',
                    lineHeight: 1.2,
                  }}
                >
                  {occ.title}
                </h3>
                <span
                  className="bengali-text"
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--color-muted)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {occ.bengali}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    lineHeight: 1.3,
                    color: 'var(--color-text-light)',
                    opacity: 0.85,
                  }}
                >
                  {occ.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Recommended Sweets Grid */}
        <div style={{ marginTop: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                  color: 'var(--color-maroon)',
                }}
              >
                Recommended for {activeCategory.title}
              </h3>
              <span className="bengali-text" style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                {activeCategory.bengali} স্পেশাল মিষ্টি
              </span>
            </div>
            <a
              href={generalOccasionWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_clicked', { source: 'occasion_header', occasion: activeCategory.id })}
              style={{
                fontSize: '0.88rem',
                color: 'var(--color-gold-muted)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>Custom occasion order on WhatsApp</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {recommendedProducts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: 'clamp(1.25rem, 3vw, 2rem)',
              }}
            >
              {recommendedProducts.map((product) => {
                const productWhatsAppUrl = buildWhatsAppUrl(
                  buildWhatsAppMessage({
                    occasion: activeCategory.title,
                    productName: product.nameEnglish,
                  })
                );

                return (
                  <div
                    key={product.id}
                    className="card-base product-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      padding: '0',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 11',
                        backgroundColor: 'var(--color-cream-dark)',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={`/catalogue/${product.image}`}
                        alt={`${product.nameEnglish} - ${product.nameBengali}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      {product.category && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '0.75rem',
                            left: '0.75rem',
                            backgroundColor: 'rgba(245, 240, 232, 0.92)',
                            color: 'var(--color-maroon)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          {product.category}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                      }}
                    >
                      <div style={{ marginBottom: '0.5rem' }}>
                        <h4
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: 'var(--color-maroon)',
                            marginBottom: '0.15rem',
                            lineHeight: 1.25,
                          }}
                        >
                          {product.nameEnglish}
                        </h4>
                        <span
                          className="bengali-text"
                          style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            color: 'var(--color-muted)',
                          }}
                        >
                          {product.nameBengali}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.5,
                          color: 'var(--color-text-light)',
                          marginBottom: '1rem',
                        }}
                      >
                        {product.descriptionEnglish}
                      </p>

                      <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <a
                          href={productWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent('whatsapp_clicked', {
                              source: 'occasion_product_card',
                              product: product.id,
                              occasion: activeCategory.id,
                            })
                          }
                          className="btn-card-enquire"
                          aria-label={`Enquire about ${product.nameEnglish} for ${activeCategory.title} on WhatsApp`}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                          <span>Enquire for {activeCategory.title}</span>
                          <span className="arrow-icon" aria-hidden="true">
                            →
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="card-base"
              style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-light)',
                  marginBottom: '1.25rem',
                }}
              >
                We&apos;d be happy to help you choose sweets for your {activeCategory.title}.
              </p>
              <a
                href={generalOccasionWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_clicked', { source: 'occasion_empty_state', occasion: activeCategory.id })
                }
                className="btn-primary"
                style={{ minHeight: '44px' }}
              >
                Enquire on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
