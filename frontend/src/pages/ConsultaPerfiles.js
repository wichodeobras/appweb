import React, { useEffect, useState } from "react";
//import axios from "axios";

//import "./ConsultaPerfiles.css";
import { Link } from "react-router-dom";
//<Link to="/">Volver a la página principal</Link>


const BASE_URL = "https://django-backend-3vty.onrender.com";

const tiposPerfil = ["IR", "HP", "CE", "CF", "HR", "IC", "IE", "IRR", "LD", "LI"];

function ProfileViewer() {
  const [selectedTipo, setSelectedTipo] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [selectedMedida, setSelectedMedida] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [profileProperties, setProfileProperties] = useState("");

  // Cuando se selecciona un tipo, se hace fetch al endpoint correspondiente
  useEffect(() => {
    if (selectedTipo) {
      fetch(`${BASE_URL}/api/${selectedTipo.toLowerCase()}/`)
        .then((response) => response.json())
        .then((data) => {
          setProfiles(data);
          setSelectedMedida("");
          setProfileProperties("");
        })
        .catch((error) =>
          console.error("Error al obtener los perfiles:", error)
        );
    } else {
      setProfiles([]);
      setSelectedMedida("");
      setProfileProperties("");
    }
  }, [selectedTipo]);

  const handleShowProperties = () => {
    // Se usa el input de búsqueda; si está vacío se toma el valor del select de medida
    let clave = busqueda.trim();
    if (!clave && selectedMedida) {
      clave = selectedMedida;
    }
    // Se busca el perfil que tenga designacion_mm igual a la clave
    const profile = profiles.find(
      (p) =>
        (p.designacion_mm?.toLowerCase() === clave.toLowerCase() ||
         p.designacion_metrico?.toLowerCase() === clave.toLowerCase())
    );
    if (profile) {
      // Se omite el id y se muestran el resto de propiedades
      const { id, ...resto } = profile;
      const propsText = Object.entries(resto)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
      setProfileProperties(propsText);
    } else {
      setProfileProperties("No se encontraron propiedades para la selección.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>PERFILES IMCA</h1>

      <Link to="/">Volver a la página principal</Link>

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
        <option value="">-- Selecciona un tipo --</option>
        {tiposPerfil.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      <label style={styles.label}>Medida</label>
      <select
        value={selectedMedida}
        onChange={(e) => setSelectedMedida(e.target.value)}
        style={styles.select}
      >
        <option value="">-- Selecciona una medida --</option>
        {profiles.map((profile) => {
          const medida =
            profile.designacion_mm || profile.designacion_metrico || "Sin medida";
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

      <div style={styles.result}>
        {profileProperties ||
          "Aquí se mostrarán las propiedades del perfil seleccionado."}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  h1: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  label: {
    display: "block",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #007bff",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
  result: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#e9ecef",
    borderRadius: "4px",
    minHeight: "100px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  },
};

export default ProfileViewer;
