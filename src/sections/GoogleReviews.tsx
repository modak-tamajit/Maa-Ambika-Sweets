import React from 'react';
import { reviews } from '@/data/reviews';
import { BUSINESS } from '@/config/business';

export default function GoogleReviews() {
  const hasReviews = reviews.length > 0;

  return (
    <section
      id="reviews"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                }}
              >
                {/* Stars */}
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
          <div
            className="card-base"
            style={{
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
              textAlign: 'center',
              padding: 'clamp(2rem, 4vw, 3rem)',
              backgroundColor: 'var(--color-cream-light)',
            }}
          >
            <h3
              style={{
                fontSize: '1.35rem',
                color: 'var(--color-maroon)',
                marginBottom: '0.5rem',
              }}
            >
              Verified Google Reviews
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--color-text-light)',
                marginBottom: '1.5rem',
              }}
            >
              We welcome honest feedback from every patron. Visit our official Google Maps listing to view reviews, customer photos, and directions.
            </p>
            <a
              href={BUSINESS.googleMaps.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>View Reviews on Google Maps</span>
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
        )}

        <div style={{ textAlign: 'center' }}>
          <a
            href={BUSINESS.googleMaps.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-muted)',
              textDecoration: 'underline',
              letterSpacing: '0.02em',
            }}
          >
            Leave a review on Google Maps &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
