"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

/* ─── Real-world location coordinates ─── */
const locations = [
  { name: "Dehradun", country: "India", lat: 30.3165, lng: 78.0322, color: "#00fff5", emoji: "🇮🇳" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, color: "#bf00ff", emoji: "🇸🇬" },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ─── Compute world-space camera target for a location ─── */
function locationCameraPos(lat: number, lng: number, distance = 3.8): THREE.Vector3 {
  return latLngToVector3(lat, lng, distance);
}

/* ─── High-quality Earth using real NASA textures ─── */
const RealisticEarth = ({ children, isDark = true }: { children?: React.ReactNode; isDark?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const { earthTexture, bumpMap, cloudsTexture } = useMemo(() => {
    const loader = new THREE.TextureLoader();

    // NASA Blue Marble Earth texture
    const eTex = loader.load(
      "https://unpkg.com/three-globe@2.34.1/example/img/earth-blue-marble.jpg"
    );
    eTex.colorSpace = THREE.SRGBColorSpace;

    // Topology / bump map
    const bTex = loader.load(
      "https://unpkg.com/three-globe@2.34.1/example/img/earth-topology.png"
    );

    // Cloud layer
    const cCanvas = document.createElement("canvas");
    cCanvas.width = 2048;
    cCanvas.height = 1024;
    const cCtx = cCanvas.getContext("2d")!;
    cCtx.clearRect(0, 0, 2048, 1024);
    for (let i = 0; i < 80; i++) {
      const cx = Math.random() * 2048;
      const cy = 100 + Math.random() * 824;
      const rx = 40 + Math.random() * 120;
      const ry = 15 + Math.random() * 40;
      const grd = cCtx.createRadialGradient(cx, cy, 0, cx, cy, rx);
      grd.addColorStop(0, `rgba(255,255,255,${0.15 + Math.random() * 0.2})`);
      grd.addColorStop(0.5, `rgba(255,255,255,${0.05 + Math.random() * 0.1})`);
      grd.addColorStop(1, "rgba(255,255,255,0)");
      cCtx.save();
      cCtx.scale(1, ry / rx);
      cCtx.fillStyle = grd;
      cCtx.beginPath();
      cCtx.arc(cx, cy * (rx / ry), rx, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.restore();
    }
    const cTex = new THREE.CanvasTexture(cCanvas);
    cTex.needsUpdate = true;

    return { earthTexture: eTex, bumpMap: bTex, cloudsTexture: cTex };
  }, []);

  // Only rotate clouds independently — the main group (Earth + markers) is static
  // so markers stay pinned to their geographic locations on the Earth surface.
  // Camera auto-rotate (OrbitControls) handles the overall spinning view.
  useFrame((_, delta) => {
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 128, 128]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specular={new THREE.Color(isDark ? "#6688aa" : "#88aacc")}
          shininess={isDark ? 25 : 35}
          emissive={isDark ? "#1a3050" : "#2a4468"}
          emissiveIntensity={isDark ? 0.45 : 0.35}
        />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial
          map={cloudsTexture}
          transparent
          opacity={isDark ? 0.35 : 0.5}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Location markers are children of the Earth group so they stay 
          fixed to their geographic positions on the globe surface */}
      {children}
    </group>
  );
};

/* ─── Realistic atmosphere ─── */
const Atmosphere = ({ isDark = true }: { isDark?: boolean }) => {
  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragmentShaderDark = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      vec3 color = mix(vec3(0.3, 0.6, 1.0), vec3(0.15, 0.4, 0.95), intensity);
      gl_FragColor = vec4(color, intensity * 0.75);
    }
  `;
  const fragmentShaderLight = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      vec3 color = mix(vec3(0.4, 0.7, 1.0), vec3(0.25, 0.55, 1.0), intensity);
      gl_FragColor = vec4(color, intensity * 0.5);
    }
  `;

  return (
    <mesh scale={1.15}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={isDark ? fragmentShaderDark : fragmentShaderLight}
        side={THREE.BackSide}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ─── Location markers ─── */
const LocationMarker = ({
  lat, lng, name, country, color, emoji, selected, onClick,
}: {
  lat: number; lng: number; name: string; country: string;
  color: string; emoji: string; selected?: boolean; onClick?: () => void;
}) => {
  const pos = latLngToVector3(lat, lng, 2.06);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const speed = selected ? 3 : 2;
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(t * speed) * 0.35);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.7 - Math.sin(t * speed) * 0.35;
    }
    if (outerRef.current) {
      outerRef.current.scale.setScalar(1.6 + Math.sin(t * 1.5) * 0.5);
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.25 - Math.sin(t * 1.5) * 0.15;
    }
    if (pulseRef.current && selected) {
      pulseRef.current.scale.setScalar(2 + Math.sin(t * 2) * 1.2);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.max(0, 0.18 - Math.sin(t * 2) * 0.12);
    }
  });

  return (
    <group position={pos}>
      {/* Clickable dot */}
      <mesh
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick?.(); }}
        scale={selected ? 1.6 : hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.038, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Inner pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.055, 0.072, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer soft ring */}
      <mesh ref={outerRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.09, 0.1, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Big pulse when selected */}
      {selected && (
        <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.11, 0.13, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Tooltip on hover only */}
      {hovered && (
        <Html distanceFactor={8} center style={{ pointerEvents: "none" }}>
          <div
            className="px-3 py-2 rounded-xl text-white text-xs font-bold whitespace-nowrap select-none"
            style={{
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(12px)",
              border: `1.5px solid ${color}55`,
              boxShadow: `0 0 16px ${color}30`,
              transition: "all 0.2s",
            }}
          >
            {emoji} {name}, {country}
          </div>
        </Html>
      )}
    </group>
  );
};

/* ─── Arc connection ─── */
const ConnectionArc = ({ from, to }: {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
}) => {
  const lineObj = useMemo(() => {
    const start = latLngToVector3(from.lat, from.lng, 2.06);
    const end = latLngToVector3(to.lat, to.lng, 2.06);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(3.2);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(80);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "#00ccff", transparent: true, opacity: 0.5 });
    return new THREE.Line(geometry, material);
  }, [from, to]);

  useFrame(({ clock }) => {
    (lineObj.material as THREE.LineBasicMaterial).opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.2;
  });

  return <primitive object={lineObj} />;
};

/* ─── Star field ─── */
const Stars = () => {
  const geo = useMemo(() => {
    const verts = new Float32Array(3000);
    for (let i = 0; i < 3000; i += 3) {
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      verts[i] = r * Math.sin(phi) * Math.cos(theta);
      verts[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      verts[i + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
};

/* ─── Camera controller — smooth lerp zoom to location ─── */
const CameraController = ({
  targetPosition,
  orbitRef,
  onDone,
}: {
  targetPosition: THREE.Vector3 | null;
  orbitRef: React.RefObject<any>;
  onDone: () => void;
}) => {
  const { camera } = useThree();
  const animating = useRef(false);

  useEffect(() => {
    if (targetPosition) {
      animating.current = true;
      if (orbitRef.current) orbitRef.current.autoRotate = false;
    }
  }, [targetPosition, orbitRef]);

  useFrame(() => {
    if (!targetPosition || !animating.current) return;
    camera.position.lerp(targetPosition, 0.045);
    if (camera.position.distanceTo(targetPosition) < 0.05) {
      camera.position.copy(targetPosition);
      animating.current = false;
      onDone();
    }
  });

  return null;
};

/* ─── Compute initial camera position facing midpoint of India & Singapore ─── */
function getInitialCameraPos(): THREE.Vector3 {
  const midLat = (locations[0].lat + locations[1].lat) / 2; // ~15.8
  const midLng = (locations[0].lng + locations[1].lng) / 2; // ~90.9
  return latLngToVector3(midLat, midLng, 5.2); // slightly further out
}

/* ─── Scene ─── */
const GlobeScene = ({
  focusLocation,
  onLocationClick,
  isDark,
}: {
  focusLocation: string | null;
  onLocationClick: (name: string) => void;
  isDark: boolean;
}) => {
  const { camera } = useThree();
  const orbitRef = useRef<any>(null);
  const [targetPos, setTargetPos] = useState<THREE.Vector3 | null>(null);
  const initialPos = useMemo(() => getInitialCameraPos(), []);
  const defaultPos = useMemo(() => getInitialCameraPos(), []);

  // Start camera facing India/Singapore, auto-rotate kicks in after 3 s
  useEffect(() => {
    const pos = initialPos;
    camera.position.set(pos.x, pos.y, pos.z);
    camera.lookAt(0, 0, 0);
    // Disable auto-rotate initially so user sees the locations
    if (orbitRef.current) orbitRef.current.autoRotate = false;
    const timer = setTimeout(() => {
      if (orbitRef.current && !focusLocation) orbitRef.current.autoRotate = true;
    }, 3000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera]);

  // Update camera target whenever focusLocation changes
  useEffect(() => {
    if (focusLocation) {
      const loc = locations.find((l) => l.name === focusLocation);
      if (loc) {
        const pos = locationCameraPos(loc.lat, loc.lng, 3.9);
        setTargetPos(pos);
      }
    } else {
      setTargetPos(defaultPos.clone());
    }
  }, [focusLocation, defaultPos]);

  const handleAnimDone = () => {
    if (!focusLocation && orbitRef.current) {
      orbitRef.current.autoRotate = true;
    }
  };

  return (
    <>
      {/* Lighting — brighter overall, with light-theme variant */}
      <ambientLight intensity={isDark ? 0.5 : 0.7} />
      <directionalLight position={[5, 3, 5]} intensity={isDark ? 1.8 : 2.2} color={isDark ? "#ffe8d0" : "#fff5e6"} />
      <directionalLight position={[-5, -2, -5]} intensity={isDark ? 0.5 : 0.65} color={isDark ? "#6699ff" : "#88aaff"} />
      <pointLight position={[0, 0, 6]} intensity={isDark ? 0.5 : 0.65} color="#ffffff" />

      {isDark && <Stars />}
      <RealisticEarth isDark={isDark}>
        {locations.map((loc) => (
          <LocationMarker
            key={loc.name}
            {...loc}
            selected={focusLocation === loc.name}
            onClick={() => onLocationClick(loc.name)}
          />
        ))}
        <ConnectionArc
          from={{ lat: locations[0].lat, lng: locations[0].lng }}
          to={{ lat: locations[1].lat, lng: locations[1].lng }}
        />
      </RealisticEarth>
      <Atmosphere isDark={isDark} />

      <CameraController
        targetPosition={targetPos}
        orbitRef={orbitRef}
        onDone={handleAnimDone}
      />

      <OrbitControls
        ref={orbitRef}
        enableZoom
        minDistance={3.2}
        maxDistance={9}
        enablePan={false}
        autoRotate={false}
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
};

/* ─── Export ─── */
const AIGlobe3D = ({
  focusLocation,
  onLocationClick,
}: {
  focusLocation?: string | null;
  onLocationClick?: (name: string) => void;
}) => {
  const [theme, setTheme] = useState("dark");
  const [internalFocus, setInternalFocus] = useState<string | null>(null);

  // Support both controlled (from parent) and uncontrolled (click inside globe) modes
  const activeFocus = focusLocation !== undefined ? focusLocation : internalFocus;

  const handleClick = (name: string) => {
    if (onLocationClick) {
      onLocationClick(name);
    } else {
      setInternalFocus((prev) => (prev === name ? null : name));
    }
  };

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "dark")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const dark = theme === "dark";

  return (
    <div className="relative w-full h-[340px] sm:h-[440px] md:h-[520px] lg:h-[600px]">
      <Canvas
        camera={{ position: [-0.09, 1.4, -5.0], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <GlobeScene
            focusLocation={activeFocus ?? null}
            onLocationClick={handleClick}
            isDark={dark}
          />
        </Suspense>
      </Canvas>

      {/* Location labels — clickable */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 flex-wrap justify-center px-2">
        {locations.map((loc) => {
          const isActive = activeFocus === loc.name;
          return (
            <button
              key={loc.name}
              onClick={() => handleClick(loc.name)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300"
              style={{
                background: isActive
                  ? dark ? `${loc.color}22` : `${loc.color}18`
                  : dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                border: `1.5px solid ${isActive ? loc.color + "70" : loc.color + "28"}`,
                boxShadow: isActive ? `0 0 18px ${loc.color}44` : "none",
                transform: isActive ? "scale(1.06)" : "scale(1)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: loc.color,
                  boxShadow: `0 0 ${isActive ? "12px" : "6px"} ${loc.color}`,
                  animation: isActive ? "ping 1.2s cubic-bezier(0,0,0.2,1) infinite" : "pulse 2s infinite",
                }}
              />
              <span className="text-xs font-semibold" style={{ color: isActive ? loc.color : dark ? "#e5e7eb" : "#374151" }}>
                {loc.emoji} {loc.name}
              </span>
              {isActive && (
                <svg className="w-3 h-3 ml-0.5" viewBox="0 0 12 12" fill={loc.color}>
                  <circle cx="6" cy="6" r="3" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Hint — update based on state */}
      <div
        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-300"
        style={{
          background: dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.7)",
          color: dark ? "#9ca3af" : "#6b7280",
          backdropFilter: "blur(8px)",
          border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {activeFocus ? "Click marker to reset" : "Click city to zoom in"}
      </div>

      {/* Reset button when zoomed */}
      {activeFocus && (
        <button
          onClick={() => handleClick(activeFocus)}
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 transition-all duration-200 hover:scale-105"
          style={{
            background: dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.8)",
            color: dark ? "#e5e7eb" : "#374151",
            backdropFilter: "blur(8px)",
            border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          ← Reset View
        </button>
      )}
    </div>
  );
};

export default AIGlobe3D;
