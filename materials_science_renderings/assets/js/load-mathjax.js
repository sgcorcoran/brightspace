// brightspace automatically loads v2.6 MathJax and boldsymbol is defined so this file will do nothing
// for a regular web page where MathJax is not loaded, this will load v3 and boldsymbol

// if (!window.MathJax) {
//   // MathJax is not present, load MathJax v3 with tex-mml-chtml.js
//   window.MathJax = {
//     tex: {
//       packages: { '[+]': ['boldsymbol'] }, // Load boldsymbol package
//       macros: {
//         oldvec: '\\vec', // Old \vec definition
//         vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
//       },
//     },
//     chtml: {
//       fontCache: 'global', // Use global font cache for faster rendering
//     },
//   };

//   // Dynamically load MathJax v3 from the CDN
//   (function () {
//     var script = document.createElement('script');
//     script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'; // Load MathJax v3 with tex-mml-chtml
//     script.async = true;
//     document.head.appendChild(script);
//   })();
// }

if (window.MathJax) {
  // MathJax is already present, configure it to include boldsymbol package
  if (typeof MathJax.Hub !== 'undefined') {
    // If MathJax 2.x is loaded
    MathJax.Hub.Config({
      TeX: {
        extensions: ['boldsymbol.js'], // Load boldsymbol package
        Macros: {
          oldvec: '\\vec',
          vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
        },
      },
    });
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]); // Re-process math after reconfiguring
  } else if (typeof MathJax.startup !== 'undefined') {
    // If MathJax 3.x is loaded
    MathJax.tex = {
      ...MathJax.tex, // Spread existing TeX config
      packages: { '[+]': ['boldsymbol'] }, // Add the boldsymbol package
      macros: {
        oldvec: '\\vec', // Keep old \vec definition
        vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
      },
    };
    MathJax.typeset(); // Re-process math after reconfiguring
  }
} else {
  // MathJax is not present, load MathJax v3 with tex-mml-chtml.js
  window.MathJax = {
    tex: {
      packages: { '[+]': ['boldsymbol'] }, // Load boldsymbol package
      macros: {
        oldvec: '\\vec', // Old \vec definition
        vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
      },
    },
    loader: { load: ['[tex]/boldsymbol'] }, // Ensure boldsymbol is loaded
  };

  // Dynamically load MathJax v3 with tex-mml-chtml.js
  (function () {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'; // Load MathJax v3 with tex-mml-chtml
    script.async = true;
    document.head.appendChild(script);
  })();
}
