import { setupScene, setupResizeHandler, debounce } from './render-utils.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.167.1/examples/jsm/controls/OrbitControls.js";

export function initFCCRender(containerId, sliderId) {
  const { scene, camera, renderer } = setupScene(containerId);
  const slider = document.getElementById(sliderId);

  // Add OrbitControls for rotation
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(1, 1, 1);

  // Add a light source
  const light = new THREE.HemisphereLight(0xffffff, 0x888888, 7);
  light.position.set(0, 1, 0);
  scene.add(light);

  const pointLight = new THREE.PointLight(0xffffff, 4);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // FCC-specific code for creating spheres and edges...

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

  // Handle slider input to change atom size
  slider.addEventListener('input', debounce(function () {
    radius = parseFloat(this.value);
    createAtoms();
  }, 100));
}