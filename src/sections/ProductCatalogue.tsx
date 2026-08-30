'use client';

import React, { useState, useRef } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductCatalogueOverlay from '@/components/ProductCatalogueOverlay';
import { trackEvent } from '@/utils/analytics';

export default function ProductCatalogue() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const viewAllBtnRef = useRef<HTMLButtonElement>(null);

  const hasProducts = products.length > 0;
  // Slice up to 6 products for the homepage showcase
  const featuredProducts = products.slice(0, 6);

  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
    trackEvent('view_all_products');
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    // Return focus to View All Products button for accessibility
    setTimeout(() => {
      viewAllBtnRef.current?.focus();
    }, 50);
  };

  return (
    <section
      id="catalogue"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream-light)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Daily Selections</span>
          <h2 className="section-title">Traditional Bengali Sweets</h2>
          <p className="section-subtitle">
            Crafted daily using fresh pure milk, artisan chhana, and time-honored recipes.
          </p>
        </div>

        {hasProducts ? (
          <div>
            {/* Curated Grid: Displays 6 items on desktop (≥768px) and 4 items on mobile (<768px) */}
            <div className="homepage-products-grid">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`homepage-product-item ${
                    index >= 4 ? 'product-desktop-only' : ''
                  }`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* View All Products CTA Button */}
            <div className="catalogue-cta-wrapper">
              <button
                ref={viewAllBtnRef}
                type="button"
                onClick={handleOpenOverlay}
                className="btn-view-all-products"
                aria-haspopup="dialog"
                aria-expanded={isOverlayOpen}
                aria-label="View all sweets in full catalogue"
              >
                <span>View All Products</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Reference Image Disclaimer Note */}
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-muted)',
                textAlign: 'center',
                marginTop: '1.25rem',
                opacity: 0.85,
                lineHeight: 1.4,
              }}
            >
              * Images are for illustrative reference only and may differ from the fresh handcrafted sweets.
            </p>
          </div>
        ) : (
          <div
            className="card-base"
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              textAlign: 'center',
              padding: 'clamp(1.5rem, 5vw, 3.5rem)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-gold-muted)',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.35rem',
                color: 'var(--color-maroon)',
                marginBottom: '0.75rem',
              }}
            >
              Fresh Batches Prepared Daily
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--color-text-light)',
                marginBottom: '1rem',
              }}
            >
              Our sweet counter in Rameswarpur, Kalna features daily rotations of traditional chhana sweets,
              syrup delicacies, and curd specialties. Contact us directly or visit our shop to enquire about today&apos;s fresh stock.
            </p>
            <p
              className="bengali-text"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--color-muted)',
                marginBottom: '1.75rem',
              }}
            >
              প্রতিদিন সকাল ও সন্ধ্যায় তৈরি হয় টাটকা মিষ্টি। বিশেষ অর্ডার ও দৈনিক মিষ্টির তালিকা জানতে আমাদের সাথে যোগাযোগ করুন।
            </p>
            <a href="#enquiry" className="btn-primary" style={{ minHeight: '44px' }}>
              Enquire About Availability
            </a>
          </div>
        )}
      </div>

      {/* Interactive Full-screen Catalogue Overlay */}
      <ProductCatalogueOverlay
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </section>
  );
}
