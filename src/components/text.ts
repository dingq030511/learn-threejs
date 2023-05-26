import { Mesh, MeshStandardMaterial } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
export async function createText() {
  const loader = new FontLoader();
  const font = await loader.loadAsync('/assets/fonts/bitstream_vera_sans_mono_roman.typeface.json');
  const options = {
    size: 90,
    height: 20,
    font,
    bevelThickness: 2,
    bevelSize: 4,
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
