import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://django-backend.onrender.com/api/message/")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <div className="container">
      <h1>React + Django</h1>
      <p>{message}</p>
      
      <div className="grid">
        <div className="section" id="materiales">
          <h2>Materiales</h2>
          <div className="input-group"><label htmlFor="Fy">Fy:</label> <input type="text" id="Fy" /> kg/cm²</div>
          <div className="input-group"><label htmlFor="Fu">Fu:</label> <input type="text" id="Fu" /> kg/cm²</div>
          <div className="input-group"><label htmlFor="G">G:</label> <input type="text" id="G" /> kg/cm²</div>
          <div className="input-group"><label htmlFor="E">E:</label> <input type="text" id="E" /> kg/cm²</div>
        </div>

        <div className="section" id="perfil">
          <h2>Perfil</h2>
          <div className="input-group"><label htmlFor="Area">Área:</label> <input type="text" id="Area" /> mm²</div>
          <div className="input-group"><label htmlFor="d">d:</label> <input type="text" id="d" /> mm</div>
          <div className="input-group"><label htmlFor="h">h:</label> <input type="text" id="h" /> mm</div>
          <div className="input-group"><label htmlFor="tw">tw:</label> <input type="text" id="tw" /> mm</div>
          <div className="input-group"><label htmlFor="bf">bf:</label> <input type="text" id="bf" /> mm</div>
          <div className="input-group"><label htmlFor="tf">tf:</label> <input type="text" id="tf" /> mm</div>
          <div className="input-group"><label htmlFor="Iy">Iy:</label> <input type="text" id="Iy" /> mm⁴</div>
          <div className="input-group"><label htmlFor="Ix">Ix:</label> <input type="text" id="Ix" /> mm⁴</div>
          <div className="input-group"><label htmlFor="rx">rx:</label> <input type="text" id="rx" /> mm</div>
          <div className="input-group"><label htmlFor="ry">ry:</label> <input type="text" id="ry" /> mm</div>
          <div className="input-group"><label htmlFor="b">b:</label> <input type="text" id="b" /> mm</div>
          <div className="input-group"><label htmlFor="Cw">Cw:</label> <input type="text" id="Cw" /> mm⁶</div>
          <div className="input-group"><label htmlFor="J">J:</label> <input type="text" id="J" /> mm⁴</div>
        </div>

        <div className="section" id="carga">
          <h2>Carga</h2>
          <div className="input-group"><label htmlFor="Pu">Pu:</label> <input type="text" id="Pu" /> ton</div>
        </div>

        <div className="section" id="condiciones">
          <h2>Condiciones</h2>
          <div className="input-group"><label htmlFor="Longitud">Longitud:</label> <input type="text" id="Longitud" /> m</div>
        </div>
      </div>
    </div>
  );
}

console.log("Backend URL:", process.env.REACT_APP_API_URL);

export default App;
