export type Vec2 = {
  x: number;
  y: number;
};

export type Projectile = {
  position: Vec2;
  velocity: Vec2;
  radius: number;
  active: boolean;
};
export type PhysicsConfig = {
  gravity: number;
  groundY: number;
};

export function stepProjectile(
  p: Projectile,
  dt: number,
  config: PhysicsConfig,
) {
  if (!p.active) return;
  p.velocity.y += config.gravity * dt;
  p.position.x += p.velocity.x * dt;
  p.position.y += p.velocity.y * dt;
  if (p.position.y + p.radius >= config.groundY) {
    p.position.y = config.groundY - p.radius;
    p.velocity.y = 0;
    p.velocity.x = 0;
  }
}
