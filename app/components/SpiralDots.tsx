import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Smooth value noise ──────────────────────────────────────────────────────
function hash(n: number) {
  return ((Math.sin(n * 127.1 + 311.7) * 43758.5453123) % 1 + 1) % 1;
}
function smoothNoise(x: number, y: number, z: number) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x - ix, fy = y - iy, fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const uz = fz * fz * (3 - 2 * fz);
  const n000 = hash(ix + iy * 57 + iz * 113);
  const n100 = hash(ix + 1 + iy * 57 + iz * 113);
  const n010 = hash(ix + (iy + 1) * 57 + iz * 113);
  const n110 = hash(ix + 1 + (iy + 1) * 57 + iz * 113);
  const n001 = hash(ix + iy * 57 + (iz + 1) * 113);
  const n101 = hash(ix + 1 + iy * 57 + (iz + 1) * 113);
  const n011 = hash(ix + (iy + 1) * 57 + (iz + 1) * 113);
  const n111 = hash(ix + 1 + (iy + 1) * 57 + (iz + 1) * 113);
  return THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(n000, n100, ux),
      THREE.MathUtils.lerp(n010, n110, ux), uy
    ),
    THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(n001, n101, ux),
      THREE.MathUtils.lerp(n011, n111, ux), uy
    ),
    uz,
  );
}

// ─── Circle sprite texture ────────────────────────────────────────────────────
// Dibuat sekali sebagai Canvas 2D, di-cache di module level
let circleTexture: THREE.Texture | null = null;

function getCircleTexture(): THREE.Texture {
  if (circleTexture) return circleTexture;

  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Lingkaran penuh dengan soft edge
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0,   'rgba(255,255,255,1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  circleTexture = new THREE.CanvasTexture(canvas);
  return circleTexture;
}

// ─── Builders ────────────────────────────────────────────────────────────────
function buildFibonacciSphere(count: number, scale: number) {
  const pos = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    pos[i * 3]     = Math.cos(theta) * r * scale;
    pos[i * 3 + 1] = y * scale;
    pos[i * 3 + 2] = Math.sin(theta) * r * scale;
  }
  return pos;
}

function buildRing(count: number, radius: number, tilt: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    pos[i * 3]     = Math.cos(a) * radius;
    pos[i * 3 + 1] = Math.sin(a) * Math.sin(tilt) * radius * 0.3;
    pos[i * 3 + 2] = Math.sin(a) * Math.cos(tilt) * radius;
  }
  return pos;
}

function makeGeo(positions: Float32Array) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

// ─── Morph helper ─────────────────────────────────────────────────────────────
function morphLayer(
  base: Float32Array, dest: Float32Array,
  amp: number, t: number, speed: number, offset: number,
) {
  for (let i = 0; i < base.length / 3; i++) {
    const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
    const n = smoothNoise(
      bx * 0.6 + (t + offset) * speed,
      by * 0.6 + (t + offset) * speed * 0.7,
      bz * 0.6 + (t + offset) * speed * 1.3,
    ) * 2 - 1;
    const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
    dest[i * 3]     = bx + (bx / len) * n * amp;
    dest[i * 3 + 1] = by + (by / len) * n * amp;
    dest[i * 3 + 2] = bz + (bz / len) * n * amp;
  }
}

// ─── Module-level shared input state ─────────────────────────────────────────
const shared = { mouseX: 0, mouseY: 0, smoothX: 0, smoothY: 0, scrollY: 0 };
let listenersAttached = false;

function ensureListeners() {
  if (listenersAttached || typeof window === 'undefined') return;
  listenersAttached = true;
  window.addEventListener('mousemove', (e) => {
    shared.mouseX =  (e.clientX / window.innerWidth)  * 2 - 1;
    shared.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
  window.addEventListener('scroll', () => {
    shared.scrollY = window.scrollY;
  }, { passive: true });
}

function getScrollFactor() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.max(0, Math.min(1, shared.scrollY / max)) : 0;
}

// ─── Theme-aware palette ──────────────────────────────────────────────────────
// Dark mode  → AdditiveBlending (glow di atas gelap)
// Light mode → NormalBlending + warna lebih gelap + opacity lebih tinggi
//              agar terlihat kontras di background terang
interface Palette {
  coreColor:   string;
  midColor:    string;
  outerColor:  string;
  ring1Color:  string;
  ring2Color:  string;
  blending:    THREE.Blending;
  coreOp:      number;
  midOp:       number;
  outerOp:     number;
  ring1Op:     number;
  ring2Op:     number;
  glowFilter:  string;
}

function getPalette(isDark: boolean): Palette {
  if (isDark) {
    return {
      coreColor:  '#ff6020',
      midColor:   '#ff3a00',
      outerColor: '#ff8040',
      ring1Color: '#ffaa60',
      ring2Color: '#ff5500',
      blending:   THREE.AdditiveBlending,
      coreOp:  1.0,
      midOp:   0.75,
      outerOp: 0.50,
      ring1Op: 0.55,
      ring2Op: 0.40,
      glowFilter: 'blur(8px) brightness(1.4) saturate(1.2)',
    };
  }
  // Light mode — NormalBlending, warna lebih saturated & gelap, opacity tinggi
  return {
    coreColor:  '#cc2200',
    midColor:   '#e03000',
    outerColor: '#d94010',
    ring1Color: '#b83000',
    ring2Color: '#c03800',
    blending:   THREE.NormalBlending,
    coreOp:  0.85,
    midOp:   0.55,
    outerOp: 0.30,
    ring1Op: 0.45,
    ring2Op: 0.35,
    glowFilter: 'blur(6px) brightness(0.9) saturate(1.4)',
  };
}

// ─── Sharp layer: core + mid ──────────────────────────────────────────────────
function SharpLayer({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef  = useRef<THREE.Points>(null);
  const midRef   = useRef<THREE.Points>(null);

  const coreBase    = useMemo(() => buildFibonacciSphere(1200, 1.4), []);
  const midBase     = useMemo(() => buildFibonacciSphere(1800, 2.2), []);
  const coreMorphed = useMemo(() => new Float32Array(coreBase), [coreBase]);
  const midMorphed  = useMemo(() => new Float32Array(midBase),  [midBase]);

  const p = getPalette(isDark);

  useEffect(() => { ensureListeners(); }, []);

  // Sinkron blending + warna + opacity saat tema berganti
  useEffect(() => {
    const coreMat  = coreRef.current?.material as THREE.PointsMaterial | undefined;
    const midMat   = midRef.current?.material  as THREE.PointsMaterial | undefined;
    if (coreMat) {
      coreMat.color.set(p.coreColor);
      coreMat.blending = p.blending;
      coreMat.opacity  = p.coreOp;
      coreMat.needsUpdate = true;
    }
    if (midMat) {
      midMat.color.set(p.midColor);
      midMat.blending = p.blending;
      midMat.opacity  = p.midOp;
      midMat.needsUpdate = true;
    }
  }, [isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const g = groupRef.current;
    if (!g) return;

    shared.smoothX += (shared.mouseX - shared.smoothX) * 0.03;
    shared.smoothY += (shared.mouseY - shared.smoothY) * 0.03;

    const sf = getScrollFactor();
    g.rotation.x += (shared.smoothY * 0.4 - g.rotation.x) * 0.04;
    g.rotation.y += (shared.smoothX * 0.4 + t * 0.07 - g.rotation.y) * 0.04;
    g.rotation.z  = sf * 0.8;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, 1 + sf * 4, 0.08));
    g.position.y  = Math.sin(t * 0.4) * 0.08;

    const amp = 0.18 + sf * 0.4;
    morphLayer(coreBase, coreMorphed, amp * 0.6, t, 0.25, 0);
    morphLayer(midBase,  midMorphed,  amp,       t, 0.25, 1.5);

    if (coreRef.current?.geometry)
      (coreRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    if (midRef.current?.geometry)
      (midRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  const tex = getCircleTexture();
  return (
    <group ref={groupRef}>
      <points ref={coreRef} geometry={makeGeo(coreMorphed)}>
        <pointsMaterial
          color={p.coreColor} size={0.052} sizeAttenuation
          map={tex} alphaMap={tex} alphaTest={0.01}
          transparent opacity={p.coreOp}
          depthWrite={false} blending={p.blending}
        />
      </points>
      <points ref={midRef} geometry={makeGeo(midMorphed)}>
        <pointsMaterial
          color={p.midColor} size={0.036} sizeAttenuation
          map={tex} alphaMap={tex} alphaTest={0.01}
          transparent opacity={p.midOp}
          depthWrite={false} blending={p.blending}
        />
      </points>
    </group>
  );
}

// ─── Glow layer: outer haze + rings ───────────────────────────────────────────
function GlowLayer({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Points>(null);
  const ring2Ref = useRef<THREE.Points>(null);

  const outerBase    = useMemo(() => buildFibonacciSphere(800, 3.1), []);
  const outerMorphed = useMemo(() => new Float32Array(outerBase), [outerBase]);
  const ring1Pos     = useMemo(() => buildRing(280, 3.8,  0.4), []);
  const ring2Pos     = useMemo(() => buildRing(200, 4.6, -0.8), []);

  const p = getPalette(isDark);

  useEffect(() => { ensureListeners(); }, []);

  useEffect(() => {
    const mats = [
      { ref: outerRef, color: p.outerColor, op: p.outerOp },
      { ref: ring1Ref, color: p.ring1Color, op: p.ring1Op },
      { ref: ring2Ref, color: p.ring2Color, op: p.ring2Op },
    ];
    mats.forEach(({ ref, color, op }) => {
      const mat = ref.current?.material as THREE.PointsMaterial | undefined;
      if (mat) {
        mat.color.set(color);
        mat.blending = p.blending;
        mat.opacity  = op;
        mat.needsUpdate = true;
      }
    });
  }, [isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const g = groupRef.current;
    if (!g) return;

    const sf = getScrollFactor();
    g.rotation.x += (shared.smoothY * 0.4 - g.rotation.x) * 0.04;
    g.rotation.y += (shared.smoothX * 0.4 + t * 0.07 - g.rotation.y) * 0.04;
    g.rotation.z  = sf * 0.8;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, 1 + sf * 4, 0.08));
    g.position.y  = Math.sin(t * 0.4) * 0.08;

    const amp = 0.18 + sf * 0.4;
    morphLayer(outerBase, outerMorphed, amp * 1.4, t, 0.25, 3.0);
    if (outerRef.current?.geometry)
      (outerRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.15;
      (ring1Ref.current.material as THREE.PointsMaterial).opacity =
        p.ring1Op + Math.sin(t * 1.2) * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.1;
      ring2Ref.current.rotation.x =  t * 0.05;
      (ring2Ref.current.material as THREE.PointsMaterial).opacity =
        p.ring2Op + Math.sin(t * 0.8 + 1) * 0.10;
    }
  });

  const tex = getCircleTexture();
  return (
    <group ref={groupRef}>
      <points ref={outerRef} geometry={makeGeo(outerMorphed)}>
        <pointsMaterial
          color={p.outerColor} size={0.10} sizeAttenuation
          map={tex} alphaMap={tex} alphaTest={0.01}
          transparent opacity={p.outerOp}
          depthWrite={false} blending={p.blending}
        />
      </points>
      <points ref={ring1Ref} geometry={makeGeo(ring1Pos)}>
        <pointsMaterial
          color={p.ring1Color} size={0.055} sizeAttenuation
          map={tex} alphaMap={tex} alphaTest={0.01}
          transparent opacity={p.ring1Op}
          depthWrite={false} blending={p.blending}
        />
      </points>
      <points ref={ring2Ref} geometry={makeGeo(ring2Pos)}>
        <pointsMaterial
          color={p.ring2Color} size={0.045} sizeAttenuation
          map={tex} alphaMap={tex} alphaTest={0.01}
          transparent opacity={p.ring2Op}
          depthWrite={false} blending={p.blending}
        />
      </points>
    </group>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export function SpiralDots() {
  const [mounted, setMounted] = useState(false);

  // Deteksi tema dari data-theme attribute — reaktif terhadap perubahan
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);

    const check = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    };
    check();

    // MutationObserver untuk reaktif saat tema berubah
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  if (!mounted) return null;

  const palette  = getPalette(isDark);
  const camProps = {
    camera: { position: [0, 0, 8] as [number, number, number], fov: 42 },
    gl: { antialias: false, alpha: true, powerPreference: 'high-performance' as const },
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>

      {/* Blurred glow layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        filter: palette.glowFilter,
        transform: 'scale(1.05)',
        transformOrigin: 'center',
      }}>
        <Canvas {...camProps} dpr={[1, 1.2]}>
          <GlowLayer isDark={isDark} />
        </Canvas>
      </div>

      {/* Sharp layer */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Canvas {...camProps} dpr={[1, 1.5]}>
          <SharpLayer isDark={isDark} />
        </Canvas>
      </div>

    </div>
  );
}
