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
  const renderLoopRef = useRef<() => void>(() => {});
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

      const onDone = () => {
        framesCache.current.set(frameNumber, img);
        loadingFrames.current.delete(frameNumber);
        resolve(img);
      };

      img.onload = onDone;
      img.onerror = () => {
        loadingFrames.current.delete(frameNumber);
        resolve(null);
      };

      img.src = `/hero/${frameNumber}.jpg`;

      // Trigger asynchronous decode if supported
      if (typeof img.decode === 'function') {
        img.decode().then(onDone).catch(() => {
          // Handled by img.onload / img.onerror fallback
        });
      }
    });
  }, []);

  // Proactive directional preloader: aggressively loads ahead in scroll direction
  const preloadProximityFrames = useCallback((centerFrame: number) => {
    const isDown = scrollDirectionRef.current >= 0;
    
    // Look ahead 25 frames in scroll direction, and 8 frames behind
    const offsets: number[] = [];
    if (isDown) {
      for (let i = 0; i <= 25; i++) offsets.push(i);
      for (let i = -1; i >= -8; i--) offsets.push(i);
    } else {
      for (let i = 0; i >= -25; i--) offsets.push(i);
      for (let i = 1; i <= 8; i++) offsets.push(i);
    }

    offsets.forEach((offset) => {
      const target = centerFrame + offset;
      if (target >= 1 && target <= TOTAL_FRAMES && !framesCache.current.has(target)) {
        loadFrame(target, Math.abs(offset) <= 5);
      }
    });
  }, [loadFrame]);

  // Canvas draw function with edge-to-edge FULL COVER (eliminates pillarboxes & letterboxes)
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
    if (width === 0 || height === 0) return;

    // Calculate edge-to-edge "COVER" fit
    const imgWidth = imgToDraw.naturalWidth || 1280;
    const imgHeight = imgToDraw.naturalHeight || 720;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = width / height;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      // Screen is wider than image (Widescreen desktop/laptop): match full width, center vertically
      renderWidth = width;
      renderHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - renderHeight) / 2;
    } else {
      // Screen is taller than image (Mobile portrait & tablets): match full height, center horizontally
      renderHeight = height;
      renderWidth = height * imgAspect;
      offsetX = (width - renderWidth) / 2;
      offsetY = 0;
    }

    // Render full-bleed edge to edge
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
      requestAnimationFrame(() => {
        renderLoopRef.current();
      });
    } else {
      isRenderingRef.current = false;
    }
  }, [drawFrame, preloadProximityFrames]);

  useEffect(() => {
    renderLoopRef.current = renderLoop;
  }, [renderLoop]);

  const requestRender = useCallback(() => {
    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      requestAnimationFrame(() => {
        renderLoopRef.current();
      });
    }
  }, []);

  // Precise HiDPI Retina Canvas Resizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const rect = canvas.getBoundingClientRect();

    if (rect.width > 0 && rect.height > 0) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawFrame(Math.round(currentFrameRef.current));
    }
  }, [drawFrame]);

  // Progressive streaming: Load Frame 1 first to show immediately, then buffer the rest
  useEffect(() => {
    let isMounted = true;

    const initialLoad = async () => {
      // 1. Load Frame 1 with high priority
      await loadFrame(1, true);

      if (isMounted) {
        resizeCanvas();
        drawFrame(1);
        if (onInitialFramesReady) {
          onInitialFramesReady();
        }
      }

      // 2. Load immediate scroll buffer of frames 2-30
      const initialBuffer = Array.from({ length: 29 }, (_, i) => i + 2);
      await Promise.all(initialBuffer.map((f) => loadFrame(f, true)));

      // 3. Progressively load remaining frames (31 to 250) in small controlled chunks
      for (let f = 31; f <= TOTAL_FRAMES; f += 5) {
        if (!isMounted) break;
        const chunk = [];
        for (let j = 0; j < 5 && f + j <= TOTAL_FRAMES; j++) {
          if (!framesCache.current.has(f + j)) {
            chunk.push(loadFrame(f + j, false));
          }
        }
        if (chunk.length > 0) {
          await Promise.all(chunk);
        }
        await new Promise((r) => setTimeout(r, 20));
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
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });

    // Also use ResizeObserver for dynamic container monitoring
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
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

        {/* Subtle, restrained scroll indicator */}
        {!hasStartedScroll && (
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(1.5rem, 5vh, 2.5rem)',
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
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
