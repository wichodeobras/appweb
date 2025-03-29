import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


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
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
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

function Homeacero() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Selecciona un tipo de perfil para diseñar</h1>
      <Link to="/">Volver a la página principal</Link>
      <div style={styles.grid}>
        {/* Perfil H */}
        <div style={styles.card}>
          <img
            src="https://via.placeholder.com/150x100?text=Perfil+H"
            alt="Perfil H"
            style={styles.image}
          />
          <Link
            // 🔗 LINK AQUÍ
            to="#"
            style={styles.link}
          >
            Diseñar este perfil
          </Link>
        </div>

        {/* Perfil C */}
        <div style={styles.card}>
          <img
            src="https://via.placeholder.com/150x100?text=Perfil+C"
            alt="Perfil C"
            style={styles.image}
          />
          <Link
            // 🔗 LINK AQUÍ
            to="#"
            style={styles.link}
          >
            Diseñar este perfil
          </Link>
        </div>

        {/* Perfil I */}
        <div style={styles.card}>
          <img
            src="https://via.placeholder.com/150x100?text=Perfil+I"
            alt="Perfil I"
            style={styles.image}
          />
          <Link
            // 🔗 LINK AQUÍ
            to="#"
            style={styles.link}
          >
            Diseñar este perfil
          </Link>
        </div>

        {/* Perfil L */}
        <div style={styles.card}>
          <img
            src="https://via.placeholder.com/150x100?text=Perfil+L"
            alt="Perfil L"
            style={styles.image}
          />
          <Link
            // 🔗 LINK AQUÍ
            to="#"
            style={styles.link}
          >
            Diseñar este perfil
          </Link>
        </div>

        {/* Perfil T */}
        <div style={styles.card}>
          <img
            src="https://via.placeholder.com/150x100?text=Perfil+T"
            alt="Perfil T"
            style={styles.image}
          />
          <Link
            // 🔗 LINK AQUÍ
            to="#"
            style={styles.link}
          >
            Diseñar este perfil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homeacero;
