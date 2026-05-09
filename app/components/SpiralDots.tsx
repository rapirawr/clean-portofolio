import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere() {
  const ref = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  
  const count = 1200; 
  
  const { positions1, positions2 } = useMemo(() => {
    const p1 = [];
    const p2 = [];
    const phi = Math.PI * (3 - Math.sqrt(5)) + 0.0002; 
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; 
      const radius = Math.sqrt(1 - y * y); 
      const theta = phi * i; 
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      const scale = 2.8; 
      const point = [x * scale, y * scale, z * scale];
      
      if (Math.random() > 0.85) {
        p2.push(...point);
      } else {
        p1.push(...point);
      }
    }
    return { 
      positions1: new Float32Array(p1), 
      positions2: new Float32Array(p2) 
    };
  }, [count]);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smooth target for rotation
    const targetX = mouse.current.y * 0.5;
    const targetY = mouse.current.x * 0.5;
    
    const inertia = 0.02;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * inertia;
    const baseRotY = t * 0.08;
    ref.current.rotation.y += (targetY + baseRotY - ref.current.rotation.y) * inertia;
    
    // SCROLL-BASED SPREAD LOGIC
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFactor = maxScroll > 0 ? Math.max(0, scrollY.current / maxScroll) : 0;
    
    // ADJUSTED SCALE LOGIC:
    // When scrollFactor is 0 (at the top), scale is exactly 1 (original size).
    // As scrollFactor increases, it spreads out (up to 3.5).
    const targetScale = 1 + scrollFactor * 3.5;
    
    const lerpFactor = 0.1; 
    ref.current.scale.x += (targetScale - ref.current.scale.x) * lerpFactor;
    ref.current.scale.y += (targetScale - ref.current.scale.y) * lerpFactor;
    ref.current.scale.z += (targetScale - ref.current.scale.z) * lerpFactor;

    // Subtle chaotic movement at the top, more twist when scrolled
    ref.current.rotation.z += scrollFactor * 0.05;

    // Floating animation
    ref.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={ref}>
      <Points positions={positions1} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#ff4500" 
          size={0.04} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          opacity={0.35} 
        />
      </Points>
      <Points positions={positions2} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#ff4500" 
          size={0.08} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending} 
          opacity={0.7} 
        />
      </Points>
    </group>
  );
}

export function SpiralDots() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
