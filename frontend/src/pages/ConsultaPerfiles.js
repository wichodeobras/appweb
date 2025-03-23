import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConsultaPerfiles.css";
import { Link } from "react-router-dom";

function ConsultaPerfiles() {
  const [message, setMessage] = useState("");
  const [perfil, setPerfil] = useState({
    designacion_mm: "",
    designacion_pulg: "",
    d: "",
    h: "",
    tw: "",
    bf: "",
    tf: "",
    peso: "",
    area: "",
    ix: "",
    zx: "",
    sx: "",
    rx: "",
    iy: "",
    zy: "",
    sy: "",
    ry: "",
    j: "",
    cw: "",
  });
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState("");

  const BASE_URL = "https://django-backend-3vty.onrender.com";

  useEffect(() => {
    axios
      .get("https://django-backend.onrender.com/api/message/")
      .then((response) => setMessage(response.data.message))
      .catch((error) =>
        console.error("Error al obtener datos del mensaje:", error)
      );
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    axios
      .get(`${BASE_URL}/ir/`)
      .then((response) => setProfiles(response.data))
      .catch((error) => console.error("Error al cargar perfiles:", error));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      designacion_mm: perfil.designacion_mm,
      designacion_pulg: perfil.designacion_pulg,
      d: parseFloat(perfil.d),
      h: parseFloat(perfil.h),
      tw: parseFloat(perfil.tw),
      bf: parseFloat(perfil.bf),
      tf: parseFloat(perfil.tf),
      peso: parseFloat(perfil.peso),
      area: parseFloat(perfil.area),
      ix: parseFloat(perfil.ix),
      zx: parseFloat(perfil.zx),
      sx: parseFloat(perfil.sx),
      rx: parseFloat(perfil.rx),
      iy: parseFloat(perfil.iy),
      zy: parseFloat(perfil.zy),
      sy: parseFloat(perfil.sy),
      ry: parseFloat(perfil.ry),
      j: parseFloat(perfil.j),
      cw: parseFloat(perfil.cw),
    };

    if (editingId) {
      axios
        .put(`${BASE_URL}/ir/${editingId}/update/`, payload)
        .then(() => {
          alert("Perfil actualizado correctamente");
          loadProfiles();
          setEditingId(null);
          resetForm();
        })
        .catch((error) => {
          console.error("Error al actualizar perfil:", error);
          alert("Error al actualizar perfil");
        });
    } else {
      axios
        .post(`${BASE_URL}/ir/create/`, payload)
        .then(() => {
          alert("Perfil creado correctamente");
          loadProfiles();
          resetForm();
        })
        .catch((error) => {
          console.error("Error al crear perfil:", error);
          alert("Error al crear perfil");
        });
    }
  };

  const selectProfile = (profile) => {
    setPerfil({ ...profile });
    setEditingId(profile.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de eliminar este perfil?")) {
      axios
        .delete(`${BASE_URL}/ir/${id}/delete/`)
        .then(() => {
          alert("Perfil eliminado correctamente");
          if (editingId === id) {
            setEditingId(null);
            resetForm();
          }
          loadProfiles();
        })
        .catch((error) => {
          console.error("Error al eliminar perfil:", error);
          alert("Error al eliminar perfil");
        });
    }
  };

  const resetForm = () => {
    setPerfil({
      designacion_mm: "",
      designacion_pulg: "",
      d: "",
      h: "",
      tw: "",
      bf: "",
      tf: "",
      peso: "",
      area: "",
      ix: "",
      zx: "",
      sx: "",
      rx: "",
      iy: "",
      zy: "",
      sy: "",
      ry: "",
      j: "",
      cw: "",
    });
    setEditingId(null);
    setSelectedProfileId("");
  };


  const camposInfo = {
    designacion_mm: { label: "Designación (mm)", unidad: "" },
    designacion_pulg: { label: "Designación (pulgadas)", unidad: "" },
    d: { label: "Altura total (d)", unidad: "mm" },
    h: { label: "Altura útil (h)", unidad: "mm" },
    tw: { label: "Espesor alma (tw)", unidad: "mm" },
    bf: { label: "Ancho patín (bf)", unidad: "mm" },
    tf: { label: "Espesor patín (tf)", unidad: "mm" },
    peso: { label: "Peso", unidad: "kg/m" },
    area: { label: "Área", unidad: "cm²" },
    ix: { label: "Ix", unidad: "cm⁴" },
    zx: { label: "Zx", unidad: "cm³" },
    sx: { label: "Sx", unidad: "cm³" },
    rx: { label: "rx", unidad: "cm" },
    iy: { label: "Iy", unidad: "cm⁴" },
    zy: { label: "Zy", unidad: "cm³" },
    sy: { label: "Sy", unidad: "cm³" },
    ry: { label: "ry", unidad: "cm" },
    j: { label: "J (constante torsión)", unidad: "cm⁴" },
    cw: { label: "Cw", unidad: "cm⁶" },
  };
  

  const handleNuevoPerfil = () => {
    resetForm();
  };

  return (
    <div className="container">

      <Link to="/">Volver a la página principal</Link>
      <h1>PERFILES IR</h1>
      <p>{message}</p>

      <button type="button" onClick={handleNuevoPerfil}>
        Nuevo Perfil
      </button>

      <div className="section" id="lista-perfiles">
        <h2>Perfiles Guardados</h2>
        {profiles.length > 0 ? (
          <>
            <div className="input-group">
              <label htmlFor="perfilSelect">Selecciona un perfil:</label>
              <select
                id="perfilSelect"
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value)}
              >
                <option value="">-- Selecciona --</option>
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.designacion_mm}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                const selected = profiles.find(
                  (p) => p.id === parseInt(selectedProfileId)
                );
                if (selected) {
                  selectProfile(selected);
                } else {
                  alert("Selecciona un perfil válido.");
                }
              }}
              disabled={!selectedProfileId}
            >
              Seleccionar
            </button>
          </>
        ) : (
          <p>No hay perfiles guardados</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="section" id="perfil">
          <h2>{editingId ? "Editar Perfil" : "Agregar Perfil"}</h2>

          {Object.entries(perfil).map(([key, value]) => (
            <div className="input-group" key={key}>
              <label htmlFor={key}>{camposInfo[key]?.label || key}</label>
              <div className="input-con-unidad">
                <input
                  type="text"
                  id={key}
                  value={value}
                  onChange={handleChange}
                />
                {camposInfo[key]?.unidad && (
                  <span className="unidad">{camposInfo[key].unidad}</span>
                )}
              </div>
            </div>
          ))}


          <button type="submit">
            {editingId ? "Actualizar Perfil" : "Agregar Perfil"}
          </button>
          {editingId && (
            <button type="button" onClick={() => handleDelete(editingId)}>
              Eliminar Perfil
            </button>
          )}
        </div>
      </form>

      
    </div>
  );
}

export default ConsultaPerfiles;
