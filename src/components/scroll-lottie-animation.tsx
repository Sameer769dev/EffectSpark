
'use client';

import { useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'react-lottie-player';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animationData from '@/lottie/creative-process.json'; 

gsap.registerPlugin(ScrollTrigger);

export function ScrollLottieAnimation() {
  const ref = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = ref.current;
    if (!animation || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * (animation.getDuration(true) - 1));
          animation.goToAndStop(frame, true);
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <Lottie
        ref={ref}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
