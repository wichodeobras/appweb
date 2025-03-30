// GraficaTemplate.js
import React from "react";

const GraficaTemplate = ({
  title = "Título del Gráfico",
  width = 900,
  height = 400,
  padding = 50,
  numGridLines = 10,
  xLabel = "Eje X",
  yLabel = "Eje Y"
}) => {
  // Líneas de retícula verticales (eje X)
  const xGridLines = [];
  for (let i = 1; i < numGridLines; i++) {
    const x = padding + i * ((width - 2 * padding) / numGridLines);
    // Se puede ajustar el valor de la etiqueta según la escala que necesites
    const label = ((i / numGridLines) * (width - 2 * padding)).toFixed(0);
    xGridLines.push(
      <line
        key={`x-grid-line-${i}`}
        x1={x}
        y1={padding}
        x2={x}
        y2={height - padding}
        style={{ stroke: "#ddd", strokeWidth: 1 }}
      />,
      <text
        key={`x-grid-label-${i}`}
        x={x}
        y={height - padding + 15}
        fontSize="10"
        textAnchor="middle"
        fill="#888"
      >
        {label}
      </text>
    );
  }

  // Líneas de retícula horizontales (eje Y)
  const yGridLines = [];
  for (let i = 1; i < numGridLines; i++) {
    const y = padding + i * ((height - 2 * padding) / numGridLines);
    // Etiqueta invertida (de mayor a menor)
    const label = (((numGridLines - i) / numGridLines) * (height - 2 * padding)).toFixed(0);
    yGridLines.push(
      <line
        key={`y-grid-line-${i}`}
        x1={padding}
        y1={y}
        x2={width - padding}
        y2={y}
        style={{ stroke: "#ddd", strokeWidth: 1 }}
      />,
      <text
        key={`y-grid-label-${i}`}
        x={padding - 5}
        y={y + 3}
        fontSize="10"
        textAnchor="end"
        fill="#888"
      >
        {label}
      </text>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      style={{
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "2rem"
      }}
    >
      {/* Título del gráfico */}
      <text
        x={width / 2}
        y={padding / 2}
        textAnchor="middle"
        fontSize="16"
        fill="#000"
      >
        {title}
      </text>

      {/* Líneas de retícula */}
      {xGridLines}
      {yGridLines}

      {/* Ejes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        style={{ stroke: "#000", strokeWidth: 1 }}
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        style={{ stroke: "#000", strokeWidth: 1 }}
      />

      {/* Etiquetas de los ejes */}
      <text
        x={width / 2}
        y={height - 10}
        textAnchor="middle"
        fontSize="14"
        fill="#000"
      >
        {xLabel}
      </text>
      <text
        x={15}
        y={height / 2}
        textAnchor="middle"
        fontSize="14"
        fill="#000"
        transform={`rotate(-90, 15, ${height / 2})`}
      >
        {yLabel}
      </text>
    </svg>
  );
};

export default GraficaTemplate;
