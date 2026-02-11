import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const palette = [
      [1.0, 0.2, 0.6],   // pink
      [0.1, 0.7, 1.0],   // blue
      [0.5, 1.0, 0.3],   // green
      [1.0, 0.6, 0.1],   // orange
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c[0];
      cols[i * 3 + 1] = c[1];
      cols[i * 3 + 2] = c[2];
    }
    return cols;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function AnimatedTorusKnot() {
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.3;
      mesh.current.rotation.y += delta * 0.2;
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, pointer.x * 1.5, 0.05);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, pointer.y * 1.5, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} scale={1.2}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <MeshDistortMaterial
          color="#ff3388"
          emissive="#ff3388"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#1ab8ff" />
        <pointLight position={[-5, -5, 3]} intensity={0.8} color="#ff3388" />
        <pointLight position={[0, 5, -5]} intensity={0.6} color="#88ff33" />
        <AnimatedTorusKnot />
        <Particles />
      </Canvas>
    </div>
  );
};

export default Scene3D;
