'use client';

import React from 'react';
import { BUSINESS } from '@/config/business';

export default function MobileQuickBar() {
  const cleanWhatsapp = BUSINESS.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Hello ${BUSINESS.name.english}, I would like to enquire about sweets.`
  )}`;

  return (
    <aside
      aria-label="Quick Contact and Directions Actions"
      className="mobile-quick-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 85,
        backgroundColor: 'var(--color-maroon-dark)',
        borderTop: '1px solid rgba(214, 166, 100, 0.3)',
        boxShadow: '0 -4px 20px rgba(20, 4, 5, 0.45)',
        paddingTop: '0.5rem',
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '0.5rem',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        {/* 1. Call Shop */}
        <a
          href={`tel:${BUSINESS.phone}`}
          aria-label={`Call ${BUSINESS.name.english} at ${BUSINESS.phone}`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            padding: '0.35rem 0.25rem',
            color: '#FAF4E5',
            textDecoration: 'none',
            borderRadius: 'var(--radius-sm)',
            transition: 'background-color var(--transition-fast)',
            touchAction: 'manipulation',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ marginBottom: '0.2rem' }}
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.02em' }}>
            Call Shop
          </span>
        </a>

        {/* 2. WhatsApp (Highlighted Action) */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Maa Ambika Sweets on WhatsApp"
          style={{
            flex: 1.2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            minHeight: '44px',
            padding: '0.45rem 0.65rem',
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-maroon-dark)',
            textDecoration: 'none',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
            touchAction: 'manipulation',
          }}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.02em' }}>
            WhatsApp
          </span>
        </a>

        {/* 3. Directions */}
        <a
          href={BUSINESS.googleMaps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get Google Maps directions to ${BUSINESS.name.english} in Kalna`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            padding: '0.35rem 0.25rem',
            color: '#FAF4E5',
            textDecoration: 'none',
            borderRadius: 'var(--radius-sm)',
            transition: 'background-color var(--transition-fast)',
            touchAction: 'manipulation',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ marginBottom: '0.2rem' }}
          >
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.02em' }}>
            Directions
          </span>
        </a>
      </div>

      <style jsx>{`
        @media (min-width: 769px) {
          .mobile-quick-bar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
