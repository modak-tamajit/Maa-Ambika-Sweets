import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="card-base"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0',
        overflow: 'hidden',
      }}
    >
      {/* Product Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: 'var(--color-cream-dark)',
          overflow: 'hidden',
        }}
      >
        <Image
          src={`/catalogue/${product.image}`}
          alt={`${product.nameEnglish} - ${product.nameBengali}`}
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
            }}
          >
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {/* Names */}
        <div style={{ marginBottom: '0.75rem' }}>
          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--color-maroon)',
              marginBottom: '0.2rem',
            }}
          >
            {product.nameEnglish}
          </h3>
          <span
            className="bengali-text"
            style={{
              display: 'block',
              fontSize: '1rem',
              color: 'var(--color-muted)',
            }}
          >
            {product.nameBengali}
          </span>
        </div>

        {/* Descriptions */}
        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.5,
            color: 'var(--color-text-light)',
            marginBottom: '0.75rem',
          }}
        >
          {product.descriptionEnglish}
        </p>

        {product.descriptionBengali && (
          <p
            className="bengali-text"
            style={{
              fontSize: '0.85rem',
              lineHeight: 1.5,
              color: 'var(--color-muted)',
              marginTop: 'auto',
            }}
          >
            {product.descriptionBengali}
          </p>
        )}
      </div>
    </div>
  );
}
