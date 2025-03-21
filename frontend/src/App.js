import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
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
  // editingId === null indica modo creación, de lo contrario, modo edición
  const [editingId, setEditingId] = useState(null);

  // URL base del backend
  const BASE_URL = "https://django-backend-3vty.onrender.com";

  useEffect(() => {
    // Carga el mensaje inicial desde el backend
    axios
      .get("https://django-backend.onrender.com/api/message/")
      .then((response) => setMessage(response.data.message))
      .catch((error) =>
        console.error("Error al obtener datos del mensaje:", error)
      );
    loadProfiles();
  }, []);

  // Función para cargar la lista de perfiles (GET /ir/)
  const loadProfiles = () => {
    axios
      .get(`${BASE_URL}/ir/`)
      .then((response) => setProfiles(response.data))
      .catch((error) => console.error("Error al cargar perfiles:", error));
  };

  // Actualiza el state conforme se escriba en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil((prev) => ({ ...prev, [id]: value }));
  };

  // Envía el formulario para crear o actualizar un perfil
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
      // Modo edición: Actualiza el perfil existente (PUT)
      axios
        .put(`${BASE_URL}/ir/${editingId}/update/`, payload)
        .then((response) => {
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
      // Modo creación: Agrega un nuevo perfil (POST)
      axios
        .post(`${BASE_URL}/ir/create/`, payload)
        .then((response) => {
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

  // Selecciona un perfil para editar, cargando sus datos en el formulario
  const selectProfile = (profile) => {
    setPerfil({
      designacion_mm: profile.designacion_mm,
      designacion_pulg: profile.designacion_pulg,
      d: profile.d,
      h: profile.h,
      tw: profile.tw,
      bf: profile.bf,
      tf: profile.tf,
      peso: profile.peso,
      area: profile.area,
      ix: profile.ix,
      zx: profile.zx,
      sx: profile.sx,
      rx: profile.rx,
      iy: profile.iy,
      zy: profile.zy,
      sy: profile.sy,
      ry: profile.ry,
      j: profile.j,
      cw: profile.cw,
    });
    setEditingId(profile.id);
  };

  // Elimina un perfil (DELETE)
  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de eliminar este perfil?")) {
      axios
        .delete(`${BASE_URL}/ir/${id}/delete/`)
        .then((response) => {
          alert("Perfil eliminado correctamente");
          // Si se eliminó el perfil que se estaba editando, se resetea el formulario
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

  // Resetea el formulario y sale del modo edición (modo creación)
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
  };

  // Botón para "Nuevo Perfil" que limpia el formulario y sale del modo edición
  const handleNuevoPerfil = () => {
    resetForm();
  };

  return (
    <div className="container">
      <h1>React + Django</h1>
      <p>{message}</p>

      {/* Botón para limpiar el formulario y agregar un nuevo perfil */}
      <button type="button" onClick={handleNuevoPerfil}>
        Nuevo Perfil
      </button>

      <form onSubmit={handleSubmit}>
        <div className="section" id="perfil">
          <h2>{editingId ? "Editar Perfil" : "Agregar Perfil"}</h2>
          <div className="input-group">
            <label htmlFor="designacion_mm">Designación MM:</label>
            <input
              type="text"
              id="designacion_mm"
              value={perfil.designacion_mm}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="designacion_pulg">Designación Pulg:</label>
            <input
              type="text"
              id="designacion_pulg"
              value={perfil.designacion_pulg}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="d">d:</label>
            <input
              type="text"
              id="d"
              value={perfil.d}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="h">h:</label>
            <input
              type="text"
              id="h"
              value={perfil.h}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="tw">tw:</label>
            <input
              type="text"
              id="tw"
              value={perfil.tw}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="bf">bf:</label>
            <input
              type="text"
              id="bf"
              value={perfil.bf}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="tf">tf:</label>
            <input
              type="text"
              id="tf"
              value={perfil.tf}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="peso">Peso:</label>
            <input
              type="text"
              id="peso"
              value={perfil.peso}
              onChange={handleChange}
            />
            kg
          </div>
          <div className="input-group">
            <label htmlFor="area">Área:</label>
            <input
              type="text"
              id="area"
              value={perfil.area}
              onChange={handleChange}
            />
            mm²
          </div>
          <div className="input-group">
            <label htmlFor="ix">Ix:</label>
            <input
              type="text"
              id="ix"
              value={perfil.ix}
              onChange={handleChange}
            />
            mm⁴
          </div>
          <div className="input-group">
            <label htmlFor="zx">Zx:</label>
            <input
              type="text"
              id="zx"
              value={perfil.zx}
              onChange={handleChange}
            />
            (mm³)
          </div>
          <div className="input-group">
            <label htmlFor="sx">Sx:</label>
            <input
              type="text"
              id="sx"
              value={perfil.sx}
              onChange={handleChange}
            />
            (mm³)
          </div>
          <div className="input-group">
            <label htmlFor="rx">rx:</label>
            <input
              type="text"
              id="rx"
              value={perfil.rx}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="iy">Iy:</label>
            <input
              type="text"
              id="iy"
              value={perfil.iy}
              onChange={handleChange}
            />
            mm⁴
          </div>
          <div className="input-group">
            <label htmlFor="zy">Zy:</label>
            <input
              type="text"
              id="zy"
              value={perfil.zy}
              onChange={handleChange}
            />
            (mm³)
          </div>
          <div className="input-group">
            <label htmlFor="sy">Sy:</label>
            <input
              type="text"
              id="sy"
              value={perfil.sy}
              onChange={handleChange}
            />
            (mm³)
          </div>
          <div className="input-group">
            <label htmlFor="ry">ry:</label>
            <input
              type="text"
              id="ry"
              value={perfil.ry}
              onChange={handleChange}
            />
            mm
          </div>
          <div className="input-group">
            <label htmlFor="j">J:</label>
            <input
              type="text"
              id="j"
              value={perfil.j}
              onChange={handleChange}
            />
            mm⁴
          </div>
          <div className="input-group">
            <label htmlFor="cw">Cw:</label>
            <input
              type="text"
              id="cw"
              value={perfil.cw}
              onChange={handleChange}
            />
            mm⁶
          </div>
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

      <div className="section" id="lista-perfiles">
        <h2>Perfiles Guardados</h2>
        {profiles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Designación MM</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id}>
                  <td>{profile.designacion_mm}</td>
                  <td>
                    <button onClick={() => selectProfile(profile)}>
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay perfiles guardados</p>
        )}
      </div>
    </div>
  );
}

console.log("Backend URL:", process.env.REACT_APP_API_URL);
export default App;
