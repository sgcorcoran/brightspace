export function setupSceneOrtho(containerId) {
  const container = document.getElementById(containerId);

  // Initialize scene
  const scene = new THREE.Scene();

  // Initialize orthographic camera
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const aspect = containerWidth / containerHeight;
  const frustumSize = 10;

  const camera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2, 
    (frustumSize * aspect) / 2,
    frustumSize / 2, 
    frustumSize / -2,
    0.1, 
    1000
  );

  //Set the camera position
    camera.position.set(10,10,10);
    camera.zoom=2;
    camera.updateProjectionMatrix();
    camera.lookAt(0,0,0);

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}


export function setupScenePerspective(containerId) {
  const container = document.getElementById(containerId);

  // Initialize scene
  const scene = new THREE.Scene();

  // Initialize camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
    
    // Set the camera position
  const mag = 5;
  const initialCameraPosition = new THREE.Vector3(mag * 0.75, mag * 0.75, mag);
  camera.position.copy(initialCameraPosition);

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}

export function setupResizeHandler(camera, renderer, containerId) {
  const container = document.getElementById(containerId);

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function addLights(scene) {
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
}

export function createOrbitControls(camera, rendererDomElement) {
  const controls = new THREE.OrbitControls(camera, rendererDomElement);
  controls.target.set(1, 1, 1);
  return controls;
}

export function createWholeSphere(radius, color) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  return new THREE.Mesh(geometry, material);
}

export function createCornerSphere(radius, color) {
  const geometry = new THREE.SphereGeometry(radius, 32, 16, Math.PI / 2, Math.PI / 2, 0, Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  return new THREE.Mesh(geometry, material);
}

export function createCornerDisk(radius, color, rotation) {
  const geometry = new THREE.CircleGeometry(radius, 32, 0, Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  const disk = new THREE.Mesh(geometry, material);
  const quaternion = new THREE.Quaternion().setFromEuler(rotation);
  disk.applyQuaternion(quaternion);
  return disk;
}

export function createCornerSphereGroup(radius, color) {
  const group = new THREE.Group();
  const sphere = createCornerSphere(radius, color);
  group.add(sphere);

  const cDisk1 = createCornerDisk(radius, color, new THREE.Euler(0, 0, 0));
  const cDisk2 = createCornerDisk(radius, color, new THREE.Euler(0, -Math.PI / 2, 0));
  const cDisk3 = createCornerDisk(radius, color, new THREE.Euler(Math.PI / 2, 0, 0));

  group.add(cDisk1);
  group.add(cDisk2);
  group.add(cDisk3);

  return group;
}

export function createCubeEdges() {
  const vertices = [
    [0, 0, 0], [1, 0, 0],
    [1, 0, 0], [1, 1, 0],
    [1, 1, 0], [0, 1, 0],
    [0, 1, 0], [0, 0, 0],
    [0, 0, 1], [1, 0, 1],
    [1, 0, 1], [1, 1, 1],
    [1, 1, 1], [0, 1, 1],
    [0, 1, 1], [0, 0, 1],
    [0, 0, 0], [0, 0, 1],
    [1, 0, 0], [1, 0, 1],
    [1, 1, 0], [1, 1, 1],
    [0, 1, 0], [0, 1, 1],
  ];

  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.Float32BufferAttribute(vertices.flat(), 3);
  geometry.setAttribute('position', positionAttribute);

  const lineMaterial = new THREE.LineBasicMaterial({ color: 'gray', linewidth: 1 });
  return new THREE.LineSegments(geometry, lineMaterial);
}

// Constants for positions and rotations
export const positions = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 0],
  [1, 0, 1],
  [0, 1, 1],
  [1, 1, 1]
];

export const rotations = [
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, -Math.PI / 2, 0)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, -Math.PI / 2, 0)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI)),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, Math.PI))
];

export function createAndPositionCornerSpheres(unitCellGroup, radius) {
  positions.forEach((pos, index) => {
    const color = (index === 7) ? 0xff0000 : 0xFFCC00; // Red color for the atom at (1,1,1)
    const cornerSphereGroup = createCornerSphereGroup(radius, color);
    cornerSphereGroup.quaternion.copy(rotations[index]);
    cornerSphereGroup.position.set(pos[0], pos[1], pos[2]);
    unitCellGroup.add(cornerSphereGroup);
  });
}

export function updateDistances(clonedGroups, distance) {
  const translations = [
    [2 * distance, 0, 0],
    [0, 0, 2 * distance],
    [2 * distance, 0, 2 * distance],
    [0, 2 * distance, 0]
  ];
  translations.forEach((trans, index) => {
    const clonedGroup = clonedGroups[index];
    clonedGroup.position.set(trans[0], trans[1], trans[2]);
  });
}

export function createAndCloneUnitCellGroups(scene, unitCellGroup, initialDistance, rotationAngles) {
  const clonedGroups = [];
  const initialTranslations = [
    [2 * initialDistance, 0, 0],
    [0, 0, 2 * initialDistance],
    [2 * initialDistance, 0, 2 * initialDistance],
    [0, 2 * initialDistance, 0]
  ];

  initialTranslations.forEach((trans, index) => {
    const clonedGroup = unitCellGroup.clone();
    clonedGroup.position.set(trans[0], trans[1], trans[2]);
    const quaternion = new THREE.Quaternion().setFromEuler(rotationAngles[index]);
    clonedGroup.applyQuaternion(quaternion);
    scene.add(clonedGroup);
    clonedGroups.push(clonedGroup);
  });

  return clonedGroups;
}

export function updateVisibility(clonedGroups) {
  clonedGroups.forEach((group, index) => {
    const checkbox = document.getElementById(`cell${index + 1}`);
    group.visible = checkbox.checked;
  });
}

export function resetCameraPosition(camera, controls, initialCameraPosition, checkboxes, distanceSlider, initialDistance, clonedGroups) {
  camera.position.copy(initialCameraPosition);
  controls.update();
  checkboxes.forEach(checkbox => {
    checkbox.checked = true;
  });
  updateVisibility(clonedGroups);
  distanceSlider.value = initialDistance;
  updateDistances(clonedGroups, initialDistance);
}
