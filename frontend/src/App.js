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

  useEffect(() => {
    axios
      .get("https://django-backend.onrender.com/api/message/")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  // Actualiza el state conforme se escriba en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPerfil((prev) => ({ ...prev, [id]: value }));
  };

  // Envía el formulario para crear un nuevo perfil
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

    axios
      .post("https://django-backend.onrender.com/api/ir/create/", payload)
      .then((response) => {
        console.log("Perfil creado:", response.data);
        alert("Perfil creado correctamente");
      })
      .catch((error) => {
        console.error("Error al crear perfil:", error);
        alert("Error al crear perfil");
      });
  };

  return (
    <div className="container">
      <h1>React + Django</h1>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div className="section" id="materiales">
            <h2>Materiales</h2>
            <div className="input-group">
              <label htmlFor="Fy">Fy:</label>
              <input type="text" id="Fy" /> kg/cm²
            </div>
            <div className="input-group">
              <label htmlFor="Fu">Fu:</label>
              <input type="text" id="Fu" /> kg/cm²
            </div>
            <div className="input-group">
              <label htmlFor="G">G:</label>
              <input type="text" id="G" /> kg/cm²
            </div>
            <div className="input-group">
              <label htmlFor="E">E:</label>
              <input type="text" id="E" /> kg/cm²
            </div>
          </div>

          <div className="section" id="perfil">
            <h2>Perfil</h2>
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
          </div>

          <div className="section" id="carga">
            <h2>Carga</h2>
            <div className="input-group">
              <label htmlFor="Pu">Pu:</label>
              <input type="text" id="Pu" /> ton
            </div>
          </div>

          <div className="section" id="condiciones">
            <h2>Condiciones</h2>
            <div className="input-group">
              <label htmlFor="Longitud">Longitud:</label>
              <input type="text" id="Longitud" /> m
            </div>
          </div>
        </div>
        <button type="submit">Agregar Perfil</button>
      </form>
    </div>
  );
}

console.log("Backend URL:", process.env.REACT_APP_API_URL);

export default App;
