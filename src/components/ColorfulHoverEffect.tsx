"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const ColorfulBackgroundEffect = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  // Generate positions in a sphere
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    // Spherical coordinates
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 2 * Math.cbrt(Math.random());

    // Position
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Random RGB color
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    colors[i * 3 + 0] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotate the point cloud for a continuous animation
      pointsRef.current.rotation.x += delta / 10;
      pointsRef.current.rotation.y += delta / 15;
    }
  });

  return (
    <>
    <Points 
      ref={pointsRef}
      positions={positions}
      colors={colors}
      stride={3}
      frustumCulled={false}
    >
      {/* Set vertexColors so each particle uses its own color */}
      <PointMaterial
        vertexColors
        transparent
        size={0.01}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
    </>
  );
};

export default function ColorfulScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 1] }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Keep it behind other content
      }}
    >
      <ColorfulBackgroundEffect />
    </Canvas>
  );
}
