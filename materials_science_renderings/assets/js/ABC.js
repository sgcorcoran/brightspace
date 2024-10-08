document.addEventListener('DOMContentLoaded', () => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();

    const container = document.getElementById('ABC');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const aspect = containerWidth / containerHeight;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2, frustumSize * aspect / 2,
        frustumSize / 2, frustumSize / -2,
        0.1, 1000
    );
    camera.position.set(10, 10, 10);
    camera.zoom = 2;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);

    // Add lights
    const pointLight1 = new THREE.PointLight(0xFFFFFF, 2, 50);
    pointLight1.position.set(15, 15, 25);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFFFFFF, 2, 30);
    pointLight2.position.set(-15, -15, -15);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Function to create a whole sphere with realistic material
    function createWholeSphere(radius, color) {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0,
            metalness: 0.5,
            emissive: color,
            emissiveIntensity: 0.1,
            side: THREE.DoubleSide
        });
        return new THREE.Mesh(geometry, material);
    }

    // Create atoms on the (111) plane of an FCC structure
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

    // Add the original (111) plane of red atoms
    positions.forEach(pos => {
        const atom = createWholeSphere(atomRadius, 0xff0000);
        atom.position.set(pos[0], pos[1], pos[2]);
        scene.add(atom);
    });
    const plane_spacing = 1 / 3;
    // Add the first clone (yellow) shifted by 1/2, 1/2, 1/2 plus 1/6, 1/6, -1/3
    const yellowShift = [plane_spacing * fccSpacing + 1 / 6, plane_spacing * fccSpacing + 1 / 6, plane_spacing * fccSpacing - 1 / 3];
    positions.forEach(pos => {
        const atom = createWholeSphere(atomRadius, 0xffff00);
        atom.position.set(pos[0] + yellowShift[0], pos[1] + yellowShift[1], pos[2] + yellowShift[2]);
        scene.add(atom);
    });

    // Add the second clone (blue) shifted by 1, 1, 1
    const blueShift = [2 * plane_spacing * fccSpacing + 2 / 6, 2 * plane_spacing * fccSpacing - 1 / 6, 2 * plane_spacing * fccSpacing - 1 / 6];
    positions.forEach(pos => {
        const atom = createWholeSphere(atomRadius, 0x0000ff);
        atom.position.set(pos[0] + blueShift[0], pos[1] + blueShift[1], pos[2] + blueShift[2]);
        scene.add(atom);
    });

    // Handle window resizing
    window.addEventListener('resize', () => {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const aspect = containerWidth / containerHeight;

        camera.left = -frustumSize * aspect / 2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;
        camera.updateProjectionMatrix();

        renderer.setSize(containerWidth, containerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
});
