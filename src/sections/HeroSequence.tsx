'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 50;

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

  const [hasStartedScroll, setHasStartedScroll] = useState<boolean>(false);

  // Helper to load and decode a single frame
  const loadFrame = useCallback((frameNumber: number): Promise<HTMLImageElement | null> => {
    if (framesCache.current.has(frameNumber)) {
      return Promise.resolve(framesCache.current.get(frameNumber)!);
    }
    if (loadingFrames.current.has(frameNumber)) {
      return Promise.resolve(null);
    }

    loadingFrames.current.add(frameNumber);

    return new Promise((resolve) => {
      const img = new Image();
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

  // Priority queue loading around current frame
  const preloadProximityFrames = useCallback((centerFrame: number) => {
    const priorityOffsets = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, 7, 8, 9, 10];
    
    priorityOffsets.forEach((offset) => {
      const target = centerFrame + offset;
      if (target >= 1 && target <= TOTAL_FRAMES && !framesCache.current.has(target)) {
        loadFrame(target);
      }
    });
  }, [loadFrame]);

  // Canvas draw function with aspect-ratio-preserving contain fit + cream letterbox
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Find the closest available loaded frame if exact frame isn't decoded yet
    let imgToDraw: HTMLImageElement | undefined = framesCache.current.get(frameNum);
    if (!imgToDraw) {
      // Look for nearest neighbour in cache
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

    // Clear and fill with authoritative cream background
    ctx.fillStyle = '#F8EED9';
    ctx.fillRect(0, 0, width, height);

    // Calculate aspect ratio cover fit (edge-to-edge fill, zero empty side bars)
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = width / height;

    let renderWidth = width;
    let renderHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      // Viewport is wider than image: scale to fill 100% width
      renderWidth = width;
      renderHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - renderHeight) / 2;
    } else {
      // Viewport is taller than image: scale to fill 100% height
      renderHeight = height;
      renderWidth = height * imgAspect;
      offsetX = (width - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(imgToDraw, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnFrameRef.current = frameNum;
  }, []);

  // Continuous visual smoothing render loop via requestAnimationFrame
  const renderLoop = useCallback(() => {
    const target = targetFrameRef.current;
    const current = currentFrameRef.current;

    // Smooth convergence toward deterministic target frame
    const diff = target - current;
    
    if (Math.abs(diff) < 0.05) {
      currentFrameRef.current = target;
    } else {
      // Visual interpolation only
      currentFrameRef.current += diff * 0.25;
    }

    const roundedFrame = Math.round(currentFrameRef.current);
    const clampedFrame = Math.max(1, Math.min(TOTAL_FRAMES, roundedFrame));

    if (clampedFrame !== lastDrawnFrameRef.current) {
      drawFrame(clampedFrame);
    }

    // Preload frames around current position
    preloadProximityFrames(clampedFrame);

    // Keep rendering until converged to target
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

  // Resize handler for canvas DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Preload and decode all 50 frames simultaneously
  useEffect(() => {
    let isMounted = true;

    const initialLoad = async () => {
      // Load all 50 frames in parallel
      const allFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);
      
      // Load in two rapid batches to maximize concurrency without network choke
      await Promise.all(allFrames.slice(0, 25).map((f) => loadFrame(f)));
      if (isMounted) {
        resizeCanvas();
        drawFrame(1);
      }
      
      await Promise.all(allFrames.slice(25).map((f) => loadFrame(f)));

      if (isMounted) {
        resizeCanvas();
        drawFrame(1);
        if (onInitialFramesReady) {
          onInitialFramesReady();
        }
      }
    };

    initialLoad();

    return () => {
      isMounted = false;
    };
  }, [loadFrame, resizeCanvas, drawFrame, onInitialFramesReady]);

  // Scroll listener to deterministically calculate targetFrame
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Calculate scroll progress from 0.0 to 1.0 within the pinned container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      if (progress > 0 && !hasStartedScroll) {
        setHasStartedScroll(true);
      }

      // Deterministic mapping: 0% -> Frame 1, 100% -> Frame 50
      const calculatedTarget = Math.floor(progress * (TOTAL_FRAMES - 1)) + 1;
      targetFrameRef.current = Math.max(1, Math.min(TOTAL_FRAMES, calculatedTarget));

      requestRender();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [hasStartedScroll, requestRender, resizeCanvas]);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '350vh', // Pinned scroll container distance
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

        {/* Subtle, restrained scroll indicator visible only before initial scroll */}
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
