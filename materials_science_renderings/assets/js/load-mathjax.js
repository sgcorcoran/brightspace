// brightspace automatically loads v2.6 MathJax and boldsymbol is defined so this file will do nothing
// for a regular web page where MathJax is not loaded, this will load v3 and boldsymbol

if (window.MathJax) {
  // MathJax is already present, configure it to include boldsymbol package
  if (typeof MathJax.Hub !== 'undefined') {
    // If MathJax 2.x is loaded
    MathJax.Hub.Config({
      jax: ["input/TeX", "output/HTML-CSS"], // Explicitly set the output mode
      TeX: {
        extensions: ['boldsymbol.js'],
        Macros: {
          oldvec: '\\vec',
          vec: ['\\mathbf{#1}', 1],
        },
      },
      "HTML-CSS": {
        scale: 85, // Adjust scaling for better mobile display
        linebreaks: { automatic: true },
      },
      SVG: { scale: 85 },
      CommonHTML: { scale: 85 },
    });
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  } else if (typeof MathJax.startup !== 'undefined') {
    // If MathJax 3.x is loaded
    MathJax = {
      ...MathJax, // Preserve existing config
      tex: {
        ...MathJax.tex,
        packages: { '[+]': ['boldsymbol'] },
        macros: {
          oldvec: '\\vec',
          vec: ['\\mathbf{#1}', 1],
        },
      },
      svg: {
        scale: 0.85, // Adjust SVG scale
      },
      chtml: {
        scale: 0.85, // Adjust CommonHTML scale
      },
      options: {
        renderActions: {
          findScript: [10, (doc) => doc.findMath()], // Ensure re-rendering on dynamic content
        },
      },
    };
    MathJax.startup.getComponents(); // Ensure components are loaded
    MathJax.typeset(); // Re-process math
  }
} else {
  // MathJax is not present, load MathJax v3 with tex-mml-chtml.js
  window.MathJax = {
    tex: {
      packages: { '[+]': ['boldsymbol'] },
      macros: {
        oldvec: '\\vec',
        vec: ['\\mathbf{#1}', 1],
      },
    },
    chtml: {
      scale: 0.85, // Adjust scale for better mobile viewing
    },
    svg: {
      scale: 0.85,
    },
    loader: { load: ['[tex]/boldsymbol'] },
  };

  // Dynamically load MathJax v3 with tex-mml-chtml
  (function () {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
  })();
}


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

// if (window.MathJax) {
//   // MathJax is already present, configure it to include boldsymbol package
//   if (typeof MathJax.Hub !== 'undefined') {
//     // If MathJax 2.x is loaded
//     MathJax.Hub.Config({
//       TeX: {
//         extensions: ['boldsymbol.js'], // Load boldsymbol package
//         Macros: {
//           oldvec: '\\vec',
//           vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
//         },
//       },
//     });
//     MathJax.Hub.Queue(['Typeset', MathJax.Hub]); // Re-process math after reconfiguring
//   } else if (typeof MathJax.startup !== 'undefined') {
//     // If MathJax 3.x is loaded
//     MathJax.tex = {
//       ...MathJax.tex, // Spread existing TeX config
//       packages: { '[+]': ['boldsymbol'] }, // Add the boldsymbol package
//       macros: {
//         oldvec: '\\vec', // Keep old \vec definition
//         vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
//       },
//     };
//     MathJax.typeset(); // Re-process math after reconfiguring
//   }
// } else {
//   // MathJax is not present, load MathJax v3 with tex-mml-chtml.js
//   window.MathJax = {
//     tex: {
//       packages: { '[+]': ['boldsymbol'] }, // Load boldsymbol package
//       macros: {
//         oldvec: '\\vec', // Old \vec definition
//         vec: ['\\mathbf{#1}', 1], // Redefine \vec to be bold
//       },
//     },
//     loader: { load: ['[tex]/boldsymbol'] }, // Ensure boldsymbol is loaded
//   };

//   // Dynamically load MathJax v3 with tex-mml-chtml.js
//   (function () {
//     var script = document.createElement('script');
//     script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'; // Load MathJax v3 with tex-mml-chtml
//     script.async = true;
//     document.head.appendChild(script);
//   })();
// }
