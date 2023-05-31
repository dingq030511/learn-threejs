import { AdditiveBlending, Mesh, MeshStandardMaterial, Points, PointsMaterial } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { getTexture } from './sprite';

export async function loadCarcloud(){
  const loader = new PLYLoader();
  const material = new PointsMaterial({
    color: 0xffffff,
    size: 1,
    opacity: 0.6,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    map: getTexture()
  });
  const geometry = await loader.loadAsync('/assets/models/carcloud/carcloud.ply');

  return new Points(geometry, material)
}