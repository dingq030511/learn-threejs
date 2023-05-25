import { Vector2 } from 'three';

export function createPoints() {
  const points = [];
  const height = 5;
  const count = 30;
  for (let i = 0; i < count; i++) {
    points.push(new Vector2((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,   i - count + count / 2));
  }
  return points;
}
