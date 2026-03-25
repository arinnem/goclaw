import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useSlideScale } from '../lib/useSlideScale';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../lib/theme';

interface SlideLayoutProps {
  children: ReactNode;
  slideNumber?: number;
}

export function SlideLayout({ children, slideNumber }: SlideLayoutProps) {
  const scale = useSlideScale();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f0f',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(255, 87, 34, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(79, 195, 247, 0.04) 0%, transparent 50%),
            #1a1a1a
          `,
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        {/* Slide number watermark */}
        {slideNumber !== undefined && (
          <span
            style={{
              position: 'absolute',
              top: 32,
              right: 40,
              fontSize: 120,
              fontFamily: "'Archivo Black', sans-serif",
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.03)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {String(slideNumber).padStart(2, '0')}
          </span>
        )}

        {/* Content */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: '48px 64px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
