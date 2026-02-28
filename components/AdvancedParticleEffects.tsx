// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type ParticlePreset = "neuron_fire" | "data_flow" | "ai_spark" | "quantum" | "ambient";

interface ParticleConfig {
  count: number;
  color: string;
  size: number;
  speed: number;
  spread: number;
  opacity: number;
}

const presets: Record<ParticlePreset, ParticleConfig> = {
  neuron_fire: { count: 3000, color: "#00fff5", size: 0.02, speed: 1.5, spread: 8, opacity: 0.6 },
  data_flow: { count: 2000, color: "#4361ee", size: 0.015, speed: 2, spread: 12, opacity: 0.5 },
  ai_spark: { count: 1500, color: "#bf00ff", size: 0.025, speed: 3, spread: 6, opacity: 0.7 },
  quantum: { count: 4000, color: "#39ff14", size: 0.01, speed: 0.5, spread: 15, opacity: 0.4 },
  ambient: { count: 1000, color: "#ff006e", size: 0.012, speed: 0.3, spread: 20, opacity: 0.3 },
};

function ParticleSystem({ preset = "ambient" }: { preset: ParticlePreset }) {
  const ref = useRef<THREE.Points>(null!);
  const config = presets[preset];

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(config.count * 3);
    const vel = new Float32Array(config.count * 3);
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * config.spread;
      pos[i3 + 1] = (Math.random() - 0.5) * config.spread;
      pos[i3 + 2] = (Math.random() - 0.5) * config.spread;
      vel[i3] = (Math.random() - 0.5) * 0.02 * config.speed;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.02 * config.speed;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02 * config.speed;
    }
    return [pos, vel];
  }, [config.count, config.spread, config.speed]);

  useFrame((state) => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      posArr[i3] += velocities[i3];
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      // Boundary check
      const halfSpread = config.spread / 2;
      for (let j = 0; j < 3; j++) {
        if (Math.abs(posArr[i3 + j]) > halfSpread) {
          velocities[i3 + j] *= -1;
        }
      }

      // Add subtle wave motion
      posArr[i3 + 1] += Math.sin(t + i * 0.01) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={config.color}
        size={config.size}
        sizeAttenuation
        depthWrite={false}
        opacity={config.opacity}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface AdvancedParticleEffectsProps {
  preset?: ParticlePreset;
  className?: string;
  height?: string;
  background?: boolean;
}

const AdvancedParticleEffects = ({
  preset = "ambient",
  className = "",
  height = "100%",
  background = false,
}: AdvancedParticleEffectsProps) => {
  return (
    <div
      className={`${background ? "absolute inset-0 pointer-events-none" : "relative"} ${className}`}
      style={{ height: background ? "100%" : height }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ height: "100%", width: "100%" }}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleSystem preset={preset} />
      </Canvas>
    </div>
  );
};

export default AdvancedParticleEffects;
