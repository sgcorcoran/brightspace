// this .js file is placed under the <body> tag so that this redefine is defined before any latex commands are used.  <script src="assets/js/latex_format.js"></script>
MathJax = {
    tex: {
      macros: {
          oldvec: "\\vec",
          vec: ["\\mathbf{#1}", 1]  // Redefine \vec to be \mathbf
      }
    }
  };
