import React from 'react';

const occasions = [
  {
    title: 'Weddings & Receptions',
    bengali: 'বিবাহ ও শুভ অনুষ্ঠান',
    description:
      'Customized sweet platters, traditional curd pots, and curated gift boxes designed for wedding banquets and guest hospitality.',
  },
  {
    title: 'Pujas & Festive Gatherings',
    bengali: 'পূজা ও উৎসবের মিষ্টি',
    description:
      'Special festive preparations for Durga Puja, Kali Puja, Bhai Dooj, and Diwali with dedicated early-morning bulk order fulfillment.',
  },
  {
    title: 'Family Milestones',
    bengali: 'পারিবারিক শুভ মুহূর্ত',
    description:
      'From Annaprashan and birthdays to housewarmings, we package assorted fresh sweets tailored to your celebration size.',
  },
];

export default function Celebrations() {
  return (
    <section
      id="celebrations"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Festive & Special Occasions</span>
          <h2 className="section-title">Sweetening Life&apos;s Milestones</h2>
          <p className="section-subtitle">
            Celebrate weddings, festivals, and auspicious ceremonies with handcrafted bulk confection.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.25rem)',
            marginBottom: '3rem',
          }}
        >
          {occasions.map((item) => (
            <div
              key={item.title}
              className="card-base"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.35rem',
                  color: 'var(--color-maroon)',
                  marginBottom: '0.2rem',
                }}
              >
                {item.title}
              </h3>
              <span
                className="bengali-text"
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  color: 'var(--color-muted)',
                  marginBottom: '1rem',
                }}
              >
                {item.bengali}
              </span>
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--color-text-light)',
                  marginTop: 'auto',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-light)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-maroon)',
              marginBottom: '0.75rem',
            }}
          >
            Planning a Bulk or Festive Order?
          </h3>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: 'var(--color-text-light)',
              marginBottom: '1.5rem',
            }}
          >
            We recommend placing celebratory and bulk sweet orders 24–48 hours in advance so our confectioners can prepare your custom batch at peak freshness.
          </p>
          <a href="#enquiry" className="btn-primary">
            Request Bulk Quotation
          </a>
        </div>
      </div>
    </section>
  );
}
