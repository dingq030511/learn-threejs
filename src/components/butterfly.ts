import { BufferGeometry, DoubleSide, Mesh, MeshLambertMaterial } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export async function createButterfly() {
  const mtlLoader = new MTLLoader();
  const materialCreator = await mtlLoader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/butterfly/butterfly.mtl');
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materialCreator);
  const butterfly = await objLoader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/butterfly/butterfly.obj');
  [0, 1, 4, 6].forEach(i => {
    butterfly.children[i].rotation.z = 0.3 * Math.PI;
  });
  [2, 3, 5, 7].forEach(i => {
    butterfly.children[i].rotation.z = -0.3 * Math.PI;
  });
  const wing1 = butterfly.children[4] as Mesh<BufferGeometry, MeshLambertMaterial>;
  const wing2 = butterfly.children[5] as Mesh<BufferGeometry, MeshLambertMaterial>;
  wing1.material.opacity = 0.9;
  wing1.material.transparent = true;
  wing1.material.depthTest = false;
  wing1.material.side = DoubleSide;

  wing2.material.opacity = 0.9;
  wing2.material.transparent = true;
  wing2.material.depthTest = false;
  wing2.material.side = DoubleSide;

  butterfly.scale.set(140, 140, 140);
  butterfly.rotation.x = 0.2;
  butterfly.rotation.y = -1.3;
  return butterfly;
}
