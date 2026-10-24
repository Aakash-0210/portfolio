import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroCanvasProps {
  paused?: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ paused = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(paused);
  const animationControlsRef = useRef({ pause: () => {}, resume: () => {} });
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateRenderMode = () => {
      setShouldRender3D(!mediaQuery.matches);
    };

    updateRenderMode();

    mediaQuery.addEventListener?.("change", updateRenderMode);

    return () => {
      mediaQuery.removeEventListener?.("change", updateRenderMode);
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) animationControlsRef.current.pause();
    else animationControlsRef.current.resume();
  }, [paused]);

  useEffect(() => {
    if (!shouldRender3D || !webglAvailable) return;

    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.1,
      1000,
    );
    camera.position.z = 18;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isCoarsePointer,
        powerPreference: "low-power",
      });
    } catch {
      const fallbackFrame = window.requestAnimationFrame(() => setWebglAvailable(false));
      return () => window.cancelAnimationFrame(fallbackFrame);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1 : 1.5));
    renderer.setSize(Math.max(container.clientWidth, 1), Math.max(container.clientHeight, 1));
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    // Main Group for interactive mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    scene.add(new THREE.AmbientLight(0xe6dff2, 1.3));
    const keyLight = new THREE.PointLight(0xf2ecff, 34, 38);
    keyLight.position.set(-6, 7, 8);
    scene.add(keyLight);
    const accentLight = new THREE.PointLight(0xb8a7d9, 22, 32);
    accentLight.position.set(7, -4, -2);
    scene.add(accentLight);

    // 1. Faceted metallic core with a restrained wireframe highlight.
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x9994a5,
      metalness: 0.72,
      roughness: 0.3,
      emissive: 0x17111f,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    const coreEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeo, 18),
      new THREE.LineBasicMaterial({
        color: 0xe5dcf2,
        transparent: true,
        opacity: 0.36,
      }),
    );
    coreMesh.add(coreEdges);

    // 2. Inner Core (Warm Sand / Champagne Accent)
    const innerGeo = new THREE.SphereGeometry(2.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xb8a7d9,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Central Core Point Glow (Refined Bone White)
    const centerPointGeo = new THREE.SphereGeometry(0.42, 16, 16);
    const centerPointMat = new THREE.MeshBasicMaterial({
      color: 0xf4f4f0,
    });
    const centerPoint = new THREE.Mesh(centerPointGeo, centerPointMat);
    mainGroup.add(centerPoint);

    // 4. Orbiting Rings (Minimalist Precision Rings)
    const ring1Geo = new THREE.TorusGeometry(6, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xb8a7d9,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(7.2, 0.025, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa1a1aa,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    mainGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(8.4, 0.02, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xb8a7d9,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    mainGroup.add(ring3);

    // 5. Orbiting Tech Nodes (Satellites in Warm Silver & Earthen Tones)
    const nodeGeos = new THREE.SphereGeometry(0.35, 16, 16);
    const nodeColors = [
      0xf4f4f0, 0xb8a7d9, 0xa1a1aa, 0xb8a7d9, 0xd4d4cb, 0xe5e5dd,
    ];
    const satellites: THREE.Mesh[] = [];
    const satelliteCount = 6;

    for (let i = 0; i < satelliteCount; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
      });
      const sat = new THREE.Mesh(nodeGeos, mat);
      satellites.push(sat);
      scene.add(sat);
    }

    // 6. Ambient Stardust Field (Soft Silver / Champagne)
    const particleCount = isCoarsePointer ? 150 : 420;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      color: 0xd4d4cb,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
      targetRotationY = x * 0.38;
      targetRotationX = -y * 0.32;
    };

    const handlePointerLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      animationControlsRef.current.pause();
      setWebglAvailable(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    // Animation Loop
    let animationFrameId = 0;
    let isCanvasVisible = false;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isCanvasVisible || document.hidden || pausedRef.current) {
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Core rotation
      coreMesh.rotation.y = elapsedTime * 0.12;
      coreMesh.rotation.x = elapsedTime * 0.06;

      innerMesh.rotation.y = -elapsedTime * 0.18;
      innerMesh.rotation.z = elapsedTime * 0.1;

      // Pulse inner core
      const scale = 1 + Math.sin(elapsedTime * 1.8) * 0.06;
      centerPoint.scale.set(scale, scale, scale);

      // Gimbal Rings
      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.y = -elapsedTime * 0.12;
      ring3.rotation.x = elapsedTime * 0.14;

      // Orbiting Satellites
      satellites.forEach((sat, idx) => {
        const radius = 6.8 + (idx % 2) * 1.4;
        const speed = 0.4 + idx * 0.08;
        const angle =
          elapsedTime * speed + (idx * Math.PI * 2) / satelliteCount;
        const elevation = Math.sin(elapsedTime * 0.7 + idx) * 2.2;

        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius;
        sat.position.y = elevation;
      });

      // Ambient particle slow drift
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // Smooth lerp to mouse position
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };
    const startAnimation = () => {
      if (
        isCanvasVisible &&
        !document.hidden &&
        !pausedRef.current &&
        !animationFrameId
      ) {
        clock.start();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationControlsRef.current = {
      pause: stopAnimation,
      resume: startAnimation,
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isCanvasVisible = entry.isIntersecting;
        startAnimation();
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(container);

    const handleDocumentVisibility = () => {
      if (document.hidden) {
        stopAnimation();
      } else startAnimation();
    };
    document.addEventListener("visibilitychange", handleDocumentVisibility);

    // Cleanup
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      document.removeEventListener(
        "visibilitychange",
        handleDocumentVisibility,
      );
      animationControlsRef.current = { pause: () => {}, resume: () => {} };
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments)) return;
        geometries.add(object.geometry);
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
        objectMaterials.forEach((material) => materials.add(material));
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      scene.clear();
      renderer.dispose();
    };
  }, [shouldRender3D, webglAvailable]);

  if (!shouldRender3D || !webglAvailable) {
    return (
      <div className="interactive-scene-frame relative w-full flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,167,217,0.18),transparent_55%)]" />
        <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none animate-float shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
          <span>SYSTEM ARCHITECTURE • V2.0</span>
        </div>

        <div
          className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-2 pointer-events-none animate-float shadow-lg"
          style={{ animationDelay: "2s" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <span>REACT • NODE • JAVA • SQL</span>
        </div>
      </div>
    );
  }

  return (
    <div className="interactive-scene-frame relative w-full flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full"
      />

      {/* Floating Monospace Badges */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none animate-float shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
        <span>SYSTEM ARCHITECTURE • V2.0</span>
      </div>

      <div
        className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-2 pointer-events-none animate-float shadow-lg"
        style={{ animationDelay: "2s" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
        <span>REACT • NODE • JAVA • SQL</span>
      </div>
    </div>
  );
};
