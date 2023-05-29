import { Group, Sprite, SpriteMaterial } from 'three';
import { createSprite } from './sprite';

export function createSprites() {
  const group = new Group();
  const range = 200;
  for (let i = 0; i < 400; i++) {
    group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range));
  }
  return group;
}
