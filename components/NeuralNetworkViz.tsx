// @ts-nocheck
"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Neural network layer configuration
const LAYERS = [4, 8, 12, 8, 4]; // neurons per layer
const LAYER_SPACING = 2.5;
const NEURON_SPACING = 0.8;

interface NeuronData {
  position: [number, number, number];
  layer: number;
  index: number;
  activation: number;
}

function generateNeurons(): NeuronData[] {
  const neurons: NeuronData[] = [];
  LAYERS.forEach((count, layerIdx) => {
    const xPos = (layerIdx - (LAYERS.length - 1) / 2) * LAYER_SPACING;
    for (let i = 0; i < count; i++) {
      const yPos = (i - (count - 1) / 2) * NEURON_SPACING;
      neurons.push({
        position: [xPos, yPos, Math.sin(layerIdx + i) * 0.3],
        layer: layerIdx,
        index: i,
        activation: Math.random(),
      });
    }
  });
  return neurons;
}

function generateConnections(neurons: NeuronData[]) {
  const connections: { from: NeuronData; to: NeuronData; strength: number }[] = [];
  for (let l = 0; l < LAYERS.length - 1; l++) {
    const currentLayer = neurons.filter((n) => n.layer === l);
    const nextLayer = neurons.filter((n) => n.layer === l + 1);
    currentLayer.forEach((from) => {
      nextLayer.forEach((to) => {
        if (Math.random() > 0.3) {
          connections.push({ from, to, strength: Math.random() });
        }
      });
    });
  }
  return connections;
}

function Neuron({ position, activation, layer, onClick }: {
  position: [number, number, number];
  activation: number;
  layer: number;
  onClick?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const colors = ["#00fff5", "#4361ee", "#bf00ff", "#ff006e", "#39ff14"];
  const color = colors[layer % colors.length];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(0.12 + Math.sin(t * 2 + layer) * 0.02 + (hovered ? 0.05 : 0));
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.25 + Math.sin(t * 3 + activation * 5) * 0.05);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + activation * 0.2 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      {/* Main neuron */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 + activation * 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function Synapse({ from, to, strength, time }: {
  from: [number, number, number];
  to: [number, number, number];
  strength: number;
  time: number;
}) {
  const lineRef = useRef<THREE.Line>(null!);
  const particleRef = useRef<THREE.Mesh>(null!);

  const points = useMemo(() => {
    return [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  }, [from, to]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const firing = Math.sin(time * 3 + strength * 10) > 0.5;
  const opacity = firing ? 0.4 + strength * 0.4 : 0.05 + strength * 0.1;

  // Particle traveling along synapse
  const progress = (Math.sin(time * 2 + strength * 7) + 1) / 2;
  const particlePos = new THREE.Vector3().lerpVectors(
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
    progress
  );

  return (
    <group>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color={firing ? "#00fff5" : "#4361ee"}
          transparent
          opacity={opacity}
          linewidth={1}
        />
      </line>
      {firing && (
        <mesh ref={particleRef} position={particlePos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#00fff5" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

function NeuralNetworkScene({ onNeuronClick }: { onNeuronClick?: (neuron: NeuronData) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);

  const neurons = useMemo(() => generateNeurons(), []);
  const connections = useMemo(() => generateConnections(neurons), [neurons]);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.1) * 0.15;
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neurons */}
      {neurons.map((neuron, i) => (
        <Neuron
          key={`neuron-${i}`}
          position={neuron.position}
          activation={neuron.activation}
          layer={neuron.layer}
          onClick={() => onNeuronClick?.(neuron)}
        />
      ))}

      {/* Synapses */}
      {connections.map((conn, i) => (
        <Synapse
          key={`synapse-${i}`}
          from={conn.from.position}
          to={conn.to.position}
          strength={conn.strength}
          time={timeRef.current}
        />
      ))}

      {/* Ambient particles */}
      <NeuralParticles />
    </group>
  );
}

function NeuralParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00fff5"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

interface NeuralNetworkVizProps {
  className?: string;
  height?: string;
  showControls?: boolean;
  interactive?: boolean;
}

const NeuralNetworkViz = ({
  className = "",
  height = "100%",
  showControls = true,
  interactive = true,
}: NeuralNetworkVizProps) => {
  const [selectedNeuron, setSelectedNeuron] = useState<NeuronData | null>(null);

  const handleNeuronClick = useCallback((neuron: NeuronData) => {
    if (interactive) {
      setSelectedNeuron(neuron);
      setTimeout(() => setSelectedNeuron(null), 3000);
    }
  }, [interactive]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ height: "100%", width: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00fff5" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#bf00ff" />
        <pointLight position={[0, 10, -5]} intensity={0.3} color="#ff006e" />

        <NeuralNetworkScene onNeuronClick={handleNeuronClick} />

        {showControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        )}
      </Canvas>

      {/* Neuron info overlay */}
      {selectedNeuron && (
        <div className="absolute bottom-4 left-4 ai-glass rounded-lg px-4 py-3 text-sm">
          <div className="text-neon-cyan font-bold">
            Layer {selectedNeuron.layer + 1}, Neuron {selectedNeuron.index + 1}
          </div>
          <div className="text-gray-400">
            Activation: {(selectedNeuron.activation * 100).toFixed(1)}%
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              style={{ width: `${selectedNeuron.activation * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuralNetworkViz;
