import * as THREE from 'three';

export function setupControls(camera, scene, renderer) {
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0
  };

  const rotationSpeed = 0.003;
  const dampingFactor = 0.95;
  let momentum = { x: 0, y: 0 };

  renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });

  renderer.domElement.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      momentum.x = deltaMove.x * rotationSpeed;
      momentum.y = deltaMove.y * rotationSpeed;

      scene.rotation.y += momentum.x;
      scene.rotation.x += momentum.y;
    }

    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });

  renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Apply momentum and damping
  function updateMomentum() {
    if (!isDragging && (Math.abs(momentum.x) > 0.001 || Math.abs(momentum.y) > 0.001)) {
      scene.rotation.y += momentum.x;
      scene.rotation.x += momentum.y;
      
      momentum.x *= dampingFactor;
      momentum.y *= dampingFactor;
    }
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return updateMomentum;
}