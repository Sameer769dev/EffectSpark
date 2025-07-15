
'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';

function Scene() {
  const distortRef = useRef<any>();
  const meshRef = useRef<any>();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (distortRef.current) {
        distortRef.current.distort = Math.sin(time) * 0.4;
    }
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Icosahedron args={[1.5, 6]} ref={meshRef}>
      <MeshDistortMaterial
        ref={distortRef}
        color={'#FF69B4'}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.1}
        emissive={'#8A2BE2'}
        emissiveIntensity={0.3}
      />
    </Icosahedron>
  );
}

export function Hero3DMockup() {
  return (
    <Canvas key="hero-canvas" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2}/>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

    