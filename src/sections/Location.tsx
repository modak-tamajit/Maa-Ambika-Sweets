import React from 'react';
import { BUSINESS } from '@/config/business';

export default function Location() {
  return (
    <section
      id="location"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Find Our Shop</span>
          <h2 className="section-title">Visit Us in Kalna</h2>
          <p className="section-subtitle">
            Conveniently located on Boinchi - Kalna Road in Rameswarpur.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3.5rem)',
            alignItems: 'stretch',
          }}
        >
          {/* Business Details Card */}
          <div
            className="card-base"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.3rem)',
                  fontWeight: 600,
                  color: 'var(--color-maroon)',
                  marginBottom: '0.35rem',
                  lineHeight: 1.2,
                }}
              >
                {BUSINESS.name.english}
              </h3>
              <span
                className="bengali-text"
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
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
                  Address
                </span>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.5,
                  }}
                >
                  {BUSINESS.address.full}
                </p>
              </div>

              {/* Hours block */}
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
                  Opening Hours
                </span>
                {BUSINESS.hours.map((h) => (
                  <p
                    key={h.days}
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-text)',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>{h.days}:</strong> {h.time}
                  </p>
                ))}
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-muted)',
                    display: 'block',
                    marginTop: '0.2rem',
                  }}
                >
                  {BUSINESS.hoursNote}
                </span>
              </div>

              {/* Coordinates info */}
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
                  Geo Location
                </span>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-muted)',
                    fontFamily: 'monospace',
                  }}
                >
                  {BUSINESS.coordinates.lat}° N, {BUSINESS.coordinates.lng}° E
                </p>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <a
                href={BUSINESS.googleMaps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: '1 1 140px', minHeight: '44px' }}
              >
                Get Directions
              </a>
              <a
                href={BUSINESS.googleMaps.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: '1 1 140px', minHeight: '44px' }}
              >
                View Listing
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div
            className="card-base"
            style={{
              padding: 0,
              overflow: 'hidden',
              minHeight: 'clamp(280px, 40vw, 380px)',
              backgroundColor: 'var(--color-cream-dark)',
              border: '1px solid var(--color-border)',
              display: 'flex',
            }}
          >
            <iframe
              title={`Google Map location of ${BUSINESS.name.english}`}
              src={BUSINESS.googleMaps.embedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: 'clamp(280px, 40vw, 380px)',
                width: '100%',
                display: 'block',
                flexGrow: 1,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
