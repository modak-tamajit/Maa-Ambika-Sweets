'use client';

import React, { useState, useEffect } from 'react';
import { faqs, FAQItem } from '@/data/faq';
import { trackEvent } from '@/utils/analytics';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/utils/whatsapp';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Close open FAQ when switching browser tabs or minimizing
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOpenId(null);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleFAQ = (id: string, question: string) => {
    const nextState = openId === id ? null : id;
    setOpenId(nextState);
    if (nextState !== null) {
      trackEvent('faq_opened', { faq_id: id, question });
    }
  };

  const generalWhatsAppUrl = buildWhatsAppUrl(
    buildWhatsAppMessage({
      customNote: 'I have a question about sweet orders and availability.',
    })
  );

  return (
    <section
      id="faq"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Help & Information</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Common questions about sweet varieties, celebratory bulk orders, and shop pick-up.
          </p>
        </div>

        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          {faqs.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                className="card-base"
                style={{
                  padding: 0,
                  backgroundColor: 'var(--color-surface)',
                  overflow: 'hidden',
                  border: isOpen
                    ? '1px solid var(--color-gold)'
                    : '1px solid rgba(88, 21, 15, 0.14)',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleFAQ(faq.id, faq.questionEnglish)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-maroon)',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
                          fontWeight: 600,
                          color: 'var(--color-maroon)',
                          display: 'block',
                          marginBottom: '0.2rem',
                          lineHeight: 1.35,
                        }}
                      >
                        {faq.questionEnglish}
                      </span>
                      <span
                        className="bengali-text"
                        style={{
                          fontSize: '0.88rem',
                          color: 'var(--color-muted)',
                          display: 'block',
                        }}
                      >
                        {faq.questionBengali}
                      </span>
                    </div>

                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'var(--color-cream-dark)' : 'var(--color-cream)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform var(--transition-fast)',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        color: 'var(--color-maroon)',
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    style={{
                      padding: '0 1.5rem 1.5rem',
                      borderTop: '1px solid rgba(214, 166, 100, 0.2)',
                      paddingTop: '1rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.94rem',
                        lineHeight: 1.65,
                        color: 'var(--color-text-light)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {faq.answerEnglish}
                    </p>
                    <p
                      className="bengali-text"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.65,
                        color: 'var(--color-muted)',
                      }}
                    >
                      {faq.answerBengali}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Callout */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
          }}
        >
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-light)',
              marginBottom: '0.85rem',
            }}
          >
            Have a specific requirement or question not listed here?
          </p>
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_clicked', { source: 'faq_footer' })}
            className="btn-maroon"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Ask Us on WhatsApp</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
