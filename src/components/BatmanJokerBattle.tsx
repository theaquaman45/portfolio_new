import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BatmanJokerBattle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const batmanRef = useRef<THREE.Group | null>(null);
  const jokerRef = useRef<THREE.Group | null>(null);
  const [battlePhase, setBattlePhase] = useState(0);
  const [realityBreakLevel, setRealityBreakLevel] = useState(0);
  const [userInteractionCount, setUserInteractionCount] = useState(0);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup with enhanced realism
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // EPIC LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

    // Dramatic directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(20, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);

    // Batman's dramatic lighting
    const batmanLight = new THREE.SpotLight(0x4f46e5, 3, 100, Math.PI / 6, 0.5);
    batmanLight.position.set(-15, 15, 10);
    batmanLight.castShadow = true;
    scene.add(batmanLight);

    // Joker's chaotic lighting
    const jokerLight = new THREE.SpotLight(0x10b981, 3, 100, Math.PI / 6, 0.5);
    jokerLight.position.set(15, 15, 10);
    jokerLight.castShadow = true;
    scene.add(jokerLight);

    // Reality-breaking portal light
    const portalLight = new THREE.PointLight(0xff00ff, 5, 200);
    portalLight.position.set(0, 0, -20);
    scene.add(portalLight);

    // ULTRA-REALISTIC BATMAN
    const createUltraBatman = () => {
      const batman = new THREE.Group();
      
      // Enhanced body with muscle definition
      const bodyGeometry = new THREE.CapsuleGeometry(1, 3, 16, 32);
      const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x0a0a0a,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      body.receiveShadow = true;
      batman.add(body);

      // Detailed cape with physics simulation
      const capeGeometry = new THREE.PlaneGeometry(4, 6, 32, 32);
      const capeMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x000000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        metalness: 0.1,
        roughness: 0.8,
        transmission: 0.1
      });
      const cape = new THREE.Mesh(capeGeometry, capeMaterial);
      cape.position.set(0, 0, -1);
      cape.rotation.x = Math.PI * 0.1;
      cape.castShadow = true;
      batman.add(cape);

      // Realistic cowl with ears
      const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const headMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x0a0a0a,
        metalness: 0.7,
        roughness: 0.3,
        clearcoat: 0.8
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2.5;
      head.castShadow = true;
      batman.add(head);

      // Iconic bat ears
      const earGeometry = new THREE.ConeGeometry(0.15, 0.8, 8);
      const earMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x0a0a0a,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const leftEar = new THREE.Mesh(earGeometry, earMaterial);
      leftEar.position.set(-0.4, 3.2, 0);
      leftEar.rotation.z = -0.3;
      batman.add(leftEar);
      
      const rightEar = new THREE.Mesh(earGeometry, earMaterial);
      rightEar.position.set(0.4, 3.2, 0);
      rightEar.rotation.z = 0.3;
      batman.add(rightEar);

      // Glowing bat symbol
      const symbolGeometry = new THREE.PlaneGeometry(1.2, 0.8);
      const symbolMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9
      });
      const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
      symbol.position.set(0, 1.5, 1.01);
      batman.add(symbol);

      // Muscular arms with armor details
      const armGeometry = new THREE.CapsuleGeometry(0.4, 2, 16, 32);
      const armMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x0a0a0a,
        metalness: 0.8,
        roughness: 0.3
      });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-1.5, 0.8, 0);
      leftArm.rotation.z = Math.PI * 0.2;
      leftArm.castShadow = true;
      batman.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(1.5, 0.8, 0);
      rightArm.rotation.z = -Math.PI * 0.2;
      rightArm.castShadow = true;
      batman.add(rightArm);

      // Powerful legs
      const legGeometry = new THREE.CapsuleGeometry(0.5, 2.5, 16, 32);
      const legMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x0a0a0a,
        metalness: 0.7,
        roughness: 0.4
      });
      
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.6, -3, 0);
      leftLeg.castShadow = true;
      batman.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.6, -3, 0);
      rightLeg.castShadow = true;
      batman.add(rightLeg);

      // Utility belt
      const beltGeometry = new THREE.TorusGeometry(1.2, 0.1, 8, 100);
      const beltMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1
      });
      const belt = new THREE.Mesh(beltGeometry, beltMaterial);
      belt.position.y = -0.5;
      belt.rotation.x = Math.PI / 2;
      batman.add(belt);

      batman.position.set(-10, 0, -8);
      batman.scale.set(1.5, 1.5, 1.5);
      return batman;
    };

    // ULTRA-REALISTIC JOKER
    const createUltraJoker = () => {
      const joker = new THREE.Group();
      
      // Joker's flamboyant purple suit
      const bodyGeometry = new THREE.CapsuleGeometry(1, 3, 16, 32);
      const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x8b5cf6,
        metalness: 0.3,
        roughness: 0.7,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        iridescence: 0.5,
        iridescenceIOR: 1.3
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      body.receiveShadow = true;
      joker.add(body);

      // Pale, menacing head
      const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const headMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xf8f8ff,
        metalness: 0.1,
        roughness: 0.9,
        subsurface: 0.3,
        subsurfaceColor: 0xffffff
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2.5;
      head.castShadow = true;
      joker.add(head);

      // Wild green hair
      const hairGeometry = new THREE.SphereGeometry(0.9, 16, 16);
      const hairMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x10b981,
        metalness: 0.2,
        roughness: 0.8,
        transparent: true,
        opacity: 0.9
      });
      const hair = new THREE.Mesh(hairGeometry, hairMaterial);
      hair.position.y = 3;
      hair.scale.set(1.2, 0.8, 1.2);
      joker.add(hair);

      // Sinister red smile
      const smileGeometry = new THREE.TorusGeometry(0.4, 0.08, 8, 16, Math.PI);
      const smileMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.5
      });
      const smile = new THREE.Mesh(smileGeometry, smileMaterial);
      smile.position.set(0, 2.3, 0.8);
      smile.rotation.z = Math.PI;
      joker.add(smile);

      // Chaotic arms
      const armGeometry = new THREE.CapsuleGeometry(0.4, 2, 16, 32);
      const armMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x8b5cf6,
        metalness: 0.3,
        roughness: 0.7
      });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-1.5, 0.8, 0);
      leftArm.rotation.z = Math.PI * 0.15;
      leftArm.castShadow = true;
      joker.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(1.5, 0.8, 0);
      rightArm.rotation.z = -Math.PI * 0.15;
      rightArm.castShadow = true;
      joker.add(rightArm);

      // Legs
      const legGeometry = new THREE.CapsuleGeometry(0.5, 2.5, 16, 32);
      const legMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x8b5cf6,
        metalness: 0.3,
        roughness: 0.7
      });
      
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.6, -3, 0);
      leftLeg.castShadow = true;
      joker.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.6, -3, 0);
      rightLeg.castShadow = true;
      joker.add(rightLeg);

      joker.position.set(10, 0, -8);
      joker.scale.set(1.5, 1.5, 1.5);
      return joker;
    };

    // REALITY-BREAKING PORTAL
    const createRealityPortal = () => {
      const portal = new THREE.Group();
      
      // Main portal ring
      const portalGeometry = new THREE.TorusGeometry(5, 0.5, 16, 100);
      const portalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xff00ff,
        emissive: 0xff00ff,
        emissiveIntensity: 2,
        transparent: true,
        opacity: 0.8,
        transmission: 0.9,
        thickness: 0.5
      });
      const portalRing = new THREE.Mesh(portalGeometry, portalMaterial);
      portal.add(portalRing);

      // Portal energy field
      const fieldGeometry = new THREE.PlaneGeometry(10, 10, 64, 64);
      const fieldMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 resolution;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(uv, center);
            
            float ripple = sin(dist * 20.0 - time * 5.0) * 0.5 + 0.5;
            float portal = 1.0 - smoothstep(0.0, 0.5, dist);
            
            vec3 color = mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), ripple);
            float alpha = portal * ripple * 0.7;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });
      const portalField = new THREE.Mesh(fieldGeometry, fieldMaterial);
      portal.add(portalField);

      portal.position.set(0, 0, -15);
      return { portal, fieldMaterial };
    };

    // EPIC BATTLE EFFECTS
    const createEpicBattleEffects = () => {
      const effects = new THREE.Group();
      
      // Energy explosions
      for (let i = 0; i < 50; i++) {
        const explosionGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const explosionMaterial = new THREE.MeshPhysicalMaterial({ 
          color: Math.random() > 0.5 ? 0xffff00 : 0xff0000,
          emissive: Math.random() > 0.5 ? 0xffff00 : 0xff0000,
          emissiveIntensity: 2,
          transparent: true,
          opacity: 0.8
        });
        const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
        explosion.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        );
        effects.add(explosion);
      }

      // Lightning bolts
      for (let i = 0; i < 20; i++) {
        const lightningGeometry = new THREE.CylinderGeometry(0.05, 0.05, 10, 8);
        const lightningMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0x00ffff,
          emissive: 0x00ffff,
          emissiveIntensity: 3,
          transparent: true,
          opacity: 0.9
        });
        const lightning = new THREE.Mesh(lightningGeometry, lightningMaterial);
        lightning.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        );
        lightning.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        effects.add(lightning);
      }

      return effects;
    };

    // GOTHAM CITY ENVIRONMENT
    const createGothamMetropolis = () => {
      const cityscape = new THREE.Group();
      
      // Skyscrapers with realistic details
      for (let i = 0; i < 25; i++) {
        const buildingGeometry = new THREE.BoxGeometry(
          Math.random() * 4 + 2,
          Math.random() * 15 + 10,
          Math.random() * 4 + 2
        );
        const buildingMaterial = new THREE.MeshPhysicalMaterial({ 
          color: 0x1a1a1a,
          metalness: 0.8,
          roughness: 0.3,
          transparent: true,
          opacity: 0.9
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(
          (Math.random() - 0.5) * 80,
          -8,
          -30 - Math.random() * 30
        );
        building.castShadow = true;
        building.receiveShadow = true;
        cityscape.add(building);

        // Glowing windows
        for (let j = 0; j < 15; j++) {
          const windowGeometry = new THREE.PlaneGeometry(0.4, 0.4);
          const windowMaterial = new THREE.MeshPhysicalMaterial({ 
            color: Math.random() > 0.7 ? 0xffff88 : 0x4444ff,
            emissive: Math.random() > 0.7 ? 0xffff88 : 0x4444ff,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.9
          });
          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          window.position.set(
            building.position.x + (Math.random() - 0.5) * 3,
            building.position.y + Math.random() * 12,
            building.position.z + 2.5
          );
          cityscape.add(window);
        }
      }

      return cityscape;
    };

    const batman = createUltraBatman();
    const joker = createUltraJoker();
    const battleEffects = createEpicBattleEffects();
    const gothamCity = createGothamMetropolis();
    const { portal, fieldMaterial } = createRealityPortal();

    scene.add(batman);
    scene.add(joker);
    scene.add(battleEffects);
    scene.add(gothamCity);
    scene.add(portal);

    batmanRef.current = batman;
    jokerRef.current = joker;

    camera.position.set(0, 8, 20);
    camera.lookAt(0, 0, 0);

    // ADVANCED INTERACTION SYSTEM
    let mouseX = 0;
    let mouseY = 0;
    let isMousePressed = false;
    let lastClickTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      setUserInteractionCount(prev => prev + 1);
      
      // Reality breaks more with interaction
      if (userInteractionCount > 100) {
        setRealityBreakLevel(1);
      }
      if (userInteractionCount > 500) {
        setRealityBreakLevel(2);
      }
      if (userInteractionCount > 1000) {
        setRealityBreakLevel(3);
        setIsPortalOpen(true);
      }
    };

    const handleMouseClick = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastClickTime < 500) {
        // Double click detected - REALITY BREAK!
        setRealityBreakLevel(prev => Math.min(prev + 1, 3));
        setIsPortalOpen(true);
      }
      lastClickTime = currentTime;
      isMousePressed = true;
      
      setTimeout(() => {
        isMousePressed = false;
      }, 100);
    };

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setBattlePhase(Math.floor(scrollPercent * 5));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('scroll', handleScroll);

    // ULTIMATE ANIMATION LOOP
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update portal shader
      if (fieldMaterial) {
        fieldMaterial.uniforms.time.value = elapsedTime;
      }

      if (batman && joker) {
        // EPIC BATTLE CHOREOGRAPHY
        switch (battlePhase) {
          case 0: // Standoff
            batman.position.x = -10 + Math.sin(elapsedTime * 2) * 3;
            batman.rotation.y = Math.sin(elapsedTime) * 0.5;
            joker.position.x = 10 + Math.cos(elapsedTime * 2) * 3;
            joker.rotation.y = Math.cos(elapsedTime) * 0.5;
            break;
            
          case 1: // Aerial Combat
            batman.position.y = 5 + Math.sin(elapsedTime * 4) * 3;
            batman.position.x = -6 + Math.sin(elapsedTime * 3) * 4;
            batman.rotation.z = Math.sin(elapsedTime * 3) * 0.8;
            
            joker.position.y = 4 + Math.cos(elapsedTime * 4) * 3;
            joker.position.x = 6 + Math.cos(elapsedTime * 3) * 4;
            joker.rotation.z = Math.cos(elapsedTime * 3) * 0.8;
            break;
            
          case 2: // Close Combat
            batman.position.x = Math.sin(elapsedTime * 6) * 2;
            batman.position.z = -5 + Math.cos(elapsedTime * 5) * 2;
            batman.rotation.y = elapsedTime * 3;
            
            joker.position.x = Math.cos(elapsedTime * 6) * 2;
            joker.position.z = -5 + Math.sin(elapsedTime * 5) * 2;
            joker.rotation.y = -elapsedTime * 3;
            break;
            
          case 3: // Reality Breaking
            batman.position.x = -3 + Math.sin(elapsedTime * 8) * 1;
            batman.position.y = Math.abs(Math.sin(elapsedTime * 10)) * 5;
            batman.rotation.x = Math.sin(elapsedTime * 5) * 0.5;
            
            joker.position.x = 3 + Math.cos(elapsedTime * 8) * 1;
            joker.position.y = Math.abs(Math.cos(elapsedTime * 10)) * 5;
            joker.rotation.x = Math.cos(elapsedTime * 5) * 0.5;
            
            // Portal becomes active
            portal.rotation.z = elapsedTime * 2;
            portal.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.3);
            break;
            
          case 4: // Ultimate Showdown
            batman.position.x = Math.sin(elapsedTime * 12) * 0.5;
            batman.position.y = 2 + Math.sin(elapsedTime * 15) * 2;
            batman.scale.setScalar(1.5 + Math.sin(elapsedTime * 8) * 0.2);
            
            joker.position.x = Math.cos(elapsedTime * 12) * 0.5;
            joker.position.y = 2 + Math.cos(elapsedTime * 15) * 2;
            joker.scale.setScalar(1.5 + Math.cos(elapsedTime * 8) * 0.2);
            
            // Reality completely breaks
            scene.fog!.density = 0.005 + Math.sin(elapsedTime * 10) * 0.003;
            break;
        }

        // REALITY BREAKING EFFECTS
        if (realityBreakLevel >= 1) {
          batman.rotation.x += Math.sin(elapsedTime * 20) * 0.01;
          joker.rotation.x += Math.cos(elapsedTime * 20) * 0.01;
        }
        
        if (realityBreakLevel >= 2) {
          camera.position.x += Math.sin(elapsedTime * 30) * 0.1;
          camera.position.y += Math.cos(elapsedTime * 25) * 0.1;
        }
        
        if (realityBreakLevel >= 3) {
          renderer.toneMappingExposure = 1.2 + Math.sin(elapsedTime * 40) * 0.3;
          scene.fog!.color.setHSL(Math.sin(elapsedTime * 5) * 0.1 + 0.1, 0.5, 0.1);
        }

        // 4TH WALL BREAKING - Characters look at cursor
        const lookAtX = mouseX * 15;
        const lookAtY = mouseY * 10;
        
        batman.lookAt(lookAtX, lookAtY, 15);
        joker.lookAt(lookAtX, lookAtY, 15);
        
        // Intense reaction to mouse press
        if (isMousePressed) {
          batman.scale.setScalar(1.8);
          joker.scale.setScalar(1.8);
        } else {
          batman.scale.setScalar(1.5);
          joker.scale.setScalar(1.5);
        }
      }

      // Animate battle effects
      battleEffects.children.forEach((effect, index) => {
        effect.rotation.x += 0.03;
        effect.rotation.y += 0.04;
        effect.position.y += Math.sin(elapsedTime * 2 + index) * 0.02;
        
        const scale = 1 + Math.sin(elapsedTime * 5 + index) * 0.5;
        effect.scale.setScalar(scale);
      });

      // Dynamic lighting
      batmanLight.intensity = 3 + Math.sin(elapsedTime * 3) * 2;
      jokerLight.intensity = 3 + Math.cos(elapsedTime * 3) * 2;
      portalLight.intensity = isPortalOpen ? 8 + Math.sin(elapsedTime * 8) * 3 : 5;
      
      batmanLight.position.x = -15 + Math.sin(elapsedTime * 2) * 8;
      jokerLight.position.x = 15 + Math.cos(elapsedTime * 2) * 8;

      // Cinematic camera movement
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 + 8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

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
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [battlePhase, realityBreakLevel, userInteractionCount]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-80 dark:opacity-90"
        style={{ zIndex: -1 }}
      />
      
      {/* REALITY BREAK INDICATORS */}
      <div className="fixed top-4 left-4 z-50 space-y-2 pointer-events-none">
        <div className="glass-card rounded-2xl p-4">
          <div className="text-sm font-bold text-white mb-2 flex items-center">
            🌌 REALITY STATUS
          </div>
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  realityBreakLevel >= level 
                    ? 'bg-gradient-to-r from-red-500 to-purple-500 shadow-lg animate-pulse' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-300 mt-2">
            {realityBreakLevel === 0 && "Reality Stable"}
            {realityBreakLevel === 1 && "Minor Distortions"}
            {realityBreakLevel === 2 && "Reality Fracturing"}
            {realityBreakLevel === 3 && "REALITY COLLAPSED"}
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-4">
          <div className="text-sm font-bold text-white mb-2">🎭 BATTLE PHASE</div>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((phase) => (
              <div
                key={phase}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  battlePhase >= phase 
                    ? 'bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-300 mt-2">
            {battlePhase === 0 && "Standoff"}
            {battlePhase === 1 && "Aerial Combat"}
            {battlePhase === 2 && "Close Combat"}
            {battlePhase === 3 && "Reality Breaking"}
            {battlePhase === 4 && "Ultimate Showdown"}
          </div>
        </div>
      </div>

      {/* INTERACTION COUNTER */}
      <div className="fixed top-4 right-4 z-50 glass-card rounded-2xl p-4 pointer-events-none">
        <div className="text-sm font-bold text-white mb-2">👁️ AWARENESS LEVEL</div>
        <div className="text-2xl font-bold text-gradient-exotic">{userInteractionCount}</div>
        <div className="text-xs text-gray-300">Mouse movements detected</div>
      </div>

      {/* PORTAL ACTIVATION */}
      {isPortalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="glass-card rounded-3xl p-8 text-center animate-pulse border-4 border-purple-500">
            <div className="text-4xl font-bold text-white mb-4">🌀 PORTAL ACTIVATED 🌀</div>
            <div className="text-xl text-purple-300 mb-4">Reality has been breached!</div>
            <div className="text-gray-300">The characters are now aware of your presence</div>
          </div>
        </div>
      )}

      {/* DYNAMIC BATTLE MESSAGES */}
      {battlePhase === 2 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-3xl p-8 text-center animate-bounce border-2 border-yellow-500">
            <div className="text-3xl font-bold text-white mb-4">🦇 BATMAN SENSES YOU! 🦇</div>
            <div className="text-xl text-yellow-300 mb-2">He's looking directly at your cursor!</div>
            <div className="text-gray-300">Move your mouse to control his attention</div>
          </div>
        </div>
      )}

      {battlePhase === 3 && realityBreakLevel >= 2 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-3xl p-8 text-center animate-pulse border-2 border-green-500">
            <div className="text-3xl font-bold text-white mb-4">🃏 JOKER'S CHAOS UNLEASHED! 🃏</div>
            <div className="text-xl text-green-300 mb-2">Reality is bending to his will!</div>
            <div className="text-gray-300">Double-click to break reality further!</div>
          </div>
        </div>
      )}

      {battlePhase === 4 && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-3xl p-8 text-center animate-pulse border-4 border-red-500">
            <div className="text-4xl font-bold text-white mb-4">⚡ ULTIMATE SHOWDOWN! ⚡</div>
            <div className="text-xl text-red-300 mb-2">The fabric of reality is tearing!</div>
            <div className="text-gray-300">You are now part of the battle!</div>
          </div>
        </div>
      )}

      {/* EASTER EGG MESSAGES */}
      {userInteractionCount > 1000 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-2xl p-4 text-center animate-pulse">
            <div className="text-lg font-bold text-white">🎉 EASTER EGG UNLOCKED! 🎉</div>
            <div className="text-sm text-purple-300">You've discovered the secret interaction level!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatmanJokerBattle;