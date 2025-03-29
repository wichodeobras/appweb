import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ConsultaPerfiles from "./pages/ConsultaPerfiles";

import CatalogosPres from "./pages/Catalogos";
import DiseñoViga from "./pages/aceroIMCA/VIGACERO";
import Flexacero from "./pages/aceroIMCA/flexmain";
import Flexcompacero from "./pages/aceroIMCA/flexcompmain";
import UnitConverter from "./pages/TOOLS/Convunit";
import './App.css';

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "250px", // ← Ancho fijo de la tarjeta
  },
  icon: {
    width: "80px",
    height: "80px",
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#333",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "0.5rem",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido, selecciona un servicio</h1>
      <div style={styles.grid}>

        {/* Card: Diseño Estructural */}
        <div style={styles.card}>
          <img
            src="/DISEACERO.png"
            alt="Diseño estructural"
            style={styles.icon}
          />
          <h2 style={styles.sectionTitle}>ACERO</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/perfiles" style={styles.link}>Perfiles de acero</Link></li>
            <li style={styles.listItem}><Link to="/Diseflex" style={styles.link}>Diseño por flexión</Link></li>        
            <li style={styles.listItem}><Link to="/Diseflexoc" style={styles.link}>Diseño por flexocompresion</Link></li>
          </ul>
        </div>

        {/* Card: Topografía */}
        <div style={styles.card}>
          <img
            src="/nivel-laser.png"
            alt="Topografía"
            style={styles.icon}
          />
          <h2 style={styles.sectionTitle}>Topografía</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Link to="/top" style={styles.link}>Canvas para dibujo</Link>
            </li>
          </ul>
        </div>

        {/* Card: Costos */}
        <div style={styles.card}>
          <img
            src="/Dinero.png"
            alt="Costos"
            style={styles.icon}
          />
          <h2 style={styles.sectionTitle}>Costos</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Link to="/Catal" style={styles.link}>Catálogos</Link>
            </li>
          </ul>
        </div>
        <div style={styles.card}>
          <img
            src="/TOOLS.png"
            alt="Costos"
            style={styles.icon}
          />
          <h2 style={styles.sectionTitle}>Herramientas</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Link to="/tools/Unit" style={styles.link}>Conversor de unidades</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/perfiles" component={ConsultaPerfiles} />
        <Route path="/Diseflex" component={Flexacero} />
        <Route path="/Diseflexoc" component={Flexcompacero} />
        <Route path="/Catal" component={CatalogosPres} />
        <Route path="/DisVig" component={DiseñoViga} />
        <Route path="/tools/Unit" component={UnitConverter} />
        {/* Agrega aquí la ruta de Topografía cuando esté lista */}
      </Switch>
    </Router>
  );
}

export default App;
