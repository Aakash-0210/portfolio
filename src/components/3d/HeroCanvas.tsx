import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  paused?: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ paused = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(paused);
  const animationControlsRef = useRef({ pause: () => {}, resume: () => {} });
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine)');

    const updateRenderMode = () => {
      setShouldRender3D(pointerQuery.matches && !mediaQuery.matches);
    };

    updateRenderMode();

    mediaQuery.addEventListener?.('change', updateRenderMode);
    pointerQuery.addEventListener?.('change', updateRenderMode);

    return () => {
      mediaQuery.removeEventListener?.('change', updateRenderMode);
      pointerQuery.removeEventListener?.('change', updateRenderMode);
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) animationControlsRef.current.pause();
    else animationControlsRef.current.resume();
  }, [paused]);

  useEffect(() => {
    if (!shouldRender3D) return;

    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Main Group for interactive mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core: Sculptural Icosahedron (Monochrome Silver Wireframe)
    const coreGeo = new THREE.IcosahedronGeometry(4, 3);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xd4d4cb,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Inner Core (Warm Sand / Champagne Accent)
    const innerGeo = new THREE.SphereGeometry(2.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xB8A7D9,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Central Core Point Glow (Refined Bone White)
    const centerPointGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const centerPointMat = new THREE.MeshBasicMaterial({
      color: 0xf4f4f0,
    });
    const centerPoint = new THREE.Mesh(centerPointGeo, centerPointMat);
    mainGroup.add(centerPoint);

    // 4. Orbiting Rings (Minimalist Precision Rings)
    const ring1Geo = new THREE.TorusGeometry(6, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xB8A7D9,
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
      color: 0xB8A7D9,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    mainGroup.add(ring3);

    // 5. Orbiting Tech Nodes (Satellites in Warm Silver & Earthen Tones)
    const nodeGeos = new THREE.SphereGeometry(0.35, 16, 16);
    const nodeColors = [0xf4f4f0, 0xB8A7D9, 0xa1a1aa, 0xB8A7D9, 0xd4d4cb, 0xe5e5dd];
    const satellites: THREE.Mesh[] = [];
    const satelliteCount = 6;

    for (let i = 0; i < satelliteCount; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: nodeColors[i % nodeColors.length] });
      const sat = new THREE.Mesh(nodeGeos, mat);
      satellites.push(sat);
      scene.add(sat);
    }

    // 6. Ambient Stardust Field (Soft Silver / Champagne)
    const particleCount = 650;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.6;
      targetRotationX = -y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

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
        const angle = elapsedTime * speed + (idx * Math.PI * 2) / satelliteCount;
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
      if (isCanvasVisible && !document.hidden && !pausedRef.current && !animationFrameId) {
        clock.start();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationControlsRef.current = { pause: stopAnimation, resume: startAnimation };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isCanvasVisible = entry.isIntersecting;
      startAnimation();
    }, { threshold: 0.01 });
    visibilityObserver.observe(container);

    const handleDocumentVisibility = () => {
      if (document.hidden) {
        stopAnimation();
      } else startAnimation();
    };
    document.addEventListener('visibilitychange', handleDocumentVisibility);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleDocumentVisibility);
      animationControlsRef.current = { pause: () => {}, resume: () => {} };
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [shouldRender3D]);

  if (!shouldRender3D) {
    return (
      <div className="relative w-full h-[450px] lg:h-[620px] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,167,217,0.18),transparent_55%)]" />
        <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none animate-float shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
          <span>SYSTEM ARCHITECTURE • V2.0</span>
        </div>

        <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-2 pointer-events-none animate-float shadow-lg" style={{ animationDelay: '2s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          <span>REACT • NODE • JAVA • SQL</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] lg:h-[620px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Monospace Badges */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none animate-float shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
        <span>SYSTEM ARCHITECTURE • V2.0</span>
      </div>

      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 flex items-center gap-2 pointer-events-none animate-float shadow-lg" style={{ animationDelay: '2s' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
        <span>REACT • NODE • JAVA • SQL</span>
      </div>
    </div>
  );
};
