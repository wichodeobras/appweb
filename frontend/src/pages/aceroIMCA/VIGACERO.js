import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {CalcCb,calcrts,calcFcr,F2Mn,LimiteLp,LimiteLr,} from "../../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroFlexión";
import ThreeViga from "../../graficos/ThreeViga";

const BASE_URL = "https://django-backend-3vty.onrender.com";

function DiseñoViga() {
  // Materiales
  const [Fy, setFy] = useState("345");
  const [E, setE] = useState("200000");

  // Esfuerzos
  const [Mu, setMu] = useState("7963");
  const [Vu, setVu] = useState("4550");
  const [Mmax, setMmax] = useState("7963");
  const [Ma, setMa] = useState("5972");
  const [Mb, setMb] = useState("7963");
  const [Mc, setMc] = useState("5972");

  // Condiciones
  const [Lb, setLb] = useState("7000");
  const [Lp, setLp] = useState(null);
  const [Lr, setLr] = useState(null);
  const [Mn, setMn] = useState(null);
  const [rts, setrts]=useState(null);
  const [ho, setho]=useState(null);


  // Perfiles y selección
  const [profiles, setProfiles] = useState([]);
  const [selectedMedida, setSelectedMedida] = useState("");

  // Propiedades del perfil seleccionado (agrupadas en un objeto)
  const [profileProps, setProfileProps] = useState({});

  // Clasificaciones
  const [clasificacionPatin, setClasificacionPatin] = useState("");
  const [clasificacionAlma, setClasificacionAlma] = useState("");

  // ========= OBTENCIÓN DE PERFILES AL CARGAR =========
  useEffect(() => {
    fetch(`${BASE_URL}/api/irr/`)
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
        setSelectedMedida("");
      })
      .catch((error) => console.error("Error al obtener los perfiles:", error));
  }, []);

  // ========= LIMPIEZA AUTOMÁTICA AL CAMBIAR DE PERFIL =========
  useEffect(() => {
    setProfileProps({});
    setClasificacionPatin("");
    setClasificacionAlma("");
  }, [selectedMedida]);

  // ========= MANEJO DE SELECCIÓN DE PROPIEDADES =========
  const handleShowProperties = () => {
    const profile = profiles.find(
      (p) =>
        p.designacion_mm?.toLowerCase() === selectedMedida.toLowerCase() ||
        p.designacion_metrico?.toLowerCase() === selectedMedida.toLowerCase()
    );
    if (profile) {
      setProfileProps({
        sx: profile.sx,
        sy: profile.sy,
        Ag: profile.area,
        Cw: profile.cw,
        Ix: profile.ix,
        Iy: profile.iy,
        J: profile.j,
        Zx: profile.zx,
        ry: profile.ry,
        b_2tf: profile.b_2tf,
        h_tw: profile.h_tw,
        d: profile.d,
        h: profile.h,
        bf: profile.bf,
        tf: profile.tf,
        tw: profile.tw,
      });
    } else {
      setProfileProps({});
    }
  };

  // ========= CLASIFICACIONES =========
  useEffect(() => {
    if (E && Fy && profileProps.b_2tf && profileProps.h_tw) {
      setClasificacionPatin(
        ClasificacionPatin(
          Number(profileProps.b_2tf),
          Number(E),
          Number(Fy)
        )
      );
      setClasificacionAlma(
        ClasificacionAlma(
          Number(profileProps.h_tw),
          Number(E),
          Number(Fy)
        )
      );
    } else {
      setClasificacionPatin("");
      setClasificacionAlma("");
    }
  }, [E, Fy, profileProps.b_2tf, profileProps.h_tw]);

  const ClasificacionPatin = (b_2tf, E, Fy) => {
    const lambda = b_2tf;
    const lambdap = 0.38 * Math.sqrt(E / Fy);
    const lambdar = Math.sqrt(E / Fy);
    if (lambda < lambdap) return "Compacto";
    if (lambda >= lambdap && lambda <= lambdar) return "No compacto";
    if (lambda > lambdar) return "Esbelto";
    return "Clasificación desconocida";
  };

  const ClasificacionAlma = (h_tw, E, Fy) => {
    const lambda = h_tw;
    const lambdap = 3.76 * Math.sqrt(E / Fy);
    const lambdar = 5.7 * Math.sqrt(E / Fy);
    if (lambda < lambdap) return "Compacto";
    if (lambda >= lambdap && lambda <= lambdar) return "No compacto";
    if (lambda > lambdar) return "Esbelto";
    return "Clasificación desconocida";
  };

  // ========= CÁLCULO DE MOMENTO NOMINAL =========
  const MomentoNominal = () => {
    const ho = profileProps.d - profileProps.bf;
    const c = 1;
    //convertir a mm
    const _sx=profileProps.sx*1000;
    //const _sy=profileProps.sy*1000;
    const _cw=profileProps.Cw*1000000;
    //const _ix=profileProps.Ix*10000;
    const _iy=profileProps.Iy*10000;
    const _j=profileProps.J*10000;
    const _zx=profileProps.Zx*1000;
    const _ry=profileProps.ry*10;

    const _rts = calcrts(_iy, _cw, _sx);
    const _Lp = LimiteLp(E, Fy, _ry);
    const _Lr = LimiteLr(E, Fy, _sx, _rts, _j, ho);
    const _Cb = CalcCb(Mmax, Ma, Mb, Mc);
    const _Fcr = calcFcr(_Cb, E, _rts, Lb, _j, c, _sx, ho);

    const MnCalc = F2Mn(
      Fy,
      _zx,
      Lb,
      _Lp,
      _Lr,
      _Fcr,
      _sx,
      _Cb
    );

    setLp(_Lp);
    setLr(_Lr);
    setMn(MnCalc);
    setrts(_rts);
    setho(ho);


    return MnCalc;
  };

  // Valor de Cb para la gráfica
  const cbValue = CalcCb(Mmax, Ma, Mb, Mc);

  return (
    <>
      <div>
        <h1 style={styles.h1}>DISEÑO POR FLEXIÓN VIGA IR</h1>
        <Link to="/Diseflex">Volver a la página principal</Link>
      </div>

      <div style={styles.rowContainer}>
        <div style={styles.sectionBox}>
          <h2 style={styles.h2}>MATERIALES</h2>
          <label style={styles.label}>Fy</label>
          <input
            type="text"
            placeholder="Valor en Mpa"
            value={Fy}
            onChange={(e) => setFy(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>E</label>
          <input
            type="text"
            placeholder="Valor en Mpa"
            value={E}
            onChange={(e) => setE(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.sectionBox}>
          <h2 style={styles.h2}>ESFUERZOS</h2>
          <label style={styles.label}>Mu</label>
          <input
            type="text"
            placeholder="Valor en KN*mm"
            value={Mu}
            onChange={(e) => setMu(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Vu</label>
          <input
            type="text"
            placeholder="Valor en KN"
            value={Vu}
            onChange={(e) => setVu(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Mmax</label>
          <input
            type="text"
            placeholder="Valor en N*mm"
            value={Mmax}
            onChange={(e) => setMmax(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Ma</label>
          <input
            type="text"
            placeholder="Valor en N*mm"
            value={Ma}
            onChange={(e) => setMa(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Mb</label>
          <input
            type="text"
            placeholder="Valor en N*mm"
            value={Mb}
            onChange={(e) => setMb(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Mc</label>
          <input
            type="text"
            placeholder="Valor en N*mm"
            value={Mc}
            onChange={(e) => setMc(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.sectionBox}>
          <h2 style={styles.h2}>CONDICIONES</h2>
          <label style={styles.label}>Lb</label>
          <input
            type="text"
            placeholder="Longitud en mm"
            value={Lb}
            onChange={(e) => setLb(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.rowContainer}>
        <div style={styles.sectionBox}>
          <h2 style={styles.h2}>SELECCIONAR PERFIL IR</h2>
          <label style={styles.label}>Medida</label>
          <select
            value={selectedMedida}
            onChange={(e) => setSelectedMedida(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Selecciona una medida --</option>
            {profiles.map((profile) => {
              const medida =
                profile.designacion_mm ||
                profile.designacion_metrico ||
                "Sin medida";
              return (
                <option key={profile.id} value={medida}>
                  {medida}
                </option>
              );
            })}
          </select>
          <button onClick={handleShowProperties} style={styles.button}>
            Mostrar propiedades
          </button>

          <label style={styles.label}>Clasificación del patín</label>
          <div style={styles.result}>{clasificacionPatin}</div>

          <label style={styles.label}>Clasificación del alma</label>
          <div style={styles.result}>{clasificacionAlma}</div>
        </div>

        <div style={styles.sectionBox}>
          <label style={styles.label}>Sx</label>
          <input
            type="text"
            value={profileProps.sx || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>Sy</label>
          <input
            type="text"
            value={profileProps.sy || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>Area</label>
          <input
            type="text"
            value={profileProps.Ag || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>Cw</label>
          <input
            type="text"
            value={profileProps.Cw || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>Ix</label>
          <input
            type="text"
            value={profileProps.Ix || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>Iy</label>
          <input
            type="text"
            value={profileProps.Iy || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>J</label>
          <input
            type="text"
            value={profileProps.J || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>Zx</label>
          <input
            type="text"
            value={profileProps.Zx || ""}
            style={styles.inputpropiedades}
            readOnly
          />
          <label style={styles.label}>ry</label>
          <input
            type="text"
            value={profileProps.ry || ""}
            style={styles.inputpropiedades}
            readOnly
          />
        </div>

        <div style={styles.sectionBox}>
          <h2 style={styles.h2}>VISTA</h2>
          <ThreeViga
            lb="500"
            h={profileProps.h}
            bf={profileProps.bf}
            tf={profileProps.tf}
            tw={profileProps.tw}
          />
        </div>

        {/* Gráfica sin uso de document ni createElementNS */}
        <GraficaMn
          Fy={Number(Fy)}
          E={Number(E)}
          
          Zx={Number(profileProps.Zx*1000)}
          Lp={Lp}
          Lr={Lr}
          Sx={Number(profileProps.sx*1000)}
          Cb={cbValue}
          Lb={Number(Lb)}
          J={Number(profileProps.J*10000)}
          rts={Number(rts)}
          ho={Number(ho)}

        />
      </div>

      <div style={styles.container}>
        <h2 style={styles.h2}>CALCULOS</h2>
        <h3>Revisar este perfil</h3>
        <button onClick={MomentoNominal} style={styles.button}>
          Calcular
        </button>
        <label style={styles.label}>Mn Momento Nominal</label>
        <div style={styles.result}>{Mn}</div>
        <div style={styles.result}>{cbValue}</div>
        <div style={styles.result}>{Lp}</div>
        <div style={styles.result}>{Lr}</div>
      </div>
    </>
  );
}

/**
 * Subcomponente para graficar Mn vs. Lb
 * (sin manipular DOM directamente)
 */
function GraficaMn({
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
}) {
  // Dimensiones del SVG
  const width = 900;
  const height = 400;
  const padding = 50; // Espacio interno para márgenes, ejes y etiquetas

  // Validación: si faltan datos clave, se retorna un SVG vacío
  if (!Fy || !Zx || !Sx || !Lp || !Lr || !E || !J || !rts || !ho) {
    return <svg width={width} height={height} style={styles.svgGrafica} />;
  }

  // Número de puntos para trazar la curva
  const numPoints = 100;
  // Extensión del eje X: se extiende 30% más allá de Lr para visualizar la zona posterior
  const maxLb = Lr * 3;
  const step = maxLb / numPoints;

  // Generación del array de puntos (Lb_i, Mn_i) para la curva
  const data = [];
  for (let i = 0; i <= numPoints; i++) {
    const Lb_i = i * step;
    // Se recalcula Fcr para cada Lb_i usando la función calcFcr
    const Fcr_i = calcFcr(Cb, E, rts, Lb_i, J, c, Sx, ho);
    // Se calcula el momento nominal Mn con F2Mn usando el Fcr_i obtenido
    const Mn_i = F2Mn(Fy, Zx, Lb_i, Lp, Lr, Fcr_i, Sx, Cb);
    data.push({ Lb: Lb_i, Mn: Mn_i });
  }

  // Se obtienen los máximos para escalar los ejes
  const maxLbVal = Math.max(...data.map((d) => d.Lb));
  const maxMn = Math.max(...data.map((d) => d.Mn));

  // Funciones de escala: transforman los valores reales a coordenadas en el SVG
  const scaleX = (val) =>
    padding + (val / maxLbVal) * (width - 2 * padding);
  const scaleY = (val) =>
    height - padding - (val / maxMn) * (height - 2 * padding);

  // Construcción del atributo "d" para el <path> que dibuja la curva
  const pathD = data
    .map((point, i) => {
      const x = scaleX(point.Lb);
      const y = scaleY(point.Mn);
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(" ");

  // --- Creación de grid lines (líneas divisorias) con etiquetas ---

  const numGridLines = 10; // Número de divisiones en cada eje

  // Líneas verticales y sus etiquetas (para el eje X)
  const xGridLines = [];
  for (let i = 1; i < numGridLines; i++) {
    // Se calcula la posición X de la línea de retícula
    const x = padding + i * ((width - 2 * padding) / numGridLines);
    // Línea vertical de retícula
    xGridLines.push(
      <line
        key={`x-grid-line-${i}`}
        x1={x}
        y1={padding}
        x2={x}
        y2={height - padding}
        style={{ stroke: "#ddd", strokeWidth: 1 }}
      />
    );
    // Se calcula el valor de Lb correspondiente a esta posición
    const lbValue = (i / numGridLines) * maxLbVal;
    // Etiqueta numérica para la retícula en el eje X, colocada debajo del eje
    xGridLines.push(
      <text
        key={`x-grid-label-${i}`}
        x={x}
        y={height - padding + 15}
        fontSize="10"
        textAnchor="middle"
        fill="#888"
      >
        {lbValue.toFixed(0)}
      </text>
    );
  }

  // Líneas horizontales y sus etiquetas (para el eje Y)
  const yGridLines = [];
  for (let i = 1; i < numGridLines; i++) {
    // Se calcula la posición Y de la línea de retícula
    const y = padding + i * ((height - 2 * padding) / numGridLines);
    yGridLines.push(
      <line
        key={`y-grid-line-${i}`}
        x1={padding}
        y1={y}
        x2={width - padding}
        y2={y}
        style={{ stroke: "#ddd", strokeWidth: 1 }}
      />
    );
    // Se calcula el valor de Mn correspondiente a esta posición
    // Dado que el eje Y está invertido, se invierte el cálculo:
    const mnValue = ((height - padding - y) / (height - 2 * padding)) * maxMn;
    // Etiqueta numérica para la retícula en el eje Y, colocada a la izquierda del eje
    yGridLines.push(
      <text
        key={`y-grid-label-${i}`}
        x={padding - 5}
        y={y + 3}
        fontSize="10"
        textAnchor="end"
        fill="#888"
      >
        {mnValue.toFixed(0)}
      </text>
    );
  }
  // --- Fin de grid lines ---

  // --- Líneas verticales para marcar Lp y Lr (líneas límite) ---
  const limitLines = [];
  const addLimitLine = (xValue, color, label) => {
    const x = scaleX(xValue);
    limitLines.push(
      <line
        key={`line-${label}`}
        x1={x}
        y1={padding}
        x2={x}
        y2={height - padding}
        style={{ stroke: color, strokeDasharray: "5,5", strokeWidth: 2 }}
      />,
      <text
        key={`label-${label}`}
        x={x + 5}
        y={padding + 15}
        fontSize="12"
        fill={color}
      >
        {label}
      </text>
    );
  };

  if (Lp > 0 && Lp < maxLbVal) addLimitLine(Lp, "blue", "Lp");
  if (Lr > 0 && Lr < maxLbVal) addLimitLine(Lr, "green", "Lr");

  // --- Cálculo y marcado del punto real (Lb, Mn) ingresado por el usuario ---
  let circlePoint = null;
  let textPoint = null;
  if (Lb > 0 && Lb < maxLbVal) {
    const FcrReal = calcFcr(Cb, E, rts, Lb, J, c, Sx, ho);
    const MnReal = F2Mn(Fy, Zx, Lb, Lp, Lr, FcrReal, Sx, Cb);
    const cx = scaleX(Lb);
    const cy = scaleY(MnReal);
    circlePoint = (
      <circle cx={cx} cy={cy} r={5} style={styles.svgCircle} />
    );
    textPoint = (
      <text x={cx + 10} y={cy - 5} fontSize="12" style={styles.svgText}>
        ({Lb.toFixed(1)}, {MnReal.toFixed(1)})
      </text>
    );
  }

  // --- Render final del SVG ---
  return (
    <svg width={width} height={height} style={styles.svgGrafica}>
      {/* Líneas de retícula verticales y sus etiquetas */}
      {xGridLines}
      {/* Líneas de retícula horizontales y sus etiquetas */}
      {yGridLines}

      {/* Ejes X e Y */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        style={styles.svgAxis}
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        style={styles.svgAxis}
      />

      {/* Etiquetas de los ejes */}
      <text
        x={width / 2}
        y={height - 10}
        textAnchor="middle"
        fontSize="14"
        fill="#000"
      >
        Lb [mm]
      </text>
      <text
        x={15}
        y={height / 2}
        textAnchor="middle"
        fontSize="14"
        fill="#000"
        transform={`rotate(-90, 15, ${height / 2})`}
      >
        Mn [N·mm]
      </text>

      {/* Curva calculada */}
      <path d={pathD} style={styles.svgCurve} />

      {/* Líneas límite para Lp y Lr */}
      {limitLines}

      {/* Punto real (Lb, Mn) */}
      {circlePoint}
      {textPoint}
    </svg>
  );
}



const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  rowContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    justifyContent: "space-between",
    maxWidth: "1000px",
    margin: "2rem auto",
  },
  sectionBox: {
    flex: "1 1 250px",
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  h1: {
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  h2: {
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.4rem",
    borderBottom: "2px solid #ccc",
    paddingBottom: "0.5rem",
  },
  label: {
    display: "block",
    marginTop: "1rem",
    marginBottom: "0.25rem",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  inputpropiedades: {
    width: "25%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1.5rem",
    transition: "background-color 0.3s ease",
  },
  result: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
    minHeight: "20px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
  // Estilos para la gráfica SVG
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
  
  svgPath: {
    stroke: "#343a40", // Gris oscuro
    strokeWidth: 2,
    fill: "none",
  },
  svgLine: {
    strokeWidth: 1.5,
    stroke: "red",
  },
  svgLineBlue: {
    stroke: "blue",
    strokeDasharray: "4,4",
  },
  svgLineGreen: {
    stroke: "green",
    strokeDasharray: "4,4",
  },
  svgCircle: {
    fill: "red",
    stroke: "black",
    strokeWidth: 1,
  },
  svgText: {
    fontSize: "12px",
    fontFamily: "Arial, sans-serif",
    fill: "#333",
  },
};

export default DiseñoViga;
