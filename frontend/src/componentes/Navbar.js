// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const styles = {
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#023e8a",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    navbarImg: {
        height: "100px",
    },
    navbarTitle: {
        margin: 0,
        fontSize: "1.5rem",
        color: "#00b4d8",
    },
};

function Navbar({ title = "Navbar", showBackLink = false, backLink = "/" }) {
    return (
        <nav style={styles.navbar}>
            <img src="/logo.jpg" alt="Logo Nodo 0" style={styles.navbarImg} />
            <h1 style={styles.navbarTitle}>{title}</h1>
            {showBackLink && (
                <Link to={backLink} style={{ color: "#fff", textDecoration: "underline" }}>
                    Volver
                </Link>
            )}
        </nav>
    );
}

export default Navbar;
