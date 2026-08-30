'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/utils/analytics';

export default function GIHeritage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  const handleOpenModal = () => {
    setModalOpen(true);
    trackEvent('product_view', { item: 'gi_heritage_modal' });
  };

  return (
    <section
      id="gi-heritage"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream-light)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div
          className="card-base"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid rgba(214, 166, 100, 0.45)',
            padding: 'clamp(1.75rem, 4vw, 3.5rem)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 20px rgba(42, 14, 16, 0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'center',
          }}
        >
          {/* Left / Top: Official Heritage Seal Presentation */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              backgroundColor: 'var(--color-cream)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(214, 166, 100, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.75rem, 2.5vw, 1.35rem)',
                marginBottom: '1.25rem',
                flexWrap: 'nowrap',
              }}
            >
              {/* 1. Banglar Rasogolla GI Seal */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(68px, 16vw, 86px)',
                  height: 'clamp(68px, 16vw, 86px)',
                  filter: 'drop-shadow(0 2px 8px rgba(42, 14, 16, 0.15))',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/brand/licenses/gi-banglar-rasogolla.png"
                  alt="Banglar Rasogolla Geographical Indication Emblem"
                  fill
                  sizes="86px"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              {/* 2. Ashoka Stambh / Satyameva Jayate Emblem */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(60px, 14vw, 76px)',
                  height: 'clamp(60px, 14vw, 76px)',
                  filter: 'drop-shadow(0 2px 8px rgba(42, 14, 16, 0.15))',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/brand/licenses/gi-emblem.png"
                  alt="Geographical Indication Registry India Emblem"
                  fill
                  sizes="76px"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              {/* 3. Intellectual Property India Logo */}
              <div
                style={{
                  position: 'relative',
                  width: 'clamp(64px, 15vw, 82px)',
                  height: 'clamp(64px, 15vw, 82px)',
                  filter: 'drop-shadow(0 2px 8px rgba(42, 14, 16, 0.15))',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/brand/licenses/gi-ip-india.png"
                  alt="Intellectual Property India Logo"
                  fill
                  sizes="82px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-gold-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
                display: 'block',
                lineHeight: 1.4,
              }}
            >
              Geographical Indication{' '}
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                (GI Tag #533)
              </span>
            </span>
            <span
              style={{
                fontSize: '0.92rem',
                fontWeight: 500,
                color: 'var(--color-maroon)',
              }}
            >
              Recognised Culinary Heritage of West Bengal
            </span>
          </div>

          {/* Right / Body: Editorial Story */}
          <div>
            <span className="section-tag">Culinary Legacy</span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                color: 'var(--color-maroon)',
                marginBottom: '1rem',
                lineHeight: 1.25,
              }}
            >
              Our Rasogolla. Bengal&apos;s Heritage.
            </h2>

            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--color-text-light)',
                marginBottom: '1rem',
              }}
            >
              Our Rasogolla belongs to the culinary tradition of <strong>Banglar Rasogolla</strong>, a Geographical Indication recognised for its deep historical and artisanal connection to West Bengal.
            </p>

            <p
              className="bengali-text"
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--color-muted)',
                marginBottom: '1.75rem',
              }}
            >
              বাংলার রসগোল্লা—পশ্চিমবঙ্গের ভৌগোলিক পরিচিতিপ্রাপ্ত এক ঐতিহাসিক ঐতিহ্য। আমরা দুই দশক ধরে খাঁটি ছানা ও নিখুঁত অনুভবে এই স্বাদের ধারাবাহিকতা বজায় রেখে চলেছি।
            </p>

            <button
              type="button"
              onClick={handleOpenModal}
              className="btn-secondary"
              style={{
                minHeight: '44px',
                borderColor: 'rgba(88, 21, 15, 0.3)',
                color: 'var(--color-maroon)',
              }}
            >
              Learn About GI Heritage
            </button>
          </div>
        </div>
      </div>

      {/* Accessible GI Information Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(20, 4, 5, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--container-padding)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gi-modal-title"
        >
          <div
            className="card-base"
            style={{
              backgroundColor: 'var(--color-surface)',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid rgba(214, 166, 100, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close GI heritage information"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-maroon)',
                cursor: 'pointer',
                backgroundColor: 'var(--color-cream)',
              }}
            >
              ✕
            </button>

            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-gold-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Geographical Indication Registry
            </span>

            <h3
              id="gi-modal-title"
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                color: 'var(--color-maroon)',
                marginBottom: '1rem',
                paddingRight: '2rem',
              }}
            >
              The Heritage of Banglar Rasogolla
            </h3>

            <p style={{ fontSize: '0.94rem', lineHeight: 1.65, color: 'var(--color-text-light)', marginBottom: '1rem' }}>
              A Geographical Indication (GI) is a sign used on products that have a specific geographical origin and possess qualities, reputation, or characteristics that are essentially attributable to that origin.
            </p>

            <p style={{ fontSize: '0.94rem', lineHeight: 1.65, color: 'var(--color-text-light)', marginBottom: '1rem' }}>
              In November 2017, the Geographical Indications Registry granted the GI tag for <strong>Banglar Rasogolla (GI Tag #533)</strong> to West Bengal, acknowledging the distinctive identity, spongy texture, and historical legacy of Bengal&apos;s chhana-based sweetmaking.
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-cream-light)',
                borderLeft: '3px solid var(--color-gold)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
              }}
            >
              <p
                className="bengali-text"
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'var(--color-maroon)',
                }}
              >
                মা অম্বিকা সুইটস গত ২০ বছরেরও বেশি সময় ধরে কালনার রামেশ্বরপুরে খাঁটি ছানা দিয়ে তৈরি রসগোল্লার ঐতিহ্যকে সযত্নে এগিয়ে নিয়ে চলেছে।
              </p>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
              At Maa Ambika Sweets, we prepare our Rasogollas following these time-honored principles: kneading pure fresh chhana daily, controlling syrup sweetness, and preserving the soft, spongy bounce that patrons love.
            </p>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn-primary"
              style={{ width: '100%', minHeight: '44px' }}
            >
              Close Information
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
