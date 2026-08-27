import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/config/business';
import { licenses } from '@/data/licenses';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-cream)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {/* Column 1: Brand identity */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.6rem, 2vw, 0.85rem)',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(64px, 14vw, 88px)',
                  height: 'clamp(64px, 14vw, 88px)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/brand/logo.png"
                  alt={BUSINESS.name.english}
                  fill
                  sizes="(max-width: 640px) 68px, 88px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.35rem, 3.5vw, 1.65rem)',
                    fontWeight: 600,
                    color: 'var(--color-maroon)',
                    lineHeight: 1.1,
                  }}
                >
                  {BUSINESS.name.english}
                </span>
                <span
                  className="bengali-text"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
                    color: 'var(--color-muted)',
                    lineHeight: 1.1,
                    marginTop: '0.15rem',
                  }}
                >
                  {BUSINESS.name.bengali}
                </span>
              </div>
            </div>

            <p
              className="bengali-text"
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-maroon)',
                fontWeight: 500,
                marginBottom: '0.5rem',
              }}
            >
              {BUSINESS.tagline.bengali}
            </p>

            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--color-text-light)',
                marginBottom: '1rem',
              }}
            >
              Traditional Bengali sweets hand-crafted in Kalna, Purba Bardhaman with pure ingredients and heritage recipes since {BUSINESS.established}.
            </p>

            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-muted)',
              }}
            >
              Established {BUSINESS.established}
            </span>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--color-maroon)',
                marginBottom: '1.25rem',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Our Story', href: '#story' },
                { label: 'Sweet Catalogue', href: '#catalogue' },
                { label: 'Celebrations & Bulk', href: '#celebrations' },
                { label: 'Shop Location', href: '#location' },
                { label: 'Send Enquiry', href: '#enquiry' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--color-text-light)',
                      transition: 'color var(--transition-fast)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: '36px',
                      padding: '0.25rem 0',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-maroon)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-light)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--color-maroon)',
                marginBottom: '1.25rem',
              }}
            >
              Contact & Hours
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'block' }}>Address</span>
                <p style={{ color: 'var(--color-text-light)', lineHeight: 1.4 }}>
                  {BUSINESS.address.street}, {BUSINESS.address.locality}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.pincode}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'block' }}>Phone / WhatsApp</span>
                <p style={{ color: 'var(--color-text)' }}>
                  <a href={`tel:${BUSINESS.phone}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{BUSINESS.phone}</a>
                  {' / '}
                  <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>{BUSINESS.whatsapp}</a>
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'block' }}>Hours</span>
                <p style={{ color: 'var(--color-text-light)' }}>
                  8:00 AM – 10:00 PM (Daily)
                </p>
              </div>

              <div style={{ marginTop: '0.25rem' }}>
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-maroon)',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    minHeight: '44px',
                  }}
                >
                  <span>Follow on Instagram</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Registered & Licensed Section — Trust & Compliance */}
        <div
          style={{
            paddingTop: '2rem',
            paddingBottom: '2rem',
            borderTop: '1px solid var(--color-border-subtle)',
            borderBottom: '1px solid var(--color-border-subtle)',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold-muted)',
              marginBottom: '1.25rem',
              textAlign: 'center',
            }}
          >
            Registered & Licensed Business
          </span>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            {licenses.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  width: '100%',
                }}
              >
                {/* Official Transparent Logo - Responsive & Crisp */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: item.id === 'trade' ? '85px' : item.id === 'msme' ? '210px' : '180px',
                    height: item.id === 'trade' ? '100px' : item.id === 'msme' ? '90px' : '80px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Image
                    src={item.logo}
                    alt={`${item.authority} Official Emblem`}
                    fill
                    sizes="(max-width: 768px) 160px, 220px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--color-maroon)',
                    lineHeight: 1.15,
                  }}
                >
                  {item.authority}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  {item.subtitle}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    color: 'var(--color-text-light)',
                    fontFamily: 'monospace',
                    letterSpacing: '0.04em',
                    marginTop: '0.15rem',
                  }}
                >
                  {item.registrationNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.82rem',
            color: 'var(--color-muted)',
          }}
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0 }}>
            &copy; {currentYear} {BUSINESS.name.english} ({BUSINESS.name.bengali}). All rights reserved.
          </p>

          <p style={{ fontSize: '0.82rem', color: 'var(--color-muted)', margin: 0 }}>
            Serving authentic sweetness since {BUSINESS.established} &bull; Kalna, West Bengal
          </p>
        </div>
      </div>
    </footer>
  );
}
