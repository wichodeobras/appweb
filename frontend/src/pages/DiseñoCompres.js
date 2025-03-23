// src/pages/ColumnaCompres.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ColumnaCompres() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState({
    selector1: "",
    selector2: "",
    selector3: "",
    selector4: "",
  });

  const BASE_URL = "https://django-backend-3vty.onrender.com";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/ir/`)
      .then((response) => setProfiles(response.data))
      .catch((error) =>
        console.error("Error al cargar perfiles para compresión:", error)
      );
  }, []);

  return (
    <>
      <div className="container">
        <Link to="/">Volver a la página principal</Link>
        <h1>DISEÑO A COMPRESIÓN</h1>
      </div> 

      <div className="container">
        <p>Selecciona un perfil existente</p>
        {profiles.length > 0 ? (
          <div className="input-group">
            <label htmlFor="perfilSelect">Perfiles disponibles:</label>
            <select
              id="perfilSelect"
              value={selectedProfileId.selector1}
              onChange={(e) =>
                setSelectedProfileId({ ...selectedProfileId, selector1: e.target.value })
              }
            >
              <option value="">-- Selecciona --</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.designacion_mm}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Cargando perfiles...</p>
        )}
      </div>

      <div className="container">
        <p>Selecciona un perfil existente</p>
        {profiles.length > 0 ? (
          <div className="input-group">
            <label htmlFor="perfilSelect">Perfiles disponibles:</label>
            <select
              id="perfilSelect"
              value={selectedProfileId.selector2}
              onChange={(e) =>
                setSelectedProfileId({ ...selectedProfileId, selector2: e.target.value })
              }
            >
              <option value="">-- Selecciona --</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.designacion_mm}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Cargando perfiles...</p>
        )}
      </div>

      <div className="container">
        <p>Selecciona un perfil existente</p>
        {profiles.length > 0 ? (
          <div className="input-group">
            <label htmlFor="perfilSelect">Perfiles disponibles:</label>
            <select
              id="perfilSelect"
              value={selectedProfileId.selector3}
              onChange={(e) =>
                setSelectedProfileId({ ...selectedProfileId, selector3: e.target.value })
              }
            >
              <option value="">-- Selecciona --</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.designacion_mm}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Cargando perfiles...</p>
        )}
      </div>

      <div className="container">
        <p>Selecciona un perfil existente</p>
        {profiles.length > 0 ? (
          <div className="input-group">
            <label htmlFor="perfilSelect">Perfiles disponibles:</label>
            <select
              id="perfilSelect"
              value={selectedProfileId.selector4}
              onChange={(e) =>
                setSelectedProfileId({ ...selectedProfileId, selector4: e.target.value })
              }
            >
              <option value="">-- Selecciona --</option>
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.designacion_mm}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Cargando perfiles...</p>
        )}
      </div>
    </>
  );
}

export default ColumnaCompres;
