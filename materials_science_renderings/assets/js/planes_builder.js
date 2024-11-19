let scene, camera, renderer, controls;
let lattice = [],
  planes = [];

function init() {
  // Get references to the HTML controls
  const numCellsInput = document.getElementById('numCells');
  const systemSelect = document.getElementById('system');
  const plane1Checkbox = document.getElementById('plane1');
  const plane2Checkbox = document.getElementById('plane2');
  const plane3Checkbox = document.getElementById('plane3');
  const plane100Select = document.getElementById('plane100Select'); // For (100) plane selection
  const plane110Select = document.getElementById('plane110Select'); // For (110) plane selection
  const plane111Select = document.getElementById('plane111Select'); // For (111) plane selection
  const removeAtomsCheckbox = document.getElementById('removeAtomsCheckbox'); // Checkbox to remove atoms

  // Create a scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Set background to black

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(6, 6, 6);
  camera.lookAt(0, 0, 0);

  // Create a WebGL renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); // Append renderer to the body

  // Add OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  // Generate and add the lattice to the scene
  generateLattice(numCellsInput.value, systemSelect.value);

  // Debounce the input event to improve performance
  const debouncedUpdateLattice = debounce(() => {
    updateLattice(numCellsInput.value, systemSelect.value);
  }, 300);

  // Add event listeners for interaction
  numCellsInput.addEventListener('input', debouncedUpdateLattice);
  systemSelect.addEventListener('change', debouncedUpdateLattice);
  plane1Checkbox.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
  plane2Checkbox.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
  plane3Checkbox.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
  plane100Select.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
  plane110Select.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
  plane111Select.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
  removeAtomsCheckbox.addEventListener('change', () =>
    updatePlanes(
      systemSelect.value,
      parseInt(plane100Select.value),
      parseInt(plane110Select.value),
      parseInt(plane111Select.value)
    )
  );
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
let originalLattice = []; // Keep a copy of the full original lattice

function generateLattice(numCells, system) {
  lattice = []; // Clear previous lattice
  originalLattice = []; // Clear the original lattice copy

  const basisVectors =
    system === 'fcc'
      ? [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0.5, 0.5, 0),
          new THREE.Vector3(0, 0.5, 0.5),
          new THREE.Vector3(0.5, 0, 0.5),
        ]
      : [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.5, 0.5, 0.5)];

  const sphereRadius = system === 'fcc' ? Math.sqrt(2) / 4 : Math.sqrt(3) / 4;
  numCells = parseInt(numCells); // Ensure numCells is an integer

  // Iterate and generate the lattice
  for (let x = 0; x <= numCells; x++) {
    for (let y = 0; y <= numCells; y++) {
      for (let z = 0; z <= numCells; z++) {
        basisVectors.forEach((basis) => {
          const atomPosition = new THREE.Vector3(x, y, z).add(basis);

          if (
            atomPosition.x <= numCells + 0.01 &&
            atomPosition.y <= numCells + 0.01 &&
            atomPosition.z <= numCells + 0.01
          ) {
            lattice.push(atomPosition);
            originalLattice.push(atomPosition); // Store in original lattice
          }
        });
      }
    }
  }

  lattice.forEach((position) => {
    const atom = new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius, 16, 16), // Set a reasonable radius for visibility
      new THREE.MeshPhongMaterial({ color: 0xffaa00 })
    );
    atom.position.copy(position);
    scene.add(atom);
  });

  updatePlanes(
    system,
    parseInt(document.getElementById('plane100Select').value),
    parseInt(document.getElementById('plane110Select').value),
    parseInt(document.getElementById('plane111Select').value)
  );
}

function updateLattice(numCells, system) {
  clearScene(); // Clear existing lattice
  generateLattice(parseInt(numCells), system); // Regenerate the lattice
}

function updatePlanes(system, plane100Index, plane110Index, plane111Index) {
  // Clear existing planes
  planes.forEach((plane) => scene.remove(plane));
  planes = [];

  const plane1Checkbox = document.getElementById('plane1');
  const plane2Checkbox = document.getElementById('plane2');
  const plane3Checkbox = document.getElementById('plane3');
  const removeAtomsCheckbox = document.getElementById('removeAtomsCheckbox');

  const numCells = parseInt(document.getElementById('numCells').value);
  const sphereRadius = system === 'fcc' ? Math.sqrt(2) / 4 : Math.sqrt(3) / 4;
  const planeGeometry = new THREE.SphereGeometry(sphereRadius, 16, 16);

  const planeColor1 = new THREE.Color(0x1e88e5); // Blue color for (100) planes
  const planeColor2 = new THREE.Color(0xfd81b60); // Magenta color for (110) planes
  const planeColor3 = new THREE.Color(0x004d40); // Dark green color for (111) planes

  // Restore the original lattice
  lattice = [...originalLattice];
  clearScene(); // Clear the entire scene

  // Filter and remove atoms if the checkbox is checked
  if (removeAtomsCheckbox.checked) {
    lattice = lattice.filter((position) => {
      return (
        (!plane1Checkbox.checked || position.x <= plane100Index) &&
        (!plane2Checkbox.checked ||
          position.x + position.y <= 2 * numCells - plane110Index) &&
        (!plane3Checkbox.checked ||
          position.x + position.y + position.z <= 3 * numCells - plane111Index)
      );
    });
  }

  // Redraw only the filtered atoms in their default color
  lattice.forEach((position) => {
    const atom = new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xffaa00 }) // Default atom color
    );
    atom.position.copy(position);
    scene.add(atom); // Add atoms
  });

  // Now, color the atoms in the selected planes
  if (plane1Checkbox.checked) {
    lattice.forEach((position) => {
      if (position.x === plane100Index) {
        const planeSphere = new THREE.Mesh(
          planeGeometry,
          new THREE.MeshPhongMaterial({ color: planeColor1 })
        );
        planeSphere.position.copy(position);
        scene.add(planeSphere); // Color and add atoms for (100) plane
      }
    });
  }

  if (plane2Checkbox.checked) {
    lattice.forEach((position) => {
      if (position.x + position.y === 2 * numCells - plane110Index) {
        const planeSphere = new THREE.Mesh(
          planeGeometry,
          new THREE.MeshPhongMaterial({ color: planeColor2 })
        );
        planeSphere.position.copy(position);
        scene.add(planeSphere); // Color and add atoms for (110) plane
      }
    });
  }

  if (plane3Checkbox.checked) {
    lattice.forEach((position) => {
      if (
        position.x + position.y + position.z ===
        3 * numCells - plane111Index
      ) {
        const planeSphere = new THREE.Mesh(
          planeGeometry,
          new THREE.MeshPhongMaterial({ color: planeColor3 })
        );
        planeSphere.position.copy(position);
        scene.add(planeSphere); // Color and add atoms for (111) plane
      }
    });
  }
}

function clearScene() {
  for (let i = scene.children.length - 1; i >= 0; i--) {
    let obj = scene.children[i];
    if (obj.type === 'Mesh') {
      // Only remove mesh objects (atoms and planes)
      scene.remove(obj);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene
init();
animate();
