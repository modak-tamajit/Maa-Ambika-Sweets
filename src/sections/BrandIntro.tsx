import React from 'react';
import { BUSINESS } from '@/config/business';

export default function BrandIntro() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <span className="section-tag">Authentic Bengali Confectionery</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              marginBottom: '1.5rem',
              color: 'var(--color-maroon)',
              fontWeight: 500,
            }}
          >
            A Tradition of Pure Taste & Everyday Sweetness
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'var(--color-text-light)',
              marginBottom: '1.75rem',
            }}
          >
            Established in <strong>{BUSINESS.established}</strong> in Rameswarpur, Kalna,{' '}
            <strong>{BUSINESS.name.english}</strong> brings the timeless heritage of Bengali
            sweetmaking to your table. From delicate chhana sweets to rich festival delicacies,
            every recipe is prepared with meticulous care, uncompromising hygiene, and pure ingredients.
          </p>

          <p
            className="bengali-text"
            style={{
              fontSize: 'clamp(1.05rem, 1.2vw, 1.15rem)',
              lineHeight: 1.8,
              color: 'var(--color-muted)',
              marginBottom: '2.5rem',
            }}
          >
            আমাদের প্রতিটি মিষ্টি তৈরি হয় টাটকা ছানা, নিখুঁত মাপ এবং সাধ্যের মধ্যে সেরা স্বাদের প্রতিশ্রুতি দিয়ে।
            দৈনন্দিন আনন্দ কিংবা পারিবারিক উৎসব—মিষ্টিমুখে আমরা আপনার পাশে।
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a href="#catalogue" className="btn-primary">
              Explore Our Sweets
            </a>
            <a href="#enquiry" className="btn-secondary">
              Contact Shop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
