import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Sparkles, Cpu, Atom, Wand2, GraduationCap } from "lucide-react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Dark premium AI hero background:
 *  - deep navy base (#071018)
 *  - aurora / teal + orange glow blobs
 *  - animated neural network canvas (particles + connection lines)
 *  - floating AI icon chips with parallax
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

      const count = Math.max(32, Math.min(72, Math.floor((width * height) / 20000)));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.8,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        for (const p of particlesRef.current) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(120,220,225,0.45)";
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
        p.x += p.vx;
        p.y += p.vy;
        const dxm = mx - p.x;
        const dym = my - p.y;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 40000) {
          p.vx += (dxm / dm2) * 0.6;
          p.vy += (dym / dm2) * 0.6;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // neural connection lines
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 150;
          if (d2 < max * max) {
            const alpha = 1 - Math.sqrt(d2) / max;
            ctx.strokeStyle = `rgba(120,220,225,${alpha * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // glowing particles
      for (const p of parts) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 7);
        grad.addColorStop(0, "rgba(120,220,225,0.55)");
        grad.addColorStop(1, "rgba(120,220,225,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,190,110,0.95)";
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
      {/* Deep navy base */}
      <div className="absolute inset-0" style={{ background: "#071018" }} />

      {/* Aurora radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(60,120,140,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(239,123,36,0.18), transparent 65%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(80,180,190,0.22), transparent 65%)",
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(180,220,225,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,220,225,0.18)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_40%,black,transparent_85%)]"
        style={reduce ? undefined : { animation: "grid-drift 24s linear infinite" }}
      />

      {/* Aurora glow blobs */}
      <motion.div
        className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(80,190,200,0.45), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-44 top-10 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(239,123,36,0.35), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1.05, 1, 1.05], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 -bottom-48 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(120,220,225,0.28), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Neural network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Floating AI icon chips */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`, transition: "transform 400ms cubic-bezier(.2,.7,.2,1)" }}
      >
        {floatingIcons.map(({ Icon, delay, ...pos }, i) => (
          <motion.div
            key={i}
            className="absolute grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-cyan-200/90 shadow-[0_8px_30px_-10px_rgba(120,220,225,0.35)] backdrop-blur"
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
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#071018] to-transparent" />
    </div>
  );
}
