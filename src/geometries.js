import * as THREE from 'three';

export function createGeometries() {
  const torusKnot = new THREE.TorusKnotGeometry(2, 0.6, 100, 16);
  const sphere = new THREE.SphereGeometry(1, 32, 32);
  const icosahedron = new THREE.IcosahedronGeometry(1.5, 0);
  
  return { torusKnot, sphere, icosahedron };
}