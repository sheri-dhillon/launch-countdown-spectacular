import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating Particles ── */
function Particles({ count = 120 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 25;
      p[i * 3 + 1] = (Math.random() - 0.5) * 25;
      p[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return p;
  }, [count]);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22d3b7" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ── Smartphone ── */
function Smartphone({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.4;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, position[0] + pointer.x * 0.6, 0.03);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1] + pointer.y * 0.4, 0.03);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Body */}
        <RoundedBox args={[0.7, 1.3, 0.08]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.15} />
        </RoundedBox>
        {/* Screen */}
        <RoundedBox args={[0.58, 1.1, 0.01]} radius={0.04} smoothness={4} position={[0, 0, 0.045]}>
          <meshStandardMaterial color="#22d3b7" emissive="#22d3b7" emissiveIntensity={0.6} metalness={0.3} roughness={0.5} />
        </RoundedBox>
      </group>
    </Float>
  );
}

/* ── Laptop ── */
function Laptop({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.25;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.15, 0.03);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Base */}
        <RoundedBox args={[1.6, 0.06, 1.1]} radius={0.02} smoothness={4} position={[0, -0.3, 0]}>
          <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* Keyboard area */}
        <RoundedBox args={[1.4, 0.01, 0.9]} radius={0.01} smoothness={4} position={[0, -0.27, 0]}>
          <meshStandardMaterial color="#0f3460" emissive="#7c3aed" emissiveIntensity={0.15} />
        </RoundedBox>
        {/* Screen */}
        <group position={[0, 0.25, -0.5]} rotation={[-0.3, 0, 0]}>
          <RoundedBox args={[1.5, 1.0, 0.04]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#16213e" metalness={0.9} roughness={0.2} />
          </RoundedBox>
          <RoundedBox args={[1.35, 0.85, 0.01]} radius={0.01} smoothness={4} position={[0, 0, 0.025]}>
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} metalness={0.2} roughness={0.6} />
          </RoundedBox>
        </group>
      </group>
    </Float>
  );
}

/* ── Smartwatch ── */
function Smartwatch({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y -= d * 0.5;
    ref.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref} position={position} scale={0.8}>
        {/* Case */}
        <RoundedBox args={[0.5, 0.6, 0.12]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.95} roughness={0.1} />
        </RoundedBox>
        {/* Screen */}
        <RoundedBox args={[0.38, 0.46, 0.01]} radius={0.06} smoothness={4} position={[0, 0, 0.065]}>
          <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} metalness={0.2} roughness={0.5} />
        </RoundedBox>
        {/* Band top */}
        <RoundedBox args={[0.35, 0.5, 0.06]} radius={0.02} smoothness={4} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#0f3460" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {/* Band bottom */}
        <RoundedBox args={[0.35, 0.5, 0.06]} radius={0.02} smoothness={4} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#0f3460" metalness={0.7} roughness={0.3} />
        </RoundedBox>
      </group>
    </Float>
  );
}

/* ── Main Scene ── */
const Scene3D = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
      <fog attach="fog" args={["#080b14", 8, 22]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#22d3b7" />
      <pointLight position={[-4, -3, 3]} intensity={0.9} color="#7c3aed" />
      <pointLight position={[0, 5, -3]} intensity={0.6} color="#eab308" />
      <spotLight position={[0, 6, 2]} angle={0.4} penumbra={0.8} intensity={0.5} color="#3b82f6" />

      <Smartphone position={[2.2, 0.8, -1]} />
      <Laptop position={[-0.3, -0.2, 0]} />
      <Smartwatch position={[-2.5, 1, -0.5]} />
      <Particles />
    </Canvas>
  </div>
);

export default Scene3D;
