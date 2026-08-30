'use client';

import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 250;
const MOBILE_CACHE_LIMIT = 35;
const DESKTOP_CACHE_LIMIT = 65;

interface HeroSequenceProps {
  onInitialFramesReady?: () => void;
}

export default function HeroSequence({ onInitialFramesReady }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  // Decoded image cache (Frame number -> HTMLImageElement)
  const framesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  
  // In-flight loading promises to prevent duplicate fetches
  const loadingFrames = useRef<Set<number>>(new Set());

  // Cached layout & rendering measurements to eliminate layout thrashing
  const scrollableDistanceRef = useRef<number>(0);
  const isMobileRef = useRef<boolean>(false);
  const lastDrawnFrameRef = useRef<number>(-1);
  const scrollDirectionRef = useRef<number>(1); // 1 = down, -1 = up
  const lastScrollYRef = useRef<number>(0);
  const isIndicatorVisibleRef = useRef<boolean>(true);
  const targetFrameRef = useRef<number>(1);

  // Pre-calculated cover dimensions cache (updated only on resize)
  const coverDimsRef = useRef<{
    renderWidth: number;
    renderHeight: number;
    offsetX: number;
    offsetY: number;
  }>({
    renderWidth: 0,
    renderHeight: 0,
    offsetX: 0,
    offsetY: 0,
  });

  // RAF scheduling flag for scroll-coalescing
  const scrollRafIdRef = useRef<number | null>(null);

  // Evict frames farthest from current scroll position to keep mobile memory lean & prevent GC pauses
  const pruneCache = useCallback((currentCenter: number) => {
    const limit = isMobileRef.current ? MOBILE_CACHE_LIMIT : DESKTOP_CACHE_LIMIT;
    const cache = framesCache.current;
    
    if (cache.size <= limit) return;

    // Sort cached frame numbers by distance from currentCenter (Frame 1 is always preserved)
    const keys = Array.from(cache.keys()).filter((f) => f !== 1);
    keys.sort((a, b) => Math.abs(b - currentCenter) - Math.abs(a - currentCenter));

    // Release and evict farthest frames until within memory limit
    const toEvictCount = cache.size - limit;
    for (let i = 0; i < toEvictCount && i < keys.length; i++) {
      const frameToEvict = keys[i];
      const img = cache.get(frameToEvict);
      if (img) {
        img.onload = null;
        img.onerror = null;
        img.src = ''; // Release bitmap from memory
      }
      cache.delete(frameToEvict);
    }
  }, []);

  // Safe deduplicated frame loader
  const loadFrame = useCallback((frameNumber: number, priority: boolean = false): Promise<HTMLImageElement | null> => {
    if (frameNumber < 1 || frameNumber > TOTAL_FRAMES) return Promise.resolve(null);
    if (framesCache.current.has(frameNumber)) {
      return Promise.resolve(framesCache.current.get(frameNumber)!);
    }
    if (loadingFrames.current.has(frameNumber)) {
      return Promise.resolve(null);
    }

    loadingFrames.current.add(frameNumber);

    return new Promise((resolve) => {
      const img = new Image();
      if (priority && 'fetchPriority' in img) {
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'high';
      }

      let resolved = false;
      const finalize = (success: boolean) => {
        if (resolved) return;
        resolved = true;
        loadingFrames.current.delete(frameNumber);
        if (success) {
          framesCache.current.set(frameNumber, img);
          resolve(img);
        } else {
          resolve(null);
        }
      };

      img.onload = () => finalize(true);
      img.onerror = () => finalize(false);
      img.src = `/hero/${frameNumber}.jpg`;

      // Trigger asynchronous decode if supported
      if (typeof img.decode === 'function') {
        img.decode().then(() => finalize(true)).catch(() => {
          // Handled by img.onload / img.onerror fallback
        });
      }
    });
  }, []);

  // Directional streaming preloader (prioritizes upcoming frames in the direction of scroll)
  const preloadSurroundingFrames = useCallback((centerFrame: number) => {
    const isDown = scrollDirectionRef.current >= 0;
    const lookAhead = isMobileRef.current ? 12 : 18;
    const lookBehind = isMobileRef.current ? 3 : 6;

    const targets: number[] = [];
    if (isDown) {
      for (let i = 1; i <= lookAhead; i++) targets.push(centerFrame + i);
      for (let i = -1; i >= -lookBehind; i--) targets.push(centerFrame + i);
    } else {
      for (let i = -1; i >= -lookAhead; i--) targets.push(centerFrame + i);
      for (let i = 1; i <= lookBehind; i++) targets.push(centerFrame + i);
    }

    targets.forEach((target, idx) => {
      if (target >= 1 && target <= TOTAL_FRAMES && !framesCache.current.has(target)) {
        loadFrame(target, idx <= 2);
      }
    });

    pruneCache(centerFrame);
  }, [loadFrame, pruneCache]);

  // Recalculate cover fit dimensions when canvas changes
  const updateCoverDimensions = useCallback((width: number, height: number) => {
    if (width === 0 || height === 0) return;

    // Standard 1280x720 16:9 hero aspect ratio
    const imgAspect = 1280 / 720;
    const canvasAspect = width / height;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      renderWidth = width;
      renderHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - renderHeight) / 2;
    } else {
      renderHeight = height;
      renderWidth = height * imgAspect;
      offsetX = (width - renderWidth) / 2;
      offsetY = 0;
    }

    coverDimsRef.current = {
      renderWidth,
      renderHeight,
      offsetX,
      offsetY,
    };
  }, []);

  // Direct, zero-overhead canvas draw for exact frame
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Retrieve requested frame or nearest available neighbor within +/- 20 frames
    let imgToDraw: HTMLImageElement | undefined = framesCache.current.get(frameNum);
    if (!imgToDraw) {
      for (let distance = 1; distance <= 20; distance++) {
        const prev = frameNum - distance;
        const next = frameNum + distance;
        if (prev >= 1 && framesCache.current.has(prev)) {
          imgToDraw = framesCache.current.get(prev);
          break;
        }
        if (next <= TOTAL_FRAMES && framesCache.current.has(next)) {
          imgToDraw = framesCache.current.get(next);
          break;
        }
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;

    const { renderWidth, renderHeight, offsetX, offsetY } = coverDimsRef.current;
    if (renderWidth === 0 || renderHeight === 0) return;

    ctx.drawImage(imgToDraw, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnFrameRef.current = frameNum;
  }, []);

  // HiDPI Retina Canvas Resizing with layout caching
  const updateLayoutAndCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    isMobileRef.current = window.innerWidth < 768;

    // Cache total scrollable distance for the 380vh hero section
    const containerHeight = container.offsetHeight || window.innerHeight * 3.8;
    scrollableDistanceRef.current = Math.max(1, containerHeight - window.innerHeight);

    // Optimized DPR: 1.5x on mobile, 2.0x on desktop for optimal GPU fill rate
    const maxDpr = isMobileRef.current ? 1.5 : 2.0;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    const pixelWidth = Math.round(clientWidth * dpr);
    const pixelHeight = Math.round(clientHeight * dpr);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      
      const ctx = canvas.getContext('2d', { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium'; // Fast bilinear scaling for high frame rates
      }

      updateCoverDimensions(pixelWidth, pixelHeight);
      drawFrame(targetFrameRef.current);
    }
  }, [drawFrame, updateCoverDimensions]);

  // Initial streaming bootstrap: Frame 1 immediately, then immediate buffer
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      // 1. Load Frame 1 immediately with high priority
      await loadFrame(1, true);

      if (isMounted) {
        updateLayoutAndCanvas();
        drawFrame(1);
        if (onInitialFramesReady) {
          onInitialFramesReady();
        }
      }

      // 2. Buffer immediate startup frames (2 to 15)
      const startupBuffer = Array.from({ length: 14 }, (_, i) => i + 2);
      await Promise.all(startupBuffer.map((f) => loadFrame(f, true)));

      // 3. Progressively load background chunks with idle yields
      for (let f = 16; f <= (isMobileRef.current ? 45 : 80); f += 4) {
        if (!isMounted) break;
        const chunk = [];
        for (let j = 0; j < 4 && f + j <= TOTAL_FRAMES; j++) {
          if (!framesCache.current.has(f + j)) {
            chunk.push(loadFrame(f + j, false));
          }
        }
        if (chunk.length > 0) {
          await Promise.all(chunk);
        }
        await new Promise((r) => setTimeout(r, 40));
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [loadFrame, updateLayoutAndCanvas, drawFrame, onInitialFramesReady]);

  // Direct 1:1 Scroll-Coupled Render Handler (Zero lerp lag, Zero timer, Zero work when idle)
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafIdRef.current !== null) return;

      // Consolidate scroll events to browser animation frame (60Hz / 90Hz / 120Hz native refresh rate)
      scrollRafIdRef.current = requestAnimationFrame(() => {
        scrollRafIdRef.current = null;

        const currentScrollY = window.scrollY;
        scrollDirectionRef.current = currentScrollY >= lastScrollYRef.current ? 1 : -1;
        lastScrollYRef.current = currentScrollY;

        const scrollableDistance = scrollableDistanceRef.current;
        if (scrollableDistance <= 0) return;

        // Direct normalized scroll progress (0.0 to 1.0)
        const progress = Math.max(0, Math.min(1, currentScrollY / scrollableDistance));

        // Update floating scroll indicator directly via DOM ref without React re-renders
        const shouldShowIndicator = progress <= 0.005;
        if (shouldShowIndicator !== isIndicatorVisibleRef.current && indicatorRef.current) {
          isIndicatorVisibleRef.current = shouldShowIndicator;
          indicatorRef.current.style.opacity = shouldShowIndicator ? '1' : '0';
          indicatorRef.current.style.transform = shouldShowIndicator
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(10px)';
          indicatorRef.current.setAttribute('aria-hidden', (!shouldShowIndicator).toString());
        }

        // Direct 1:1 linear mapping to current frame
        const exactFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));
        targetFrameRef.current = exactFrame;

        // Render target frame immediately
        if (exactFrame !== lastDrawnFrameRef.current) {
          drawFrame(exactFrame);
          preloadSurroundingFrames(exactFrame);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLayoutAndCanvas, { passive: true });
    window.addEventListener('orientationchange', updateLayoutAndCanvas, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateLayoutAndCanvas();
      });
      resizeObserver.observe(containerRef.current);
    }

    updateLayoutAndCanvas();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLayoutAndCanvas);
      window.removeEventListener('orientationchange', updateLayoutAndCanvas);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (scrollRafIdRef.current !== null) {
        cancelAnimationFrame(scrollRafIdRef.current);
      }
    };
  }, [drawFrame, preloadSurroundingFrames, updateLayoutAndCanvas]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '380vh',
        backgroundColor: 'var(--color-cream)',
      }}
    >
      {/* Sticky Canvas Viewport */}
      <div className="hero-sticky-viewport">
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            touchAction: 'pan-y',
          }}
          aria-label="Maa Ambika Sweets handcrafted Rasogolla preparation scroll sequence"
        />

        {/* Minimal Floating Scroll Indicator (Direct DOM update for zero React render overhead) */}
        <div
          ref={indicatorRef}
          style={{
            position: 'absolute',
            bottom: 'max(clamp(2.25rem, 7vh, 3.75rem), calc(1.75rem + env(safe-area-inset-bottom, 0px)))',
            left: '50%',
            transform: 'translateX(-50%) translateY(0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            zIndex: 20,
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
          aria-hidden="false"
        >
          <span
            style={{
              color: 'var(--color-gold)',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              paddingLeft: '0.18em',
              textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.95)',
            }}
          >
            Scroll to experience
          </span>
          <svg
            className="scroll-indicator-bob"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.95))',
            }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
