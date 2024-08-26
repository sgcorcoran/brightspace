import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.js";

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