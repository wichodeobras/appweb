import React, { useEffect, useState } from "react";

import Navbar from "../../componentes/Navbar";
import Boton from "../../componentes/Boton";
import CardNotes from "../../componentes/CardNotes";


function DisCompORR() {

    const BASE_URL = "https://django-backend-3vty.onrender.com";

    const tiposPerfil = ["IR", "HP", "CE", "CF", "HR", "IC", "IE", "IRR", "LD", "LI", "ORC", "ORR"];

    const [E, setE] = useState("200000");

    //Longitudes
    const [LongViga1, setLongViga1] = useState("3000");
    const [LongViga2, setLongViga2] = useState("3000");
    const [LongViga3, setLongViga3] = useState("3000");
    const [LongViga4, setLongViga4] = useState("3000");
    const [LongCol1, setLongCol1] = useState("3000");
    const [LongCol2, setLongCol2] = useState("3000");

    //Inercias
    const [IViga1, setIViga1] = useState(null);
    const [IViga2, setIViga2] = useState(null);
    const [IViga3, setIViga3] = useState(null);
    const [IViga4, setIViga4] = useState(null);
    const [IxCol1, setIxCol1] = useState(null);
    const [IxCol2, setIxCol2] = useState(null);
    const [IyCol1, setIyCol1] = useState(null);
    const [IyCol2, setIyCol2] = useState(null);

    const [allProfiles, setAllProfiles] = useState([]);

    const [I, setI] = useState(null);
    const [selectedTipo, setSelectedTipo] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [selectedMedida, setSelectedMedida] = useState("");
    const [profileProperties, setProfileProperties] = useState("");

    const [selectedInercia, setSelectedInercia] = useState("Ix");
    const [selectedElemento, setSelectedElemento] = useState("");



    function G(V1, V2, C1, C2, LV1, LV2, LC1, LC2) {
        let G = (C1 / LC1 + C2 / LC2) / (V1 / LV1 + V2 / LV2);
        return G
    }

    function handleCargarPerfil() {
        const perfil = profiles.find((p) => {
            const m = p.designacion_mm || p.designacion_metrico;
            return m === selectedMedida;
        });

        if (!perfil) return;

        const valorInercia = selectedInercia === "Ix" ? perfil.ix : perfil.iy;

        switch (selectedElemento) {
            case "Viga 1":
                setIViga1(valorInercia);
                break;
            case "Viga 2":
                setIViga2(valorInercia);
                break;
            case "Viga 3":
                setIViga3(valorInercia);
                break;
            case "Viga 4":
                setIViga4(valorInercia);
                break;
            case "Columna 1 X":
                setIxCol1(valorInercia);
                break;
            case "Columna 2 X":
                setIxCol2(valorInercia);
                break;
            case "Columna 1 Y":
                setIyCol1(valorInercia);
                break;
            case "Columna 2 Y":
                setIyCol2(valorInercia);
                break;
            default:
                break;
        }
    }


    // Cargo todos los perfiles de todos los tipos al iniciar
    useEffect(() => {
        Promise.all(
            tiposPerfil.map((tipo) =>
                fetch(`${BASE_URL}/api/${tipo.toLowerCase()}/`)
                    .then((r) => r.json())
                    .then((data) => data.map((p) => ({ ...p, tipo })))
            )
        )
            .then((arrays) => setAllProfiles(arrays.flat()))
            .catch((err) => console.error("Error cargando todos los perfiles:", err));
    }, []);

    // Cuando cambia el tipo, cargo sus perfiles
    useEffect(() => {
        if (!selectedTipo) {
            setProfiles([]);
            return;
        }
        fetch(`${BASE_URL}/api/${selectedTipo.toLowerCase()}/`)
            .then((r) => r.json())
            .then((data) => {
                setProfiles(data);
                setSelectedMedida("");
                setProfileProperties("");
                setI(null);

            })
            .catch((e) => console.error("Error al obtener perfiles:", e));
    }, [selectedTipo]);

    return (
        <div style={styles.body}>

            <Navbar title="RIGIDEZ ROTATORIA ANGULAR" showBackLink={true} backLink="/Disecomp" />


            <section style={styles.container}>
                <div style={styles.div}>
                    <img src="/NODOS.png" alt="IMAGEN" style={styles.image} />
                </div>
                <div style={styles.div}>
                    {/* Selección de perfil */}
                    <label style={styles.label}>Tipo de perfil</label>
                    <select
                        value={selectedTipo}
                        onChange={(e) => setSelectedTipo(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">-- Selecciona tipo --</option>
                        {tiposPerfil.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    <label style={styles.label}>Medida</label>
                    <select
                        value={selectedMedida}
                        onChange={(e) => setSelectedMedida(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">-- Selecciona medida --</option>
                        {profiles.map((p) => {
                            const m = p.designacion_mm || p.designacion_metrico;
                            return (
                                <option key={p.id} value={m}>
                                    {m}
                                </option>
                            );
                        })}
                    </select>

                    <label style={styles.label}>Inercia</label>
                    <select
                        value={selectedInercia}
                        onChange={(e) => setSelectedInercia(e.target.value)}
                        style={styles.input}
                    >
                        <option value="Ix">Ix</option>
                        <option value="Iy">Iy</option>

                    </select>

                    <label style={styles.label}>Elemento</label>
                    <select
                        value={selectedElemento}
                        onChange={(e) => setSelectedElemento(e.target.value)}
                        style={styles.input}
                    >
                        <option value="Viga 1">Viga 1</option>
                        <option value="Viga 2">Viga 2</option>
                        <option value="Viga 3">Viga 3</option>
                        <option value="Viga 4">Viga 4</option>
                        <option value="Columna 1 X">Columna 1 X-X</option>
                        <option value="Columna 2 X">Columna 2 X-X</option>
                        <option value="Columna 1 Y">Columna 1 Y-Y</option>
                        <option value="Columna 2 Y">Columna 2 Y-Y</option>

                    </select>
                    <Boton onClick={handleCargarPerfil}>Cargar perfil</Boton>
                </div>


                <div style={styles.div}>
                    <h4>Eje  X-X</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 1 Ix</label>
                        <input type="number" style={styles.inputg} value={IViga1 || ""} readOnly />
                        <label>cm4</label>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 2 Ix</label>
                        <input type="number" style={styles.inputg} value={IViga2 || ""} readOnly />
                        <label>cm4</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Columna 1 I</label>
                        <input type="number" style={styles.inputg} value={IxCol1 || ""} readOnly />
                        <label>cm4</label>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Columna 2 I</label>
                        <input type="number" style={styles.inputg} value={IxCol2 || ""} readOnly />
                        <label>cm4</label>
                    </div>
                </div>

                <div style={styles.div}>
                    <h4>Eje  Y-Y</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 3 Ix</label>
                        <input type="number" style={styles.inputg} value={IViga3 || ""} readOnly />
                        <label>cm4</label>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 4 Ix</label>
                        <input type="number" style={styles.inputg} value={IViga4 || ""} readOnly />
                        <label>cm4</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Columna 1 I</label>
                        <input type="number" style={styles.inputg} value={IyCol1 || ""} readOnly />
                        <label>cm4</label>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Columna 2 I</label>
                        <input type="number" style={styles.inputg} value={IyCol2 || ""} readOnly />
                        <label>cm4</label>
                    </div>
                </div>
                <div style={styles.div}>
                    <h4>Longitud de vigas</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 1</label>
                        <input type="number" style={styles.inputg} value={LongViga1} onChange={(e) => setLongViga1(e.target.value)} />
                        <label>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 2</label>
                        <input type="number" style={styles.inputg} value={LongViga2} onChange={(e) => setLongViga2(e.target.value)} />
                        <label>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 3</label>
                        <input type="number" style={styles.inputg} value={LongViga3} onChange={(e) => setLongViga3(e.target.value)} />
                        <label>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Viga 4</label>
                        <input type="number" style={styles.inputg} value={LongViga4} onChange={(e) => setLongViga4(e.target.value)} />
                        <label>cm</label>
                    </div>
                </div>
                <div style={styles.div}>
                    <h4>Longitud de columnas</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Columna 1</label>
                        <input type="number" style={styles.inputg} value={LongCol1} onChange={(e) => setLongCol1(e.target.value)} />
                        <label>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Columna 2</label>
                        <input type="number" style={styles.inputg} value={LongCol2} onChange={(e) => setLongCol2(e.target.value)} />
                        <label>cm</label>
                    </div>
                </div>
                <div style={styles.div}>
                    <h4>Materiales</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>E</label>
                        <input type="number" value={E} onChange={(e) => setE(e.target.value)} style={styles.inputg} />
                        <label>Mpa</label>
                    </div>
                </div>
                <div style={styles.div}>
                    <h4>Rigidez</h4>
                    <Boton >Calcular Rigidez</Boton>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Gx</label>
                        <input type="number" style={styles.inputg} readOnly />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Gy</label>
                        <input type="number" style={styles.inputg} readOnly />

                    </div>
                </div>

            </section>
        </div>
    )




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
        width: "130px",
        display: "inline-block",
        marginBottom: "4px",
        fontWeight: "bold",
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

export default DisCompORR;