import { useState, useEffect, useCallback } from 'react';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from './theme';

export function useSlideScale() {
  const getScale = useCallback(() => {
    const sx = window.innerWidth / SLIDE_WIDTH;
    const sy = window.innerHeight / SLIDE_HEIGHT;
    return Math.min(sx, sy);
  }, []);

  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const onResize = () => setScale(getScale());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getScale]);

  return scale;
}
