
'use client';

import React,
{
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState < {
    x: number | null;y: number | null
  } > ({
    x: null,
    y: null
  });

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const {
        clientX,
        clientY
      } = event;
      setMousePosition({
        x: clientX,
        y: clientY
      });
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return mousePosition;
};


const SparkleIcon = () => {
  const id = `sparkle-gradient-${React.useId()}`;
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute text-primary motion-safe:animate-sparkle-fade">
      <defs>
        <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <path d="M6.02799 2.12132L6.88661 4.73033L6.9634 5H9.60533L7.22166 6.42705L6.36304 9.03607L5.50442 6.42705L3.12076 5H5.76269L6.02799 2.12132Z" fill={`url(#${id})`} />
      <path d="M10.028 6.12132L10.8866 8.73033L10.9634 9H13.6053L11.2217 10.4271L10.363 13.0361L9.50442 10.4271L7.12076 9H9.76269L10.028 6.12132Z" fill={`url(#${id})`} />
    </svg>
  )
}

export const CursorSparkles = () => {
  const {
    x,
    y
  } = useMousePosition();
  const [sparkles, setSparkles] = useState < Array < {
    id: number,
    x: number,
    y: number
  } >> ([]);
  const lastSparkleTime = useRef(0);

  const addSparkle = useCallback((x: number, y: number) => {
    const newSparkle = {
      id: Date.now(),
      x: x + window.scrollX,
      y: y + window.scrollY,
    };
    setSparkles(prev => [...prev, newSparkle]);

    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1500);
  }, []);

  useEffect(() => {
    const now = Date.now();
    if (x !== null && y !== null && now - lastSparkleTime.current > 50) {
      addSparkle(x, y);
      lastSparkleTime.current = now;
    }
  }, [x, y, addSparkle]);

  return (
    <>
      {sparkles.map(sparkle => (
        <div key={sparkle.id} style={{ left: `${sparkle.x}px`, top: `${sparkle.y}px` }} className="absolute pointer-events-none z-[9999]">
          <SparkleIcon />
        </div>
      ))}
    </>
  );
};

    