import { AxesHelper } from 'three';

export function createAxesHelper(){
  const axes = new AxesHelper(20);
  return axes;
}