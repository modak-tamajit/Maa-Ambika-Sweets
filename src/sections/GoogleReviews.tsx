'use client';

import React from 'react';
import { reviews } from '@/data/reviews';
import { BUSINESS } from '@/config/business';
import { trackEvent } from '@/utils/analytics';

export default function GoogleReviews() {
  const hasReviews = reviews.length > 0;

  return (
    <section
      id="reviews"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Patron Experiences</span>
          <h2 className="section-title">Customer Feedback</h2>
          <p className="section-subtitle">
            Authentic words and ratings from visitors to our Rameswarpur, Kalna shop.
          </p>
        </div>

        {hasReviews ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(1.25rem, 2.5vw, 2rem)',
              marginBottom: '2.5rem',
            }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="card-base"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-cream-light)',
                  height: '100%',
                  border: '1px solid rgba(88, 21, 15, 0.14)',
                }}
              >
                {/* Star rating */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    marginBottom: '0.85rem',
                    color: '#E7711B', // Google Review gold-orange star color
                  }}
                  aria-label={`${rev.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={i < rev.rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text)',
                    fontStyle: 'italic',
                    marginBottom: '1.25rem',
                    flexGrow: 1,
                  }}
                >
                  &ldquo;{rev.text}&rdquo;
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                    marginTop: 'auto',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'var(--color-maroon)',
                    }}
                  >
                    {rev.authorName}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {rev.relativeTimeDescription}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Zero-Fabrication Fallback State */
          <div
            className="card-base"
            style={{
              textAlign: 'center',
              padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem',
              backgroundColor: 'var(--color-cream-light)',
              maxWidth: '680px',
              margin: '0 auto 2rem',
              border: '1px solid rgba(214, 166, 100, 0.4)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                color: '#E7711B',
                marginBottom: '1rem',
              }}
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                color: 'var(--color-maroon)',
                marginBottom: '0.5rem',
              }}
            >
              See what our customers say
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-light)',
                maxWidth: '480px',
                margin: '0 auto 1.5rem',
                lineHeight: 1.6,
              }}
            >
              We take pride in our everyday sweetcraft in Kalna. Read genuine customer ratings and experiences directly on our Google Maps profile.
            </p>

            <a
              href={BUSINESS.googleMaps.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('google_reviews_clicked', { source: 'empty_state_fallback' })}
              className="btn-primary"
              style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              <span>Read Our Latest Reviews on Google</span>
            </a>
          </div>
        )}

        {hasReviews && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a
              href={BUSINESS.googleMaps.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('google_reviews_clicked', { source: 'reviews_list_footer' })}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
              }}
            >
              <span>See All Reviews on Google</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
