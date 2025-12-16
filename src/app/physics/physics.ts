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
};
export function stepProjectile(
  p: Projectile,
  dt: number,
  config: PhysicsConfig,
) {
  if (!p.active) return;
  p.velocity.y += config.gravity * dt;
  p.position.y += p.velocity.y * dt;
}
