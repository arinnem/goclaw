import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { slides } from './slides';

function App() {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('[data-interactive]')
    )
      return;
    const x = e.clientX;
    if (x > window.innerWidth / 2) goNext();
    else goPrev();
  };

  const SlideComponent = slides[current];

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', width: '100vw', height: '100vh' }}>
      <AnimatePresence mode="wait">
        <SlideComponent key={current} />
      </AnimatePresence>

      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'rgba(255,255,255,0.05)',
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${((current + 1) / slides.length) * 100}%`,
            background: '#FF5722',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: 'fixed',
          bottom: 12,
          right: 20,
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          fontFamily: "'Space Grotesk', sans-serif",
          zIndex: 100,
        }}
      >
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}

export default App;
