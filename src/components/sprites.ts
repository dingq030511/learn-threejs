import { Group, Sprite, SpriteMaterial } from 'three';

export function createSprites(){
  const group = new Group();
  for(let x = -15;x<15;x++){
    for(let y = -10;y<10;y++){
      const material = new SpriteMaterial({
        color: Math.random() * 0xffffff
      });
      const sprite = new Sprite(material);
      sprite.position.set(x * 4, y *4, 0);
      group.add(sprite);
    }
  }
  return group;
}