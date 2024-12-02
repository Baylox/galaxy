import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  
  // Add fog for depth
  scene.fog = new THREE.FogExp2(0x000000, 0.08);
  
  return scene;
}