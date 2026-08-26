'use client';

import React, { useState } from 'react';
import { BUSINESS } from '@/config/business';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    // Construct formatted WhatsApp message
    const messageLines = [
      `*New Enquiry — ${BUSINESS.name.english}*`,
      ``,
      `*Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      formData.email.trim() ? `*Email:* ${formData.email.trim()}` : null,
      formData.message.trim() ? `*Message:* ${formData.message.trim()}` : null,
    ].filter(Boolean);

    const fullMessage = messageLines.join('\n');
    const encoded = encodeURIComponent(fullMessage);

    // Clean phone number format for wa.me URL
    const cleanNumber = BUSINESS.whatsapp.replace(/[^0-9]/g, '');

    // Open WhatsApp directly in new window
    const waUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

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
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Direct Communication</span>
          <h2 className="section-title">Send Us an Enquiry</h2>
          <p className="section-subtitle">
            Have a question about daily varieties, bulk party orders, or festival bookings? Send us a direct WhatsApp message.
          </p>
        </div>

        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          <div className="card-base" style={{ backgroundColor: 'var(--color-cream-light)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto 1rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-cream)',
                    color: 'var(--color-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--color-maroon)' }}>
                  Opening WhatsApp...
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                  Your enquiry has been formatted and directed to WhatsApp. You can press Send in WhatsApp to complete your message.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Your Name <span style={{ color: 'var(--color-maroon)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sen"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.95rem',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text)',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Phone & Email Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Phone Number <span style={{ color: 'var(--color-maroon)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.95rem',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text)',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Email Address <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '0.95rem',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text)',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Enquiry Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. I would like to enquire about sweets for an upcoming family occasion on Sunday."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.95rem',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text)',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    marginTop: '0.5rem',
                    gap: '0.5rem',
                  }}
                >
                  <span>Send Enquiry via WhatsApp</span>
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
                </button>

                <p
                  style={{
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    color: 'var(--color-muted)',
                    marginTop: '0.25rem',
                  }}
                >
                  This will format your details and open WhatsApp directly. No sign-up required.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
