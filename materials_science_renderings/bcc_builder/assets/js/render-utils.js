import * as THREE from 'three';

export function setupScene(containerId) {
  const container = document.getElementById(containerId);

  // Initialize scene
  const scene = new THREE.Scene();

  // Initialize camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);

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
