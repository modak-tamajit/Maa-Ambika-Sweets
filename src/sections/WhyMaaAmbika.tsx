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
      id="why-ambika"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-maroon)',
        color: 'var(--color-cream)',
        borderTop: '1px solid rgba(214, 166, 100, 0.2)',
        borderBottom: '1px solid rgba(214, 166, 100, 0.2)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{ color: 'var(--color-gold)' }}
          >
            The Ambika Standard
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              color: '#FAF4E5',
              fontWeight: 500,
              marginBottom: '0.75rem',
            }}
          >
            Why Patrons Choose Us
          </h2>
          <p
            style={{
              color: 'rgba(250, 244, 229, 0.85)',
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
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
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'rgba(42, 14, 16, 0.65)',
                border: '1px solid rgba(214, 166, 100, 0.22)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                transition: 'border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(214, 166, 100, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(214, 166, 100, 0.22)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: 'var(--color-gold)',
                  marginBottom: '0.75rem',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {reason.number}
              </span>
              <h3
                style={{
                  fontSize: '1.25rem',
                  color: '#FAF4E5',
                  marginBottom: '0.25rem',
                  fontWeight: 500,
                }}
              >
                {reason.title}
              </h3>
              <span
                className="bengali-text"
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  color: '#E8D4B0',
                  opacity: 0.95,
                  marginBottom: '0.9rem',
                }}
              >
                {reason.bengali}
              </span>
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'rgba(250, 244, 229, 0.8)',
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
