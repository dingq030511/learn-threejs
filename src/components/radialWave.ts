import { Vector3 } from 'three';

export function radialWave(u: number,v: number,optionalTaarget?: Vector3){
  const result = optionalTaarget || new Vector3();
  const r = 50;
  const x = Math.sin(u) * r;
  const z = Math.sin(v /2 ) * 2 * r;
  const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
  return result.set(x, y, z);
}