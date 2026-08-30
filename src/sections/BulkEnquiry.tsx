'use client';

import React, { useState, useRef } from 'react';
import { BUSINESS } from '@/config/business';
import { buildWhatsAppUrl, getTelephoneUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

export default function BulkEnquiry() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const whatsAppGeneralMessage =
    'Hi Maa Ambika Sweets, I would like to enquire about your sweets. Please help me with availability and details.';
  const generalWhatsAppUrl = buildWhatsAppUrl(whatsAppGeneralMessage);
  const telephoneUrl = getTelephoneUrl();
  const mailUrl = 'mailto:monojit.modak1978@gmail.com?subject=Enquiry%20for%20Maa%20Ambika%20Sweets';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, query: value }));

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(88, textareaRef.current.scrollHeight)}px`;
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.query.trim()) {
      return;
    }

    const messageLines = [
      `*New Customer Enquiry — ${BUSINESS.name.english}*`,
      ``,
      `*Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      formData.email.trim() ? `*Email:* ${formData.email.trim()}` : null,
      `*Query:* ${formData.query.trim()}`,
    ].filter(Boolean);

    const fullMessage = messageLines.join('\n');
    const customWhatsAppUrl = buildWhatsAppUrl(fullMessage);

    trackEvent('bulk_enquiry_completed', {
      source: 'custom_form_whatsapp',
      has_email: Boolean(formData.email.trim()),
    });
    trackEvent('whatsapp_clicked', { source: 'custom_form' });

    window.open(customWhatsAppUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleEmailSubmit = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.query.trim()) {
      // Trigger native validation or focus
      if (textareaRef.current && !formData.query.trim()) {
        textareaRef.current.focus();
      }
      return;
    }

    const subject = encodeURIComponent(`Enquiry from ${formData.name.trim()} — Maa Ambika Sweets`);
    const bodyLines = [
      `Customer Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      formData.email.trim() ? `Email: ${formData.email.trim()}` : null,
      ``,
      `Enquiry Details:`,
      formData.query.trim(),
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoLink = `mailto:monojit.modak1978@gmail.com?subject=${subject}&body=${body}`;

    trackEvent('bulk_enquiry_completed', {
      source: 'custom_form_email',
      has_email: Boolean(formData.email.trim()),
    });

    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section
      id="enquiry"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div id="bulk-enquiry" style={{ position: 'relative', top: '-90px', visibility: 'hidden' }} />
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-muted)',
              marginBottom: '0.5rem',
            }}
          >
            Direct Communication
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-maroon)',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
            }}
          >
            Send Us an Enquiry
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: 'var(--color-text-light)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Have a question about daily varieties, bulk party orders, or festival bookings? Send us a direct WhatsApp message or email.
          </p>
        </div>

        {/* Action Options & Form Container */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          {/* Three Instant Quick Actions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {/* WhatsApp Us Card */}
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_clicked', { source: 'enquiry_quick_card' })}
              className="card-base"
              style={{
                backgroundColor: 'var(--color-cream-light)',
                border: '1px solid rgba(88, 21, 15, 0.18)',
                padding: '1.15rem 1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(42, 14, 16, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-maroon)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                const title = e.currentTarget.querySelector('.card-title') as HTMLElement;
                const sub = e.currentTarget.querySelector('.card-sub') as HTMLElement;
                if (title) title.style.color = 'var(--color-gold)';
                if (sub) sub.style.color = '#FAF4E5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cream-light)';
                e.currentTarget.style.borderColor = 'rgba(88, 21, 15, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
                const title = e.currentTarget.querySelector('.card-title') as HTMLElement;
                const sub = e.currentTarget.querySelector('.card-sub') as HTMLElement;
                if (title) title.style.color = 'var(--color-maroon)';
                if (sub) sub.style.color = 'var(--color-text-light)';
              }}
            >
              <div
                className="card-title"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-maroon)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '0.2rem',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <svg
                  width="17"
                  height="17"
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
                <span>WhatsApp Us</span>
              </div>
              <span className="card-sub" style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', transition: 'color var(--transition-fast)' }}>
                Quick & easy
              </span>
            </a>

            {/* Call the Shop Card */}
            <a
              href={telephoneUrl}
              onClick={() => trackEvent('phone_clicked', { source: 'enquiry_quick_card' })}
              className="card-base"
              style={{
                backgroundColor: 'var(--color-cream-light)',
                border: '1px solid rgba(88, 21, 15, 0.18)',
                padding: '1.15rem 1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(42, 14, 16, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-maroon)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                const title = e.currentTarget.querySelector('.card-title') as HTMLElement;
                const sub = e.currentTarget.querySelector('.card-sub') as HTMLElement;
                if (title) title.style.color = 'var(--color-gold)';
                if (sub) sub.style.color = '#FAF4E5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cream-light)';
                e.currentTarget.style.borderColor = 'rgba(88, 21, 15, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
                const title = e.currentTarget.querySelector('.card-title') as HTMLElement;
                const sub = e.currentTarget.querySelector('.card-sub') as HTMLElement;
                if (title) title.style.color = 'var(--color-maroon)';
                if (sub) sub.style.color = 'var(--color-text-light)';
              }}
            >
              <div
                className="card-title"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-maroon)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '0.2rem',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call the Shop</span>
              </div>
              <span className="card-sub" style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', transition: 'color var(--transition-fast)' }}>
                Speak with us
              </span>
            </a>

            {/* Email Option Card */}
            <a
              href={mailUrl}
              className="card-base"
              style={{
                backgroundColor: 'var(--color-cream-light)',
                border: '1px solid rgba(88, 21, 15, 0.18)',
                padding: '1.15rem 1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(42, 14, 16, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-maroon)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                const title = e.currentTarget.querySelector('.card-title') as HTMLElement;
                const sub = e.currentTarget.querySelector('.card-sub') as HTMLElement;
                if (title) title.style.color = 'var(--color-gold)';
                if (sub) sub.style.color = '#FAF4E5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cream-light)';
                e.currentTarget.style.borderColor = 'rgba(88, 21, 15, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
                const title = e.currentTarget.querySelector('.card-title') as HTMLElement;
                const sub = e.currentTarget.querySelector('.card-sub') as HTMLElement;
                if (title) title.style.color = 'var(--color-maroon)';
                if (sub) sub.style.color = 'var(--color-text-light)';
              }}
            >
              <div
                className="card-title"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-maroon)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '0.2rem',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email Us</span>
              </div>
              <span className="card-sub" style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', transition: 'color var(--transition-fast)', wordBreak: 'break-all' }}>
                monojit.modak1978@gmail.com
              </span>
            </a>
          </div>

          {/* Form Container */}
          {submitted ? (
            <div
              className="card-base"
              style={{
                backgroundColor: 'var(--color-cream-light)',
                border: '1px solid rgba(214, 166, 100, 0.5)',
                padding: '2.5rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem',
                textAlign: 'center',
                boxShadow: '0 6px 25px rgba(42, 14, 16, 0.06)',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(88, 21, 15, 0.1)',
                  color: 'var(--color-maroon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-maroon)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Thank You for Reaching Out!
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-light)', marginBottom: '1.25rem' }}>
                Your enquiry details have been drafted. We will connect with you promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: '', phone: '', email: '', query: '' });
                  if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                  }
                  setSubmitted(false);
                }}
                className="btn-primary"
                style={{
                  minHeight: '40px',
                  padding: '0.5rem 1.4rem',
                  fontSize: '0.88rem',
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleWhatsAppSubmit}
              className="card-base"
              style={{
                backgroundColor: 'var(--color-cream-light)',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(214, 166, 100, 0.45)',
                boxShadow: '0 6px 30px rgba(42, 14, 16, 0.06)',
                textAlign: 'left',
              }}
            >
              {/* Name */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="enquiry-name"
                  style={{
                    display: 'block',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-maroon)',
                    marginBottom: '0.45rem',
                  }}
                >
                  Your Name <span style={{ color: 'var(--color-maroon)' }}>*</span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sen"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#FCF8EE',
                    border: '1px solid rgba(88, 21, 15, 0.16)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 2px rgba(88, 21, 15, 0.03)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.25rem',
                }}
              >
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    style={{
                      display: 'block',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--color-maroon)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    Phone Number <span style={{ color: 'var(--color-maroon)' }}>*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#FCF8EE',
                      border: '1px solid rgba(88, 21, 15, 0.16)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxShadow: 'inset 0 1px 2px rgba(88, 21, 15, 0.03)',
                    }}
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label
                    htmlFor="enquiry-email"
                    style={{
                      display: 'block',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'var(--color-maroon)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    Email Address <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#FCF8EE',
                      border: '1px solid rgba(88, 21, 15, 0.16)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxShadow: 'inset 0 1px 2px rgba(88, 21, 15, 0.03)',
                    }}
                  />
                </div>
              </div>

              {/* Enquiry Details (Auto-expanding, resize grabber removed) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="enquiry-query"
                  style={{
                    display: 'block',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-maroon)',
                    marginBottom: '0.45rem',
                  }}
                >
                  Enquiry Details <span style={{ color: 'var(--color-maroon)' }}>*</span>
                </label>
                <textarea
                  id="enquiry-query"
                  ref={textareaRef}
                  name="query"
                  required
                  rows={3}
                  value={formData.query}
                  onChange={handleQueryChange}
                  placeholder="e.g. I would like to enquire about sweets for an upcoming family occasion on Sunday."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#FCF8EE',
                    border: '1px solid rgba(88, 21, 15, 0.16)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                    overflowY: 'hidden',
                    minHeight: '88px',
                    lineHeight: 1.5,
                    boxShadow: 'inset 0 1px 2px rgba(88, 21, 15, 0.03)',
                  }}
                />
              </div>

              {/* Dual Action Buttons: Send via WhatsApp & Send via Email */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                  gap: '0.75rem',
                  marginBottom: '0.85rem',
                }}
              >
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <span>Send via WhatsApp</span>
                  <svg
                    width="16"
                    height="16"
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
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <span>Send via Email</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* Bottom Flourish & Reassurance */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.35rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--color-gold-muted)',
                letterSpacing: '0.04em',
              }}
            >
              Fresh sweets • Local craft • Personal service
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-light)',
                fontStyle: 'italic',
              }}
            >
              Fresh sweets. Honest conversations. A warm welcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
