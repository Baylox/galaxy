import * as THREE from 'three';

export function createMaterials() {
  return {
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true
    }),
    metal: new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 1,
      roughness: 0.2
    }),
    glow: new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    })
  };
}