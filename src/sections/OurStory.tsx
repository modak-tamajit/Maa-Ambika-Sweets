import React from 'react';
import { BUSINESS } from '@/config/business';

export default function OurStory() {
  return (
    <section
      id="story"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Story Editorial */}
          <div>
            <span className="section-tag">Our Roots & Heritage</span>
            <h2
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.8rem)',
                color: 'var(--color-maroon)',
                marginBottom: '1.25rem',
              }}
            >
              Rooted in Kalna Since {BUSINESS.established}
            </h2>

            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--color-text-light)',
                marginBottom: '1.25rem',
              }}
            >
              When <strong>{BUSINESS.name.english}</strong> opened its doors in Rameswarpur in the year{' '}
              <strong>{BUSINESS.established}</strong>, the vision was simple: to bring genuine, artisanal
              Bengali sweets to the local community at prices that make everyday enjoyment effortless.
            </p>

            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--color-text-light)',
                marginBottom: '1.5rem',
              }}
            >
              Over the decades, we have remained true to the classic confectionery techniques of Bengal.
              Every batch of chhana is kneaded by hand, sugar syrups are balanced with subtlety, and no
              artificial shortcuts compromise the clean, wholesome taste our patrons trust.
            </p>

            <div
              style={{
                paddingLeft: '1.25rem',
                borderLeft: '3px solid var(--color-gold)',
                marginTop: '1.5rem',
              }}
            >
              <p
                className="bengali-text"
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  fontWeight: 500,
                  color: 'var(--color-maroon)',
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{BUSINESS.tagline.bengali}&rdquo; — এটি কেবল একটি কথা নয়, আমাদের দুই দশকের পথচলার মূল মন্ত্র।
              </p>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div className="card-base">
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Purity
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-maroon)' }}>
                Pure Milk & Fresh Chhana
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Locally sourced dairy transformed daily into soft chhana, ensuring the delicate texture that defines authentic Bengali sweets.
              </p>
            </div>

            <div className="card-base">
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Consistency
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-maroon)' }}>
                Two Decades of Craftsmanship
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Serving the people of Kalna and surrounding Purba Bardhaman with unwavering commitment to taste and hospitality since 2000.
              </p>
            </div>

            <div className="card-base">
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                Accessibility
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-maroon)' }}>
                Honest, Approachable Value
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Premium quality confection crafted so that families can celebrate both everyday moments and major milestones without hesitation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
