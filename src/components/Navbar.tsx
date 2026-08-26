'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/config/business';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Story', href: '#story' },
    { label: 'Sweets', href: '#catalogue' },
    { label: 'Celebrations', href: '#celebrations' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#enquiry' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        backgroundColor: 'var(--color-maroon)',
        borderBottom: isScrolled
          ? '1px solid rgba(214, 166, 100, 0.35)'
          : '1px solid rgba(214, 166, 100, 0.15)',
        transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
        boxShadow: isScrolled ? '0 4px 25px rgba(20, 4, 5, 0.35)' : 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: 'clamp(1.5rem, 4vw, 3.5rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 3.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '5.75rem',
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.15rem',
            textDecoration: 'none',
          }}
          aria-label={`${BUSINESS.name.english} Home`}
        >
          {/* Prominent Brand Emblem */}
          <div
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              flexShrink: 0,
              filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.35))',
            }}
          >
            <Image
              src="/brand/logo.png"
              alt={BUSINESS.name.english}
              fill
              sizes="72px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--color-gold)',
                lineHeight: 1.1,
                letterSpacing: '0.025em',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
              }}
            >
              {BUSINESS.name.english}
            </span>
            <span
              className="bengali-text"
              style={{
                display: 'block',
                fontSize: '1.05rem',
                color: '#E8D4B0',
                lineHeight: 1.15,
                marginTop: '0.2rem',
                opacity: 0.95,
              }}
            >
              {BUSINESS.name.bengali}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.25rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#F4E5CC',
                letterSpacing: '0.03em',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#F4E5CC';
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#enquiry"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.65rem 1.4rem',
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-maroon-dark)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-gold)',
              transition: 'all var(--transition-fast)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E5B874';
              e.currentTarget.style.borderColor = '#E5B874';
              e.currentTarget.style.color = '#2B080A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-gold)';
              e.currentTarget.style.borderColor = 'var(--color-gold)';
              e.currentTarget.style.color = 'var(--color-maroon-dark)';
            }}
          >
            Enquire
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            color: 'var(--color-gold)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(214, 166, 100, 0.3)',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-maroon-dark)',
            borderBottom: '1px solid rgba(214, 166, 100, 0.3)',
            padding: '1.75rem var(--container-padding) 2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: '#F4E5CC',
                padding: '0.35rem 0',
                borderBottom: '1px solid rgba(214, 166, 100, 0.1)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#enquiry"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              marginTop: '0.75rem',
              display: 'block',
              textAlign: 'center',
              padding: '0.85rem',
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-maroon-dark)',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Enquire Now
          </a>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
