import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, PointsMaterial, Texture, TextureLoader, Vector2, Vector3 } from 'three';

export async function createPoints(assertSrc: string) {
  const geom = new BufferGeometry();

  const array: Array<number> = [];
  const loader = new TextureLoader();
  //  process.env.PUBLIC_PATH + 'assets/textures/particles/raindrop-3.png'
  const texture = await loader.loadAsync(assertSrc);
  const material = new PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: AdditiveBlending,
    sizeAttenuation: true,
    map: texture,
    depthWrite: false,
    color: 0xffffff,
  });
  const colorArray: Array<number> = [];
  for (let x = -15; x < 15; x++) {
    for (let y = -10; y < 10; y++) {
      array.push(x * 8 * Math.random(), y * 8 * Math.random(), Math.random()* 50 * (Math.random() > 0.5 ? 1: -1));
      colorArray.push(1, 1, 1);
    }
  }
  const colors = new Float32Array(colorArray);
  const vertices = new Float32Array(array);
  geom.setAttribute('position', new BufferAttribute(vertices, 3));
  geom.setAttribute('color', new BufferAttribute(colors, 3));
  const points = new Points(geom, material);
  const arrbuffer = geom.getAttribute('position');
  console.log(arrbuffer, arrbuffer.getX(0));
  return points;
}

function createGhostTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  ctx.translate(-81, -84);
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();

  // the eyes
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();

  // the pupils
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();

  const texture = new Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
