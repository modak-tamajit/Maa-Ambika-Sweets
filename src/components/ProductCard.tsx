import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

interface ProductCardProps {
  product: Product;
  showEnquiry?: boolean;
  compact?: boolean;
}

export default function ProductCard({
  product,
  showEnquiry = false,
  compact = false,
}: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    buildWhatsAppMessage({ productName: product.nameEnglish })
  );

  return (
    <div
      className="card-base product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0',
        overflow: 'hidden',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
      }}
    >
      {/* Product Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: compact ? '16 / 11' : '4 / 3',
          backgroundColor: 'var(--color-cream-dark)',
          overflow: 'hidden',
        }}
      >
        <Image
          src={`/catalogue/${product.image}`}
          alt={product.altText || `${product.nameEnglish} - ${product.nameBengali}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)',
          }}
          loading="lazy"
        />
        {product.category && (
          <span
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              backgroundColor: 'rgba(245, 240, 232, 0.92)',
              color: 'var(--color-maroon)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 2px 6px rgba(42, 14, 16, 0.08)',
            }}
          >
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: compact ? '1.15rem' : '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {/* Names */}
        <div style={{ marginBottom: '0.65rem' }}>
          <h3
            style={{
              fontSize: compact ? '1.2rem' : '1.35rem',
              fontWeight: 600,
              color: 'var(--color-maroon)',
              marginBottom: '0.2rem',
              lineHeight: 1.25,
            }}
          >
            {product.nameEnglish}
          </h3>
          <span
            className="bengali-text"
            style={{
              display: 'block',
              fontSize: compact ? '0.9rem' : '1rem',
              color: 'var(--color-muted)',
            }}
          >
            {product.nameBengali}
          </span>
        </div>

        {/* Descriptions */}
        <p
          style={{
            fontSize: compact ? '0.85rem' : '0.9rem',
            lineHeight: 1.5,
            color: 'var(--color-text-light)',
            marginBottom: '0.65rem',
          }}
        >
          {product.descriptionEnglish}
        </p>

        {product.descriptionBengali && (
          <p
            className="bengali-text"
            style={{
              fontSize: compact ? '0.8rem' : '0.85rem',
              lineHeight: 1.5,
              color: 'var(--color-muted)',
              marginBottom: showEnquiry ? '0.85rem' : '0',
            }}
          >
            {product.descriptionBengali}
          </p>
        )}

        {/* WhatsApp Enquiry CTA */}
        {showEnquiry && (
          <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_clicked', { source: 'product_card', product: product.id })}
              className="btn-card-enquire"
              aria-label={`Enquire about ${product.nameEnglish} on WhatsApp`}
            >
              <svg
                width="15"
                height="15"
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
              <span>Enquire on WhatsApp</span>
              <span className="arrow-icon" aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
