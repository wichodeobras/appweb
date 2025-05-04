import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ConsultaPerfiles from "./pages/ConsultaPerfiles";

import Navbar from "./componentes/Navbar";

import CatalogosPres from "./pages/Catalogos";
import DisVigaRecFlex from "./pages/aceroIMCA/VIGACERO";
import Flexacero from "./pages/aceroIMCA/flexmain";
import Flexcompacero from "./pages/aceroIMCA/flexcompmain";
import UnitConverter from "./pages/TOOLS/Convunit";
import Cuantif from "./pages/COSTOS/Cuantificacion";
import Centroi from "./pages/ESTATICA/centroide";
import Granul from "./pages/GEOTECNIA/granulome";
import Cimsuperf from "./pages/CIMENTACION/Cimentsuperf";
import DisVigaEstanFlex from "./pages/aceroIMCA/VIGAIE";
import Deflexion from "./pages/aceroIMCA/VIGAORR";
import Compacero from "./pages/aceroIMCA/compresion";
import DisCompORR from "./pages/aceroIMCA/COMPORR";
import DisVigaCFlex from "./pages/aceroIMCA/VIGACF";
import DisViga2CFlex from "./pages/aceroIMCA/VIGA2CF";
import './App.css';

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  body: {
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#e6f1fc",
    color: "#03045e",
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
    <div style={styles.body}>
      <Navbar title="BIENVENIDO, SELECCIONA UN SERVICIO" showBackLink={false} backLink="/" />
      <div style={styles.container}>
        
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
              <li style={styles.listItem}><Link to="/Disecomp" style={styles.link}>Diseño a compresion</Link></li>
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
              <li style={styles.listItem}>

                <Link to="/costos/insumos" style={styles.link}>Cuantificación de materiales</Link>
              </li>
            </ul>
          </div>
          {/* Card: HERRAMIENTAS */}
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

          {/* Card: GEOTECNIA */}
          <div style={styles.card}>
            <img
              src="/GEOT.png"
              alt="GEOTECNIA"
              style={styles.icon}
            />
            <h2 style={styles.sectionTitle}>GEOTECNIA</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link to="/geotecnia/Granul" style={styles.link}>Granulometría</Link>
              </li>
            </ul>
          </div>

          {/* Card: ESTATICA */}
          <div style={styles.card}>
            <img
              src="/estatica.png"
              alt="ESTATICA"
              style={styles.icon}
            />
            <h2 style={styles.sectionTitle}>ESTATICA</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link to="/estatica/centroid" style={styles.link}>Centroides</Link>
              </li>
            </ul>
          </div>

          {/* Card:CIMENTACIONES */}
          <div style={styles.card}>
            <img
              src="/cimientos.png"
              alt="CIMENTACIONES"
              style={styles.icon}
            />
            <h2 style={styles.sectionTitle}>CIMENTACIONES</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link to="/ciment/superf" style={styles.link}>superficiales</Link>
              </li>
            </ul>
          </div>

          {/* Card:GOBIERNO */}
          <div style={styles.card}>
            <img
              src="/gobierno.png"
              alt="ADMINISTRACION PUBLICA"
              style={styles.icon}
            />
            <h2 style={styles.sectionTitle}>ADMINISTRACION PUBLICA</h2>

          </div>

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
        <Route path="/Disecomp/Nod" component={DisCompORR} />
        <Route path="/Disecomp" component={Compacero} />
        <Route path="/Catal" component={CatalogosPres} />
        <Route path="/Disflex/DisIR" component={DisVigaRecFlex} />
        <Route path="/Disflex/DisIE" component={DisVigaEstanFlex} />
        <Route path="/Disflex/DisORR" component={Deflexion} />
        <Route path="/Disflex/DisCF" component={DisVigaCFlex} />
        <Route path="/Disflex/Dis2CF" component={DisViga2CFlex} />
        <Route path="/tools/Unit" component={UnitConverter} />
        <Route path="/costos/insumos" component={Cuantif} />
        <Route path="/estatica/centroid" component={Centroi} />
        <Route path="/geotecnia/Granul" component={Granul} />
        <Route path="/ciment/superf" component={Cimsuperf} />


        {/* Agrega aquí la ruta de Topografía cuando esté lista */}
      </Switch>
    </Router>
  );
}

export default App;
