import { initBCCRender } from './bcc-render.js';
import { initFCCRender } from './fcc-render.js';

// Initialize the BCC render
document.addEventListener('DOMContentLoaded', async () => {
  const { initBCCRender } = await import('./bcc-render.js');
  initBCCRender('bcc-render-output');

  const { initFCCRender } = await import('./fcc-render.js');
  initFCCRender('fcc-render-output', 'radius-slider');
});