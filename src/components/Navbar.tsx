'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/config/business';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for sticky header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
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
        transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal), background-color var(--transition-normal)',
        boxShadow: isScrolled ? '0 4px 25px rgba(20, 4, 5, 0.4)' : 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: 'clamp(1rem, 4vw, 3.5rem)',
          paddingRight: 'clamp(1rem, 4vw, 3.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'clamp(4.5rem, 8vw, 5.75rem)',
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          href="#hero"
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.6rem, 2vw, 1.15rem)',
            textDecoration: 'none',
            minWidth: 0,
            maxWidth: 'calc(100% - 56px)',
          }}
          aria-label={`${BUSINESS.name.english} (${BUSINESS.name.bengali}) Home`}
        >
          {/* Prominent Brand Emblem with Fluid Scaling */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(46px, 11vw, 68px)',
              height: 'clamp(46px, 11vw, 68px)',
              flexShrink: 0,
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))',
            }}
          >
            <Image
              src="/brand/logo.png"
              alt={BUSINESS.name.english}
              fill
              sizes="(max-width: 640px) 52px, 72px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.15rem, 3.8vw, 1.75rem)',
                fontWeight: 600,
                color: 'var(--color-gold)',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {BUSINESS.name.english}
            </span>
            <span
              className="bengali-text"
              style={{
                display: 'block',
                fontSize: 'clamp(0.82rem, 2.4vw, 1.05rem)',
                color: '#E8D4B0',
                lineHeight: 1.15,
                marginTop: '0.15rem',
                opacity: 0.95,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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
            gap: 'clamp(1.25rem, 2vw, 2.25rem)',
          }}
          className="desktop-nav"
          aria-label="Primary Desktop Navigation"
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
                padding: '0.5rem 0',
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
            className="btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-maroon-dark)',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              border: '1px solid var(--color-gold)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              minHeight: 'auto',
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

        {/* Mobile Menu Toggle Button (Strict 44x44px minimum touch target) */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            minWidth: '44px',
            minHeight: '44px',
            color: 'var(--color-gold)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(214, 166, 100, 0.3)',
            backgroundColor: mobileMenuOpen ? 'rgba(214, 166, 100, 0.15)' : 'transparent',
            transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
            touchAction: 'manipulation',
            flexShrink: 0,
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
            aria-hidden="true"
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

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            style={{
              position: 'fixed',
              inset: 0,
              top: 'clamp(4.5rem, 8vw, 5.75rem)',
              backgroundColor: 'rgba(20, 4, 5, 0.6)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              zIndex: 88,
            }}
            aria-hidden="true"
          />

          {/* Slide-down Menu Container */}
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation Menu"
            style={{
              position: 'relative',
              zIndex: 89,
              backgroundColor: 'var(--color-maroon-dark)',
              borderBottom: '1px solid rgba(214, 166, 100, 0.3)',
              padding: '1.25rem var(--container-padding) 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              maxHeight: 'calc(100dvh - clamp(4.5rem, 8vw, 5.75rem))',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: '#F4E5CC',
                  padding: '0.65rem 0.5rem',
                  borderBottom: '1px solid rgba(214, 166, 100, 0.1)',
                  transition: 'color var(--transition-fast), background-color var(--transition-fast)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#enquiry"
              onClick={closeMenu}
              className="btn-primary"
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
                padding: '0.85rem',
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-maroon-dark)',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-gold)',
                width: '100%',
              }}
            >
              Enquire Now
            </a>
          </nav>
        </>
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
