import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BatmanJokerBattle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const batmanRef = useRef<THREE.Group | null>(null);
  const jokerRef = useRef<THREE.Group | null>(null);
  const [battlePhase, setBattlePhase] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Lighting setup for dramatic effect
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Gotham city lighting
    const purpleLight = new THREE.PointLight(0x8b5cf6, 2, 50);
    purpleLight.position.set(-10, 5, -5);
    scene.add(purpleLight);

    const greenLight = new THREE.PointLight(0x10b981, 2, 50);
    greenLight.position.set(10, 5, -5);
    scene.add(greenLight);

    // Create Batman character
    const createBatman = () => {
      const batman = new THREE.Group();
      
      // Batman body (black with cape)
      const bodyGeometry = new THREE.CapsuleGeometry(0.8, 2.5, 8, 16);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1a1a1a,
        shininess: 100,
        specular: 0x333333
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      batman.add(body);

      // Batman cape
      const capeGeometry = new THREE.PlaneGeometry(3, 4);
      const capeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const cape = new THREE.Mesh(capeGeometry, capeMaterial);
      cape.position.set(0, 0, -0.5);
      cape.rotation.x = Math.PI * 0.1;
      batman.add(cape);

      // Batman cowl/head
      const headGeometry = new THREE.SphereGeometry(0.6, 16, 16);
      const headMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2;
      head.castShadow = true;
      batman.add(head);

      // Batman ears
      const earGeometry = new THREE.ConeGeometry(0.1, 0.5, 8);
      const earMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
      
      const leftEar = new THREE.Mesh(earGeometry, earMaterial);
      leftEar.position.set(-0.3, 2.5, 0);
      batman.add(leftEar);
      
      const rightEar = new THREE.Mesh(earGeometry, earMaterial);
      rightEar.position.set(0.3, 2.5, 0);
      batman.add(rightEar);

      // Batman symbol
      const symbolGeometry = new THREE.PlaneGeometry(0.8, 0.5);
      const symbolMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffff00,
        emissive: 0x333300
      });
      const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
      symbol.position.set(0, 1, 0.81);
      batman.add(symbol);

      // Batman arms
      const armGeometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 16);
      const armMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-1.2, 0.5, 0);
      leftArm.rotation.z = Math.PI * 0.3;
      leftArm.castShadow = true;
      batman.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(1.2, 0.5, 0);
      rightArm.rotation.z = -Math.PI * 0.3;
      rightArm.castShadow = true;
      batman.add(rightArm);

      // Batman legs
      const legGeometry = new THREE.CapsuleGeometry(0.4, 2, 8, 16);
      const legMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
      
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.5, -2.5, 0);
      leftLeg.castShadow = true;
      batman.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.5, -2.5, 0);
      rightLeg.castShadow = true;
      batman.add(rightLeg);

      batman.position.set(-8, 0, -5);
      batman.scale.set(1.2, 1.2, 1.2);
      return batman;
    };

    // Create Joker character
    const createJoker = () => {
      const joker = new THREE.Group();
      
      // Joker body (purple suit)
      const bodyGeometry = new THREE.CapsuleGeometry(0.8, 2.5, 8, 16);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6,
        shininess: 50
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      joker.add(body);

      // Joker head (pale white)
      const headGeometry = new THREE.SphereGeometry(0.6, 16, 16);
      const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf8f8ff,
        shininess: 30
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2;
      head.castShadow = true;
      joker.add(head);

      // Joker hair (green)
      const hairGeometry = new THREE.SphereGeometry(0.7, 16, 16);
      const hairMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x10b981,
        transparent: true,
        opacity: 0.8
      });
      const hair = new THREE.Mesh(hairGeometry, hairMaterial);
      hair.position.y = 2.3;
      hair.scale.set(1, 0.6, 1);
      joker.add(hair);

      // Joker smile (red)
      const smileGeometry = new THREE.TorusGeometry(0.3, 0.05, 8, 16, Math.PI);
      const smileMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        emissive: 0x330000
      });
      const smile = new THREE.Mesh(smileGeometry, smileMaterial);
      smile.position.set(0, 1.8, 0.6);
      smile.rotation.z = Math.PI;
      joker.add(smile);

      // Joker arms
      const armGeometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 16);
      const armMaterial = new THREE.MeshPhongMaterial({ color: 0x8b5cf6 });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-1.2, 0.5, 0);
      leftArm.rotation.z = Math.PI * 0.2;
      leftArm.castShadow = true;
      joker.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(1.2, 0.5, 0);
      rightArm.rotation.z = -Math.PI * 0.2;
      rightArm.castShadow = true;
      joker.add(rightArm);

      // Joker legs
      const legGeometry = new THREE.CapsuleGeometry(0.4, 2, 8, 16);
      const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8b5cf6 });
      
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.5, -2.5, 0);
      leftLeg.castShadow = true;
      joker.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.5, -2.5, 0);
      rightLeg.castShadow = true;
      joker.add(rightLeg);

      joker.position.set(8, 0, -5);
      joker.scale.set(1.2, 1.2, 1.2);
      return joker;
    };

    // Create battle effects
    const createBattleEffects = () => {
      const effects = new THREE.Group();
      
      // Energy blasts
      for (let i = 0; i < 20; i++) {
        const blastGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const blastMaterial = new THREE.MeshPhongMaterial({ 
          color: Math.random() > 0.5 ? 0xffff00 : 0xff0000,
          emissive: Math.random() > 0.5 ? 0x333300 : 0x330000,
          transparent: true,
          opacity: 0.8
        });
        const blast = new THREE.Mesh(blastGeometry, blastMaterial);
        blast.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        effects.add(blast);
      }

      // Smoke particles
      for (let i = 0; i < 30; i++) {
        const smokeGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const smokeMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x666666,
          transparent: true,
          opacity: 0.3
        });
        const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smoke.position.set(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        );
        effects.add(smoke);
      }

      return effects;
    };

    // Create Gotham cityscape
    const createGothamCityscape = () => {
      const cityscape = new THREE.Group();
      
      // Buildings
      for (let i = 0; i < 15; i++) {
        const buildingGeometry = new THREE.BoxGeometry(
          Math.random() * 3 + 1,
          Math.random() * 10 + 5,
          Math.random() * 3 + 1
        );
        const buildingMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x2a2a2a,
          transparent: true,
          opacity: 0.7
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(
          (Math.random() - 0.5) * 50,
          -5,
          -20 - Math.random() * 20
        );
        building.castShadow = true;
        building.receiveShadow = true;
        cityscape.add(building);

        // Building windows (glowing)
        for (let j = 0; j < 5; j++) {
          const windowGeometry = new THREE.PlaneGeometry(0.3, 0.3);
          const windowMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffff88,
            emissive: 0x444400,
            transparent: true,
            opacity: 0.8
          });
          const window = new THREE.Mesh(windowGeometry, windowMaterial);
          window.position.set(
            building.position.x + (Math.random() - 0.5) * 2,
            building.position.y + Math.random() * 8,
            building.position.z + 1.5
          );
          cityscape.add(window);
        }
      }

      return cityscape;
    };

    const batman = createBatman();
    const joker = createJoker();
    const battleEffects = createBattleEffects();
    const gothamCity = createGothamCityscape();

    scene.add(batman);
    scene.add(joker);
    scene.add(battleEffects);
    scene.add(gothamCity);

    batmanRef.current = batman;
    jokerRef.current = joker;

    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    // Mouse interaction for 4th wall breaking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scroll-based battle phases
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setBattlePhase(Math.floor(scrollPercent * 4));
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (batman && joker) {
        // Epic battle choreography based on scroll position
        switch (battlePhase) {
          case 0: // Initial confrontation
            batman.position.x = -8 + Math.sin(elapsedTime * 2) * 2;
            batman.rotation.y = Math.sin(elapsedTime) * 0.3;
            joker.position.x = 8 + Math.cos(elapsedTime * 2) * 2;
            joker.rotation.y = Math.cos(elapsedTime) * 0.3;
            break;
            
          case 1: // Mid-air combat
            batman.position.y = 3 + Math.sin(elapsedTime * 3) * 2;
            batman.position.x = -4 + Math.sin(elapsedTime * 2) * 3;
            batman.rotation.z = Math.sin(elapsedTime * 2) * 0.5;
            
            joker.position.y = 2 + Math.cos(elapsedTime * 3) * 2;
            joker.position.x = 4 + Math.cos(elapsedTime * 2) * 3;
            joker.rotation.z = Math.cos(elapsedTime * 2) * 0.5;
            break;
            
          case 2: // Intense close combat
            batman.position.x = Math.sin(elapsedTime * 4) * 1;
            batman.position.z = -2 + Math.cos(elapsedTime * 3) * 1;
            batman.rotation.y = elapsedTime * 2;
            
            joker.position.x = Math.cos(elapsedTime * 4) * 1;
            joker.position.z = -2 + Math.sin(elapsedTime * 3) * 1;
            joker.rotation.y = -elapsedTime * 2;
            break;
            
          case 3: // Final showdown
            batman.position.x = -2 + Math.sin(elapsedTime * 5) * 0.5;
            batman.position.y = Math.abs(Math.sin(elapsedTime * 6)) * 3;
            batman.rotation.x = Math.sin(elapsedTime * 3) * 0.3;
            
            joker.position.x = 2 + Math.cos(elapsedTime * 5) * 0.5;
            joker.position.y = Math.abs(Math.cos(elapsedTime * 6)) * 3;
            joker.rotation.x = Math.cos(elapsedTime * 3) * 0.3;
            break;
        }

        // Mouse interaction - characters look at cursor (breaking 4th wall)
        batman.lookAt(mouseX * 10, mouseY * 5, 10);
        joker.lookAt(mouseX * 10, mouseY * 5, 10);

        // Cape physics
        const cape = batman.children.find(child => child.geometry?.type === 'PlaneGeometry');
        if (cape) {
          cape.rotation.x = Math.PI * 0.1 + Math.sin(elapsedTime * 2) * 0.2;
          cape.rotation.y = Math.sin(elapsedTime) * 0.3;
        }
      }

      // Animate battle effects
      battleEffects.children.forEach((effect, index) => {
        effect.rotation.x += 0.02;
        effect.rotation.y += 0.03;
        effect.position.y += Math.sin(elapsedTime + index) * 0.01;
        
        // Pulsing effect
        const scale = 1 + Math.sin(elapsedTime * 3 + index) * 0.3;
        effect.scale.setScalar(scale);
      });

      // Dynamic lighting effects
      purpleLight.intensity = 2 + Math.sin(elapsedTime * 2) * 1;
      greenLight.intensity = 2 + Math.cos(elapsedTime * 2) * 1;
      
      purpleLight.position.x = -10 + Math.sin(elapsedTime) * 5;
      greenLight.position.x = 10 + Math.cos(elapsedTime) * 5;

      // Camera movement for cinematic effect
      camera.position.x = Math.sin(elapsedTime * 0.5) * 3;
      camera.position.y = 5 + Math.cos(elapsedTime * 0.3) * 2;
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js objects
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
  }, [battlePhase]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-full -z-5 pointer-events-none opacity-60 dark:opacity-80"
        style={{ zIndex: -1 }}
      />
      
      {/* Battle Status Indicator */}
      <div className="fixed top-20 right-4 z-50 glass-card rounded-2xl p-4 pointer-events-none">
        <div className="text-sm font-bold text-white mb-2">GOTHAM BATTLE</div>
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((phase) => (
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
          {battlePhase === 0 && "Confrontation"}
          {battlePhase === 1 && "Aerial Combat"}
          {battlePhase === 2 && "Close Combat"}
          {battlePhase === 3 && "Final Showdown"}
        </div>
      </div>

      {/* Breaking 4th Wall Messages */}
      {battlePhase === 2 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-2xl p-6 text-center animate-pulse">
            <div className="text-2xl font-bold text-white mb-2">🦇 BATMAN NOTICES YOU! 🦇</div>
            <div className="text-gray-300">Move your mouse to interact with the battle!</div>
          </div>
        </div>
      )}

      {battlePhase === 3 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-2xl p-6 text-center animate-bounce">
            <div className="text-xl font-bold text-white mb-2">🃏 JOKER'S CHAOS UNLEASHED! 🃏</div>
            <div className="text-gray-300">The battle reaches its climax!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatmanJokerBattle;