import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar";
import BotonLink from "../../componentes/BotonLink";

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
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",        // Fondo blanco para que destaque sobre el fondo general
    borderRadius: "12px",           // Bordes redondeados para una apariencia moderna
    padding: "1rem",                // Espacio interno (padding) para que el contenido no quede pegado al borde
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Sombra suave para dar sensación de elevación (profundidad)
    textAlign: "center",            // Centra el contenido horizontalmente dentro de la tarjeta
    width: "250px", // ← Ancho fijo de la tarjeta
    height: "310px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "1rem",
  },
  link: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

function Compacero() {
  return (
    <div style={styles.container}>
      <Navbar title="DISEÑO POR FLEXOCOMPRESION" showBackLink={true} backLink="/" />
      <h2 style={styles.title}>Selecciona un tipo de perfil para diseñar</h2>
      
      <div style={styles.grid}>
        {/* Perfil IR */}
        <div style={styles.card}>
          <h2>PERFIL I RECTANGULAR</h2>
          <img src="/PERFILIR.png" alt="Perfil IR" style={styles.image} />        

        </div>
        <div style={styles.card}>
          <h2>PERFIL I ESTANDAR</h2>
          <img src="/PERFILIE.png" alt="Perfil IE" style={styles.image} />        

        </div>
        <div style={styles.card}>
          <h2>PERFIL C ESTANDAR</h2>
          <img src="/PERFILCE.png" alt="Perfil CE" style={styles.image} />        

        </div>
        <div style={styles.card}>
          <h2>PERFIL C FORMADO EN FRIO</h2>
          <img src="/PERFILCF.png" alt="Perfil CF" style={styles.image} />        

        </div>
        <div style={styles.card}>
          <h2>PERFIL L LADOS IGUALES</h2>
          <img src="/PERFILLD.png" alt="Perfil LD" style={styles.image} />        

        </div>
        <div style={styles.card}>
          <h2>PERFIL Z</h2>
          <img src="/PERFILz.png" alt="Perfil Z" style={styles.image} />        

        </div>

        <div style={styles.card}>
            <h2>NODOS</h2>
            <BotonLink to="/Disecomp/Nod">Diseñar este perfil</BotonLink>

          </div>
        
      </div>
    </div>
  );
}

export default Compacero;
