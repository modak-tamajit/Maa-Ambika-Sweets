import React from 'react';
import Image from 'next/image';

interface Occasion {
  title: string;
  bengali: string;
  descriptionEnglish: string;
  descriptionBengali: string;
  image?: string;
}

const occasions: Occasion[] = [
  {
    title: 'Weddings & Receptions',
    bengali: 'বিবাহ ও শুভ অনুষ্ঠান',
    descriptionEnglish:
      'Customized sweet platters, traditional curd pots, and curated gift boxes designed for wedding banquets and guest hospitality.',
    descriptionBengali:
      'বিবাহ ও প্রীতিভোজের জন্য বিশেষ মিষ্টির থালা, ঐতিহ্যবাহী দইয়ের হাঁড়ি ও উপহারের মিষ্টির বাক্স।',
    image: '/celebrations/weddings.jpg',
  },
  {
    title: 'Pujas & Festive Gatherings',
    bengali: 'পূজা ও উৎসবের মিষ্টি',
    descriptionEnglish:
      'Special festive preparations for Durga Puja, Kali Puja, Bhai Dooj, and Diwali with dedicated early-morning bulk order fulfillment.',
    descriptionBengali:
      'দুর্গাপূজা, কালীপূজা, ভাইফোঁটা ও দীপাবলির মতো উৎসবের জন্য বিশেষ তাজা মিষ্টি ও বাল্ক অর্ডার ডেলিভারি।',
    image: '/celebrations/pujas.jpg',
  },
  {
    title: 'Family Milestones',
    bengali: 'পারিবারিক শুভ মুহূর্ত',
    descriptionEnglish:
      'From Annaprashan and birthdays to housewarmings, we package assorted fresh sweets tailored to your celebration size.',
    descriptionBengali:
      'অন্নপ্রাশন, জন্মদিন ও গৃহপ্রবেশের জন্য আপনার পছন্দমতো সাজানো তাজা মিষ্টির বিশেষ প্যাকেজ।',
    image: '/celebrations/milestones.jpg',
  },
];

export default function Celebrations() {
  return (
    <section
      id="celebrations"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Festive & Special Occasions</span>
          <h2 className="section-title">Sweetening Life&apos;s Milestones</h2>
          <p className="section-subtitle">
            Celebrate weddings, festivals, and auspicious ceremonies with handcrafted bulk confection.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2.25rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          {occasions.map((item) => (
            <div
              key={item.title}
              className="card-base"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: 'var(--color-surface)',
                padding: '0',
                overflow: 'hidden',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
              }}
            >
              {item.image ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    backgroundColor: 'var(--color-cream-dark)',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.bengali}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform var(--transition-slow)',
                    }}
                    loading="lazy"
                  />
                </div>
              ) : null}

              {/* Content Body matching Product Card typography */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                {/* Names */}
                <div style={{ marginBottom: '0.65rem' }}>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: 'var(--color-maroon)',
                      marginBottom: '0.2rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="bengali-text"
                    style={{
                      display: 'block',
                      fontSize: '1rem',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {item.bengali}
                  </span>
                </div>

                {/* Descriptions */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    color: 'var(--color-text-light)',
                    marginBottom: '0.65rem',
                  }}
                >
                  {item.descriptionEnglish}
                </p>

                <p
                  className="bengali-text"
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    color: 'var(--color-muted)',
                    marginTop: 'auto',
                  }}
                >
                  {item.descriptionBengali}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-light)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              color: 'var(--color-maroon)',
              marginBottom: '0.65rem',
            }}
          >
            Planning a Bulk or Festive Order?
          </h3>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: 'var(--color-text-light)',
              marginBottom: '1.25rem',
            }}
          >
            We recommend placing celebratory and bulk sweet orders 3–4 days in advance so our confectioners can prepare your custom batch at peak freshness.
          </p>
          <a href="#enquiry" className="btn-primary" style={{ minHeight: '44px' }}>
            Request Bulk Quotation
          </a>
        </div>
      </div>
    </section>
  );
}
