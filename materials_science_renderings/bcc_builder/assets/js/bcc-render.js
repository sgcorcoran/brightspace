import { setupScene, setupResizeHandler, addLights, createOrbitControls, createWholeSphere, createCubeEdges, createAndPositionCornerSpheres } from './render-utils.js';

export function initBCCRender(containerId) {
  const { scene, camera, renderer } = setupScene(containerId);

  // Initialize OrbitControls
  const controls = createOrbitControls(camera, renderer.domElement);

  // Add lights to the scene
  addLights(scene);

  // Create the unit cell group
  const unitCellGroup = new THREE.Group();
  const radius = Math.sqrt(3) / 4;

  // Create and position the corner spheres in the unit cell
  createAndPositionCornerSpheres(unitCellGroup, radius);

  // Add cube edges to the unit cell group
  const cubeEdges = createCubeEdges();
  unitCellGroup.add(cubeEdges);

  // Add a whole sphere in the center of the unit cell
  const centerSphere = createWholeSphere(radius, 0xFFCC00); // Yellow color for the center sphere
  centerSphere.position.set(0.5, 0.5, 0.5);
  unitCellGroup.add(centerSphere);

  // Add the unit cell group to the scene
  scene.add(unitCellGroup);

  // Set the camera position
  const mag = 5;
  const initialCameraPosition = new THREE.Vector3(mag * 0.75, mag * 0.75, mag);
  camera.position.copy(initialCameraPosition);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  setupResizeHandler(camera, renderer, containerId);
}
