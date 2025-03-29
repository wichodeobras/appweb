import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { CalcCb, calcrts, calcFcr, F2Mn, LimiteLp, LimiteLr } from '../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroFlexión'
import ThreeViga from "../../graficos/ThreeViga";


const BASE_URL = "https://django-backend-3vty.onrender.com";

function DiseñoViga() {
    const [sx, setSx] = useState(null);
    const [sy, setSy] = useState(null);
    const [Ag, setAg] = useState(null);
    const [Cw, setCw] = useState(null);
    const [Ix, setIx] = useState(null);
    const [Iy, setIy] = useState(null);
    const [J, setJ] = useState(null);
    const [Zx, setZx] = useState(null);
    const [ry, setRy] = useState(null);
    const [Fy, setFy] = useState(null);
    const [E, setE] = useState(null);
    const [Mu, setMu] = useState(null);
    const [Vu, setVu] = useState(null);
    const [b_2tf, setb_2tf] = useState(null);
    const [h_tw, seth_tw] = useState(null);
    const [clasificacionPatin, setClasificacionPatin] = useState("");
    const [clasificacionAlma, setClasificacionAlma] = useState("");
    const [h, seth]=useState(null);
    const [bf, setbf]=useState(null);
    const [tf, settf]=useState(null);
    const [tw, settw]=useState(null);
    const [Lb, setLb]=useState(null);
    // Fijamos el tipo de perfil a "IRR" sin opción de modificarlo

    const [profiles, setProfiles] = useState([]); 
    const [selectedMedida, setSelectedMedida] = useState(""); 
    const [profileProperties, setProfileProperties] = useState("");

    useEffect(() => {
        fetch(`${BASE_URL}/api/irr/`)
            .then((response) => response.json())
            .then((data) => {
                setProfiles(data);
                setSelectedMedida("");
                setProfileProperties("");
            })
            .catch((error) =>
                console.error("Error al obtener los perfiles:", error)
            );
    }, []);

    const handleShowProperties = () => {
        const profile = profiles.find(
            (p) =>
                p.designacion_mm?.toLowerCase() === selectedMedida.toLowerCase() ||
                p.designacion_metrico?.toLowerCase() === selectedMedida.toLowerCase()
        );

        if (profile) {
            setSx(profile.sx);
            setSy(profile.sy);
            setAg(profile.area);
            setCw(profile.cw);
            setIx(profile.ix);
            setIy(profile.iy);
            setJ(profile.j);
            setZx(profile.zx);
            setRy(profile.ry);
            setb_2tf(profile.b_2tf);
            seth_tw(profile.h_tw);
            seth(profile.h);
            setbf(profile.bf);
            settf(profile.tf);
            settw(profile.tw);
        } else {
            setProfileProperties("No se encontraron propiedades para la selección.");
            setSx(null);
            setSy(null);
            setAg(null);
            setCw(null);
            setIx(null);
            setIy(null);
            setJ(null);
            setZx(null);
            setRy(null);
            setb_2tf(null);
            seth_tw(null);
        }
        if (E && Fy && b_2tf && h_tw) {
            setClasificacionPatin(ClasificacionPatin(Number(b_2tf), Number(E), Number(Fy)));
            setClasificacionAlma(ClasificacionAlma(Number(h_tw), Number(E), Number(Fy)));
        } else {
            setClasificacionPatin("");
            setClasificacionAlma("");
        }
        
    };

    const ClasificacionPatin = (b_2tf, E, Fy) => {
        const lambda = b_2tf;
        const lambdap = 0.38 * Math.sqrt(E / Fy);
        const lambdar = Math.sqrt(E / Fy);
    
        if (lambda < lambdap) {
            return "Compacto";
        } else if (lambda >= lambdap && lambda <= lambdar) {
            return "No compacto";
        } else if (lambda > lambdar) {
            return "Esbelto";
        }
    
        return "Clasificación desconocida"; 
    };

    const ClasificacionAlma = (h_tw, E, Fy) => {
        const lambda = h_tw;
        const lambdap = 3.76 * Math.sqrt(E / Fy);
        const lambdar = 5.7 * Math.sqrt(E / Fy);
    
        if (lambda < lambdap) {
            return "Compacto";
        } else if (lambda >= lambdap && lambda <= lambdar) {
            return "No compacto";
        } else if (lambda > lambdar) {
            return "Esbelto";
        }
    
        return "Clasificación desconocida"; 
    };
    

    const MomentoNominal = () => {
        // Implementación pendiente
    };

    return (
        <>
            <div>
                <h1 style={styles.h1}>DISEÑO POR FLEXIÓN VIGA IR</h1>
                <Link to="/Diseflex">Volver a la página principal</Link>
            </div>
            <div style={styles.rowContainer}>
                <div style={styles.sectionBox}>
                    <h2 style={styles.h2}>MATERIALES</h2>
                    <label style={styles.label}>Fy</label>
                    <input
                        type="text"
                        placeholder="Valor en Mpa"
                        value={Fy}
                        onChange={(e) => setFy(e.target.value)}
                        style={styles.input}
                    />
                    <label style={styles.label}>E</label>
                    <input
                        type="text"
                        placeholder="Valor en Mpa"
                        value={E}
                        onChange={(e) => setE(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.sectionBox}>
                    <h2 style={styles.h2}>ESFUERZOS</h2>
                    <label style={styles.label}>Mu</label>
                    <input
                        type="text"
                        placeholder="Valor en KN*m"
                        value={Mu}
                        onChange={(e) => setMu(e.target.value)}
                        style={styles.input}
                    />
                    <label style={styles.label}>Vu</label>
                    <input
                        type="text"
                        placeholder="Valor en KN"
                        value={Vu}
                        onChange={(e) => setVu(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.sectionBox}>
                    <h2 style={styles.h2}>CONDICIONES</h2>
                    <label style={styles.label}>Lb</label>
                    <input
                        type="text"
                        placeholder="Longitud en m"
                        value={Lb}
                        onChange={(e) => setLb(e.target.value)}
                        style={styles.input}
                    />
                </div>
            </div>

            <div style={styles.rowContainer}>
                <div style={styles.sectionBox}>
                    <h2 style={styles.h2}>SELECCIONAR PERFIL IR</h2>
                    {/* Solo se mantiene el select de Medida */}
                    <label style={styles.label}>Medida</label>
                    <select
                        value={selectedMedida}
                        onChange={(e) => setSelectedMedida(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">-- Selecciona una medida --</option>
                        {profiles.map((profile) => {
                            const medida =
                                profile.designacion_mm || profile.designacion_metrico || "Sin medida";
                            return (
                                <option key={profile.id} value={medida}>
                                    {medida}
                                </option>
                            );
                        })}
                    </select>

                    <button onClick={handleShowProperties} style={styles.button}>
                        Mostrar propiedades
                    </button>

                    <label style={styles.label}>Clasificación del patín</label>
                    <div style={styles.result}>{clasificacionPatin}</div>

                    <label style={styles.label}>Clasificación del alma</label>
                    <div style={styles.result}>{clasificacionAlma}</div>
                </div>
                    <div style={styles.sectionBox}>
                    <label style={styles.label}>Sx</label>
                    <input type="text" value={sx !== null ? sx : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>Sy</label>
                    <input type="text" value={sy !== null ? sy : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>Area</label>
                    <input type="text" value={Ag !== null ? Ag : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>Cw</label>
                    <input type="text" value={Cw !== null ? Cw : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>Ix</label>
                    <input type="text" value={Ix !== null ? Ix : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>Iy</label>
                    <input type="text" value={Iy !== null ? Iy : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>J</label>
                    <input type="text" value={J !== null ? J : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>Zx</label>
                    <input type="text" value={Zx !== null ? Zx : ""} style={styles.inputpropiedades} />
                    <label style={styles.label}>ry</label>
                    <input type="text" value={ry !== null ? ry : ""} style={styles.inputpropiedades} />
                </div>
                <div style={styles.sectionBox}>
                    <h2 style={styles.h2}>VISTA</h2>
                    <ThreeViga 
                        lb={Lb} 
                        h={h} 
                        bf={bf} 
                        tf={tf} 
                        tw={tw} 
                    />
                </div>

                <svg id="graph" width="900" height="400" viewBox="0 0 900 400"></svg>
            </div>
            <div style={styles.container}>
                <h2 style={styles.h2}>CALCULOS</h2>
            </div>
        </>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "2rem auto",
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
    },
    rowContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "space-between",
        maxWidth: "1000px",
        margin: "2rem auto",
    },
    fieldContainer: {
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
      },
    sectionBox: {
        flex: "1 1 250px",
        backgroundColor: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
    },
    h1: {
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
        fontSize: "2rem",
    },
    h2: {
        textAlign: "center",
        marginBottom: "1.5rem",
        fontSize: "1.4rem",
        borderBottom: "2px solid #ccc",
        paddingBottom: "0.5rem",
    },
    label: {
        display: "block",
        marginTop: "1rem",
        marginBottom: "0.25rem",
        fontWeight: "bold",
    },
    select: {
        width: "100%",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    inputpropiedades: {
        width: "25%",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        width: "100%",
        padding: "0.75rem",
        borderRadius: "4px",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
        marginTop: "1.5rem",
        transition: "background-color 0.3s ease",
    },
    result: {
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "4px",
        minHeight: "20px",
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
    },

};

export default DiseñoViga;
