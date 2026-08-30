'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 250;
const MOBILE_CACHE_LIMIT = 35;
const DESKTOP_CACHE_LIMIT = 70;
const MAX_CONCURRENT = 8;

interface HeroSequenceProps {
  onInitialFramesReady?: () => void;
}

type CacheEntry = ImageBitmap | HTMLImageElement;
const supportsImageBitmap = typeof createImageBitmap === 'function';

export default function HeroSequence({ onInitialFramesReady }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const framesCache = useRef<Map<number, CacheEntry>>(new Map());
  const cachedKeysSorted = useRef<number[]>([]);
  const inFlight = useRef<Map<number, AbortController>>(new Map());
  const activeCount = useRef(0);

  const scrollableDistanceRef = useRef(0);
  const isMobileRef = useRef(false);
  const lastDrawnFrameRef = useRef(-1);
  const targetFrameRef = useRef(1);
  const scrollDirectionRef = useRef(1);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const isIndicatorVisibleRef = useRef(true);
  const isUserScrollingRef = useRef(false);
  const scrollIdleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const coverDimsRef = useRef({ renderWidth: 0, renderHeight: 0, offsetX: 0, offsetY: 0 });
  const scrollRafIdRef = useRef<number | null>(null);
  const drawRafIdRef = useRef<number | null>(null);
  const idleFillTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const insertSortedKey = (n: number) => {
    const arr = cachedKeysSorted.current;
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] < n) lo = mid + 1; else hi = mid;
    }
    if (arr[lo] !== n) arr.splice(lo, 0, n);
  };
  const removeSortedKey = (n: number) => {
    const arr = cachedKeysSorted.current;
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] < n) lo = mid + 1; else hi = mid;
    }
    if (arr[lo] === n) arr.splice(lo, 1);
  };
  const nearestCachedFrame = (target: number): number | null => {
    const arr = cachedKeysSorted.current;
    if (arr.length === 0) return null;
    let lo = 0, hi = arr.length - 1;
    if (target <= arr[0]) return arr[0];
    if (target >= arr[hi]) return arr[hi];
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] === target) return arr[mid];
      if (arr[mid] < target) lo = mid + 1; else hi = mid;
    }
    const a = arr[lo - 1], b = arr[lo];
    return Math.abs(a - target) <= Math.abs(b - target) ? a : b;
  };

  const closeEntry = (entry: CacheEntry | undefined) => {
    if (entry && 'close' in entry && typeof entry.close === 'function') entry.close();
  };

  const pruneCache = useCallback((currentCenter: number) => {
    const limit = isMobileRef.current ? MOBILE_CACHE_LIMIT : DESKTOP_CACHE_LIMIT;
    const cache = framesCache.current;
    if (cache.size <= limit + 10) return;

    const keys = cachedKeysSorted.current.filter((f) => f !== 1);
    keys.sort((a, b) => Math.abs(b - currentCenter) - Math.abs(a - currentCenter));

    const toEvict = cache.size - limit;
    for (let i = 0; i < toEvict && i < keys.length; i++) {
      closeEntry(cache.get(keys[i]));
      cache.delete(keys[i]);
      removeSortedKey(keys[i]);
    }
  }, []);

  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      ctxRef.current = ctx;
    }
    if (!ctx) return;

    const nearest = framesCache.current.has(frameNum) ? frameNum : nearestCachedFrame(frameNum);
    if (nearest === null) return;
    const img = framesCache.current.get(nearest);
    if (!img) return;

    const { renderWidth, renderHeight, offsetX, offsetY } = coverDimsRef.current;
    if (renderWidth === 0 || renderHeight === 0) return;

    ctx.drawImage(img as CanvasImageSource, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnFrameRef.current = nearest;
  }, []);

  const fetchFrame = useCallback((frameNumber: number): void => {
    if (frameNumber < 1 || frameNumber > TOTAL_FRAMES) return;
    if (framesCache.current.has(frameNumber) || inFlight.current.has(frameNumber)) return;
    if (activeCount.current >= MAX_CONCURRENT) return;

    const controller = new AbortController();
    inFlight.current.set(frameNumber, controller);
    activeCount.current++;

    const settle = (entry: CacheEntry | null) => {
      inFlight.current.delete(frameNumber);
      activeCount.current--;
      if (entry) {
        framesCache.current.set(frameNumber, entry);
        insertSortedKey(frameNumber);
        // Always redraw on arrival — if this frame is now the nearest to target, show it immediately.
        drawFrame(targetFrameRef.current);
      }
      pumpQueue();
    };

    if (supportsImageBitmap) {
      fetch(`/hero/${frameNumber}.jpg`, { signal: controller.signal })
        .then((res) => res.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bmp) => settle(bmp))
        .catch(() => settle(null));
    } else {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => settle(img.naturalWidth > 0 ? img : null);
      img.onerror = () => settle(null);
      img.src = `/hero/${frameNumber}.jpg`;
    }
  }, [drawFrame]);

  const pumpQueue = useCallback(() => {
    const target = targetFrameRef.current;
    const isDown = scrollDirectionRef.current >= 0;
    const isFast = scrollVelocityRef.current > 1.5;
    // Widened windows — more headroom to fill ahead of the user, now that decode is off-thread.
    const lookAhead = isMobileRef.current ? (isFast ? 16 : 12) : (isFast ? 22 : 16);
    const lookBehind = isMobileRef.current ? 5 : 6;
    const relevantRadius = lookAhead + 10;

    inFlight.current.forEach((controller, frame) => {
      if (Math.abs(frame - target) > relevantRadius) {
        controller.abort();
        inFlight.current.delete(frame);
        activeCount.current--;
      }
    });

    const wanted: number[] = [];
    const ahead = isDown ? 1 : -1;
    for (let i = 1; i <= lookAhead; i++) {
      const f = target + ahead * i;
      if (f >= 1 && f <= TOTAL_FRAMES && !framesCache.current.has(f)) wanted.push(f);
    }
    for (let i = 1; i <= lookBehind; i++) {
      const f = target - ahead * i;
      if (f >= 1 && f <= TOTAL_FRAMES && !framesCache.current.has(f)) wanted.push(f);
    }
    wanted.sort((a, b) => Math.abs(a - target) - Math.abs(b - target));

    for (const f of wanted) {
      if (activeCount.current >= MAX_CONCURRENT) break;
      fetchFrame(f);
    }

    pruneCache(target);
  }, [fetchFrame, pruneCache]);

  // Quietly widens the cached buffer while the user is idle (paused, not scrolling).
  // This is what prevents "skipping" the moment scrolling resumes after a pause.
  const idleFill = useCallback(() => {
    if (idleFillTimeoutRef.current) clearTimeout(idleFillTimeoutRef.current);
    idleFillTimeoutRef.current = setTimeout(() => {
      if (isUserScrollingRef.current) return;
      const target = targetFrameRef.current;
      const radius = isMobileRef.current ? 30 : 45;
      let filled = 0;
      for (let d = 1; d <= radius && filled < 3; d++) {
        for (const f of [target + d, target - d]) {
          if (f >= 1 && f <= TOTAL_FRAMES && !framesCache.current.has(f) && !inFlight.current.has(f)) {
            if (activeCount.current < MAX_CONCURRENT) {
              fetchFrame(f);
              filled++;
            }
          }
        }
      }
      idleFill(); // keep extending outward while idle
    }, 200);
  }, [fetchFrame]);

  const updateCoverDimensions = useCallback((width: number, height: number) => {
    if (width === 0 || height === 0) return;
    const imgAspect = 1280 / 720;
    const canvasAspect = width / height;
    let renderWidth: number, renderHeight: number, offsetX: number, offsetY: number;
    if (canvasAspect > imgAspect) {
      renderWidth = width; renderHeight = width / imgAspect; offsetX = 0; offsetY = (height - renderHeight) / 2;
    } else {
      renderHeight = height; renderWidth = height * imgAspect; offsetX = (width - renderWidth) / 2; offsetY = 0;
    }
    coverDimsRef.current = { renderWidth, renderHeight, offsetX, offsetY };
  }, []);

  const updateLayoutAndCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    isMobileRef.current = window.innerWidth < 768;
    const containerHeight = container.offsetHeight || window.innerHeight * 3.8;
    scrollableDistanceRef.current = Math.max(1, containerHeight - window.innerHeight);

    const maxDpr = isMobileRef.current ? 1.0 : 1.25;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const pixelWidth = Math.round(window.innerWidth * dpr);
    const pixelHeight = Math.round(window.innerHeight * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      ctxRef.current = ctx;
      if (ctx) { ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'medium'; }
      updateCoverDimensions(pixelWidth, pixelHeight);
      drawFrame(targetFrameRef.current);
    }
  }, [drawFrame, updateCoverDimensions]);

  useEffect(() => {
    let isMounted = true;
    prefersReducedMotionRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const bootstrap = async () => {
      isMobileRef.current = window.innerWidth < 768;
      fetchFrame(1);

      for (let i = 0; i < 40 && !framesCache.current.has(1); i++) {
        await new Promise((r) => setTimeout(r, 25));
      }
      if (!isMounted) return;

      updateLayoutAndCanvas();
      drawFrame(1);
      onInitialFramesReady?.();

      if (prefersReducedMotionRef.current) return;
      pumpQueue();
      idleFill();
    };

    bootstrap();
    return () => {
      isMounted = false;
      if (idleFillTimeoutRef.current) clearTimeout(idleFillTimeoutRef.current);
    };
  }, [fetchFrame, updateLayoutAndCanvas, drawFrame, pumpQueue, idleFill, onInitialFramesReady]);

  useEffect(() => {
    const loop = () => {
      drawFrame(targetFrameRef.current);
      drawRafIdRef.current = requestAnimationFrame(loop);
    };
    drawRafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (drawRafIdRef.current !== null) cancelAnimationFrame(drawRafIdRef.current);
    };
  }, [drawFrame]);

  useEffect(() => {
    const handleScroll = () => {
      if (prefersReducedMotionRef.current) return;
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const timeDelta = Math.max(1, now - lastScrollTimeRef.current);
      scrollVelocityRef.current = Math.abs(currentScrollY - lastScrollYRef.current) / timeDelta;
      lastScrollTimeRef.current = now;

      isUserScrollingRef.current = true;
      if (scrollIdleTimeoutRef.current) clearTimeout(scrollIdleTimeoutRef.current);
      scrollIdleTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        scrollVelocityRef.current = 0;
        idleFill(); // start widening the buffer as soon as scrolling stops
      }, 200);

      if (scrollRafIdRef.current !== null) return;
      scrollRafIdRef.current = requestAnimationFrame(() => {
        scrollRafIdRef.current = null;
        const latestScrollY = window.scrollY;
        scrollDirectionRef.current = latestScrollY >= lastScrollYRef.current ? 1 : -1;
        lastScrollYRef.current = latestScrollY;

        const dist = scrollableDistanceRef.current;
        if (dist <= 0) return;
        const progress = Math.max(0, Math.min(1, latestScrollY / dist));

        const shouldShowIndicator = progress <= 0.005;
        if (shouldShowIndicator !== isIndicatorVisibleRef.current && indicatorRef.current) {
          isIndicatorVisibleRef.current = shouldShowIndicator;
          indicatorRef.current.style.opacity = shouldShowIndicator ? '1' : '0';
          indicatorRef.current.style.transform = shouldShowIndicator
            ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)';
          indicatorRef.current.setAttribute('aria-hidden', (!shouldShowIndicator).toString());
        }

        const exactFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));
        targetFrameRef.current = exactFrame;
        drawFrame(exactFrame);
        pumpQueue();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLayoutAndCanvas, { passive: true });
    window.addEventListener('orientationchange', updateLayoutAndCanvas, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateLayoutAndCanvas());
      resizeObserver.observe(containerRef.current);
    }
    updateLayoutAndCanvas();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLayoutAndCanvas);
      window.removeEventListener('orientationchange', updateLayoutAndCanvas);
      resizeObserver?.disconnect();
      if (scrollRafIdRef.current !== null) cancelAnimationFrame(scrollRafIdRef.current);
      if (scrollIdleTimeoutRef.current) clearTimeout(scrollIdleTimeoutRef.current);
      if (idleFillTimeoutRef.current) clearTimeout(idleFillTimeoutRef.current);
      inFlight.current.forEach((c) => c.abort());
      inFlight.current.clear();
    };
  }, [drawFrame, pumpQueue, idleFill, updateLayoutAndCanvas]);

  return (
    <section id="hero" ref={containerRef} style={{ position: 'relative', height: '380vh', backgroundColor: 'var(--color-cream)' }}>
      <div className="hero-sticky-viewport">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'pan-y' }}
          aria-label="Maa Ambika Sweets handcrafted Rasogolla preparation scroll sequence"
        />
        <div
          ref={indicatorRef}
          style={{
            position: 'absolute',
            bottom: 'max(clamp(2.25rem, 7vh, 3.75rem), calc(1.75rem + env(safe-area-inset-bottom, 0px)))',
            left: '50%', transform: 'translateX(-50%) translateY(0)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '0.4rem', zIndex: 20, pointerEvents: 'none', opacity: 1,
            transition: 'opacity 0.35s ease, transform 0.35s ease', whiteSpace: 'nowrap', textAlign: 'center',
          }}
          aria-hidden="false"
        >
          <span style={{
            color: 'var(--color-gold)', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: 600,
            letterSpacing: '0.18em', paddingLeft: '0.18em', textTransform: 'uppercase',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.95)',
          }}>
            Scroll to experience
          </span>
          <svg className="scroll-indicator-bob" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))' }} aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
