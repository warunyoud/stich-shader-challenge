import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import * as THREE from 'three'; 

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  uniform int u_stitchType;
  uniform vec3 u_stitchColor;
  uniform vec3 u_backgroundColor;
  uniform float u_stitchThickness;
  uniform float u_spacing;
  uniform float u_dashLength;
  uniform float u_gapLength;
  uniform vec2 u_resolution;

  void main() {
    vec3 color = u_backgroundColor;
    float aspectRatio = u_resolution.x / u_resolution.y;

    //Add your code here

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const StitchShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    u_stitchType: { value: 0 },
    u_stitchColor: { value: new THREE.Color(0x000000) },
    u_backgroundColor: { value: new THREE.Color(0xffffff) },
    u_stitchThickness: { value: 0.05 },
    u_spacing: { value: 0.05 },
    u_dashLength: { value: 0.025 },
    u_gapLength: { value: 0.0125 },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useEffect(() => {
    const handleResize = () => {
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [uniforms]);

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial; 
      if (material.uniforms) {
        material.uniforms.u_resolution.value.set(size.width, size.height);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};