import { BufferGeometry, Mesh, MeshLambertMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export async function loadObjModel() {
  const loader = new OBJLoader();
  const obj = await loader.loadAsync(process.env.PUBLIC_PATH + 'assets/models/pinecone/pinecone.obj');
  const material = new MeshLambertMaterial({
    color: 0x5C3A21
  });
  obj.children.forEach((child)=>{
    if(child instanceof Mesh){
      child.material = material;
      if(child.geometry instanceof BufferGeometry){
        // child.geometry.computeVertexNormals();
      }
    }
  });
  obj.scale.set(120, 120, 120);
  return obj;
}
