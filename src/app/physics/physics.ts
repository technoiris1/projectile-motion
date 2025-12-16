export type Vec2 = { x: number; y: number };

export type Projectile = {
  position: Vec2;
  velocity: Vec2;
  radius: number;
  active: boolean;
};

export function stepProjectile(
  p: Projectile,
  dt: number,
  opts: { gravity: number; groundY: number },
) {
  if (!p.active) return;

  p.velocity.y += opts.gravity * dt;
  p.position.x += p.velocity.x * dt;
  p.position.y += p.velocity.y * dt;

  if (p.position.y + p.radius >= opts.groundY) {
    p.position.y = opts.groundY - p.radius;
    p.active = false;
  }
}
