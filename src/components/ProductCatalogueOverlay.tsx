'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface ProductCatalogueOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductCatalogueOverlay({
  isOpen,
  onClose,
}: ProductCatalogueOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Derive unique categories dynamically from products dataset
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category?.trim()).filter(Boolean))
    );
    return ['All', ...uniqueCategories];
  }, []);

  // Filter products based on search input and category selection
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      // Category check
      const productCategory = product.category?.trim() || '';
      const matchesCategory =
        selectedCategory === 'All' || productCategory === selectedCategory;
      if (!matchesCategory) return false;

      // Search query check against English & Bengali fields
      if (!query) return true;

      const nameEn = (product.nameEnglish || '').toLowerCase();
      const nameBn = (product.nameBengali || '').toLowerCase();
      const descEn = (product.descriptionEnglish || '').toLowerCase();
      const descBn = (product.descriptionBengali || '').toLowerCase();
      const categoryStr = productCategory.toLowerCase();

      return (
        nameEn.includes(query) ||
        nameBn.includes(query) ||
        descEn.includes(query) ||
        descBn.includes(query) ||
        categoryStr.includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleDismiss = () => {
    if (typeof window !== 'undefined' && window.location.hash === '#catalogue-view') {
      window.history.back();
    } else {
      onClose();
    }
  };

  // Handle body scroll locking, Escape key, and browser/mobile Back button navigation
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus search input after slight delay for smooth transition
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    // Push history state so browser / mobile gesture back returns to home
    if (typeof window !== 'undefined' && window.location.hash !== '#catalogue-view') {
      window.history.pushState({ modal: 'catalogue' }, '', window.location.pathname + '#catalogue-view');
    }

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="catalogue-overlay-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalogue-overlay-title"
    >
      <div className="catalogue-overlay-container">
        {/* Sticky Header Bar — Matching the Main Website Navbar UI & Palette */}
        <header className="catalogue-overlay-header">
          <button
            type="button"
            className="catalogue-overlay-brand"
            onClick={() => {
              handleDismiss();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Maa Ambika Sweets - Return to Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.6rem, 2vw, 1.15rem)',
              minWidth: 0,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              textAlign: 'left',
            }}
          >
            {/* Brand Emblem Logo */}
            <div className="catalogue-brand-logo">
              <Image
                src="/brand/logo.png"
                alt="Maa Ambika Sweets Logo"
                width={56}
                height={56}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="catalogue-brand-text">
              <span className="brand-title">Maa Ambika Sweets</span>
              <span className="brand-subtitle bengali-text">মা অম্বিকা সুইটস</span>
            </div>
          </button>

          <div className="catalogue-header-actions">
            <button
              type="button"
              onClick={handleDismiss}
              className="catalogue-header-close-btn"
              aria-label="Close catalogue overlay"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="close-text">Close</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="catalogue-overlay-content">
          <div className="container" style={{ maxWidth: '1100px', padding: '0 clamp(1rem, 3vw, 2.5rem)' }}>
            {/* Title Section */}
            <div className="catalogue-header-text">
              <span className="section-tag">Complete Menu</span>
              <h2 id="catalogue-overlay-title" className="section-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.35rem' }}>
                Our Sweets Collection
              </h2>
              <p className="bengali-text" style={{ fontSize: '1rem', color: 'var(--color-muted)', marginBottom: '0.4rem' }}>
                আমাদের ঐতিহ্যবাহী মিষ্টি সম্ভার
              </p>
              <p className="section-subtitle" style={{ fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                Explore all artisan Bengali sweets prepared daily in Kalna. Click any sweet to enquire directly on WhatsApp.
              </p>
            </div>

            {/* Search Bar */}
            <div className="catalogue-search-wrapper">
              <div className="catalogue-search-bar">
                <svg
                  className="search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sweets by name (e.g. Rasogolla, সন্দেশ, Nolen Gur)..."
                  className="catalogue-search-input"
                  aria-label="Search sweets by name or ingredient"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="search-clear-btn"
                    aria-label="Clear search input"
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
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (Horizontally scrollable on mobile) */}
            {categories.length > 1 && (
              <div className="catalogue-categories-scroller" role="tablist" aria-label="Filter sweets by category">
                <div className="catalogue-categories-list">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(cat)}
                        className={`category-pill ${isActive ? 'active' : ''}`}
                      >
                        {cat === 'All' ? 'All Sweets (সব মিষ্টি)' : cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Count Indicator */}
            <div className="catalogue-count-bar">
              <span className="count-text">
                Showing <strong>{filteredProducts.length}</strong> of {products.length} {products.length === 1 ? 'sweet' : 'sweets'}
              </span>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="reset-filters-link"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Product Grid or Zero Match State */}
            {filteredProducts.length > 0 ? (
              <div className="catalogue-products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showEnquiry={true}
                    compact={true}
                  />
                ))}
              </div>
            ) : (
              <div className="catalogue-empty-state card-base">
                <div className="empty-icon-wrap">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <h3 className="empty-title">No sweets found</h3>
                <p className="bengali-text" style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                  কোনো মিষ্টি খুঁজে পাওয়া যায়নি
                </p>
                <p className="empty-desc">
                  Try searching with another name or select &quot;All Sweets&quot; to see today&apos;s fresh stock.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    searchInputRef.current?.focus();
                  }}
                  className="btn-primary"
                  style={{ marginTop: '1rem', minHeight: '40px', padding: '0.5rem 1.25rem' }}
                >
                  View All Sweets
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
