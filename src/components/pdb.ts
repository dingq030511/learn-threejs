import { CatmullRomCurve3, Color, Group, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, SphereGeometry, TubeGeometry, Vector3 } from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';

export async function loadPdb() {
  const loader = new PDBLoader();
  const pdbModel = await loader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/molecules/aspirin.pdb');
  const geometryAtoms = pdbModel.geometryAtoms;
  const group = new Group();
  for (let i = 0; i < geometryAtoms.attributes.position.count; i++) {
    const position = new Vector3();
    position.x = geometryAtoms.attributes.position.getX(i);
    position.y = geometryAtoms.attributes.position.getY(i);
    position.z = geometryAtoms.attributes.position.getZ(i);
    const color = new Color();
    color.r = geometryAtoms.attributes.color.getX(i);
    color.g = geometryAtoms.attributes.color.getY(i);
    color.b = geometryAtoms.attributes.color.getZ(i);
    const material = new MeshLambertMaterial({
      color,
    });
    const sphere = new SphereGeometry(0.2);
    const mesh = new Mesh(sphere, material);
    mesh.position.copy(position);
    group.add(mesh);
  }
  const geometryBonds = pdbModel.geometryBonds;
  for (let j = 0; j < geometryBonds.attributes.position.count; j += 2) {
    const startPosition = new Vector3();
    startPosition.x = geometryBonds.attributes.position.getX(j);
    startPosition.y = geometryBonds.attributes.position.getY(j);
    startPosition.z = geometryBonds.attributes.position.getZ(j);
    const endPosition = new Vector3();
    endPosition.x = geometryBonds.attributes.position.getX(j + 1);
    endPosition.y = geometryBonds.attributes.position.getY(j + 1);
    endPosition.z = geometryBonds.attributes.position.getZ(j + 1);
    const path = new CatmullRomCurve3([startPosition, endPosition]);
    const tube = new TubeGeometry(path, 1, 0.04);
    const material = new MeshLambertMaterial({
      color: 0xcccccc,
    });
    const mesh = new Mesh(tube, material);
    group.add(mesh);
  }
  return group;
}
