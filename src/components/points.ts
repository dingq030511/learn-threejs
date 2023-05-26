import { BufferAttribute, BufferGeometry, Color, Points, PointsMaterial, Vector2, Vector3 } from 'three';

export function createPoints() {
  const geom = new BufferGeometry();
  
  const array: Array<number> = [];
  const material = new PointsMaterial({
    size: 2,
    vertexColors: true,
    color: 0xffffff
  });
  const colorArray: Array<number> = [];
  for(let x = -15; x< 15;x++){
    for(let y = -10;y<10;y++){
      array.push(x * 4, y * 4, 0);
      colorArray.push(Math.random(), Math.random(), Math.random());
    }
  }
  const colors = new Float32Array(colorArray)
  const vertices = new Float32Array(array);
  geom.setAttribute('position', new BufferAttribute(vertices, 3));
  geom.setAttribute('color', new BufferAttribute(colors, 3));
  const points = new Points(geom, material);
  return points;
}
