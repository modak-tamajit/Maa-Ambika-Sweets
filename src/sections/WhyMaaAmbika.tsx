import React from 'react';

const reasons = [
  {
    number: '01',
    title: 'Daily Fresh Preparation',
    bengali: 'প্রতিদিন টাটকা তৈরি',
    description:
      'We prepare our sweets in controlled, fresh batches every morning and afternoon to ensure optimum texture, aroma, and moisture.',
  },
  {
    number: '02',
    title: 'Artisanal Chhana Quality',
    bengali: 'খাঁটি ছানার গুণমান',
    description:
      'Authentic Bengali sweets depend entirely on the softness of chhana. We use traditional curdling methods without synthetic additives.',
  },
  {
    number: '03',
    title: 'Thoughtful Sweetness Balance',
    bengali: 'পরিমিত মিষ্টির ভারসাম্য',
    description:
      'Our recipes emphasize the natural richness of milk and chhana, avoiding overpowering sugar syrup to let genuine flavors shine.',
  },
  {
    number: '04',
    title: 'Warm Community Hospitality',
    bengali: 'আন্তরিক গ্রাহক সেবা',
    description:
      'For over twenty years in Kalna, every customer is received with respect, personalized recommendations, and dependable service.',
  },
];

export default function WhyMaaAmbika() {
  return (
    <section
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">The Ambika Standard</span>
          <h2 className="section-title">Why Patrons Choose Us</h2>
          <p className="section-subtitle">
            Uncompromising principles of quality, hygiene, and authentic Bengali confection.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2.25rem)',
          }}
        >
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="card-base"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'var(--color-cream-light)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-muted)',
                  marginBottom: '0.75rem',
                  display: 'block',
                }}
              >
                {reason.number}
              </span>
              <h3
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--color-maroon)',
                  marginBottom: '0.25rem',
                }}
              >
                {reason.title}
              </h3>
              <span
                className="bengali-text"
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: 'var(--color-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                {reason.bengali}
              </span>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--color-text-light)',
                  marginTop: 'auto',
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
