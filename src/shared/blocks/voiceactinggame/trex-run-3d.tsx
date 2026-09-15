'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Expand, Mic, Play, Trophy } from 'lucide-react';
import * as THREE from 'three';

type GameState = 'idle' | 'running' | 'over';

const GRAVITY = -34;
const JUMP_VELOCITY = 10.5;
const START_SPEED = 16;
const MAX_SPEED = 40;
const BEST_KEY = 'vag-trex-best';

type Obstacle = {
  mesh: THREE.Object3D;
  kind: 'cactus' | 'pterodactyl';
  height: number;
  hit: boolean;
};

export function TRexRun3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const dinoRef = useRef<THREE.Object3D | null>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const velocityRef = useRef(0);
  const speedRef = useRef(START_SPEED);
  const spawnTimerRef = useRef(1.2);
  const frameRef = useRef<number | null>(null);
  const stateRef = useRef<GameState>('idle');
  const scoreRef = useRef(0);
  const clockRef = useRef<THREE.Clock | null>(null);
  const micRef = useRef<{
    context: AudioContext;
    analyser: AnalyserNode;
    data: Float32Array<ArrayBuffer>;
  } | null>(null);
  const micLevelRef = useRef(0);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [micState, setMicState] = useState<'off' | 'on' | 'denied'>('off');
  const [micLevel, setMicLevel] = useState(0);

  useEffect(() => {
    const stored = window.localStorage.getItem(BEST_KEY);
    if (stored) {
      setBest(Number(stored) || 0);
    }
  }, []);

  const createDino = useCallback(() => {
    const dino = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 2.2), bodyMaterial);
    body.position.y = 1.3;
    dino.add(body);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.85, 1.1), bodyMaterial);
    head.position.set(0, 2.25, 1.2);
    dino.add(head);

    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.6), darkMaterial);
    snout.position.set(0, 2.1, 1.85);
    dino.add(snout);

    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 1.5), darkMaterial);
    tail.position.set(0, 1.1, -1.7);
    tail.rotation.x = 0.35;
    dino.add(tail);

    const legGeometry = new THREE.BoxGeometry(0.4, 1.2, 0.5);
    const leftLeg = new THREE.Mesh(legGeometry, darkMaterial);
    leftLeg.position.set(-0.35, 0.6, 0.2);
    dino.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeometry, darkMaterial);
    rightLeg.position.set(0.35, 0.6, 0.2);
    dino.add(rightLeg);

    const armGeometry = new THREE.BoxGeometry(0.25, 0.6, 0.3);
    const leftArm = new THREE.Mesh(armGeometry, darkMaterial);
    leftArm.position.set(-0.7, 1.5, 0.9);
    dino.add(leftArm);
    const rightArm = new THREE.Mesh(armGeometry, darkMaterial);
    rightArm.position.set(0.7, 1.5, 0.9);
    dino.add(rightArm);

    return dino;
  }, []);

  const createCactus = useCallback(() => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0x3f6212, roughness: 0.8 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 2.2, 8), material);
    trunk.position.y = 1.1;
    group.add(trunk);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 1.1, 8), material);
    arm.position.set(0.55, 1.5, 0);
    arm.rotation.z = -0.5;
    group.add(arm);
    return group;
  }, []);

  const createPterodactyl = useCallback(() => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 1.6), material);
    group.add(body);
    const wingGeometry = new THREE.BoxGeometry(2.6, 0.15, 0.9);
    const leftWing = new THREE.Mesh(wingGeometry, material);
    leftWing.position.set(-1.5, 0.1, 0);
    group.add(leftWing);
    const rightWing = new THREE.Mesh(wingGeometry, material);
    rightWing.position.set(1.5, 0.1, 0);
    group.add(rightWing);
    const beak = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.7), material);
    beak.position.set(0, 0.05, 1.05);
    group.add(beak);
    return group;
  }, []);

  const resetWorld = useCallback(() => {
    obstaclesRef.current.forEach((obstacle) => {
      sceneRef.current?.remove(obstacle.mesh);
    });
    obstaclesRef.current = [];
    velocityRef.current = 0;
    speedRef.current = START_SPEED;
    spawnTimerRef.current = 1.1;
    scoreRef.current = 0;
    setScore(0);
    if (dinoRef.current) {
      dinoRef.current.position.y = 0;
      dinoRef.current.rotation.set(0, 0, 0);
    }
  }, []);

  const jump = useCallback(() => {
    if (stateRef.current !== 'running') {
      return;
    }
    if (dinoRef.current && dinoRef.current.position.y <= 0.01) {
      velocityRef.current = JUMP_VELOCITY;
    }
  }, []);

  const endGame = useCallback(() => {
    stateRef.current = 'over';
    setGameState('over');
    const finalScore = Math.floor(scoreRef.current);
    setBest((previousBest) => {
      if (finalScore > previousBest) {
        window.localStorage.setItem(BEST_KEY, String(finalScore));
        return finalScore;
      }
      return previousBest;
    });
  }, []);

  const spawnObstacle = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) {
      return;
    }
    const isPterodactyl = Math.random() < 0.35 && speedRef.current > START_SPEED + 3;
    const mesh = isPterodactyl ? createPterodactyl() : createCactus();
    const lane = (Math.random() - 0.5) * 5;
    if (isPterodactyl) {
      mesh.position.set(lane, 2.4 + Math.random() * 0.7, -80);
      obstaclesRef.current.push({ mesh, kind: 'pterodactyl', height: 3.1, hit: false });
    } else {
      mesh.position.set(lane, 0, -80);
      obstaclesRef.current.push({ mesh, kind: 'cactus', height: 2.2, hit: false });
    }
    scene.add(mesh);
  }, [createCactus, createPterodactyl]);

  const step = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const dino = dinoRef.current;
    const clock = clockRef.current;

    if (!renderer || !scene || !camera || !dino || !clock) {
      frameRef.current = requestAnimationFrame(step);
      return;
    }

    const delta = Math.min(clock.getDelta(), 0.05);
    const running = stateRef.current === 'running';

    if (running) {
      speedRef.current = Math.min(MAX_SPEED, speedRef.current + delta * 0.9);
      scoreRef.current += delta * speedRef.current * 0.6;

      velocityRef.current += GRAVITY * delta;
      dino.position.y = Math.max(0, dino.position.y + velocityRef.current * delta);
      if (dino.position.y === 0 && velocityRef.current < 0) {
        velocityRef.current = 0;
      }
      dino.rotation.x = -Math.min(0.35, Math.max(-0.35, velocityRef.current / 40));
      dino.rotation.z += delta * 0.4;

      spawnTimerRef.current -= delta;
      if (spawnTimerRef.current <= 0) {
        spawnObstacle();
        spawnTimerRef.current = Math.max(0.55, 1.6 - speedRef.current * 0.02) + Math.random() * 0.5;
      }

      obstaclesRef.current.forEach((obstacle) => {
        obstacle.mesh.position.z += speedRef.current * delta;
        if (obstacle.kind === 'pterodactyl') {
          obstacle.mesh.position.y += Math.sin(performance.now() / 320) * delta * 0.6;
          obstacle.mesh.rotation.z = Math.sin(performance.now() / 260) * 0.25;
        }
        if (obstacle.mesh.position.z > 8) {
          scene.remove(obstacle.mesh);
          return;
        }
        const withinZ = Math.abs(obstacle.mesh.position.z) < 1.25;
        const withinX = Math.abs(obstacle.mesh.position.x) < 1.1;
        if (!obstacle.hit && withinZ && withinX) {
          const dinoBottom = dino.position.y;
          const dinoTop = dino.position.y + 2.6;
          const obstacleBottom = obstacle.kind === 'pterodactyl' ? obstacle.mesh.position.y - 0.35 : 0;
          const obstacleTop = obstacle.kind === 'pterodactyl' ? obstacle.mesh.position.y + 0.45 : obstacle.height;
          if (dinoBottom < obstacleTop && dinoTop > obstacleBottom) {
            obstacle.hit = true;
            endGame();
          }
        }
      });
      obstaclesRef.current = obstaclesRef.current.filter((obstacle) => obstacle.mesh.parent !== null);

      if (Math.floor(scoreRef.current) !== score) {
        setScore(Math.floor(scoreRef.current));
      }
    } else {
      dino.rotation.z += delta * 0.6;
    }

    camera.position.x = Math.sin(performance.now() / 2600) * 1.4;
    camera.lookAt(dino.position.x, dino.position.y + 1.5, -12);

    renderer.render(scene, camera);
    frameRef.current = requestAnimationFrame(step);
  }, [endGame, score, spawnObstacle]);

  const refreshMicLevel = useCallback(() => {
    const mic = micRef.current;
    if (!mic) {
      return;
    }
    mic.analyser.getFloatTimeDomainData(mic.data);
    let sum = 0;
    for (let i = 0; i < mic.data.length; i += 1) {
      sum += mic.data[i] * mic.data[i];
    }
    const rms = Math.sqrt(sum / mic.data.length);
    micLevelRef.current = rms;
    setMicLevel(Math.min(1, rms * 6));
    if (rms > 0.07) {
      jump();
    }
  }, [jump]);

  useEffect(() => {
    if (micState !== 'on') {
      return;
    }
    const timer = window.setInterval(refreshMicLevel, 60);
    return () => window.clearInterval(timer);
  }, [micState, refreshMicLevel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f14);
    scene.fog = new THREE.Fog(0x0a0f14, 40, 110);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 400);
    camera.position.set(0, 6.4, 13);
    camera.lookAt(0, 2, -10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const hemisphere = new THREE.HemisphereLight(0xa5d8ff, 0x0f172a, 1.1);
    scene.add(hemisphere);
    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(8, 16, 8);
    scene.add(sun);
    const rim = new THREE.PointLight(0x22d3ee, 1.4, 90);
    rim.position.set(-8, 10, -18);
    scene.add(rim);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(220, 260),
      new THREE.MeshStandardMaterial({ color: 0x111c26, roughness: 0.95 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -100);
    scene.add(floor);

    const grid = new THREE.GridHelper(240, 60, 0x22d3ee, 0x163243);
    grid.position.set(0, 0.02, -90);
    scene.add(grid);

    const laneMarkers = new THREE.Group();
    for (let i = 0; i < 16; i += 1) {
      const marker = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.05, 3),
        new THREE.MeshStandardMaterial({ color: 0x1f4e5f })
      );
      marker.position.set(6.4, 0.03, -i * 16);
      laneMarkers.add(marker);
      const mirror = marker.clone();
      mirror.position.x = -6.4;
      laneMarkers.add(mirror);
    }
    scene.add(laneMarkers);

    const dino = createDino();
    dino.position.set(0, 0, 0);
    scene.add(dino);
    dinoRef.current = dino;

    clockRef.current = new THREE.Clock();
    frameRef.current = requestAnimationFrame(step);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) {
        return;
      }
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      rendererRef.current = null;
      sceneRef.current = null;
      dinoRef.current = null;
      obstaclesRef.current = [];
    };
  }, [createDino, step]);

  useEffect(() => {
    return () => {
      const mic = micRef.current;
      if (mic) {
        mic.context.close().catch(() => undefined);
        micRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        if (stateRef.current === 'running') {
          jump();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  const requestMic = useCallback(async () => {
    if (micRef.current) {
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextClass();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      micRef.current = {
        context,
        analyser,
        data: new Float32Array(analyser.fftSize),
      };
      setMicState('on');
    } catch (error) {
      setMicState('denied');
      console.error('microphone unavailable', error);
    }
  }, []);

  const startGame = useCallback(() => {
    resetWorld();
    stateRef.current = 'running';
    setGameState('running');
    requestMic();
  }, [requestMic, resetWorld]);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current?.parentElement;
    if (!container) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    } else {
      container.requestFullscreen?.().catch(() => undefined);
    }
  }, []);

  return (
    <div className="vag-game-frame" onClick={jump} role="presentation">
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

      {gameState === 'running' ? (
        <>
          <div className="vag-game-hud">
            <span>SCORE {score}</span>
            <span>BEST {best}</span>
            <span>{micState === 'on' ? `MIC ${Math.round(micLevel * 100)}%` : 'TAP/SPACE'}</span>
          </div>
          <button type="button" className="vag-game-fullscreen" onClick={toggleFullscreen}>
            <Expand size={14} aria-hidden="true" /> Fullscreen
          </button>
        </>
      ) : null}

      {gameState !== 'running' ? (
        <div className="vag-game-overlay">
          <h3 className="vag-game-title">T-REX RUN 3D</h3>
          <p className="vag-game-sub">
            {gameState === 'over'
              ? `Score ${score} - best ${best}. Shout or tap to jump over cacti and ducks.`
              : 'Use your voice or tap to make the T-Rex jump. Avoid cacti and flying pterodactyls!'}
          </p>
          <div className="vag-game-buttons">
            <button type="button" className="vag-btn vag-btn--green" onClick={startGame}>
              <Play size={18} aria-hidden="true" />
              {gameState === 'over' ? 'Play again' : 'Start game'}
            </button>
            <button
              type="button"
              className="vag-btn vag-btn--orange"
              onClick={() => {
                window.alert(
                  `Your best run: ${best} points. The leaderboard shows your own high score stored in this browser.`
                );
              }}
            >
              <Trophy size={18} aria-hidden="true" />
              Leaderboard
            </button>
          </div>
          <p className="vag-game-sub" style={{ marginTop: 8 }}>
            <Mic size={14} aria-hidden="true" />{' '}
            {micState === 'on'
              ? 'Voice control active - make some noise to jump'
              : micState === 'denied'
                ? 'Microphone blocked - tap or press space to jump'
                : 'Voice control turns on when the run starts'}
          </p>
        </div>
      ) : null}
    </div>
  );
}
