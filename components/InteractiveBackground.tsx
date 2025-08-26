import React, { useRef, useEffect } from 'react';

const PARTICLE_LIMIT = 1000;
const INITIAL_PARTICLES = 100;
const TRAIL_LENGTH = 80;

// Constantes para a gravidade do mouse
const MOUSE_GRAVITY = 0.1125;
const MOUSE_MASS = 10000;
const MIN_GRAVITY_DISTANCE_SQ = 100 * 100;
const MAX_VELOCITY = 4;

const BLUE_RGB = '59, 130, 246';
const PINK_RGB = '236, 72, 153';
const PURPLE_RGB = '168, 85, 247';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  rgbColor: string; // Adicionado para splashes
  type: 'blue' | 'pink' | 'purple';
  history: { x: number; y: number }[];
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string; // RGB string
}

interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InteractiveBackgroundProps {
  logoHitbox: Hitbox | null;
  titleHitbox: Hitbox | null;
  subtitleHitbox: Hitbox | null;
  buttonHitbox: Hitbox | null;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ logoHitbox, titleHitbox, subtitleHitbox, buttonHitbox }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const splashesRef = useRef<Splash[]>([]); // Ref para splashes
  const animationFrameId = useRef<number | null>(null);
  const nextId = useRef(0);

  const mouseX = useRef<number | null>(null);
  const mouseY = useRef<number | null>(null);
  const isMouseOver = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX.current = event.clientX - rect.left;
        mouseY.current = event.clientY - rect.top;
        isMouseOver.current = true;
    };
    
    const handleMouseLeave = () => {
      isMouseOver.current = false;
      mouseX.current = null;
      mouseY.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    const SIZES = [2, 3.5, 5];

    const createParticle = (
      type: 'blue' | 'pink' | 'purple',
      x?: number,
      y?: number,
      radius?: number
    ): Particle => {
      const dpr = window.devicePixelRatio || 1;
      const r = radius || SIZES[Math.floor(Math.random() * SIZES.length)];
      const particle: Particle = {
        id: nextId.current++,
        x: x ?? Math.random() * (canvas.width / dpr),
        y: y ?? Math.random() * (canvas.height / dpr),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: r,
        mass: r * r * Math.PI,
        color: type === 'blue' ? '#3b82f6' : type === 'pink' ? '#ec4899' : '#a855f7',
        rgbColor: type === 'blue' ? BLUE_RGB : type === 'pink' ? PINK_RGB : PURPLE_RGB,
        type: type,
        history: [],
      };
      return particle;
    };

    // Função para criar um splash
    const createSplash = (x: number, y: number, color: string, radius: number) => {
        if (splashesRef.current.length > 50) return; // Limita o número de splashes para performance
        splashesRef.current.push({
            x,
            y,
            radius: 0,
            maxRadius: radius,
            opacity: 1,
            color,
        });
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    particlesRef.current = [];
    for (let i = 0; i < INITIAL_PARTICLES / 2; i++) {
      particlesRef.current.push(createParticle('blue'));
      particlesRef.current.push(createParticle('pink'));
    }

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.width / dpr;
      const cssHeight = canvas.height / dpr;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const particles = particlesRef.current;
      const hitboxes = [logoHitbox, titleHitbox, subtitleHitbox, buttonHitbox].filter(Boolean) as Hitbox[];

      let particlesToRemove = new Set<number>();
      let particlesToAdd: Particle[] = [];

      // Animação e desenho dos splashes
      ctx.globalCompositeOperation = 'lighter';
      splashesRef.current = splashesRef.current.filter(splash => {
          splash.radius += splash.maxRadius / 30; // Velocidade de expansão
          splash.opacity -= 0.03; // Velocidade de fade
          if (splash.opacity <= 0) return false;

          ctx.beginPath();
          ctx.arc(splash.x, splash.y, splash.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${splash.color}, ${splash.opacity})`;
          ctx.fill();
          return true;
      });
      ctx.globalCompositeOperation = 'source-over';


      particles.forEach(p => {
        if (isMouseOver.current && mouseX.current !== null && mouseY.current !== null) {
            const dx = mouseX.current - p.x;
            const dy = mouseY.current - p.y;
            const distSq = dx * dx + dy * dy;

            if (distSq > 1) {
                const dist = Math.sqrt(distSq);
                const force = (MOUSE_GRAVITY * MOUSE_MASS) / Math.max(distSq, MIN_GRAVITY_DISTANCE_SQ);
                p.vx += force * (dx / dist);
                p.vy += force * (dy / dist);
            }
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_VELOCITY) {
            p.vx = (p.vx / speed) * MAX_VELOCITY;
            p.vy = (p.vy / speed) * MAX_VELOCITY;
        }

        p.x += p.vx;
        p.y += p.vy;
        
        p.history.unshift({ x: p.x, y: p.y });
        if (p.history.length > TRAIL_LENGTH) {
            p.history.pop();
        }

        if (p.x - p.radius < 0) { p.x = p.radius; p.vx *= -1; }
        if (p.x + p.radius > cssWidth) { p.x = cssWidth - p.radius; p.vx *= -1; }
        if (p.y - p.radius < 0) { p.y = p.radius; p.vy *= -1; }
        if (p.y + p.radius > cssHeight) { p.y = cssHeight - p.radius; p.vy *= -1; }

        hitboxes.forEach(box => {
            const closestX = Math.max(box.x, Math.min(p.x, box.x + box.width));
            const closestY = Math.max(box.y, Math.min(p.y, box.y + box.height));
            const dx = p.x - closestX;
            const dy = p.y - closestY;
            const distanceSq = (dx * dx) + (dy * dy);

            if (distanceSq < (p.radius * p.radius) && distanceSq > 1e-6) {
                const distance = Math.sqrt(distanceSq);
                createSplash(p.x, p.y, p.rgbColor, p.radius * 4); // Splash na colisão com hitbox

                const overlap = p.radius - distance;
                p.x += overlap * (dx / distance);
                p.y += overlap * (dy / distance);

                const normalX = dx / distance;
                const normalY = dy / distance;
                const dotProduct = p.vx * normalX + p.vy * normalY;
                
                p.vx -= 2 * dotProduct * normalX;
                p.vy -= 2 * dotProduct * normalY;
            }
        });
      });

      // Processar interações e colisões entre partículas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          if (particlesToRemove.has(p1.id) || particlesToRemove.has(p2.id)) {
            continue;
          }

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < p1.radius + p2.radius) {
            const collisionX = (p1.x * p2.radius + p2.x * p1.radius) / (p1.radius + p2.radius);
            const collisionY = (p1.y * p2.radius + p2.y * p1.radius) / (p1.radius + p2.radius);
            const collisionRadius = (p1.radius + p2.radius) * 2;

            // REGRA 1: Colisão Azul + Rosa
            if ((p1.type === 'blue' && p2.type === 'pink') || (p1.type === 'pink' && p2.type === 'blue')) {
              particlesToRemove.add(p1.id);
              particlesToRemove.add(p2.id);
              createSplash(collisionX, collisionY, PURPLE_RGB, collisionRadius);
              for (let k = 0; k < 3; k++) {
                particlesToAdd.push(createParticle('purple', collisionX, collisionY));
              }
            } 
            // REGRA 2: Colisão Roxo + Roxo
            else if (p1.type === 'purple' && p2.type === 'purple') {
              particlesToRemove.add(p1.id);
              particlesToRemove.add(p2.id);
              const newType = Math.random() < 0.5 ? 'blue' : 'pink';
              const newRadius = SIZES[Math.floor(Math.random() * SIZES.length)];
              createSplash(collisionX, collisionY, newType === 'blue' ? BLUE_RGB : PINK_RGB, collisionRadius);
              particlesToAdd.push(createParticle(newType, collisionX, collisionY, newRadius));
            } 
            // REGRA 3: Colisão Elástica (cores iguais)
            else {
              createSplash(collisionX, collisionY, p1.rgbColor, (p1.radius + p2.radius) * 0.8);

              const overlap = 0.5 * (p1.radius + p2.radius - dist);
              p1.x -= overlap * (dx / dist);
              p1.y -= overlap * (dy / dist);
              p2.x += overlap * (dx / dist);
              p2.y += overlap * (dy / dist);
              
              const nx = dx / dist;
              const ny = dy / dist;
              const k = -2 * ((p2.vx - p1.vx) * nx + (p2.vy - p1.vy) * ny) / (1 / p1.mass + 1 / p2.mass);
              p1.vx -= k * nx / p1.mass;
              p1.vy -= k * ny / p1.mass;
              p2.vx += k * nx / p2.mass;
              p2.vy += k * ny / p2.mass;
            }
          }
        }
      }
      
      // Atualizar a lista de partículas após todas as colisões serem processadas
      if (particlesToRemove.size > 0 || particlesToAdd.length > 0) {
        let nextParticles = particles.filter(p => !particlesToRemove.has(p.id));
        nextParticles.push(...particlesToAdd);

        if (nextParticles.length > PARTICLE_LIMIT) {
            nextParticles = nextParticles.slice(nextParticles.length - PARTICLE_LIMIT);
        }
        particlesRef.current = nextParticles;
      }

      // Desenhar rastros e partículas
      particlesRef.current.forEach(p => {
        for (let i = 0; i < p.history.length; i++) {
            const pos = p.history[i];
            const trailProgress = i / p.history.length;
            const trailOpacity = 1 - trailProgress;
            const trailRadius = (p.radius * 0.7) * (1 - trailProgress);

            if (trailRadius < 0.1) continue;
            
            ctx.fillStyle = `rgba(${p.rgbColor}, ${trailOpacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, trailRadius, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [logoHitbox, titleHitbox, subtitleHitbox, buttonHitbox]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;