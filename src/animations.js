import { gsap } from 'gsap';

export function setupAnimations(objects) {
  const sun = objects[0];
  
  // Animation de pulsation du soleil
  gsap.to(sun.scale, {
    x: 1.05,
    y: 1.05,
    z: 1.05,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  return function update(time) {
    // Rotation des planètes et de leurs orbites
    objects.forEach(object => {
      if (object.userData && object.userData.speed) {
        object.rotation.y = time * object.userData.speed * 0.5;
      }
    });
    
    // Rotation du soleil
    sun.rotation.y += 0.001;
  };
}