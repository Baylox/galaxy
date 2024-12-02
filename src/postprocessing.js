import * as THREE from 'three';

export function setupPostProcessing(renderer, scene, camera) {
  // Create render targets
  const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      encoding: THREE.sRGBEncoding
    }
  );

  // Create effect composer and passes
  const composer = new THREE.EffectComposer(renderer, renderTarget);
  
  // Add render pass
  const renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Add bloom pass
  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
  );
  composer.addPass(bloomPass);

  return composer;
}