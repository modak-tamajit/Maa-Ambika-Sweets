'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '@/config/business';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#hero');

  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef('#hero');

  // Optimized scroll listener using rAF batching and cached section queries
  useEffect(() => {
    let rafId: number | null = null;
    let cachedSections: { id: string; el: HTMLElement }[] = [];

    const updateSectionsCache = () => {
      const trackedIds = ['#hero', '#story', '#catalogue', '#celebrations', '#location', '#enquiry'];
      cachedSections = trackedIds
        .map((id) => {
          const el = id === '#story' 
            ? (document.getElementById('story') || document.getElementById('about'))
            : document.getElementById(id.replace('#', ''));
          return el ? { id, el } : null;
        })
        .filter((item): item is { id: string; el: HTMLElement } => item !== null);
    };

    updateSectionsCache();

    const processScroll = () => {
      rafId = null;
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > 20;

      if (shouldBeScrolled !== isScrolledRef.current) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }

      // Fast-path: Top of page is always hero
      if (currentScrollY < 350) {
        if (activeSectionRef.current !== '#hero') {
          activeSectionRef.current = '#hero';
          setActiveSection('#hero');
        }
        return;
      }

      // Fast-path: Bottom of page is contact
      if (window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 80) {
        if (activeSectionRef.current !== '#enquiry') {
          activeSectionRef.current = '#enquiry';
          setActiveSection('#enquiry');
        }
        return;
      }

      // If sections cache is empty, rebuild it
      if (cachedSections.length === 0) {
        updateSectionsCache();
      }

      const targetY = 180;
      let newActive = '#hero';

      for (let i = cachedSections.length - 1; i >= 0; i--) {
        const item = cachedSections[i];
        const top = item.el.getBoundingClientRect().top;
        if (top <= targetY) {
          newActive = item.id;
          break;
        }
      }

      if (newActive !== activeSectionRef.current) {
        activeSectionRef.current = newActive;
        setActiveSection(newActive);
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(processScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSectionsCache, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionsCache);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
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

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }
  }, [closeMenu]);

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
          onClick={(e) => handleNavClick(e, '#hero')}
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
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-gold)' : '#F4E5CC',
                  letterSpacing: '0.03em',
                  transition: 'color var(--transition-fast)',
                  padding: '0.5rem 0',
                  position: 'relative',
                  textShadow: isActive ? '0 0 12px rgba(214, 166, 100, 0.45)' : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#F4E5CC';
                  }
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2px',
                      backgroundColor: 'var(--color-gold)',
                      borderRadius: '2px',
                      boxShadow: '0 0 8px rgba(214, 166, 100, 0.8)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
          <a
            href="#enquiry"
            onClick={(e) => handleNavClick(e, '#enquiry')}
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

        {/* Mobile Menu Toggle Button (Refined scale, smaller than shop logo) */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
            padding: '0',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(214, 166, 100, 0.4)',
            backgroundColor: mobileMenuOpen ? 'rgba(214, 166, 100, 0.15)' : 'transparent',
            boxShadow: mobileMenuOpen ? '0 0 10px rgba(214, 166, 100, 0.25)' : 'none',
            cursor: 'pointer',
            transition: 'border-color var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast)',
            touchAction: 'manipulation',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '24px',
              height: '26px',
              transition: 'transform var(--transition-fast)',
              transform: mobileMenuOpen ? 'rotate(-10deg) scale(0.92)' : 'none',
              filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3))',
            }}
          >
            <Image
              src="/brand/menu-pot.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="26px"
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </div>
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '44px',
                    fontSize: '1.05rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-gold)' : '#F4E5CC',
                    backgroundColor: isActive ? 'rgba(214, 166, 100, 0.12)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                    padding: '0.65rem 0.75rem',
                    borderBottom: '1px solid rgba(214, 166, 100, 0.1)',
                    transition: 'color var(--transition-fast), background-color var(--transition-fast)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <a
              href="#enquiry"
              onClick={(e) => handleNavClick(e, '#enquiry')}
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
