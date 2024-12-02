import * as THREE from 'three';

export function createObjects() {
  const objects = [];
  const textureLoader = new THREE.TextureLoader();

  // Soleil
  const sunGeometry = new THREE.SphereGeometry(2, 64, 64);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffdd00,
    emissive: 0xffdd00,
    emissiveIntensity: 1
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  objects.push(sun);

  // Définition des planètes
  const planets = [
    { name: 'Mercure', size: 0.4, color: 0xa6744b, orbit: 4, speed: 1.6 },
    { name: 'Venus', size: 0.9, color: 0xe39d4d, orbit: 6, speed: 1.2 },
    { name: 'Terre', size: 1, color: 0x4b9cd3, orbit: 8, speed: 1 },
    { name: 'Mars', size: 0.5, color: 0xc1440e, orbit: 10, speed: 0.8 },
    { name: 'Jupiter', size: 1.8, color: 0xd8ca9d, orbit: 14, speed: 0.4 },
    { name: 'Saturne', size: 1.6, color: 0xead6b8, orbit: 18, speed: 0.3 },
    { name: 'Uranus', size: 1.2, color: 0xa6d7d3, orbit: 22, speed: 0.2 },
    { name: 'Neptune', size: 1.2, color: 0x4b70dd, orbit: 26, speed: 0.1 }
  ];

  // Création des planètes
  planets.forEach(planetData => {
    const planetGeometry = new THREE.SphereGeometry(planetData.size, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: planetData.color,
      metalness: 0.4,
      roughness: 0.7,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    
    // Groupe pour l'orbite
    const orbitGroup = new THREE.Group();
    orbitGroup.add(planet);
    planet.position.x = planetData.orbit;
    
    // Création de l'orbite visuelle
    const orbitGeometry = new THREE.RingGeometry(planetData.orbit - 0.1, planetData.orbit + 0.1, 128);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    });
    const orbitLine = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = Math.PI / 2;
    
    objects.push(orbitGroup);
    objects.push(orbitLine);
    
    // Stockage des données pour l'animation
    orbitGroup.userData = {
      speed: planetData.speed,
      orbit: planetData.orbit
    };
  });

  return objects;
}