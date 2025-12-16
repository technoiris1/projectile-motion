"use client";

import { useEffect, useRef } from "react";
import { Projectile, stepProjectile } from "../physics/physics";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groundImage = useRef<HTMLImageElement | null>(null);
  const bgImage = useRef<HTMLImageElement | null>(null);

  const cannon = useRef({ x: 260, y: 0 });

  const projectile = useRef<Projectile>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    radius: 12,
    active: false,
  });

  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const dragCurrent = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      cannon.current.y = canvas.height - 160;
    }

    resize();
    window.addEventListener("resize", resize);
    const ground = new Image();
    ground.src = "/dirt.png";
    ground.onload = () => (groundImage.current = ground);

    const bg = new Image();
    bg.src = "/bg1.png";
    bg.onload = () => (bgImage.current = bg);

    function getMouse(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    canvas.addEventListener("mousedown", (e) => {
      if (projectile.current.active) return;
      dragStart.current = getMouse(e);
      dragCurrent.current = dragStart.current;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!dragStart.current) return;
      dragCurrent.current = getMouse(e);
    });

    canvas.addEventListener("mouseup", () => {
      if (!dragStart.current || !dragCurrent.current) return;

      const dx = dragStart.current.x - dragCurrent.current.x;
      const dy = dragStart.current.y - dragCurrent.current.y;

      projectile.current = {
        position: {
          x: cannon.current.x,
          y: cannon.current.y,
        },
        velocity: {
          x: dx * 6,
          y: dy * 6,
        },
        radius: 12,
        active: true,
      };

      dragStart.current = null;
      dragCurrent.current = null;
    });
    canvas.addEventListener("mouseleave", () => {
      dragStart.current = null;
      dragCurrent.current = null;
    });

    let last = performance.now();

    function loop(now: number) {
      const dt = (now - last) / 1000;
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const groundY = canvas.height - 80;
      if (bgImage.current) {
        ctx.drawImage(bgImage.current, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "#87ceeb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      if (groundImage.current) {
        const pattern = ctx.createPattern(groundImage.current, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
        }
      }
      ctx.save();
      ctx.translate(cannon.current.x, cannon.current.y);
      ctx.fillStyle = "#333";
      ctx.fillRect(-30, -12, 60, 24);
      ctx.restore();
      if (dragStart.current && dragCurrent.current) {
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cannon.current.x, cannon.current.y);
        ctx.lineTo(dragCurrent.current.x, dragCurrent.current.y);
        ctx.stroke();
      }
      stepProjectile(projectile.current, dt, {
        gravity: 1200,
        groundY,
      });
      if (projectile.current.active) {
        ctx.fillStyle = "#ff3333";
        ctx.beginPath();
        ctx.arc(
          projectile.current.position.x,
          projectile.current.position.y,
          projectile.current.radius,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
