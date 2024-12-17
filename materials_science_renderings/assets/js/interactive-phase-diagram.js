// Data for the Pb-Sn binary phase diagram
const phaseData = [
    // Liquidus Curve
    {
      x: [1.00000000e-06, 2.57914285e-03, 7.78537356e-03, 1.84042879e-02,
        4.05261069e-02, 7.00340479e-02, 1.01948082e-01, 1.36747108e-01,
        1.75074736e-01, 2.17811742e-01, 2.66168264e-01, 3.21746141e-01,
        3.86333200e-01, 4.44740980e-01, 5.01364573e-01, 5.54185682e-01,
        6.01869682e-01, 6.44073284e-01, 6.81152606e-01, 7.13752592e-01,
        7.41186957e-01],
      y: [6.00611911e+02, 6.00251166e+02, 5.99514153e+02, 5.97976285e+02,
        5.94635991e+02, 5.89935810e+02, 5.84607588e+02, 5.78595453e+02,
        5.71830984e+02, 5.64225831e+02, 5.55659787e+02, 5.45962458e+02,
        5.34890083e+02, 5.24890083e+02, 5.14890083e+02, 5.04890083e+02,
        4.94890083e+02, 4.84890083e+02, 4.74890083e+02, 4.64890083e+02,
        4.55391509e+02].map(point=>point-273.),
      name: "Liquidus (α)",
      mode: "lines",
      line: { color: "red", width: 2 }
    },
    // α-Phase Solidus Line (Pb-rich phase)
    {
      x: [7.78231279e-07, 2.00077823e-03, 6.00077823e-03, 1.40007782e-02,
        3.00007782e-02, 5.00007782e-02, 7.00007782e-02, 9.00007782e-02,
        1.10000778e-01, 1.30000778e-01, 1.50000778e-01, 1.70000778e-01,
        1.90000778e-01, 2.05905229e-01, 2.20142662e-01, 2.33079150e-01,
        2.45072811e-01, 2.56452073e-01, 2.67516654e-01, 2.78554475e-01,
        2.89291929e-01],
      y: [6.00611911e+02, 6.00251166e+02, 5.99514153e+02, 5.97976285e+02,
        5.94635991e+02, 5.89935810e+02, 5.84607588e+02, 5.78595453e+02,
        5.71830984e+02, 5.64225831e+02, 5.55659787e+02, 5.45962458e+02,
        5.34890083e+02, 5.24890083e+02, 5.14890083e+02, 5.04890083e+02,
        4.94890083e+02, 4.84890083e+02, 4.74890083e+02, 4.64890083e+02,
        4.55391509e+02].map(point=>point-273.),
      name: "Solidus (α)",
      mode: "lines",
      line: { color: "green", width: 2 }
    },
     // α-Phase Solvus Line (Pb-rich phase)
     {
      x: [2.88381247e-02, 2.93976037e-02, 3.05408806e-02, 3.29270540e-02,
        3.81172823e-02, 4.54490342e-02, 5.38107271e-02, 6.33106637e-02,
        7.40684022e-02, 8.62161554e-02, 9.99002989e-02, 1.15282967e-01,
        1.32543674e-01, 1.51880805e-01, 1.73512627e-01, 1.93512627e-01,
        2.13512627e-01, 2.33512627e-01, 2.53512627e-01, 2.73512627e-01,
        2.89291929e-01],
      y: [3.00000000e+02, 3.01000000e+02, 3.03000000e+02, 3.07000000e+02,
        3.15000000e+02, 3.25000000e+02, 3.35000000e+02, 3.45000000e+02,
        3.55000000e+02, 3.65000000e+02, 3.75000000e+02, 3.85000000e+02,
        3.95000000e+02, 4.05000000e+02, 4.15000000e+02, 4.23353095e+02,
        4.31005894e+02, 4.38073721e+02, 4.44646748e+02, 4.50797419e+02,
        4.55391509e+02].map(point=>point-273.),
      name: "Solvus (α)",
      mode: "lines",
      line: { color: "green", width: 2 }
    },
     // β-Phase Solvus Line (Sn-rich phase)
     {
      x: [0.99865805,   0.99862166,   0.99854667,   0.9983876 ,
        0.99803112,   0.9975079 ,   0.99689045,   0.99617061,
        0.99534084,   0.99439441,   0.99332564,   0.99213017,
        0.99080528,   0.98935021,   0.98776654,   0.98634818,
        0.98497624,   0.9836517 ,   0.98237461,   0.98114436,
        0.98020608],
      y: [300.        , 301.        , 303.        , 307.        ,
        315.        , 325.        , 335.        , 345.        ,
        355.        , 365.        , 375.        , 385.        ,
        395.        , 405.        , 415.        , 423.35309548,
        431.00589422, 438.07372051, 444.64674793, 450.79741905,
        455.39150884].map(point=>point-273.),
      name: "Solvus (β)",
      mode: "lines",
      line: { color: "yellow", width: 4 }
    },
     // α-Phase Solvus Line (Pb-rich phase)
     {
      x: [2.88381247e-02, 2.93976037e-02, 3.05408806e-02, 3.29270540e-02,
        3.81172823e-02, 4.54490342e-02, 5.38107271e-02, 6.33106637e-02,
        7.40684022e-02, 8.62161554e-02, 9.99002989e-02, 1.15282967e-01,
        1.32543674e-01, 1.51880805e-01, 1.73512627e-01, 1.93512627e-01,
        2.13512627e-01, 2.33512627e-01, 2.53512627e-01, 2.73512627e-01,
        2.89291929e-01],
      y: [3.00000000e+02, 3.01000000e+02, 3.03000000e+02, 3.07000000e+02,
        3.15000000e+02, 3.25000000e+02, 3.35000000e+02, 3.45000000e+02,
        3.55000000e+02, 3.65000000e+02, 3.75000000e+02, 3.85000000e+02,
        3.95000000e+02, 4.05000000e+02, 4.15000000e+02, 4.23353095e+02,
        4.31005894e+02, 4.38073721e+02, 4.44646748e+02, 4.50797419e+02,
        4.55391509e+02].map(point=>point-273.),
      name: "Solvus (α)",
      mode: "lines",
      line: { color: "yellow", width: 4 }
    },
    // β-Phase Liquidus Line (Sn-rich phase)
    {
      x: [ 0.99999983,   0.9996653 ,   0.99900764,   0.99773747,
        0.99537307,   0.99273319,   0.9904225 ,   0.98841668,
        0.98669058,   0.98521869,   0.98397568,   0.98293681,
        0.98207836,   0.98137791,   0.98081462,   0.98036935,
        0.98020608],
      y: [505.07771607, 504.57654825, 503.57911474, 501.60409539,
        497.73526401, 493.05636409, 488.55800814, 484.24529344,
        480.12192461, 476.19018398, 472.45092796, 468.90360644,
        465.54630131, 462.37577962, 459.38755621, 456.57596128,
        455.39150884].map(point=>point-273.),
      name: "Liquidus (β)",
      mode: "lines",
      line: { color: "blue", width: 2 }
    },
     // β-Phase Solidus Line (Sn-rich phase)
     {
      x: [ 0.999999  ,   0.997999  ,   0.993999  ,   0.985999  ,
        0.969999  ,   0.949999  ,   0.929999  ,   0.909999  ,
        0.889999  ,   0.869999  ,   0.849999  ,   0.829999  ,
        0.809999  ,   0.789999  ,   0.769999  ,   0.749999  ,
        0.74118696],
      y: [505.07771607, 504.57654825, 503.57911474, 501.60409539,
        497.73526401, 493.05636409, 488.55800814, 484.24529344,
        480.12192461, 476.19018398, 472.45092796, 468.90360644,
        465.54630131, 462.37577962, 459.38755621, 456.57596128,
        455.39150884].map(point=>point-273.),
      name: "Solidus (β)",
      mode: "lines",
      line: { color: "red", width:2 }
    },
     // β-Phase Solvus Line (Sn-rich phase)
     {
      x: [ 0.99865805,   0.99862166,   0.99854667,   0.9983876 ,
        0.99803112,   0.9975079 ,   0.99689045,   0.99617061,
        0.99534084,   0.99439441,   0.99332564,   0.99213017,
        0.99080528,   0.98935021,   0.98776654,   0.98634818,
        0.98497624,   0.9836517 ,   0.98237461,   0.98114436,
        0.98020608],
      y: [300.        , 301.        , 303.        , 307.        ,
        315.        , 325.        , 335.        , 345.        ,
        355.        , 365.        , 375.        , 385.        ,
        395.        , 405.        , 415.        , 423.35309548,
        431.00589422, 438.07372051, 444.64674793, 450.79741905,
        455.39150884].map(point=>point-273.),
      name: "Solvus (β)",
      mode: "lines",
      line: { color: "red", width:2 }
    },
    // Eutectic Line
    {
      x: [2.89291929e-01,7.41186957e-01, 9.80206076e-01],
      y: [4.55391509e+02,4.55391509e+02, 4.55391509e+02].map(point=>point-273.),
      name: "Eutectic Line",
      mode: "lines",
      line: { color: "black", dash: "dot" }
    },
    // Shaded Region: L + α
    {
      x: [ 0.99865805,   0.99862166,   0.99854667,   0.9983876 ,
        0.99803112,   0.9975079 ,   0.99689045,   0.99617061,
        0.99534084,   0.99439441,   0.99332564,   0.99213017,
        0.99080528,   0.98935021,   0.98776654,   0.98634818,
        0.98497624,   0.9836517 ,   0.98237461,   0.98114436,
        0.98020608],
      y: [300.        , 301.        , 303.        , 307.        ,
        315.        , 325.        , 335.        , 345.        ,
        355.        , 365.        , 375.        , 385.        ,
        395.        , 405.        , 415.        , 423.35309548,
        431.00589422, 438.07372051, 444.64674793, 450.79741905,
        455.39150884].map(point=>point-273.),
      name: "L + α Region",
      fill: "toself",
      fillcolor: "rgba(255, 0, 0, 0.2)", // Semi-transparent red
      line: { width: 0 }
    },
    // Shaded Region: L + β
    {
      x: [2.88381247e-02, 2.93976037e-02, 3.05408806e-02, 3.29270540e-02,
        3.81172823e-02, 4.54490342e-02, 5.38107271e-02, 6.33106637e-02,
        7.40684022e-02, 8.62161554e-02, 9.99002989e-02, 1.15282967e-01,
        1.32543674e-01, 1.51880805e-01, 1.73512627e-01, 1.93512627e-01,
        2.13512627e-01, 2.33512627e-01, 2.53512627e-01, 2.73512627e-01,
        2.89291929e-01],
      y: [3.00000000e+02, 3.01000000e+02, 3.03000000e+02, 3.07000000e+02,
        3.15000000e+02, 3.25000000e+02, 3.35000000e+02, 3.45000000e+02,
        3.55000000e+02, 3.65000000e+02, 3.75000000e+02, 3.85000000e+02,
        3.95000000e+02, 4.05000000e+02, 4.15000000e+02, 4.23353095e+02,
        4.31005894e+02, 4.38073721e+02, 4.44646748e+02, 4.50797419e+02,
        4.55391509e+02].map(point=>point-273.),
      name: "L + β Region",
      fill: "toself",
      fillcolor: "rgba(0, 0, 255, 0.2)", // Semi-transparent blue
      line: { width: 0 }
    }
  ];
  
  // Layout for the plot
  const layout = {
    title: "Pb-Sn Binary Phase Diagram",
    xaxis: {
      title: "Composition (wt% Sn)",
      range: [0, 1],
      showline:true, 
      linewidth:2,
      linecolor:'black',
      mirror:true,
    },
    yaxis: {
      title: "Temperature (°C)",
      range: [25, 350],
      showline:true, 
      linewidth:2,
      linecolor:'black',
      mirror:true,
    }
  };
  
  // Create the plot
  Plotly.newPlot("phaseDiagram", phaseData, layout).then((gd) => {
    const plotElement = document.getElementById("phaseDiagram");
    const tooltip = document.getElementById("tooltip");
  
    // Add mousemove event listener
    plotElement.addEventListener("mousemove", function (event) {
      // Get the bounding box of the plot area
      const plotArea = plotElement.querySelector(".main-svg").getBoundingClientRect();
  
      // Get mouse position relative to the plot area
      const cursorX = event.clientX - plotArea.left;
      const cursorY = event.clientY - plotArea.top;
  
      // Use Plotly's API to convert pixel positions to data values
      const xAxis = gd._fullLayout.xaxis;
      const yAxis = gd._fullLayout.yaxis;
  
      // Convert pixel positions to data values
      const composition = xAxis.p2d(cursorX - xAxis._offset);
      const temperature = yAxis.p2d(cursorY - yAxis._offset);
  
      // Check if the cursor is within the plot bounds
      if (
        cursorX < xAxis._offset ||
        cursorX > xAxis._offset + xAxis._length ||
        cursorY < yAxis._offset ||
        cursorY > yAxis._offset + yAxis._length
      ) {
        tooltip.style.display = "none";
        return;
      }
  
      // Determine the phase
      const phase = identifyPhase(composition, temperature);
  
      // Update tooltip
      tooltip.style.display = "block";
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 10}px`;
      tooltip.innerHTML = `
        <strong>Composition:</strong> ${composition.toFixed(2)} wt% Sn<br>
        <strong>Temperature:</strong> ${temperature.toFixed(2)} °C<br>
        <strong>Phase:</strong> ${phase}
      `;
    });
  
    // Hide tooltip when mouse leaves the plot
    plotElement.addEventListener("mouseout", function () {
      tooltip.style.display = "none";
    });
  });
  
  // Function to identify the phase
  function identifyPhase(composition, temperature) {
    if (temperature > 327) {
      return "Above melting point (all liquid)";
    }
    if (
      composition < 61.9 &&
      temperature > interpolate(composition, [0, 10, 20, 30, 40, 50, 61.9], [327, 290, 250, 220, 200, 190, 183])
    ) {
      return "Liquid";
    }
    if (
      composition > 61.9 &&
      temperature > interpolate(composition, [61.9, 70, 80, 90, 100], [183, 190, 200, 215, 232])
    ) {
      return "Liquid";
    }
    if (temperature <= 183) {
      return "Eutectic solid (α + β)";
    }
    return "Two-phase region (L + α or L + β)";
  }
  
  // Linear interpolation helper
  function interpolate(x, xPoints, yPoints) {
    for (let i = 0; i < xPoints.length - 1; i++) {
      if (x >= xPoints[i] && x <= xPoints[i + 1]) {
        const slope = (yPoints[i + 1] - yPoints[i]) / (xPoints[i + 1] - xPoints[i]);
        return yPoints[i] + slope * (x - xPoints[i]);
      }
    }
    return null; // Out of bounds
  }
  