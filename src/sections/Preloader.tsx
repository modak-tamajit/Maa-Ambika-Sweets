'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  isReady: boolean;
  onFinish: () => void;
}

export default function Preloader({ isReady, onFinish }: PreloaderProps) {
  const [minTimeElapsed, setMinTimeElapsed] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // 2-second minimum visual presentation of brand emblem for premium opening
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (minTimeElapsed && isReady) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        onFinish();
      }, 700); // Wait for fade-out transition to complete
      return () => clearTimeout(exitTimer);
    }
  }, [minTimeElapsed, isReady, onFinish]);

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
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.7s',
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
