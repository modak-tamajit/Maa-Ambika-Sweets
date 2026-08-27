import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductCatalogue() {
  const hasProducts = products.length > 0;

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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
    </section>
  );
}
