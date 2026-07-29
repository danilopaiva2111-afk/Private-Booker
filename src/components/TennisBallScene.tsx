"use client";

import { Float, Sparkles, Torus } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function TennisBall() {
  const group = useRef<THREE.Group>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -pointer.x * 0.2,
      0.05
    );
    setPointer({
      x: state.pointer.x,
      y: state.pointer.y,
    });
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={group} position={[2.4, 0.2, -0.5]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color="#cff33b"
            roughness={0.5}
            clearcoat={0.5}
            clearcoatRoughness={0.5}
            sheen={1}
            sheenColor="#e4ff8a"
            emissive="#5c7a12"
            emissiveIntensity={0.35}
          />
        </mesh>
        <Torus
          args={[1, 0.032, 16, 100, Math.PI * 1.15]}
          rotation={[0.5, 0.4, 0.9]}
        >
          <meshStandardMaterial
            color="#f5f7ee"
            roughness={0.4}
            emissive="#f5f7ee"
            emissiveIntensity={0.15}
          />
        </Torus>
        <Torus
          args={[1, 0.032, 16, 100, Math.PI * 1.15]}
          rotation={[0.5 + Math.PI, 0.4 + Math.PI, 0.9]}
        >
          <meshStandardMaterial
            color="#f5f7ee"
            roughness={0.4}
            emissive="#f5f7ee"
            emissiveIntensity={0.15}
          />
        </Torus>
      </group>
    </Float>
  );
}

export default function TennisBallScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <spotLight
        position={[5, 6, 5]}
        angle={0.35}
        penumbra={1}
        intensity={2.2}
        color="#cff33b"
        castShadow
      />
      <pointLight position={[-6, -2, -4]} intensity={0.6} color="#4a9dff" />
      <pointLight position={[0, -4, 3]} intensity={0.5} color="#ffffff" />
      <directionalLight
        position={[-3, 4, -6]}
        intensity={0.8}
        color="#e4ff8a"
      />
      <TennisBall />
      <Sparkles
        count={60}
        scale={[8, 6, 4]}
        size={2}
        speed={0.25}
        opacity={0.4}
        color="#cff33b"
      />
    </Canvas>
  );
}
