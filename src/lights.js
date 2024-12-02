import * as THREE from 'three';

export function createLights() {
  const lights = [];
  
  // Lumière ambiante faible
  const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
  lights.push(ambientLight);
  
  // Point lumineux au centre (soleil)
  const sunLight = new THREE.PointLight(0xffdd00, 2, 100);
  sunLight.position.set(0, 0, 0);
  lights.push(sunLight);
  
  return lights;
}