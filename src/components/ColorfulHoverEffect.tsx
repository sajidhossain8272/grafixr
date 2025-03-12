'use client'; // Mark this as a Client Component

import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const ColorfulBackgroundEffect = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random points in a sphere
  const particles = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 2 * Math.cbrt(Math.random());

    particles[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particles[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particles[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotate particles for a continuous animation
      pointsRef.current.rotation.x += delta / 10;
      pointsRef.current.rotation.y += delta / 15;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color='#808080' // Fixed color for the particles
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default function ColorfulScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Ensure it stays in the background
      }}
    >
      <ColorfulBackgroundEffect />
    </Canvas>
  );
}