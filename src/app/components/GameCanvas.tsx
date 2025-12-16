"use client";

import { useEffect, useRef } from "react";
import { Projectile, stepProjectile } from "../physics/physics";

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groundImage = useRef<HTMLImageElement | null>(null);

  const projectile = useRef<Projectile>({
    position: { x: 200, y: 150 },
    velocity: { x: 0, y: 0 },
    radius: 10,
    active: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const img = new Image();
    img.src = "/dirt.png";
    img.onload = () => {
      groundImage.current = img;
    };

    let lastTime = performance.now();

    function loop(time: number) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const groundY = canvas.height - 80;

      stepProjectile(projectile.current, dt, {
        gravity: 1200,
        groundY,
      });

      if (groundImage.current) {
        const pattern = ctx.createPattern(groundImage.current, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
        }
      }

      const p = projectile.current;
      ctx.fillStyle = "#ff3333";
      ctx.beginPath();
      ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          backgroundImage: "url('/bg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
