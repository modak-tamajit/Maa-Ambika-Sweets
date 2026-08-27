'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  isReady: boolean;
  onFinish: () => void;
}

export default function Preloader({ isReady, onFinish }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const minTimeElapsedRef = useRef<boolean>(false);
  const hasFinishedRef = useRef<boolean>(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Safe dismiss helper
  const triggerExit = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onFinishRef.current();
    }, 600);
  };

  useEffect(() => {
    // 1. Enforce a minimum 1.8s branding presentation
    const minTimer = setTimeout(() => {
      minTimeElapsedRef.current = true;
      if (isReady) {
        triggerExit();
      }
    }, 1800);

    // 2. Absolute safety fallback: Never block user beyond 3.5s under any network condition
    const maxFallbackTimer = setTimeout(() => {
      triggerExit();
    }, 3500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxFallbackTimer);
    };
  }, [isReady]);

  // If isReady becomes true after minimum time has already elapsed
  useEffect(() => {
    if (isReady && minTimeElapsedRef.current) {
      triggerExit();
    }
  }, [isReady]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#F8EED9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
        opacity: isExiting ? 0 : 1,
        visibility: isExiting ? 'hidden' : 'visible',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
      aria-hidden={isExiting}
    >
      <div
        style={{
          position: 'relative',
          width: 'clamp(140px, 25vw, 220px)',
          height: 'clamp(140px, 25vw, 220px)',
          animation: 'fadeScaleIn 0.8s ease-out forwards',
        }}
      >
        <Image
          src="/brand/logo.png"
          alt="Maa Ambika Sweets Emblem"
          fill
          sizes="(max-width: 768px) 160px, 220px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      <style jsx>{`
        @keyframes fadeScaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
