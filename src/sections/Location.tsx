'use client';

import React from 'react';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/utils/analytics';
import { buildWhatsAppMessage, buildWhatsAppUrl, getTelephoneUrl } from '@/utils/whatsapp';

export default function Location() {
  const whatsAppUrl = buildWhatsAppUrl(
    buildWhatsAppMessage({
      customNote: 'I am planning to visit the shop in Kalna and have an enquiry.',
    })
  );
  const telephoneUrl = getTelephoneUrl();

  return (
    <section
      id="location"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Find Our Shop</span>
          <h2 className="section-title">Visit Maa Ambika Sweets</h2>
          <p className="section-subtitle">
            In the heart of Kalna. Easy to find. Easy to visit. Come by for freshly prepared Bengali sweets.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'stretch',
          }}
        >
          {/* Business Details & Visiting Information Card */}
          <div
            className="card-base"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-cream-light)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              border: '1px solid rgba(214, 166, 100, 0.45)',
              boxShadow: '0 6px 30px rgba(42, 14, 16, 0.06)',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                  fontWeight: 600,
                  color: 'var(--color-maroon)',
                  marginBottom: '0.25rem',
                  lineHeight: 1.2,
                }}
              >
                {BUSINESS.name.english}
              </h3>
              <span
                className="bengali-text"
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                  fontWeight: 500,
                  color: 'var(--color-muted)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.3,
                }}
              >
                {BUSINESS.name.bengali}
              </span>

              {/* Address block */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-gold-muted)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Shop Address
                </span>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.55,
                  }}
                >
                  {BUSINESS.address.full}
                </p>
              </div>

              {/* How to Reach Us / Region */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-gold-muted)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Area & Landmark
                </span>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.55,
                  }}
                >
                  Located along {BUSINESS.address.street} in {BUSINESS.address.locality}, {BUSINESS.address.city}, {BUSINESS.address.district}, {BUSINESS.address.state} — {BUSINESS.address.pincode}.
                </p>
              </div>

              {/* Hours block */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-gold-muted)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Opening Hours
                </span>
                {BUSINESS.hours.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.92rem',
                      color: 'var(--color-text)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    <span>{h.days}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-maroon)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
                gap: '0.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <a
                href={BUSINESS.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('directions_clicked', { source: 'location_card' })}
                className="btn-primary"
                style={{
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.9rem',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Get Directions</span>
              </a>

              <a
                href={telephoneUrl}
                onClick={() => trackEvent('phone_clicked', { source: 'location_card' })}
                className="btn-primary"
                style={{
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.9rem',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Shop</span>
              </a>
            </div>
          </div>

          {/* Google Maps Embed / Interactive Directions View */}
          <div
            className="card-base"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--color-cream-light)',
              minHeight: '340px',
              border: '1px solid rgba(214, 166, 100, 0.45)',
              boxShadow: '0 6px 30px rgba(42, 14, 16, 0.06)',
            }}
          >
            {BUSINESS.googleMaps.embedUrl ? (
              <iframe
                title="Maa Ambika Sweets Location on Google Maps"
                src={BUSINESS.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{
                  border: '0',
                  minHeight: '340px',
                  flexGrow: 1,
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2.5rem',
                  textAlign: 'center',
                  flexGrow: 1,
                  backgroundColor: 'var(--color-cream-light)',
                }}
              >
                <p style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>
                  {BUSINESS.address.full}
                </p>
                <a
                  href={BUSINESS.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open in Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
