import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar";
import Boton from "../../componentes/Boton";
import CardNotes from "../../componentes/CardNotes";

const BASE_URL = "https://django-backend-3vty.onrender.com";
const tiposPerfil = ["HP", "HR", "IE", "IRR"];

function Deflexion() {
  // Estados para selección individual
  const [selectedTipo, setSelectedTipo] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [selectedMedida, setSelectedMedida] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [profileProperties, setProfileProperties] = useState("");
  const [I, setI] = useState(null);

  // Estados de datos de flecha
  const [claro, setClaro] = useState("5000");      // mm
  const [carga, setCarga] = useState("1600");      // kgf?
  const [E, setE] = useState("200000");            // MPa
  const [defperm, setDefperm] = useState(null);    // mm
  const [deflexion, setDeflexion] = useState(null);// mm

  // Estados para búsqueda global “Top 5”
  const [allProfiles, setAllProfiles] = useState([]);
  const [bestProfiles, setBestProfiles] = useState([]);

  // 1) Carga todos los perfiles de todos los tipos al montar
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

  // 2) Al cambiar “claro”, recalcula defperm
  useEffect(() => {
    const perm = (L) => L / 480;
    setDefperm(perm(Number(claro)));
  }, [claro]);

  // 3) Cuando seleccionas un perfil individual, extrae I y propiedades
  const handleShowProperties = () => {
    let clave = busqueda.trim() || selectedMedida;
    const profile = profiles.find(
      (p) =>
        p.designacion_mm?.toLowerCase() === clave.toLowerCase() ||
        p.designacion_metrico?.toLowerCase() === clave.toLowerCase()
    );
    if (profile) {
      const Ivalue = parseFloat(profile.Ix || profile.ix);
      if (!isNaN(Ivalue)) setI(Ivalue);
      const { id, ...resto } = profile;
      setProfileProperties(
        Object.entries(resto)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      );
    } else {
      setProfileProperties("No se encontraron propiedades.");
      setI(null);
    }
  };

  // 4) Deflexión puntual cuando cambian I, carga, claro o E
  const deflex = (carga, claro, E, I) =>
    (5 * ((Number(carga) * 9.850) / 1000) * Math.pow(Number(claro), 4)) /
    (384 * Number(E) * Number(I) * 10000);

  useEffect(() => {
    if (I && carga && claro && E) {
      setDeflexion(deflex(carga, claro, E, I));
    }
  }, [I, carga, claro, E]);

  // 5) Función “Top 5” perfiles más cercanos por debajo de defperm
  const calculateBestProfiles = () => {
    if (defperm == null) return;
    const resultados = allProfiles
      .map((p) => {
        const Ival = parseFloat(p.Ix || p.ix);
        if (isNaN(Ival)) return null;
        const d = deflex(carga, claro, E, Ival);
        return { perfil: p, deflex: d };
      })
      .filter((r) => r && r.deflex <= defperm);
    resultados.sort(
      (a, b) => Math.abs(defperm - a.deflex) - Math.abs(defperm - b.deflex)
    );
    setBestProfiles(resultados.slice(0, 5));
  };

  // 6) Cuando elige tipo, carga perfiles individuales
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
      })
      .catch((e) => console.error("Error al obtener perfiles:", e));
  }, [selectedTipo]);

  return (
    <div style={styles.body}>
      <Navbar title="CATÁLOGO IMCA" showBackLink backLink="/" />
      <div style={styles.container}>
        <h1 style={styles.h1}>PERFILES IMCA</h1>

        {/* Inputs generales */}
        <div style={styles.row}>
          <label>E (MPa)</label>
          <input
            type="number"
            value={E}
            onChange={(e) => setE(e.target.value)}
          />
          <label>Carga (kgf)</label>
          <input
            type="number"
            value={carga}
            onChange={(e) => setCarga(e.target.value)}
          />
          <label>Claro (mm)</label>
          <input
            type="number"
            value={claro}
            onChange={(e) => setClaro(e.target.value)}
          />
        </div>

        {/* Búsqueda individual */}
        <label style={styles.label}>Buscar tipo y medida</label>
        <input
          type="text"
          placeholder="Ej. IR 200x100x5"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.input}
        />
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

        {/* Resultados individuales */}
        <div style={styles.row}>
          <label>Deflexión permisible (mm)</label>
          <input value={defperm?.toFixed(3) || ""} readOnly style={styles.small} />
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

        {/* Top 5 */}
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
                    <strong>{perfil.tipo} - {label}</strong> → deflexión {deflex.toFixed(3)} mm

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
    alignItems: "center",
    gap: "0.5rem",
    margin: "1rem 0",
  },
  label: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
  input: {
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
  select: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
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
