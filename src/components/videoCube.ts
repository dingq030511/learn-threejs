import { LinearFilter, RGBAFormat, VideoTexture } from 'three';
import { createCube } from './cube';

export async function createVideoCube(){
  const cube = createCube();
  const video = document.createElement('video');
  video.autoplay = true;
  video.src = process.env.PUBLIC_PATH + 'assets/movies/Big_Buck_Bunny_small.ogv'
  video.loop = true;
  video.addEventListener('canplaythrough', () => { // 添加视频加载完成后的监听事件
    const texture = new VideoTexture(video);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.format = RGBAFormat;
    cube.material.map = texture;
  });
  return cube;
}