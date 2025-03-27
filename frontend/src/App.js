import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ConsultaPerfiles from "./pages/ConsultaPerfiles";
import ColumnaCompres from "./pages/DiseñoCompres";

//import PredioPlot from "./pages/PlanPred";


function Home() {
  return (
    <div className="container">
      <h1>Bienvenido, Selecciona un servicio</h1>
      <h2>DISEÑO ESTRUCTURAL</h2>
      <h3>ACERO</h3>
      <nav>
        <ul>
          <li>
            <Link to="/perfiles">Perfiles de acero IMCA 6ta Ed</Link>
          </li>
          <li>
            <Link to="/DisCompres">Diseño de columna a compresión axial</Link>
          </li>
        </ul>
      </nav>
      <h2>TOPOGRAFIA</h2>
      <h3>PLANOS</h3>
      <nav>
        <ul>
          <li>
            <Link to="/top">Canvas para dibujo</Link>
          </li>
        </ul>
      </nav>
      <h2>COSTOS</h2>
      <h3>Catalogos</h3>
      <nav>
        <ul>
          <li>
            <Link to="/cat">Catalogos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/perfiles" component={ConsultaPerfiles} />
        <Route path="/DisCompres" component={ColumnaCompres} />
        
      </Switch>
    </Router>
  );
}

export default App;
