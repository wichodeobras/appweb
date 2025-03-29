import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ConsultaPerfiles from "./pages/ConsultaPerfiles";
import ColumnaCompres from "./pages/DiseñoCompres";
import CatalogosPres from "./pages/Catalogos";
import DiseñoViga from "./pages/VIGACERO";
import Homeacero from "./pages/aceroIMCA/aceromain";
import './App.css';


//import PredioPlot from "./pages/PlanPred";


function Home() {
  return (
    <div className="container">
      <h1>Bienvenido, Selecciona un servicio</h1>
      <h2>DISEÑO ESTRUCTURAL IMCA 6ta EDICION</h2>
      <h3>ACERO</h3>
      <nav>
        <ul>
          <li><Link to="/perfiles">Perfiles de acero</Link></li>
          <li><Link to="/Diseacer">Diseño de elementos</Link></li>
          <li><Link to="/DisCompres">Diseño de columna a compresión axial</Link></li>
          <li><Link to="/DisVig">Diseño de viga por flexión</Link></li>
        </ul>
      </nav>
      <h2>TOPOGRAFIA</h2>
      <h3>PLANOS</h3>
      <nav>
        <ul>
          <li><Link to="/top">Canvas para dibujo</Link></li>
        </ul>
      </nav>
      <h2>COSTOS</h2>
      <h3>Catalogos</h3>
      <nav>
        <ul>
          <li><Link to="/Catal">Catalogos</Link></li>          
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
        <Route path="/Diseacer" component={Homeacero} />
        <Route path="/DisCompres" component={ColumnaCompres} />
        <Route path="/Catal" component={CatalogosPres} />
        <Route path="/DisVig" component={DiseñoViga} />
      </Switch>
    </Router>
  );
}

export default App;
