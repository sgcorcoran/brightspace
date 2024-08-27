
//import { initBCCRender } from './bcc-render.js';

// Initialize the BCC render
document.addEventListener('DOMContentLoaded', async () => {
  const { initBCCRender } = await import('./bcc-render.js');
  initBCCRender('bcc-render-output');

});