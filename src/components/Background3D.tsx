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

    // Enhanced scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // QUANTUM PARTICLE SYSTEM
    const createQuantumParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 8000;
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      const sizeArray = new Float32Array(particlesCount);
      const velocityArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Create galaxy-like distribution
        const radius = Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 20;
        
        posArray[i] = Math.cos(angle) * radius;
        posArray[i + 1] = height;
        posArray[i + 2] = Math.sin(angle) * radius;

        // Velocity for orbital motion
        velocityArray[i] = -Math.sin(angle) * 0.01;
        velocityArray[i + 1] = (Math.random() - 0.5) * 0.005;
        velocityArray[i + 2] = Math.cos(angle) * 0.01;

        // Quantum color spectrum
        const hue = (Math.random() * 0.6) + 0.4; // Purple to cyan range
        const saturation = 0.8 + Math.random() * 0.2;
        const lightness = 0.5 + Math.random() * 0.5;
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;

        sizeArray[i / 3] = Math.random() * 0.05 + 0.02;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
      particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

      // Advanced particle material with custom shader
      const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 velocity;
          varying vec3 vColor;
          uniform float time;
          uniform float pixelRatio;
          
          void main() {
            vColor = color;
            
            vec3 pos = position;
            pos += velocity * time * 10.0;
            
            // Quantum fluctuation
            pos.x += sin(time * 2.0 + position.y * 0.1) * 0.5;
            pos.z += cos(time * 1.5 + position.x * 0.1) * 0.5;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            if (dist > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            alpha *= 0.8 + 0.2 * sin(time * 5.0);
            
            // Quantum glow effect
            vec3 glow = vColor * (1.0 + sin(time * 3.0 + dist * 10.0) * 0.3);
            
            gl_FragColor = vec4(glow, alpha);
          }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      geometryRef.current = particlesGeometry;
      particlesRef.current = particlesMesh;

      return { particlesMesh, particlesMaterial };
    };

    // DIMENSIONAL RIFTS
    const createDimensionalRifts = () => {
      const rifts = [];
      
      for (let i = 0; i < 5; i++) {
        const riftGeometry = new THREE.TorusGeometry(2 + i, 0.1, 16, 100);
        const riftMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            color1: { value: new THREE.Color(0x8b5cf6) },
            color2: { value: new THREE.Color(0x06b6d4) }
          },
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float time;
            
            void main() {
              vUv = uv;
              vPosition = position;
              
              vec3 pos = position;
              pos.x += sin(time * 2.0 + position.y * 5.0) * 0.1;
              pos.y += cos(time * 1.5 + position.z * 5.0) * 0.1;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            varying vec3 vPosition;
            
            void main() {
              float wave = sin(vUv.x * 20.0 - time * 5.0) * 0.5 + 0.5;
              vec3 color = mix(color1, color2, wave);
              
              float alpha = 0.7 + 0.3 * sin(time * 3.0 + vPosition.x * 10.0);
              
              gl_FragColor = vec4(color, alpha);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide
        });
        
        const rift = new THREE.Mesh(riftGeometry, riftMaterial);
        rift.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
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

    // FLOATING GEOMETRIC ENTITIES
    const createGeometricEntities = () => {
      const entities = [];
      const geometries = [
        new THREE.OctahedronGeometry(0.3),
        new THREE.IcosahedronGeometry(0.25),
        new THREE.TetrahedronGeometry(0.35),
        new THREE.DodecahedronGeometry(0.2)
      ];

      for (let i = 0; i < 30; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color().setHSL(Math.random() * 0.4 + 0.5, 0.8, 0.6),
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.7,
          transmission: 0.3,
          thickness: 0.5,
          emissive: new THREE.Color().setHSL(Math.random() * 0.4 + 0.5, 0.5, 0.1),
          emissiveIntensity: 0.5
        });

        const entity = new THREE.Mesh(geometry, material);
        entity.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 40
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

    // ENERGY FIELDS
    const createEnergyFields = () => {
      const fields = [];
      
      for (let i = 0; i < 3; i++) {
        const fieldGeometry = new THREE.SphereGeometry(5 + i * 2, 32, 32);
        const fieldMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            opacity: { value: 0.1 }
          },
          vertexShader: `
            varying vec3 vPosition;
            varying vec3 vNormal;
            uniform float time;
            
            void main() {
              vPosition = position;
              vNormal = normal;
              
              vec3 pos = position;
              pos += normal * sin(time * 2.0 + position.x * 0.5) * 0.3;
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform float opacity;
            varying vec3 vPosition;
            varying vec3 vNormal;
            
            void main() {
              float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              
              vec3 color = vec3(0.5 + 0.5 * sin(time + vPosition.x * 0.1),
                               0.5 + 0.5 * sin(time * 1.3 + vPosition.y * 0.1),
                               0.5 + 0.5 * sin(time * 1.7 + vPosition.z * 0.1));
              
              float alpha = fresnel * opacity * (0.5 + 0.5 * sin(time * 3.0));
              
              gl_FragColor = vec4(color, alpha);
            }
          `,
          transparent: true,
          side: THREE.BackSide
        });
        
        const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        field.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 25
        );
        
        scene.add(field);
        fields.push({ mesh: field, material: fieldMaterial });
      }
      
      return fields;
    };

    const { particlesMesh, particlesMaterial } = createQuantumParticles();
    const dimensionalRifts = createDimensionalRifts();
    const geometricEntities = createGeometricEntities();
    const energyFields = createEnergyFields();

    camera.position.z = 15;

    // Advanced mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Ultimate animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse following
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      // Update particle system
      if (particlesMaterial) {
        particlesMaterial.uniforms.time.value = elapsedTime;
      }

      // Animate particles with quantum behavior
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002;
        particlesRef.current.rotation.x += 0.001;
        
        // Mouse interaction
        particlesRef.current.position.x = targetX * 2;
        particlesRef.current.position.y = targetY * 2;
      }

      // Animate dimensional rifts
      dimensionalRifts.forEach((rift, index) => {
        rift.material.uniforms.time.value = elapsedTime;
        rift.mesh.rotation.x += 0.005 + index * 0.001;
        rift.mesh.rotation.y += 0.003 + index * 0.0005;
        rift.mesh.rotation.z += 0.002 + index * 0.0003;
        
        // Floating motion
        rift.mesh.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01;
        rift.mesh.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.005;
      });

      // Animate geometric entities
      geometricEntities.forEach((entity, index) => {
        entity.rotation.x += 0.01 + index * 0.001;
        entity.rotation.y += 0.008 + index * 0.0008;
        entity.rotation.z += 0.006 + index * 0.0006;
        
        // Quantum fluctuation
        entity.position.y += Math.sin(elapsedTime * 2 + index) * 0.003;
        entity.position.x += Math.cos(elapsedTime * 1.5 + index * 0.5) * 0.002;
        
        // Mouse interaction with quantum entanglement
        const distance = Math.sqrt(
          Math.pow(entity.position.x - targetX * 5, 2) + 
          Math.pow(entity.position.y - targetY * 5, 2)
        );
        
        if (distance < 3) {
          entity.scale.setScalar(1 + (3 - distance) * 0.2);
          (entity.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5 + (3 - distance) * 0.3;
        } else {
          entity.scale.setScalar(1);
          (entity.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5;
        }
      });

      // Animate energy fields
      energyFields.forEach((field, index) => {
        field.material.uniforms.time.value = elapsedTime;
        field.mesh.rotation.x += 0.002 + index * 0.0005;
        field.mesh.rotation.y += 0.003 + index * 0.0007;
        
        // Pulsing effect
        const scale = 1 + Math.sin(elapsedTime * 1.5 + index * 2) * 0.1;
        field.mesh.scale.setScalar(scale);
      });

      // Dynamic camera movement
      camera.position.x += (targetX * 3 - camera.position.x) * 0.02;
      camera.position.y += (targetY * 2 - camera.position.y) * 0.02;
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
      className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none opacity-40 dark:opacity-60"
    />
  );
};

export default Background3D;