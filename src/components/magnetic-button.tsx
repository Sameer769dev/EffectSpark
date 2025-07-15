
'use client';

import React, { useRef, useEffect, Children } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactElement;
}

export function MagneticButton({ children }: MagneticButtonProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magneticElement = magneticRef.current;
    if (!magneticElement) return;

    const childElement = magneticElement.firstElementChild as HTMLElement;
    if (!childElement) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticElement.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      gsap.to(childElement, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    const onMouseLeave = () => {
      gsap.to(childElement, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    magneticElement.addEventListener('mousemove', onMouseMove);
    magneticElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      magneticElement.removeEventListener('mousemove', onMouseMove);
      magneticElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magneticRef });
}
