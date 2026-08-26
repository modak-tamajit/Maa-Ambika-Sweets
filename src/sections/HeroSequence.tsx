'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 250;

interface HeroSequenceProps {
  onInitialFramesReady?: () => void;
}

export default function HeroSequence({ onInitialFramesReady }: HeroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Cache of loaded and decoded HTMLImageElements
  const framesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  
  // In-flight loading promises to prevent duplicate fetches
  const loadingFrames = useRef<Set<number>>(new Set());

  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const isRenderingRef = useRef<boolean>(false);
  const lastDrawnFrameRef = useRef<number>(-1);
  const scrollDirectionRef = useRef<number>(1); // 1 = down, -1 = up
  const lastScrollYRef = useRef<number>(0);

  const [hasStartedScroll, setHasStartedScroll] = useState<boolean>(false);

  // Helper to load and decode a single frame with maximum priority
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
      img.src = `/hero/${frameNumber}.jpg`;

      const onDone = () => {
        framesCache.current.set(frameNumber, img);
        loadingFrames.current.delete(frameNumber);
        resolve(img);
      };

      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(onDone)
          .catch(() => {
            img.onload = onDone;
            img.onerror = () => {
              loadingFrames.current.delete(frameNumber);
              resolve(null);
            };
          });
      } else {
        img.onload = onDone;
        img.onerror = () => {
          loadingFrames.current.delete(frameNumber);
          resolve(null);
        };
      }
    });
  }, []);

  // Proactive directional preloader: aggressively loads ahead in scroll direction
  const preloadProximityFrames = useCallback((centerFrame: number) => {
    const isDown = scrollDirectionRef.current >= 0;
    
    // Look ahead 30 frames in scroll direction, and 10 frames behind
    const offsets: number[] = [];
    if (isDown) {
      for (let i = 0; i <= 30; i++) offsets.push(i);
      for (let i = -1; i >= -10; i--) offsets.push(i);
    } else {
      for (let i = 0; i >= -30; i--) offsets.push(i);
      for (let i = 1; i <= 10; i++) offsets.push(i);
    }

    offsets.forEach((offset) => {
      const target = centerFrame + offset;
      if (target >= 1 && target <= TOTAL_FRAMES && !framesCache.current.has(target)) {
        loadFrame(target, Math.abs(offset) <= 6);
      }
    });
  }, [loadFrame]);

  // Canvas draw function with high-DPI scaling & crisp contain fit
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Find requested frame or closest available neighbor
    let imgToDraw: HTMLImageElement | undefined = framesCache.current.get(frameNum);
    if (!imgToDraw) {
      for (let distance = 1; distance <= TOTAL_FRAMES; distance++) {
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

    const width = canvas.width;
    const height = canvas.height;

    // Authoritative brand cream background
    ctx.fillStyle = '#F8EED9';
    ctx.fillRect(0, 0, width, height);

    // Calculate aspect ratio contain fit
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = width / height;

    let renderWidth = width;
    let renderHeight = height;
    let offsetX = 0;
    let offsetY = 0;

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

    ctx.drawImage(imgToDraw, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnFrameRef.current = frameNum;
  }, []);

  // Continuous visual smoothing render loop via requestAnimationFrame (Scroll-Velocity Responsive)
  const renderLoop = useCallback(() => {
    const target = targetFrameRef.current;
    const current = currentFrameRef.current;

    const diff = target - current;
    
    // Dynamic smooth lerp: directly tracks user's scroll speed with organic damping
    if (Math.abs(diff) < 0.05) {
      currentFrameRef.current = target;
    } else {
      // 0.2 lerp factor delivers responsive scroll-tracking while maintaining 60fps smoothness
      currentFrameRef.current += diff * 0.2;
    }

    const roundedFrame = Math.round(currentFrameRef.current);
    const clampedFrame = Math.max(1, Math.min(TOTAL_FRAMES, roundedFrame));

    if (clampedFrame !== lastDrawnFrameRef.current) {
      drawFrame(clampedFrame);
    }

    // Preload frames in direction of motion
    preloadProximityFrames(clampedFrame);

    // Keep running until frame counter reaches target
    if (Math.abs(target - currentFrameRef.current) >= 0.01) {
      requestAnimationFrame(renderLoop);
    } else {
      isRenderingRef.current = false;
    }
  }, [drawFrame, preloadProximityFrames]);

  const requestRender = useCallback(() => {
    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      requestAnimationFrame(renderLoop);
    }
  }, [renderLoop]);

  // Precise HiDPI Retina Canvas Resizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const rect = canvas.getBoundingClientRect();

    if (rect.width > 0 && rect.height > 0) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawFrame(Math.round(currentFrameRef.current));
    }
  }, [drawFrame]);

  // Fast initial batch load + background stream
  useEffect(() => {
    let isMounted = true;

    const initialLoad = async () => {
      // 1. Rapidly fetch and decode first 50 frames in parallel
      const firstBatch = Array.from({ length: 50 }, (_, i) => i + 1);
      await Promise.all(firstBatch.map((f) => loadFrame(f, true)));

      if (isMounted) {
        resizeCanvas();
        drawFrame(1);
        if (onInitialFramesReady) {
          onInitialFramesReady();
        }
      }

      // 2. Stream all remaining frames progressively without blocking main thread
      for (let f = 51; f <= TOTAL_FRAMES; f++) {
        if (!isMounted) break;
        if (!framesCache.current.has(f)) {
          loadFrame(f, false);
          if (f % 6 === 0) {
            await new Promise((r) => setTimeout(r, 12));
          }
        }
      }
    };

    initialLoad();

    return () => {
      isMounted = false;
    };
  }, [loadFrame, resizeCanvas, drawFrame, onInitialFramesReady]);

  // Scroll listener with velocity & direction tracking
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScrollY = window.scrollY;
      scrollDirectionRef.current = currentScrollY >= lastScrollYRef.current ? 1 : -1;
      lastScrollYRef.current = currentScrollY;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      if (progress > 0 && !hasStartedScroll) {
        setHasStartedScroll(true);
      }

      // Direct linear frame mapping across all 250 frames
      const calculatedTarget = Math.floor(progress * (TOTAL_FRAMES - 1)) + 1;
      targetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, calculatedTarget));

      requestRender();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Also use ResizeObserver for dynamic container monitoring
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, [hasStartedScroll, requestRender, resizeCanvas]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '380vh', // Calibrated 380vh scroll height for smooth, responsive 250-frame pacing
        backgroundColor: 'var(--color-cream)',
      }}
    >
      {/* Sticky Canvas Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-cream)',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          aria-label="Maa Ambika Sweets handcrafted Rasogolla preparation scroll sequence"
        />

        {/* Subtle, restrained scroll indicator */}
        {!hasStartedScroll && (
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-muted)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              transition: 'opacity var(--transition-slow)',
            }}
          >
            <span>Scroll to experience</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
