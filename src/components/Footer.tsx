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
        backgroundColor: 'var(--color-maroon-dark)',
        color: '#E8D8C0',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        borderTop: '1px solid rgba(214, 166, 100, 0.2)',
      }}
    >
      <div className="container">
        {/* Compliance & Registration Badges */}
        <div
          style={{
            paddingBottom: '2.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(214, 166, 100, 0.15)',
          }}
        >
          <span
            style={{
              display: 'block',
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold)',
              marginBottom: '1.25rem',
              opacity: 0.9,
            }}
          >
            Registered &amp; Licensed Enterprise
          </span>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: 'clamp(1rem, 2.5vw, 1.75rem)',
              alignItems: 'stretch',
            }}
          >
            {licenses.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '1rem 0.85rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.22)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(214, 166, 100, 0.15)',
                  minWidth: 0,
                }}
              >
                {/* Official Compliance Logo */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: item.id === 'trade' ? '85px' : item.id === 'msme' ? '210px' : '180px',
                    height: '42px',
                    marginBottom: '0.65rem',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.logo}
                    alt={`${item.authority} Official Emblem`}
                    fill
                    sizes="220px"
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-gold)',
                    lineHeight: 1.25,
                    marginBottom: '0.2rem',
                  }}
                >
                  {item.authority}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#C4B098',
                    lineHeight: 1.35,
                    marginBottom: '0.35rem',
                  }}
                >
                  {item.subtitle}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#9C8874',
                    fontFamily: 'monospace',
                    letterSpacing: '0.02em',
                    marginTop: 'auto',
                    wordBreak: 'break-word',
                  }}
                >
                  {item.registrationNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            paddingBottom: '2.5rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/brand/logo.png"
                  alt={BUSINESS.name.english}
                  fill
                  sizes="48px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--color-gold)',
                    lineHeight: 1.15,
                  }}
                >
                  {BUSINESS.name.english}
                </span>
                <span
                  className="bengali-text"
                  style={{
                    display: 'block',
                    fontSize: '0.88rem',
                    color: '#E8D4B0',
                    lineHeight: 1.15,
                    marginTop: '0.1rem',
                  }}
                >
                  {BUSINESS.name.bengali}
                </span>
              </div>
            </div>

            <p
              className="bengali-text"
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-gold)',
                fontStyle: 'italic',
                marginBottom: '0.65rem',
              }}
            >
              &ldquo;{BUSINESS.tagline.bengali}&rdquo;
            </p>
            <p
              style={{
                fontSize: '0.88rem',
                color: '#C4B098',
                lineHeight: 1.6,
              }}
            >
              Dedicated to pure, authentic Bengali sweets crafted fresh in Rameswarpur, Kalna since {BUSINESS.established}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-gold)',
                marginBottom: '1rem',
              }}
            >
              Navigation
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <Link href="#hero" style={{ fontSize: '0.9rem', color: '#D6C4AE', transition: 'color 0.2s' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#story" style={{ fontSize: '0.9rem', color: '#D6C4AE', transition: 'color 0.2s' }}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#catalogue" style={{ fontSize: '0.9rem', color: '#D6C4AE', transition: 'color 0.2s' }}>
                  Sweet Selections
                </Link>
              </li>
              <li>
                <Link href="#celebrations" style={{ fontSize: '0.9rem', color: '#D6C4AE', transition: 'color 0.2s' }}>
                  Bulk &amp; Celebrations
                </Link>
              </li>
              <li>
                <Link href="#location" style={{ fontSize: '0.9rem', color: '#D6C4AE', transition: 'color 0.2s' }}>
                  Shop Location
                </Link>
              </li>
              <li>
                <Link href="#enquiry" style={{ fontSize: '0.9rem', color: '#D6C4AE', transition: 'color 0.2s' }}>
                  Send Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-gold)',
                marginBottom: '1rem',
              }}
            >
              Direct Contact
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#D6C4AE' }}>
              <p>
                <strong style={{ color: '#E8D8C0' }}>Phone / WhatsApp:</strong><br />
                <a href={`tel:${BUSINESS.phone}`} style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>
                  {BUSINESS.phone}
                </a>
              </p>
              <p>
                <strong style={{ color: '#E8D8C0' }}>Email:</strong><br />
                <a href={`mailto:${BUSINESS.email}`} style={{ color: '#D6C4AE' }}>
                  {BUSINESS.email}
                </a>
              </p>
              <p>
                <strong style={{ color: '#E8D8C0' }}>Instagram:</strong><br />
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}
                >
                  @{BUSINESS.instagramHandle}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(214, 166, 100, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#A89480',
          }}
        >
          <p>
            &copy; {currentYear} {BUSINESS.name.english} ({BUSINESS.name.bengali}). All rights reserved.
          </p>
          <p>
            Rameswarpur, Kalna, Purba Bardhaman, West Bengal 713409
          </p>
        </div>
      </div>
    </footer>
  );
}
