import { gsap } from 'gsap';

export function setupAnimations(objects, particles) {
  // Animate the main torus knot
  gsap.to(objects[0].rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: "none"
  });

  // Animate orbiting spheres
  objects.slice(1, 13).forEach((sphere, index) => {
    gsap.to(sphere.position, {
      x: Math.cos((index + 1) / 12 * Math.PI * 2) * 5,
      z: Math.sin((index + 1) / 12 * Math.PI * 2) * 5,
      y: Math.sin(index * 1.5) * 2,
      duration: 4 + index * 0.2,
      repeat: -1,
      ease: "none",
      yoyo: true
    });
  });

  // Animate floating cubes
  objects.slice(13).forEach((cube, index) => {
    gsap.to(cube.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      z: Math.PI * 2,
      duration: 5 + Math.random() * 5,
      repeat: -1,
      ease: "none"
    });
    
    gsap.to(cube.position, {
      y: cube.position.y + (Math.random() - 0.5) * 3,
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

  // Animate particle system
  return function animateParticles() {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += (Math.random() - 0.5) * 0.05;
      if (Math.abs(positions[i + 1]) > 25) {
        positions[i + 1] *= -0.95;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
  };
}