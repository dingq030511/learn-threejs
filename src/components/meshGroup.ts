import { Group, MathUtils, Mesh, MeshStandardMaterial, SphereGeometry } from 'three';

export function createMeshGroup() {
  const group = new Group();
  const geometry = new SphereGeometry(0.5, 64, 64);
  const material = new MeshStandardMaterial({
    color: 'indigo',
  });
  const protoSphere = new Mesh(geometry, material);
  group.add(protoSphere);
  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    sphere.scale.multiplyScalar(0.01 + i);
    group.add(sphere);
  }
  const radiansPerSecond = MathUtils.degToRad(30);
  group.tick = delta => {
    group.rotation.z -= delta * radiansPerSecond
  };
  return group;
}
