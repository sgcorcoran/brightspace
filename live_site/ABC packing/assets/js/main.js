// main.js

// Initialize the ABC render
document.addEventListener('DOMContentLoaded', async () => {
  const { initABCScene } = await import('./ABC.js');
  initABCScene('ABC');
});
