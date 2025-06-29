import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Optimized scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disabled for performance
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped for performance
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Optimized particle system (reduced count)
    const createOptimizedParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 3000; // Reduced from 8000
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      const sizeArray = new Float32Array(particlesCount);
      const velocityArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        const radius = Math.random() * 25;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 15;
        
        posArray[i] = Math.cos(angle) * radius;
        posArray[i + 1] = height;
        posArray[i + 2] = Math.sin(angle) * radius;

        velocityArray[i] = -Math.sin(angle) * 0.008;
        velocityArray[i + 1] = (Math.random() - 0.5) * 0.003;
        velocityArray[i + 2] = Math.cos(angle) * 0.008;

        const hue = (Math.random() * 0.4) + 0.5;
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.4 + Math.random() * 0.6;
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;

        sizeArray[i / 3] = Math.random() * 0.04 + 0.01;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
      particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

      // Simplified particle material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      geometryRef.current = particlesGeometry;
      particlesRef.current = particlesMesh;

      return { particlesMesh, particlesMaterial };
    };

    // Optimized rifts (reduced count)
    const createOptimizedRifts = () => {
      const rifts = [];
      
      for (let i = 0; i < 3; i++) { // Reduced from 5
        const riftGeometry = new THREE.TorusGeometry(2 + i, 0.1, 8, 32);
        const riftMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.7 + i * 0.1, 0.8, 0.6),
          transparent: true,
          opacity: 0.6
        });
        
        const rift = new THREE.Mesh(riftGeometry, riftMaterial);
        rift.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20
        );
        rift.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        scene.add(rift);
        rifts.push({ mesh: rift, material: riftMaterial });
      }
      
      return rifts;
    };

    // Optimized geometric entities (reduced count and complexity)
    const createOptimizedEntities = () => {
      const entities = [];
      const geometries = [
        new THREE.OctahedronGeometry(0.25),
        new THREE.IcosahedronGeometry(0.2),
        new THREE.TetrahedronGeometry(0.3)
      ];

      for (let i = 0; i < 15; i++) { // Reduced from 30
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.5),
          transparent: true,
          opacity: 0.6
        });

        const entity = new THREE.Mesh(geometry, material);
        entity.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
        );
        entity.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        scene.add(entity);
        entities.push(entity);
      }

      return entities;
    };

    // Optimized energy fields (reduced count)
    const createOptimizedFields = () => {
      const fields = [];
      
      for (let i = 0; i < 2; i++) { // Reduced from 3
        const fieldGeometry = new THREE.SphereGeometry(4 + i * 2, 16, 16);
        const fieldMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.6 + i * 0.2, 0.7, 0.4),
          transparent: true,
          opacity: 0.1,
          side: THREE.BackSide
        });
        
        const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        field.position.set(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20
        );
        
        scene.add(field);
        fields.push({ mesh: field, material: fieldMaterial });
      }
      
      return fields;
    };

    const { particlesMesh, particlesMaterial } = createOptimizedParticles();
    const dimensionalRifts = createOptimizedRifts();
    const geometricEntities = createOptimizedEntities();
    const energyFields = createOptimizedFields();

    camera.position.z = 15;

    // Optimized mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Optimized animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse following
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.position.x = targetX * 1.5;
        particlesRef.current.position.y = targetY * 1.5;
      }

      // Animate rifts
      dimensionalRifts.forEach((rift, index) => {
        rift.mesh.rotation.x += 0.003 + index * 0.0005;
        rift.mesh.rotation.y += 0.002 + index * 0.0003;
        rift.mesh.rotation.z += 0.001 + index * 0.0002;
        rift.mesh.position.y += Math.sin(elapsedTime * 0.3 + index) * 0.005;
      });

      // Animate entities
      geometricEntities.forEach((entity, index) => {
        entity.rotation.x += 0.008 + index * 0.0005;
        entity.rotation.y += 0.006 + index * 0.0004;
        entity.rotation.z += 0.004 + index * 0.0003;
        entity.position.y += Math.sin(elapsedTime * 1.5 + index) * 0.002;
        entity.position.x += Math.cos(elapsedTime * 1.2 + index * 0.3) * 0.001;
      });

      // Animate energy fields
      energyFields.forEach((field, index) => {
        field.mesh.rotation.x += 0.001 + index * 0.0003;
        field.mesh.rotation.y += 0.002 + index * 0.0004;
        const scale = 1 + Math.sin(elapsedTime * 1.2 + index * 2) * 0.05;
        field.mesh.scale.setScalar(scale);
      });

      // Optimized camera movement
      camera.position.x += (targetX * 2 - camera.position.x) * 0.015;
      camera.position.y += (targetY * 1.5 - camera.position.y) * 0.015;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      geometricEntities.forEach(entity => {
        entity.geometry.dispose();
        (entity.material as THREE.Material).dispose();
      });
      
      dimensionalRifts.forEach(rift => {
        rift.mesh.geometry.dispose();
        rift.material.dispose();
      });
      
      energyFields.forEach(field => {
        field.mesh.geometry.dispose();
        field.material.dispose();
      });
      
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
      
      if (particlesRef.current) {
        (particlesRef.current.material as THREE.Material).dispose();
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none opacity-30 dark:opacity-50"
    />
  );
};

export default Background3D;