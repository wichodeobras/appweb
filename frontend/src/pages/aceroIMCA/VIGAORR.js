import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar";
import Boton from "../../componentes/Boton";

const BASE_URL = "https://django-backend-3vty.onrender.com";
const tiposPerfil = ["HP", "HR", "IE", "IRR"];

function Deflexion() {
  const [selectedTipo, setSelectedTipo] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [selectedMedida, setSelectedMedida] = useState("");
  const [profileProperties, setProfileProperties] = useState("");
  const [I, setI] = useState(null);
  const [factor, setFactor] = useState("240");
  const [pesoPerfil, setPesoPerfil] = useState(0);

  const [claro, setClaro] = useState("5000");
  const [carga, setCarga] = useState("1600");
  const [E, setE] = useState("200000");
  const [defperm, setDefperm] = useState(null);
  const [deflexion, setDeflexion] = useState(null);

  const [allProfiles, setAllProfiles] = useState([]);
  const [bestProfiles, setBestProfiles] = useState([]);

  // Cargo todos los perfiles de todos los tipos al iniciar
  useEffect(() => {
    Promise.all(
      tiposPerfil.map((tipo) =>
        fetch(`${BASE_URL}/api/${tipo.toLowerCase()}/`)
          .then((r) => r.json())
          .then((data) => data.map((p) => ({ ...p, tipo })))
      )
    )
      .then((arrays) => setAllProfiles(arrays.flat()))
      .catch((err) => console.error("Error cargando todos los perfiles:", err));
  }, []);

  // Calculo de la flecha permisible
  useEffect(() => {
    const perm = (L, fact) => L / fact;
    setDefperm(perm(Number(claro), Number(factor)));
  }, [claro, factor]);

  // Cuando selecciono un perfil, extraigo su I y su peso
  const handleShowProperties = () => {
    const profile = profiles.find(
      (p) =>
        p.designacion_mm?.toLowerCase() === selectedMedida.toLowerCase() ||
        p.designacion_metrico?.toLowerCase() === selectedMedida.toLowerCase()
    );
    if (profile) {
      const Ivalue = parseFloat(profile.Ix || profile.ix);
      if (!isNaN(Ivalue)) setI(Ivalue);
      setPesoPerfil(Number(profile.peso) || 0);

      const { id, ...resto } = profile;
      setProfileProperties(
        Object.entries(resto)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      );
    } else {
      setI(null);
      setPesoPerfil(0);
      setProfileProperties("No se encontraron propiedades.");
    }
  };

  // Función de deflexión (usa c: carga total, L: claro, E, I)
  const deflex = (c, L, E, I) =>
    (5 * ((Number(c) * 9.850) / 1000) * Math.pow(Number(L), 4)) /
    (384 * Number(E) * Number(I) * 10000);

  // Cálculo de carga total
  const cargaTotal = Number(carga) + pesoPerfil;

  // Actualizo la deflexión actual cuando cambia I, claro, E o cargaTotal
  useEffect(() => {
    if (I != null && claro && E) {
      setDeflexion(deflex(cargaTotal, claro, E, I));
    }
  }, [I, claro, E, cargaTotal]);

  // Selecciono los 5 perfiles con deflexión ≤ permisible
  const calculateBestProfiles = () => {
    if (defperm == null) return;
    const resultados = allProfiles
      .map((p) => {
        const Ival = parseFloat(p.Ix || p.ix);
        if (isNaN(Ival)) return null;
        const pesoP = Number(p.peso) || 0;
        const ct = Number(carga) + pesoP;
        const d = deflex(ct, claro, E, Ival);
        return { perfil: p, deflex: d };
      })
      .filter((r) => r && r.deflex <= defperm);

    resultados.sort(
      (a, b) => Math.abs(defperm - a.deflex) - Math.abs(defperm - b.deflex)
    );
    setBestProfiles(resultados.slice(0, 5));
  };

  // Cuando cambia el tipo, cargo sus perfiles
  useEffect(() => {
    if (!selectedTipo) {
      setProfiles([]);
      return;
    }
    fetch(`${BASE_URL}/api/${selectedTipo.toLowerCase()}/`)
      .then((r) => r.json())
      .then((data) => {
        setProfiles(data);
        setSelectedMedida("");
        setProfileProperties("");
        setI(null);
        setPesoPerfil(0);
      })
      .catch((e) => console.error("Error al obtener perfiles:", e));
  }, [selectedTipo]);

  return (
    <div style={styles.body}>
      <Navbar title="CATÁLOGO IMCA" showBackLink backLink="/" />
      <div style={styles.container}>
        <h1 style={styles.h1}>PERFILES IMCA</h1>

        {/* Inputs de material y geometría */}
        <div style={styles.row}>
          <label>E (MPa)</label>
          <input
            type="number"
            value={E}
            onChange={(e) => setE(e.target.value)}
          />

          <label>Carga perfil (kg/m)</label>
          <input
            type="number"
            value={pesoPerfil}
            readOnly
            style={styles.small}
          />

          <label>Carga usuario (kg/m)</label>
          <input
            type="number"
            value={carga}
            onChange={(e) => setCarga(e.target.value)}
          />

          <label>Carga total (kg/m)</label>
          <input
            type="number"
            value={cargaTotal}
            readOnly
            style={styles.small}
          />

          <label>Claro (mm)</label>
          <input
            type="number"
            value={claro}
            onChange={(e) => setClaro(e.target.value)}
          />

          <label>Factor</label>
          <input
            type="number"
            value={factor}
            onChange={(e) => setFactor(e.target.value)}
          />
        </div>

        {/* Selección de perfil */}
        <label style={styles.label}>Tipo de perfil</label>
        <select
          value={selectedTipo}
          onChange={(e) => setSelectedTipo(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Selecciona tipo --</option>
          {tiposPerfil.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <label style={styles.label}>Medida</label>
        <select
          value={selectedMedida}
          onChange={(e) => setSelectedMedida(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Selecciona medida --</option>
          {profiles.map((p) => {
            const m = p.designacion_mm || p.designacion_metrico;
            return (
              <option key={p.id} value={m}>
                {m}
              </option>
            );
          })}
        </select>

        <Boton onClick={handleShowProperties}>Mostrar propiedades</Boton>

        {/* Resultados de flechas */}
        <div style={styles.row}>
          <label>Deflexión permisible (mm)</label>
          <input
            value={defperm?.toFixed(3) || ""}
            readOnly
            style={styles.small}
          />
          <label>Deflexión actual (mm)</label>
          <input
            value={deflexion?.toFixed(3) || ""}
            readOnly
            style={styles.small}
          />
        </div>

        <div style={styles.result}>
          {profileProperties || "Aquí se mostrarán las propiedades."}
        </div>

        <hr />

        <Boton onClick={calculateBestProfiles}>
          Calcular 5 perfiles óptimos
        </Boton>

        {bestProfiles.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h2>Top 5 perfiles (por debajo de la flecha permisible)</h2>
            <ul>
              {bestProfiles.map(({ perfil, deflex }) => {
                const label =
                  perfil.designacion_mm || perfil.designacion_metrico;
                return (
                  <li key={perfil.id}>
                    <strong>
                      {perfil.tipo} - {label}
                    </strong>{" "}
                    → deflexión {deflex.toFixed(3)} mm
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#e6f1fc",
    color: "#03045e",
  },
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  h1: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
    margin: "1rem 0",
  },
  label: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  small: {
    width: "80px",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  result: {
    marginTop: "1rem",
    padding: "1rem",
    background: "#e9ecef",
    borderRadius: "4px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
};

export default Deflexion;
