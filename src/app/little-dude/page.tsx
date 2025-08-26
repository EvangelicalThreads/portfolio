"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// --------- LittleGuy 3D model component ---------
function LittleGuyModel({ targetX = 0, dancing = true }: { targetX?: number; dancing?: boolean }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/little-guy.glb");

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1,
      });
    }
  });

  useFrame(({ clock }) => {
    if (!modelRef.current) return;
    const t = clock.elapsedTime;

    if (dancing) {
      // Bounce and sway
      modelRef.current.position.y = 0.2 * Math.abs(Math.sin(t * 4));
      // Smoothly move to targetX (homepage spot)
      modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.05;
      modelRef.current.rotation.y = 0 + 0.05 * Math.sin(t * 2);
      modelRef.current.rotation.x = 0 + 0.05 * Math.sin(t * 4);
    } else {
      // Idle position
      modelRef.current.position.y = 0;
      modelRef.current.position.x = targetX;
      modelRef.current.rotation.y = 0;
      modelRef.current.rotation.x = 0;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2} />;
}

// --------- Homepage + Loading Overlay ---------
export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaded(true), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div className="w-full h-screen relative">
      {/* Fullscreen Canvas */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <LittleGuyModel targetX={loaded ? 1 : 0} dancing={true} />
      </Canvas>

      {/* Loading Overlay */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="mb-4 text-xl font-bold text-white">Loading</div>
          <div className="w-64 h-3 bg-gray-700 rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
