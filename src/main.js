import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Galaxy } from './objects/Galaxy.js';
import { PostProcessing } from './effects/PostProcessing.js';

// Initialize renderer
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(6, 4, 8);
camera.lookAt(0, 0, 0);

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 20;
controls.minDistance = 3;

// Create galaxy
const galaxy = new Galaxy();
scene.add(galaxy.points);

// Setup post-processing
const postProcessing = new PostProcessing(renderer, scene, camera);

// Animation loop
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  
  time += 0.001;
  
  // Update galaxy
  galaxy.update(time);
  
  // Update controls
  controls.update();
  
  // Render with post-processing
  postProcessing.render();
}

// Handle window resize
window.addEventListener('resize', () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  // Update renderer and post-processing
  renderer.setSize(window.innerWidth, window.innerHeight);
  postProcessing.setSize(window.innerWidth, window.innerHeight);
});

// Start animation loop
animate();