// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls for rotation
const amount = parseInt(window.location.search.slice(1)) || 5;
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(1, 1, 1); // Set the target to the center of the unit cell


// Add lights
// Strong directional light for plastic balls
const directionalLight = new THREE.DirectionalLight(0xffffff, .2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.3);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// Soft hemisphere light for diffuse lighting on all objects
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
hemisphereLight.position.set(0, 1, 0);
scene.add(hemisphereLight);

// Moderate ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add material
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  roughness: 0.0,
  metalness: 0.0,
});

// FCC unit cell parameters
const cellSize = 2;
let radius = cellSize / 5;
let spheres = [];

function createSphere(position) {
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  sphereGeometry.computeVertexNormals();
  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(...position);
  scene.add(sphere);
  return sphere;
}

// Corner atom positions
const corners = [
  [0, 0, 0],
  [cellSize, 0, 0],
  [0, cellSize, 0],
  [0, 0, cellSize],
  [cellSize, cellSize, 0],
  [cellSize, 0, cellSize],
  [0, cellSize, cellSize],
  [cellSize, cellSize, cellSize],
];

// Face-centered atom positions
const faceCenters = [
  [cellSize / 2, cellSize / 2, 0],
  [cellSize / 2, 0, cellSize / 2],
  [0, cellSize / 2, cellSize / 2],
  [cellSize / 2, cellSize / 2, cellSize],
  [cellSize / 2, cellSize, cellSize / 2],
  [cellSize, cellSize / 2, cellSize / 2],
];

function createAtoms() {
  // Clear existing spheres
  spheres.forEach((sphere) => scene.remove(sphere));
  spheres = [];

  // Add corner atoms to the scene
  corners.forEach((pos) => {
    const sphere = createSphere(pos);
    spheres.push(sphere);
  });

  // Add face-centered atoms to the scene
  faceCenters.forEach((pos) => {
    const sphere = createSphere(pos);
    spheres.push(sphere);
  });
}

// Initial atom creation
createAtoms();

// Add a wireframe box to represent the unit cell, centered at the unit cell center
const boxGeometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
const wireframe = new THREE.EdgesGeometry(boxGeometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const boxLine = new THREE.LineSegments(wireframe, lineMaterial);
boxLine.position.set(cellSize / 2, cellSize / 2, cellSize / 2);
scene.add(boxLine);

// Set initial camera position
camera.position.set(amount, amount, amount);
camera.lookAt(controls.target);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle slider input to change atom size
document.getElementById("radius-slider").addEventListener("input", function () {
  radius = parseFloat(this.value);
  createAtoms();
});
