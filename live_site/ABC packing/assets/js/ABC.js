// ABC.js
import {
    setupSceneOrtho as setupScene,
    setupResizeHandler,
    addLights,
    createOrbitControls,
    createWholeSphere
} from './render-utils.js';

export function initABCScene(containerId) {
    // Set up the scene, camera, and renderer using the utility function
    const { scene, camera, renderer } = setupScene(containerId);

    // Add lights using the utility function
    addLights(scene);

    // Add orbit controls using the utility function
    const controls = createOrbitControls(camera, renderer.domElement);

    // Function to create atoms on the (111) plane of an FCC structure
    const atomRadius = Math.sqrt(2) / 4; // Adjust radius so atoms just touch
    const fccSpacing = 1; // Spacing between atoms on (111) plane
    const positions = [];

    // Function to generate positions in the (111) plane
    function generateFCC111PlaneAtoms() {
        const size = 1; // Control the number of atoms in each direction
        for (let i = -size; i <= size; i += 0.5) {
            for (let j = -size; j <= size; j += 0.5) {
                for (let k = -size; k <= size; k += 0.5) {
                    const x = i * fccSpacing;
                    const y = j * fccSpacing;
                    const z = k * fccSpacing;
                    if (Math.abs(i + j + k) < 0.01) { // Ensure atoms are in the correct (111) plane positions
                        positions.push([x, y, z]);
                    }
                }
            }
        }
    }

    generateFCC111PlaneAtoms();
    
// Set the camera position
//  const mag = 5;
//  const initialCameraPosition = new THREE.Vector3(mag * 0.75, mag * 0.75, mag);
//  camera.position.copy(initialCameraPosition);

    // Add the original (111) plane of red atoms
    positions.forEach(pos => {
        const atom = createWholeSphere(atomRadius, 0xff0000);
        atom.position.set(pos[0], pos[1], pos[2]);
        scene.add(atom);
    });

    const plane_spacing = 1 / 3;

    // Add the first clone (yellow) shifted by specific values
    const yellowShift = [plane_spacing * fccSpacing + 1 / 6, plane_spacing * fccSpacing + 1 / 6, plane_spacing * fccSpacing - 1 / 3];
    positions.forEach(pos => {
        const atom = createWholeSphere(atomRadius, 0xffff00);
        atom.position.set(pos[0] + yellowShift[0], pos[1] + yellowShift[1], pos[2] + yellowShift[2]);
        scene.add(atom);
    });

    // Add the second clone (blue) shifted by specific values
    const blueShift = [2 * plane_spacing * fccSpacing + 2 / 6, 2 * plane_spacing * fccSpacing - 1 / 6, 2 * plane_spacing * fccSpacing - 1 / 6];
    positions.forEach(pos => {
        const atom = createWholeSphere(atomRadius, 0x0000ff);
        atom.position.set(pos[0] + blueShift[0], pos[1] + blueShift[1], pos[2] + blueShift[2]);
        scene.add(atom);
    });

    // Set up resize handling
    setupResizeHandler(camera, renderer, containerId);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
