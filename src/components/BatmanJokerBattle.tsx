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

    // Optimized scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disabled for performance
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped for performance
    renderer.shadowMap.enabled = false; // Disabled for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Optimized lighting system
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(20, 20, 10);
    scene.add(directionalLight);

    const batmanLight = new THREE.SpotLight(0x4f46e5, 2, 50, Math.PI / 6, 0.5);
    batmanLight.position.set(-15, 15, 10);
    scene.add(batmanLight);

    const jokerLight = new THREE.SpotLight(0x10b981, 2, 50, Math.PI / 6, 0.5);
    jokerLight.position.set(15, 15, 10);
    scene.add(jokerLight);

    const portalLight = new THREE.PointLight(0xff00ff, 3, 100);
    portalLight.position.set(0, 0, -20);
    scene.add(portalLight);

    // Optimized Batman (reduced complexity)
    const createOptimizedBatman = () => {
      const batman = new THREE.Group();
      
      // Simplified body
      const bodyGeometry = new THREE.CapsuleGeometry(1, 3, 8, 16);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0a0a0a });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      batman.add(body);

      // Simplified cape
      const capeGeometry = new THREE.PlaneGeometry(3, 5, 8, 8);
      const capeMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x000000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const cape = new THREE.Mesh(capeGeometry, capeMaterial);
      cape.position.set(0, 0, -1);
      cape.rotation.x = Math.PI * 0.1;
      batman.add(cape);

      // Simplified head
      const headGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const headMaterial = new THREE.MeshLambertMaterial({ color: 0x0a0a0a });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2.5;
      batman.add(head);

      // Simplified ears
      const earGeometry = new THREE.ConeGeometry(0.15, 0.8, 6);
      const earMaterial = new THREE.MeshLambertMaterial({ color: 0x0a0a0a });
      
      const leftEar = new THREE.Mesh(earGeometry, earMaterial);
      leftEar.position.set(-0.4, 3.2, 0);
      leftEar.rotation.z = -0.3;
      batman.add(leftEar);
      
      const rightEar = new THREE.Mesh(earGeometry, earMaterial);
      rightEar.position.set(0.4, 3.2, 0);
      rightEar.rotation.z = 0.3;
      batman.add(rightEar);

      // Glowing symbol
      const symbolGeometry = new THREE.PlaneGeometry(1.2, 0.8);
      const symbolMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffff00,
        transparent: true,
        opacity: 0.8
      });
      const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
      symbol.position.set(0, 1.5, 1.01);
      batman.add(symbol);

      batman.position.set(-10, 0, -8);
      batman.scale.set(1.5, 1.5, 1.5);
      return batman;
    };

    // Optimized Joker (reduced complexity)
    const createOptimizedJoker = () => {
      const joker = new THREE.Group();
      
      // Simplified body
      const bodyGeometry = new THREE.CapsuleGeometry(1, 3, 8, 16);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8b5cf6 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      joker.add(body);

      // Simplified head
      const headGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const headMaterial = new THREE.MeshLambertMaterial({ color: 0xf8f8ff });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 2.5;
      joker.add(head);

      // Simplified hair
      const hairGeometry = new THREE.SphereGeometry(0.9, 12, 12);
      const hairMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x10b981,
        transparent: true,
        opacity: 0.9
      });
      const hair = new THREE.Mesh(hairGeometry, hairMaterial);
      hair.position.y = 3;
      hair.scale.set(1.2, 0.8, 1.2);
      joker.add(hair);

      // Simplified smile
      const smileGeometry = new THREE.TorusGeometry(0.4, 0.08, 6, 12, Math.PI);
      const smileMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const smile = new THREE.Mesh(smileGeometry, smileMaterial);
      smile.position.set(0, 2.3, 0.8);
      smile.rotation.z = Math.PI;
      joker.add(smile);

      joker.position.set(10, 0, -8);
      joker.scale.set(1.5, 1.5, 1.5);
      return joker;
    };

    // Optimized portal (simplified)
    const createOptimizedPortal = () => {
      const portal = new THREE.Group();
      
      const portalGeometry = new THREE.TorusGeometry(5, 0.5, 8, 32);
      const portalMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.6
      });
      const portalRing = new THREE.Mesh(portalGeometry, portalMaterial);
      portal.add(portalRing);

      const fieldGeometry = new THREE.PlaneGeometry(10, 10, 16, 16);
      const fieldMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
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
          varying vec2 vUv;
          
          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            float ripple = sin(dist * 10.0 - time * 3.0) * 0.5 + 0.5;
            float portal = 1.0 - smoothstep(0.0, 0.5, dist);
            vec3 color = mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), ripple);
            gl_FragColor = vec4(color, portal * ripple * 0.5);
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

    // Optimized effects (reduced count)
    const createOptimizedEffects = () => {
      const effects = new THREE.Group();
      
      // Reduced particle count for performance
      for (let i = 0; i < 20; i++) {
        const explosionGeometry = new THREE.SphereGeometry(0.2, 6, 6);
        const explosionMaterial = new THREE.MeshBasicMaterial({ 
          color: Math.random() > 0.5 ? 0xffff00 : 0xff0000,
          transparent: true,
          opacity: 0.6
        });
        const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
        explosion.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        );
        effects.add(explosion);
      }

      return effects;
    };

    // Optimized cityscape (reduced complexity)
    const createOptimizedCityscape = () => {
      const cityscape = new THREE.Group();
      
      // Reduced building count
      for (let i = 0; i < 10; i++) {
        const buildingGeometry = new THREE.BoxGeometry(
          Math.random() * 3 + 1,
          Math.random() * 10 + 5,
          Math.random() * 3 + 1
        );
        const buildingMaterial = new THREE.MeshLambertMaterial({ 
          color: 0x1a1a1a,
          transparent: true,
          opacity: 0.8
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.set(
          (Math.random() - 0.5) * 60,
          -8,
          -30 - Math.random() * 20
        );
        cityscape.add(building);
      }

      return cityscape;
    };

    const batman = createOptimizedBatman();
    const joker = createOptimizedJoker();
    const battleEffects = createOptimizedEffects();
    const gothamCity = createOptimizedCityscape();
    const { portal, fieldMaterial } = createOptimizedPortal();

    scene.add(batman);
    scene.add(joker);
    scene.add(battleEffects);
    scene.add(gothamCity);
    scene.add(portal);

    batmanRef.current = batman;
    jokerRef.current = joker;

    camera.position.set(0, 8, 20);
    camera.lookAt(0, 0, 0);

    // Optimized interaction system
    let mouseX = 0;
    let mouseY = 0;
    let isMousePressed = false;
    let lastClickTime = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      setUserInteractionCount(prev => prev + 1);
      
      if (userInteractionCount > 50) setRealityBreakLevel(1);
      if (userInteractionCount > 200) setRealityBreakLevel(2);
      if (userInteractionCount > 500) {
        setRealityBreakLevel(3);
        setIsPortalOpen(true);
      }
    };

    const handleMouseClick = (event: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastClickTime < 500) {
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

    // Optimized animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (fieldMaterial) {
        fieldMaterial.uniforms.time.value = elapsedTime;
      }

      if (batman && joker) {
        // Simplified battle choreography
        switch (battlePhase) {
          case 0:
            batman.position.x = -10 + Math.sin(elapsedTime * 2) * 2;
            batman.rotation.y = Math.sin(elapsedTime) * 0.3;
            joker.position.x = 10 + Math.cos(elapsedTime * 2) * 2;
            joker.rotation.y = Math.cos(elapsedTime) * 0.3;
            break;
            
          case 1:
            batman.position.y = 3 + Math.sin(elapsedTime * 3) * 2;
            batman.position.x = -6 + Math.sin(elapsedTime * 2) * 3;
            joker.position.y = 3 + Math.cos(elapsedTime * 3) * 2;
            joker.position.x = 6 + Math.cos(elapsedTime * 2) * 3;
            break;
            
          case 2:
            batman.position.x = Math.sin(elapsedTime * 4) * 1.5;
            batman.position.z = -5 + Math.cos(elapsedTime * 3) * 1.5;
            joker.position.x = Math.cos(elapsedTime * 4) * 1.5;
            joker.position.z = -5 + Math.sin(elapsedTime * 3) * 1.5;
            break;
            
          case 3:
            batman.position.x = -2 + Math.sin(elapsedTime * 6) * 0.8;
            batman.position.y = Math.abs(Math.sin(elapsedTime * 8)) * 3;
            joker.position.x = 2 + Math.cos(elapsedTime * 6) * 0.8;
            joker.position.y = Math.abs(Math.cos(elapsedTime * 8)) * 3;
            portal.rotation.z = elapsedTime * 2;
            break;
            
          case 4:
            batman.position.x = Math.sin(elapsedTime * 10) * 0.3;
            batman.position.y = 2 + Math.sin(elapsedTime * 12) * 1.5;
            joker.position.x = Math.cos(elapsedTime * 10) * 0.3;
            joker.position.y = 2 + Math.cos(elapsedTime * 12) * 1.5;
            break;
        }

        // Simplified reality breaking effects
        if (realityBreakLevel >= 1) {
          batman.rotation.x += Math.sin(elapsedTime * 15) * 0.005;
          joker.rotation.x += Math.cos(elapsedTime * 15) * 0.005;
        }
        
        if (realityBreakLevel >= 2) {
          camera.position.x += Math.sin(elapsedTime * 20) * 0.05;
          camera.position.y += Math.cos(elapsedTime * 18) * 0.05;
        }
        
        if (realityBreakLevel >= 3) {
          renderer.toneMappingExposure = 1.2 + Math.sin(elapsedTime * 25) * 0.2;
        }

        // Character awareness
        const lookAtX = mouseX * 10;
        const lookAtY = mouseY * 8;
        
        batman.lookAt(lookAtX, lookAtY, 10);
        joker.lookAt(lookAtX, lookAtY, 10);
        
        if (isMousePressed) {
          batman.scale.setScalar(1.7);
          joker.scale.setScalar(1.7);
        } else {
          batman.scale.setScalar(1.5);
          joker.scale.setScalar(1.5);
        }
      }

      // Simplified effects animation
      battleEffects.children.forEach((effect, index) => {
        effect.rotation.x += 0.02;
        effect.rotation.y += 0.03;
        effect.position.y += Math.sin(elapsedTime * 2 + index) * 0.01;
      });

      // Optimized lighting
      batmanLight.intensity = 2 + Math.sin(elapsedTime * 2) * 1;
      jokerLight.intensity = 2 + Math.cos(elapsedTime * 2) * 1;
      portalLight.intensity = isPortalOpen ? 5 + Math.sin(elapsedTime * 6) * 2 : 3;

      // Simplified camera movement
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 2 + 8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

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
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-70 dark:opacity-80"
        style={{ zIndex: -1 }}
      />
      
      {/* GRAVITY-ENHANCED REALITY STATUS */}
      <div className="fixed top-4 left-4 z-50 space-y-4 pointer-events-none">
        <div className="gravity-card glass-card rounded-2xl p-4 gravity-float">
          <div className="text-sm font-bold text-white mb-2 flex items-center">
            🌌 REALITY STATUS
          </div>
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-4 h-4 rounded-full transition-all duration-500 gravity-bounce ${
                  realityBreakLevel >= level 
                    ? 'bg-gradient-to-r from-red-500 to-purple-500 shadow-lg animate-pulse' 
                    : 'bg-gray-600'
                }`}
                style={{ animationDelay: `${level * 0.1}s` }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-300 mt-2 gravity-text">
            {realityBreakLevel === 0 && "Reality Stable"}
            {realityBreakLevel === 1 && "Minor Distortions"}
            {realityBreakLevel === 2 && "Reality Fracturing"}
            {realityBreakLevel === 3 && "REALITY COLLAPSED"}
          </div>
        </div>
        
        <div className="gravity-card glass-card rounded-2xl p-4 gravity-float-delayed">
          <div className="text-sm font-bold text-white mb-2">🎭 BATTLE PHASE</div>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((phase) => (
              <div
                key={phase}
                className={`w-3 h-3 rounded-full transition-all duration-500 gravity-bounce ${
                  battlePhase >= phase 
                    ? 'bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg' 
                    : 'bg-gray-600'
                }`}
                style={{ animationDelay: `${phase * 0.1}s` }}
              />
            ))}
          </div>
          <div className="text-xs text-gray-300 mt-2 gravity-text">
            {battlePhase === 0 && "Standoff"}
            {battlePhase === 1 && "Aerial Combat"}
            {battlePhase === 2 && "Close Combat"}
            {battlePhase === 3 && "Reality Breaking"}
            {battlePhase === 4 && "Ultimate Showdown"}
          </div>
        </div>
      </div>

      {/* GRAVITY-ENHANCED INTERACTION COUNTER */}
      <div className="fixed top-4 right-4 z-50 gravity-card glass-card rounded-2xl p-4 pointer-events-none gravity-float-right">
        <div className="text-sm font-bold text-white mb-2">👁️ AWARENESS LEVEL</div>
        <div className="text-2xl font-bold text-gradient-exotic gravity-number">{userInteractionCount}</div>
        <div className="text-xs text-gray-300 gravity-text">Mouse movements detected</div>
      </div>

      {/* Enhanced Portal Activation */}
      {isPortalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="gravity-card glass-card rounded-3xl p-8 text-center animate-pulse border-4 border-purple-500 gravity-portal">
            <div className="text-4xl font-bold text-white mb-4 gravity-title">🌀 PORTAL ACTIVATED 🌀</div>
            <div className="text-xl text-purple-300 mb-4 gravity-subtitle">Reality has been breached!</div>
            <div className="text-gray-300 gravity-text">The characters are now aware of your presence</div>
          </div>
        </div>
      )}

      {/* Enhanced Battle Messages */}
      {battlePhase === 2 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="gravity-card glass-card rounded-3xl p-8 text-center animate-bounce border-2 border-yellow-500 gravity-message">
            <div className="text-3xl font-bold text-white mb-4 gravity-title">🦇 BATMAN SENSES YOU! 🦇</div>
            <div className="text-xl text-yellow-300 mb-2 gravity-subtitle">He's looking directly at your cursor!</div>
            <div className="text-gray-300 gravity-text">Move your mouse to control his attention</div>
          </div>
        </div>
      )}

      {battlePhase === 3 && realityBreakLevel >= 2 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="gravity-card glass-card rounded-3xl p-8 text-center animate-pulse border-2 border-green-500 gravity-message-delayed">
            <div className="text-3xl font-bold text-white mb-4 gravity-title">🃏 JOKER'S CHAOS UNLEASHED! 🃏</div>
            <div className="text-xl text-green-300 mb-2 gravity-subtitle">Reality is bending to his will!</div>
            <div className="text-gray-300 gravity-text">Double-click to break reality further!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatmanJokerBattle;