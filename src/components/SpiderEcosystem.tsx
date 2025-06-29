import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SpiderEcosystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spiderRef = useRef<THREE.Group | null>(null);
  const webRef = useRef<THREE.Group | null>(null);
  const bugsRef = useRef<THREE.Group[]>([]);
  const [spiderState, setSpiderState] = useState<'hunting' | 'eating' | 'webbing' | 'crawling'>('crawling');
  const [bugsEaten, setBugsEaten] = useState(0);
  const [webSize, setWebSize] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Optimized scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // ULTRA-REALISTIC 3D SPIDER
    const createUltraSpider = () => {
      const spider = new THREE.Group();
      
      // Spider body (abdomen)
      const abdomenGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const abdomenMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1a1a1a,
        shininess: 100,
        transparent: true,
        opacity: 0.95
      });
      const abdomen = new THREE.Mesh(abdomenGeometry, abdomenMaterial);
      abdomen.scale.set(1, 0.8, 1.2);
      spider.add(abdomen);

      // Spider thorax
      const thoraxGeometry = new THREE.SphereGeometry(0.5, 12, 12);
      const thoraxMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2a2a2a,
        shininess: 80
      });
      const thorax = new THREE.Mesh(thoraxGeometry, thoraxMaterial);
      thorax.position.set(0, 0, 0.8);
      spider.add(thorax);

      // Spider head
      const headGeometry = new THREE.SphereGeometry(0.3, 12, 12);
      const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0a0a0a,
        shininess: 120
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.set(0, 0, 1.3);
      spider.add(head);

      // Spider eyes (8 eyes)
      const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const eyeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        emissive: 0x330000,
        emissiveIntensity: 0.5
      });
      
      const eyePositions = [
        [-0.15, 0.1, 1.45], [0.15, 0.1, 1.45],
        [-0.1, 0.05, 1.48], [0.1, 0.05, 1.48],
        [-0.2, 0, 1.4], [0.2, 0, 1.4],
        [-0.05, -0.05, 1.5], [0.05, -0.05, 1.5]
      ];
      
      eyePositions.forEach(pos => {
        const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eye.position.set(pos[0], pos[1], pos[2]);
        spider.add(eye);
      });

      // Spider legs (8 legs)
      const legs: THREE.Group[] = [];
      for (let i = 0; i < 8; i++) {
        const leg = new THREE.Group();
        
        // Leg segments
        for (let j = 0; j < 3; j++) {
          const segmentGeometry = new THREE.CylinderGeometry(0.03, 0.05, 0.6, 8);
          const segmentMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 60
          });
          const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
          segment.position.y = j * 0.5;
          segment.rotation.z = Math.PI / 6 * (j + 1);
          leg.add(segment);
        }
        
        // Position legs around body
        const angle = (i / 8) * Math.PI * 2;
        const side = i < 4 ? 1 : -1;
        leg.position.set(
          Math.cos(angle) * 0.6,
          side * 0.3,
          Math.sin(angle) * 0.4 + 0.4
        );
        leg.rotation.y = angle;
        
        spider.add(leg);
        legs.push(leg);
      }

      // Fangs
      const fangGeometry = new THREE.ConeGeometry(0.02, 0.15, 6);
      const fangMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        shininess: 150
      });
      
      const leftFang = new THREE.Mesh(fangGeometry, fangMaterial);
      leftFang.position.set(-0.08, -0.1, 1.4);
      leftFang.rotation.x = Math.PI;
      spider.add(leftFang);
      
      const rightFang = new THREE.Mesh(fangGeometry, fangMaterial);
      rightFang.position.set(0.08, -0.1, 1.4);
      rightFang.rotation.x = Math.PI;
      spider.add(rightFang);

      spider.position.set(0, 0, 5);
      spider.scale.set(2, 2, 2);
      
      return { spider, legs };
    };

    // REALISTIC SPIDER WEB
    const createSpiderWeb = () => {
      const web = new THREE.Group();
      
      // Web strands
      const webMaterial = new THREE.LineBasicMaterial({ 
        color: 0xcccccc,
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      });

      // Radial strands
      for (let i = 0; i < 8; i++) {
        const points = [];
        const angle = (i / 8) * Math.PI * 2;
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(
          Math.cos(angle) * 3,
          Math.sin(angle) * 3,
          0
        ));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, webMaterial);
        web.add(line);
      }

      // Spiral strands
      for (let r = 0.5; r < 3; r += 0.5) {
        const points = [];
        for (let i = 0; i <= 32; i++) {
          const angle = (i / 32) * Math.PI * 2;
          points.push(new THREE.Vector3(
            Math.cos(angle) * r,
            Math.sin(angle) * r,
            0
          ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, webMaterial);
        web.add(line);
      }

      // Web dewdrops
      for (let i = 0; i < 15; i++) {
        const dropGeometry = new THREE.SphereGeometry(0.02, 6, 6);
        const dropMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
          shininess: 200
        });
        const drop = new THREE.Mesh(dropGeometry, dropMaterial);
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 2.5 + 0.5;
        drop.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        );
        web.add(drop);
      }

      web.position.set(-5, 3, -2);
      web.rotation.x = Math.PI / 6;
      web.scale.set(0, 0, 0); // Start invisible
      
      return web;
    };

    // FLYING BUGS FOR SPIDER TO HUNT
    const createBugs = () => {
      const bugs: THREE.Group[] = [];
      
      for (let i = 0; i < 8; i++) {
        const bug = new THREE.Group();
        
        // Bug body
        const bodyGeometry = new THREE.CapsuleGeometry(0.05, 0.2, 4, 8);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
          color: Math.random() > 0.5 ? 0x4a5d23 : 0x8b4513,
          shininess: 50
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        bug.add(body);

        // Bug wings
        const wingGeometry = new THREE.PlaneGeometry(0.15, 0.08);
        const wingMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-0.08, 0.05, 0);
        leftWing.rotation.z = Math.PI / 4;
        bug.add(leftWing);
        
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(0.08, 0.05, 0);
        rightWing.rotation.z = -Math.PI / 4;
        bug.add(rightWing);

        // Bug antennae
        const antennaGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.1, 4);
        const antennaMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        
        const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        leftAntenna.position.set(-0.03, 0.08, 0.08);
        leftAntenna.rotation.z = Math.PI / 6;
        bug.add(leftAntenna);
        
        const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        rightAntenna.position.set(0.03, 0.08, 0.08);
        rightAntenna.rotation.z = -Math.PI / 6;
        bug.add(rightAntenna);

        // Random position
        bug.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 + 5
        );
        
        // Random flight path
        bug.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.01
          ),
          alive: true,
          flightPattern: Math.random()
        };
        
        bugs.push(bug);
      }
      
      return bugs;
    };

    // LIGHTING FOR SPIDER ECOSYSTEM
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const spiderLight = new THREE.SpotLight(0xff4444, 1, 20, Math.PI / 8, 0.5);
    spiderLight.position.set(0, 5, 8);
    scene.add(spiderLight);

    const { spider, legs } = createUltraSpider();
    const web = createSpiderWeb();
    const bugs = createBugs();

    scene.add(spider);
    scene.add(web);
    bugs.forEach(bug => scene.add(bug));

    spiderRef.current = spider;
    webRef.current = web;
    bugsRef.current = bugs;

    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // SPIDER AI AND BEHAVIOR
    let spiderTarget = new THREE.Vector3(0, 0, 5);
    let spiderSpeed = 0.02;
    let huntingTarget: THREE.Group | null = null;
    let webBuildingProgress = 0;
    let legAnimationTime = 0;

    // Mouse interaction for 4th wall breaking
    let mouseX = 0;
    let mouseY = 0;
    let mouseWorldPos = new THREE.Vector3();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mouseX = mouse.x;
      mouseY = mouse.y;
      
      // Convert mouse to world position
      raycaster.setFromCamera(mouse, camera);
      const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -5);
      raycaster.ray.intersectPlane(intersectPlane, mouseWorldPos);
    };

    const handleClick = () => {
      // Spider reacts to clicks by moving toward cursor
      if (spiderRef.current) {
        spiderTarget.copy(mouseWorldPos);
        setSpiderState('hunting');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // ULTIMATE ANIMATION LOOP
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      legAnimationTime += 0.1;

      // SPIDER BEHAVIOR AI
      if (spider) {
        // Spider follows mouse cursor (4th wall breaking)
        const mouseInfluence = new THREE.Vector3(mouseWorldPos.x, mouseWorldPos.y, spider.position.z);
        const distanceToMouse = spider.position.distanceTo(mouseInfluence);
        
        if (distanceToMouse < 3) {
          spiderTarget.copy(mouseInfluence);
          setSpiderState('hunting');
        }

        // Spider movement
        const direction = new THREE.Vector3().subVectors(spiderTarget, spider.position);
        if (direction.length() > 0.1) {
          direction.normalize().multiplyScalar(spiderSpeed);
          spider.position.add(direction);
          
          // Spider looks at target
          spider.lookAt(spiderTarget);
          
          // Animate legs while moving
          legs.forEach((leg, index) => {
            const legOffset = Math.sin(legAnimationTime + index * 0.5) * 0.2;
            leg.rotation.x = legOffset;
            leg.children.forEach((segment, segIndex) => {
              segment.rotation.z = Math.PI / 6 * (segIndex + 1) + legOffset * 0.5;
            });
          });
        }

        // BUG HUNTING LOGIC
        if (spiderState === 'hunting' || spiderState === 'crawling') {
          let closestBug: THREE.Group | null = null;
          let closestDistance = Infinity;
          
          bugs.forEach(bug => {
            if (bug.userData.alive) {
              const distance = spider.position.distanceTo(bug.position);
              if (distance < closestDistance && distance < 5) {
                closestDistance = distance;
                closestBug = bug;
              }
            }
          });
          
          if (closestBug && closestDistance < 0.5) {
            // SPIDER CATCHES BUG!
            closestBug.userData.alive = false;
            closestBug.visible = false;
            setBugsEaten(prev => prev + 1);
            setSpiderState('eating');
            
            // Spider eating animation
            setTimeout(() => {
              setSpiderState('webbing');
              webBuildingProgress = 0;
            }, 2000);
            
          } else if (closestBug) {
            spiderTarget.copy(closestBug.position);
            huntingTarget = closestBug;
          }
        }

        // WEB BUILDING BEHAVIOR
        if (spiderState === 'webbing') {
          webBuildingProgress += 0.02;
          if (web) {
            const scale = Math.min(webBuildingProgress, 1);
            web.scale.set(scale, scale, scale);
            setWebSize(Math.floor(scale * 100));
            
            if (webBuildingProgress >= 1) {
              setSpiderState('crawling');
              // Move to web center
              spiderTarget.copy(web.position);
            }
          }
        }

        // SPIDER CRAWLING ON CONTENT (4th wall breaking)
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Spider follows scroll position
        const scrollProgress = scrollY / (documentHeight - windowHeight);
        const crawlY = (scrollProgress - 0.5) * 10;
        
        if (spiderState === 'crawling') {
          spiderTarget.y = crawlY;
          spiderTarget.x = Math.sin(elapsedTime * 0.5) * 3;
        }
      }

      // ANIMATE BUGS
      bugs.forEach((bug, index) => {
        if (bug.userData.alive) {
          // Bug flight patterns
          const time = elapsedTime + index;
          bug.userData.velocity.x += (Math.random() - 0.5) * 0.001;
          bug.userData.velocity.y += (Math.random() - 0.5) * 0.001;
          bug.userData.velocity.z += (Math.random() - 0.5) * 0.0005;
          
          // Apply velocity
          bug.position.add(bug.userData.velocity);
          
          // Wing flapping
          const wingFlap = Math.sin(time * 20) * 0.3;
          bug.children[1].rotation.z = Math.PI / 4 + wingFlap; // Left wing
          bug.children[2].rotation.z = -Math.PI / 4 - wingFlap; // Right wing
          
          // Keep bugs in bounds
          if (Math.abs(bug.position.x) > 15) bug.userData.velocity.x *= -0.5;
          if (Math.abs(bug.position.y) > 10) bug.userData.velocity.y *= -0.5;
          if (bug.position.z < -5 || bug.position.z > 15) bug.userData.velocity.z *= -0.5;
          
          // Bug avoids spider
          if (spider) {
            const distanceToSpider = bug.position.distanceTo(spider.position);
            if (distanceToSpider < 2) {
              const avoidDirection = new THREE.Vector3().subVectors(bug.position, spider.position);
              avoidDirection.normalize().multiplyScalar(0.005);
              bug.userData.velocity.add(avoidDirection);
            }
          }
        }
      });

      // ANIMATE WEB
      if (web) {
        // Web sways gently
        web.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;
        
        // Dewdrops sparkle
        web.children.forEach((child, index) => {
          if (child instanceof THREE.Mesh && index > 16) { // Dewdrops
            child.material.opacity = 0.8 + Math.sin(elapsedTime * 3 + index) * 0.2;
          }
        });
      }

      // DYNAMIC LIGHTING
      spiderLight.intensity = 1 + Math.sin(elapsedTime * 2) * 0.3;
      if (spider) {
        spiderLight.position.copy(spider.position);
        spiderLight.position.y += 2;
        spiderLight.position.z += 1;
      }

      // CAMERA FOLLOWS SPIDER
      if (spider) {
        camera.position.x += (spider.position.x - camera.position.x) * 0.02;
        camera.position.y += (spider.position.y + 3 - camera.position.y) * 0.02;
        camera.lookAt(spider.position);
      }

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
      window.removeEventListener('click', handleClick);
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
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-90 dark:opacity-95"
        style={{ zIndex: 10 }}
      />
      
      {/* SPIDER STATUS HUD */}
      <div className="fixed top-20 right-4 z-50 space-y-3 pointer-events-none">
        <div className="glass-card rounded-2xl p-4">
          <div className="text-sm font-bold text-white mb-2 flex items-center">
            🕷️ SPIDER STATUS
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-xs">State:</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                spiderState === 'hunting' ? 'bg-red-500 text-white' :
                spiderState === 'eating' ? 'bg-orange-500 text-white' :
                spiderState === 'webbing' ? 'bg-blue-500 text-white' :
                'bg-green-500 text-white'
              }`}>
                {spiderState.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-xs">Bugs Eaten:</span>
              <span className="text-yellow-400 font-bold text-sm">{bugsEaten}</span>
            </div>
            {spiderState === 'webbing' && (
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">Web:</span>
                <span className="text-cyan-400 font-bold text-sm">{webSize}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-4">
          <div className="text-sm font-bold text-white mb-2">🎮 INTERACTION</div>
          <div className="text-xs text-gray-300 space-y-1">
            <div>• Move mouse to attract spider</div>
            <div>• Click to make spider hunt</div>
            <div>• Spider follows your scroll</div>
            <div>• Watch it break the 4th wall!</div>
          </div>
        </div>
      </div>

      {/* SPIDER BEHAVIOR MESSAGES */}
      {spiderState === 'hunting' && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-3xl p-6 text-center animate-pulse border-2 border-red-500">
            <div className="text-2xl font-bold text-white mb-2">🕷️ SPIDER IS HUNTING! 🕷️</div>
            <div className="text-lg text-red-300 mb-2">It's tracking your cursor movement!</div>
            <div className="text-gray-300 text-sm">The spider has broken the 4th wall and sees you!</div>
          </div>
        </div>
      )}

      {spiderState === 'eating' && (
        <div className="fixed bottom-1/3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-3xl p-6 text-center animate-bounce border-2 border-orange-500">
            <div className="text-2xl font-bold text-white mb-2">🍽️ SPIDER IS FEEDING! 🍽️</div>
            <div className="text-lg text-orange-300 mb-2">Caught a delicious bug!</div>
            <div className="text-gray-300 text-sm">Nature's perfect predator at work</div>
          </div>
        </div>
      )}

      {spiderState === 'webbing' && (
        <div className="fixed top-1/2 right-8 z-50 pointer-events-none">
          <div className="glass-card rounded-3xl p-6 text-center animate-pulse border-2 border-blue-500">
            <div className="text-2xl font-bold text-white mb-2">🕸️ BUILDING WEB! 🕸️</div>
            <div className="text-lg text-blue-300 mb-2">Creating a masterpiece trap</div>
            <div className="text-gray-300 text-sm">Web Progress: {webSize}%</div>
          </div>
        </div>
      )}

      {bugsEaten >= 5 && (
        <div className="fixed bottom-4 right-1/2 transform translate-x-1/2 z-50 pointer-events-none">
          <div className="glass-card rounded-2xl p-4 text-center animate-pulse border-2 border-yellow-500">
            <div className="text-lg font-bold text-white">🏆 MASTER HUNTER! 🏆</div>
            <div className="text-sm text-yellow-300">Spider has eaten {bugsEaten} bugs!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpiderEcosystem;