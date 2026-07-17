import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Sparkles, Cpu, Atom, Wand2, GraduationCap } from "lucide-react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Premium animated AI background:
 *  - animated dot grid (masked fade)
 *  - floating glowing particles + connection lines (canvas)
 *  - soft gradient blobs (breathing)
 *  - tiny floating AI icons (parallax to mouse)
 *  - respects prefers-reduced-motion
 */
export function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(60, Math.floor((width * height) / 22000)));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.8,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      // Draw a static frame and stop
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        for (const p of particlesRef.current) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(20,140,150,0.35)";
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      draw();
      return () => window.removeEventListener("resize", resize);
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const parts = particlesRef.current;
      const mx = mouseRef.current.x * width;
      const my = mouseRef.current.y * height;

      for (const p of parts) {
        // gentle drift + mild attraction to mouse
        p.x += p.vx;
        p.y += p.vy;
        const dxm = mx - p.x;
        const dym = my - p.y;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 40000) {
          p.vx += (dxm / dm2) * 0.6;
          p.vy += (dym / dm2) * 0.6;
        }
        // damping
        p.vx *= 0.985;
        p.vy *= 0.985;
        // wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // connection lines
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 140;
          if (d2 < max * max) {
            const alpha = 1 - Math.sqrt(d2) / max;
            ctx.strokeStyle = `rgba(20,140,150,${alpha * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // particles with glow
      for (const p of parts) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, "rgba(20,140,150,0.55)");
        grad.addColorStop(1, "rgba(20,140,150,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(240,170,60,0.9)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  // Mouse parallax
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
      setParallax({ x: (x - 0.5) * 20, y: (y - 0.5) * 20 });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const floatingIcons = [
    { Icon: Brain, top: "12%", left: "8%", delay: 0 },
    { Icon: Sparkles, top: "22%", right: "10%", delay: 0.6 },
    { Icon: Cpu, bottom: "18%", left: "12%", delay: 1.1 },
    { Icon: Atom, bottom: "26%", right: "14%", delay: 1.5 },
    { Icon: Wand2, top: "45%", left: "4%", delay: 0.9 },
    { Icon: GraduationCap, top: "40%", right: "6%", delay: 0.3 },
  ];

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base cream/white wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.background),theme(colors.background))]" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_7%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent_85%)]"
        style={
          reduce
            ? undefined
            : {
                animation: "grid-drift 24s linear infinite",
              }
        }
      />

      {/* Breathing gradient blobs */}
      <motion.div
        className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary-glow) 55%, transparent), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 55%, transparent), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1.05, 1, 1.05], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 -bottom-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--highlight) 40%, transparent), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Canvas particles + connections */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Floating AI icons with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`, transition: "transform 400ms cubic-bezier(.2,.7,.2,1)" }}
      >
        {floatingIcons.map(({ Icon, delay, ...pos }, i) => (
          <motion.div
            key={i}
            className="absolute grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-card/60 text-primary shadow-card backdrop-blur"
            style={pos as React.CSSProperties}
            initial={{ opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 0.9, y: 0 } : { opacity: 0.9, y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="h-4 w-4" />
          </motion.div>
        ))}
      </div>

      {/* Top vignette to keep navbar clean */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
