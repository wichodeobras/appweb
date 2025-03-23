// PredioPlot.js
import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

const PredioPlot = () => {
  const plotRef = useRef(null);

  useEffect(() => {
    const layout = {
      title: 'PREDIO',
      xaxis: { title: 'x', range: [0, 10] },
      yaxis: { title: 'y', range: [0, 10] },
      shapes: [
        {
          type: 'rect',
          x0: 2, y0: 3,
          x1: 7, y1: 8,
          line: {
            color: 'blue',
            width: 2
          },
          fillcolor: 'rgba(0, 0, 255, 0.2)'
        }
      ]
    };

    const trace = {
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter'
    };

    Plotly.newPlot(plotRef.current, [trace], layout, { scrollZoom: true });

    // Cleanup al desmontar
    return () => Plotly.purge(plotRef.current);
  }, []);

  return (
    <div
      ref={plotRef}
      style={{ width: '100%', height: '600px' }}
    />
  );
};

export default PredioPlot;
