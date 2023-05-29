import { AdditiveBlending, Sprite, SpriteMaterial, TextureLoader, Vector2 } from 'three';

function getTexture(){
  return new TextureLoader().load('/assets/textures/particles/sprite-sheet.png');
}

export function createSprite(size: number, transparent: boolean, opacity: number, color: number, spriteNumber: number, range: number){
  const material = new SpriteMaterial({
    opacity,
    color,
    transparent,
    map: getTexture()
  })
  material.map!.offset = new Vector2(0.2 * spriteNumber, 0);
  material.map!.repeat = new Vector2(0.2, 1);
  material.blending = AdditiveBlending;
  material.depthTest = false;
  const sprite = new Sprite(material);
  sprite.scale.set(size, size, size);
  sprite.position.set(Math.random() * range - range/ 2, Math.random() * range - range/ 2, Math.random() * range - range/ 2);
  return sprite;
}