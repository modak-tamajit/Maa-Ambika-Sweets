import React from 'react';
import Image from 'next/image';
import { BUSINESS } from '@/config/business';

export default function FinalCTA() {
  const cleanNumber = BUSINESS.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section
      style={{
        backgroundColor: 'var(--color-maroon)',
        color: 'var(--color-cream)',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Supplied Brand Logo - Prominent & Crisp (Enlarged) */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(150px, 22vw, 190px)',
              height: 'clamp(150px, 22vw, 190px)',
              marginBottom: '1.75rem',
            }}
          >
            <Image
              src="/brand/logo.png"
              alt={BUSINESS.name.english}
              fill
              sizes="(max-width: 768px) 150px, 190px"
              style={{ objectFit: 'contain' }}
            />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              color: 'var(--color-cream)',
              marginBottom: '0.5rem',
              fontWeight: 500,
            }}
          >
            Experience Authentic Bengali Sweetness
          </h2>

          <p
            className="bengali-text"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
              color: 'var(--color-gold)',
              marginBottom: '1.5rem',
            }}
          >
            {BUSINESS.tagline.bengali}
          </p>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--color-cream-light)',
              maxWidth: '560px',
              marginBottom: '2.25rem',
              opacity: 0.9,
            }}
          >
            Whether you are picking up daily desserts for family or planning bulk sweets for an auspicious celebration in Kalna, we are delighted to serve you.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hello ${BUSINESS.name.english}, I would like to enquire about sweets.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-maroon)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>Enquire on WhatsApp</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>

            <a
              href="#location"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.9rem 1.75rem',
                backgroundColor: 'transparent',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(245, 240, 232, 0.4)',
                transition: 'all var(--transition-fast)',
              }}
            >
              View Shop Location
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
