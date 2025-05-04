import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar";
import Boton from "../../componentes/Boton";

function Cuantif() {
    return (
        <div style={styles.body}>
            <Navbar title="MUROS" showBackLink={true} backLink="/" />
            <section style={styles.container}>
                <div style={styles.div}>
                <img src="/muro1.png" alt="IMAGEN" style={styles.image} />
                </div>
                <div style={styles.div}>
                <h4>Dimensiones de Block</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Largo</label>
                        <input type="number" style={styles.inputg}  readOnly />
                        <label style={styles.labelA}>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Ancho</label>
                        <input type="number" style={styles.inputg}  readOnly />
                        <label style={styles.labelA}>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Alto</label>
                        <input type="number" style={styles.inputg}  readOnly />
                        <label style={styles.labelA}>cm</label>
                    </div>
                    <h4>1</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Junta</label>
                        <input type="number" style={styles.inputg}  readOnly />
                        <label style={styles.labelA}>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Aplanado</label>
                        <input type="number" style={styles.inputg}  readOnly />
                        <label style={styles.labelA}>cm</label>
                    </div>  
                </div>
                <div style={styles.div}>
                <h4>Mortero</h4>


                </div>
                

            </section>
        </div>

    );
}

const styles = {
    root: {
        "--azul-oscuro": "#03045e",
        "--azul-medio": "#0077b6",
        "--azul-claro": "#00b4d8",
        "--navbar": "#023e8a",
        "--fondo": "#e6f1fc",
        "--card-bg": "#ffffff",
        "--borde-card": "#90e0ef",
        "--texto": "#03045e",
    },
    body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#e6f1fc",
        color: "#03045e",
    },
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

    page: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    container: {
        width: "auto",
        height: "auto",
        padding: "15px",
        margin: "15px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #90e0ef",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sectionnotes: {
        width: "auto",
        height: "auto",
        padding: "15px",
        margin: "15px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #90e0ef",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    divv: {
        width: "auto",
        height: "auto",
        padding: "10px",
        margin: "2px",
        border: "5px solid darkslategrey",
        display: "flex",
        flexDirection: "column",
    },
    div: {
        width: "auto",
        height: "auto",
        padding: "10px",
        margin: "2px",

        display: "flex",
        flexDirection: "column",
    },
    divimage: {
        width: "auto",
        height: "auto",
        padding: "10px",
        margin: "2px",
        border: "5px solid darkslategrey",
        display: "flex",
        flexDirection: "column",
    },
    canvas: {
        width: "200px",
        height: "350px",
        padding: "20px",
        margin: "10px",

    },
    label: {
        padding: "5px",
        alignItems: "center",
    },
    tit1: {
        width: "50px",
        display: "inline-block",
        marginBottom: "4px",
        fontWeight: "bold",
    },
    labelA: {
        width: "100px",
        display: "inline-block",
        marginBottom: "4px",
        fontWeight: "bold",
        padding: "5px",
    },

    input: {
        width: "100px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },
    inputg: {
        width: "70px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },
    inputgg: {
        width: "120px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },
    select: {
        width: "200px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },
    image: {
        width: "100%",
        height: "300px",
        objectFit: "contain",
        marginBottom: "1rem",
    },



}

export default Cuantif;