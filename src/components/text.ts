import { Mesh, MeshStandardMaterial } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
export async function createText() {
  const loader = new FontLoader();
  const font = await loader.loadAsync(process.env.PUBLIC_PATH + 'assets/fonts/bitstream_vera_sans_mono_roman.typeface.json');
  const options = {
    size: 10,
    height: 1,
    font,
    bevelThickness: 2,
    bevelSize: 0.1,
    bevelSegments: 3,
    bevelEnabled: true,
    curveSegments: 12,
    steps: 1,
  };
  const text = new Mesh(
    new TextGeometry('Learning Three.js', options),
    new MeshStandardMaterial({
      color: '#fff',
    })
  );
  text.position.set(-100, 0, 0)
  return text;
}
