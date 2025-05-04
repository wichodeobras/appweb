// src/componentes/GraficaMn.jsx
import React from "react";
import { calcFcr, F2Mn } from "../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroFlexión";

const styles = {
  svgGrafica: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: "2rem",
  },
  svgCurve: {
    fill: "none",
    stroke: "red",
    strokeWidth: 2,
  },
  svgAxis: {
    stroke: "#000",
    strokeWidth: 1,
  },
  gridLine: {
    stroke: "#ddd",
    strokeWidth: 1,
  },
  lineBlue: {
    stroke: "blue",
    strokeDasharray: "4,4",
    strokeWidth: 2,
  },
  lineGreen: {
    stroke: "green",
    strokeDasharray: "4,4",
    strokeWidth: 2,
  },
  circle: {
    fill: "red",
    stroke: "black",
    strokeWidth: 1,
  },
  text: {
    fontSize: "12px",
    fontFamily: "Arial, sans-serif",
    fill: "#333",
  },
  axisLabel: {
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    fill: "#000",
  },
};

export default function GraficaMn({
  Fy,
  E,
  Zx,
  Lp,
  Lr,
  Sx,
  Cb,
  Lb,
  J,
  rts,
  ho,
  c = 1,
  width = 900,
  height = 600,
  padding = { left: 75, top: 40, right: 40, bottom: 40 },
}) {
  if (!Fy || !Zx || !Sx || !Lp || !Lr || !E || !J || !rts || !ho) {
    return <svg width={width} height={height} style={styles.svgGrafica} />;
  }

  const { left: paddingLeft, top: paddingTop, right: paddingRight, bottom: paddingBottom } = padding;
  const numPoints = 100;
  const maxLb = Lr * 3;
  const step = maxLb / numPoints;

  // compute curve data
  const data = [];
  for (let i = 0; i <= numPoints; i++) {
    const lb_i = i * step;
    const fcr = calcFcr(Cb, E, rts, lb_i, J, c, Sx, ho);
    const mn = F2Mn(Fy, Zx, lb_i, Lp, Lr, fcr, Sx, Cb);
    data.push({ lb: lb_i, mn });
  }

  const maxLbVal = Math.max(...data.map(d => d.lb));
  const maxMn = Math.max(...data.map(d => d.mn));

  const scaleX = val => paddingLeft + (val / maxLbVal) * (width - paddingLeft - paddingRight);
  const scaleY = val => height - paddingBottom - (val / maxMn) * (height - paddingTop - paddingBottom);

  // build path
  const pathD = data
    .map((pt, i) => {
      const x = scaleX(pt.lb);
      const y = scaleY(pt.mn);
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(" ");

  // grid lines
  const numGridLines = 10;
  const xGridLines = [];
  for (let i = 1; i < numGridLines; i++) {
    const x = paddingLeft + i * ((width - paddingLeft - paddingRight) / numGridLines);
    const lbValue = (i / numGridLines) * maxLbVal;
    xGridLines.push(
      <line
        key={`x-grid-${i}`}
        x1={x}
        y1={paddingTop}
        x2={x}
        y2={height - paddingBottom}
        style={styles.gridLine}
      />,
      <text
        key={`x-label-${i}`}
        x={x}
        y={height - paddingBottom + 15}
        textAnchor="middle"
        style={styles.text}
      >
        {lbValue.toFixed(0)}
      </text>
    );
  }
  const yGridLines = [];
  for (let i = 1; i < numGridLines; i++) {
    const y = paddingTop + i * ((height - paddingTop - paddingBottom) / numGridLines);
    const mnValue = ((height - paddingBottom - y) / (height - paddingTop - paddingBottom)) * maxMn;
    yGridLines.push(
      <line
        key={`y-grid-${i}`}
        x1={paddingLeft}
        y1={y}
        x2={width - paddingRight}
        y2={y}
        style={styles.gridLine}
      />,
      <text
        key={`y-label-${i}`}
        x={paddingLeft - 5}
        y={y + 3}
        textAnchor="end"
        style={styles.text}
      >
        {mnValue.toFixed(0)}
      </text>
    );
  }

  // limit lines
  const limitLines = [];
  if (Lp > 0 && Lp < maxLbVal) {
    const x = scaleX(Lp);
    limitLines.push(
      <line
        key="line-Lp"
        x1={x}
        y1={paddingTop}
        x2={x}
        y2={height - paddingBottom}
        style={styles.lineBlue}
      />,
      <text key="label-Lp" x={x + 5} y={paddingTop + 15} style={styles.text}>
        Lp
      </text>
    );
  }
  if (Lr > 0 && Lr < maxLbVal) {
    const x = scaleX(Lr);
    limitLines.push(
      <line
        key="line-Lr"
        x1={x}
        y1={paddingTop}
        x2={x}
        y2={height - paddingBottom}
        style={styles.lineGreen}
      />,
      <text key="label-Lr" x={x + 5} y={paddingTop + 30} style={styles.text}>
        Lr
      </text>
    );
  }

  // current point
  let circlePoint = null;
  let textPoint = null;
  if (Lb > 0 && Lb < maxLbVal) {
    const fcrReal = calcFcr(Cb, E, rts, Lb, J, c, Sx, ho);
    const mnReal = F2Mn(Fy, Zx, Lb, Lp, Lr, fcrReal, Sx, Cb);
    const cx = scaleX(Lb);
    const cy = scaleY(mnReal);
    circlePoint = <circle key="pt" cx={cx} cy={cy} r={5} style={styles.circle} />;
    textPoint = (
      <text key="pt-label" x={cx + 10} y={cy - 5} style={styles.text}>
        ({Lb.toFixed(1)}, {mnReal.toFixed(1)})
      </text>
    );
  }

  return (
    <svg width={width} height={height} style={styles.svgGrafica}>
      {xGridLines}
      {yGridLines}

      {/* axes */}
      <line
        x1={paddingLeft}
        y1={height - paddingBottom}
        x2={width - paddingRight}
        y2={height - paddingBottom}
        style={styles.svgAxis}
      />
      <line
        x1={paddingLeft}
        y1={paddingTop}
        x2={paddingLeft}
        y2={height - paddingBottom}
        style={styles.svgAxis}
      />

      {/* curve */}
      <path d={pathD} style={styles.svgCurve} />

      {limitLines}
      {circlePoint}
      {textPoint}

      {/* axis labels */}
      <text
        x={width / 2}
        y={height - paddingBottom + 35}
        textAnchor="middle"
        style={styles.axisLabel}
      >
        Lb [mm]
      </text>
      <text
        x={paddingLeft - 35}
        y={height / 2}
        textAnchor="middle"
        transform={`rotate(-90, ${paddingLeft - 35}, ${height / 2})`}
        style={styles.axisLabel}
      >
        Mn [N·mm]
      </text>
    </svg>
  );
}
