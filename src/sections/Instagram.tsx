import React from 'react';
import { BUSINESS } from '@/config/business';

export default function Instagram() {
  return (
    <section
      id="instagram"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Follow Our Confectionery</span>
          <h2 className="section-title">Join Us on Instagram</h2>
          <p className="section-subtitle">
            Stay updated with daily sweet specials, festival announcements, and behind-the-counter craftsmanship.
          </p>
        </div>

        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            className="card-base"
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                margin: '0 auto 1.25rem',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-maroon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>

            <h3
              style={{
                fontSize: '1.4rem',
                color: 'var(--color-maroon)',
                marginBottom: '0.5rem',
              }}
            >
              @{BUSINESS.instagramHandle}
            </h3>

            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--color-text-light)',
                marginBottom: '1.75rem',
              }}
            >
              Follow our page for daily festival updates, seasonal sweet releases, and glimpse of traditional sweetmaking in Kalna.
            </p>

            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>Visit Instagram Profile</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
