// this .js file is placed under the <body> tag so that this redefine is defined before any latex commands are used.  <script src="assets/js/latex_format.js"></script>
window.MathJax = {
  loader: { load: ['[tex]/boldsymbol'] }, // Load the boldsymbol package
  tex: {
    packages: { '[+]': ['boldsymbol'] }, // Enable the boldsymbol package
    macros: {
      oldvec: '\\vec', // Old \vec definition
      vec: ['\\mathbf{#1}', 1], // New \vec macro to use bold
    },
  },
};
