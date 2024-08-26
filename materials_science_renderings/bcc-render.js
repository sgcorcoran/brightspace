import { setupScene, setupResizeHandler } from './render-utils.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js";

export function initBCCRender(containerId) {
  const { scene, camera, renderer } = setupScene(containerId);

  // Add OrbitControls for rotation
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(1, 1, 1);

  // Add lights
  const pointLight1 = new THREE.PointLight(0xefffef, 1, 50);
  pointLight1.position.set(-10, -10, 10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffefef, 1, 50);
  pointLight2.position.set(-10, 10, 10);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xefefff, 1, 50);
  pointLight3.position.set(10, -10, 10);
  scene.add(pointLight3);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // BCC-specific code for creating spheres, disks, and edges...

  // Set initial camera position
  camera.position.set(5, 5, 5);
  camera.lookAt(controls.target);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  setupResizeHandler(camera, renderer, containerId);
}