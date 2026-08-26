import React from 'react';
import { BUSINESS } from '@/config/business';

export default function HeroHeadline() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-cream)',
        paddingTop: 'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div
        className="container"
        style={{
          textAlign: 'center',
          maxWidth: '840px',
          margin: '0 auto',
        }}
      >
        {/* Bengali Tagline */}
        <h1
          className="bengali-text"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 600,
            color: 'var(--color-maroon)',
            marginBottom: '1rem',
            lineHeight: 1.2,
            letterSpacing: '0.01em',
          }}
        >
          {BUSINESS.tagline.bengali}
        </h1>

        {/* English Headline */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            fontStyle: 'italic',
            color: 'var(--color-text)',
            marginBottom: '1.25rem',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          {BUSINESS.tagline.english}
        </p>

        {/* Established badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.35rem 1.25rem',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            marginTop: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--color-gold-muted)',
            }}
          >
            Since {BUSINESS.established}
          </span>
        </div>
      </div>
    </section>
  );
}
