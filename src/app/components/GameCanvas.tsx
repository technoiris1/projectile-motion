"use client";

import { useEffect, useRef } from "react";
import { Projectile, stepProjectile } from "../physics/physics";
export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const projectile = useRef<Projectile>({
    position: { x: 150, y: 400 },
    velocity: { x: 0, y: 0 },
    radius: 8,
    active: true,
  });
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let lastTime = performance.now();

    function loop(time: number) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stepProjectile(projectile.current, dt, {
        gravity: 1500,
      });
      const p = projectile.current;
      if (p.active) {
        ctx.beginPath();
        ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff5555";
        ctx.fill();
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={600}
      className="block bg-transparent"
    />
  );
}
