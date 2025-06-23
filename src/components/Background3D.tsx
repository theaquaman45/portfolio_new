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

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating geometric shapes
    const createFloatingShapes = () => {
      const shapes = [];
      const shapeCount = 15;

      for (let i = 0; i < shapeCount; i++) {
        const geometries = [
          new THREE.BoxGeometry(0.1, 0.1, 0.1),
          new THREE.SphereGeometry(0.05, 8, 6),
          new THREE.ConeGeometry(0.05, 0.1, 6),
          new THREE.OctahedronGeometry(0.06),
        ];

        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.6),
          transparent: true,
          opacity: 0.6,
          wireframe: Math.random() > 0.5
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        scene.add(mesh);
        shapes.push(mesh);
      }

      return shapes;
    };

    // Create particle system
    const createParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 3000;
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 20;

        // Create gradient colors
        const hue = (Math.random() * 0.3) + 0.6; // Purple to blue range
        const color = new THREE.Color().setHSL(hue, 0.8, 0.7);
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      geometryRef.current = particlesGeometry;
      particlesRef.current = particlesMesh;

      return particlesMesh;
    };

    const shapes = createFloatingShapes();
    const particles = createParticles();

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse following
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;

      // Animate particles
      if (particles) {
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;
        
        // Mouse interaction with particles
        particles.position.x = targetX * 0.5;
        particles.position.y = targetY * 0.5;
      }

      // Animate floating shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.001;
        shape.rotation.y += 0.01 + index * 0.001;
        shape.rotation.z += 0.005 + index * 0.0005;
        
        // Floating motion
        shape.position.y += Math.sin(elapsedTime + index) * 0.002;
        shape.position.x += Math.cos(elapsedTime + index * 0.5) * 0.001;
        
        // Mouse interaction
        const distance = Math.sqrt(
          Math.pow(shape.position.x - targetX * 2, 2) + 
          Math.pow(shape.position.y - targetY * 2, 2)
        );
        
        if (distance < 1) {
          shape.scale.setScalar(1 + (1 - distance) * 0.5);
          (shape.material as THREE.MeshBasicMaterial).opacity = 0.8 + (1 - distance) * 0.2;
        } else {
          shape.scale.setScalar(1);
          (shape.material as THREE.MeshBasicMaterial).opacity = 0.6;
        }
      });

      // Camera movement
      camera.position.x += (targetX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (targetY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js objects
      shapes.forEach(shape => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
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
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40 dark:opacity-60"
    />
  );
};

export default Background3D;