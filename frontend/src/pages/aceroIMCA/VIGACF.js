import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar";
import Boton from "../../componentes/Boton";

import { V_Fcr, V_Vy, V_Vn } from "../../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroEnFrio";


const BASE_URL = "https://django-backend-3vty.onrender.com";
//const BASE_URL = "http://127.0.0.1:8000";

function DisVigaCFlex() {

    // Materiales
    const [Fy, setFy] = useState("230");
    const [E, setE] = useState("200000");
    const [G, setG] = useState("77000");
    const [u, setu] = useState("0.28");
    // LRFD
    const Phi = 0.90
    const Phiv = 0.95
    const R = 0.90
    const kv = 5.34

    //Tipo de estructura
    const [Grupo, setGrupo] = useState("Grupo B");

    //Combinaciones y factores
    const [Combin, setCombin] = useState("Resistencia");
    const [FCM, setFCM] = useState("1.3");
    const [FCVmax, setFCVmax] = useState("1.5");
    const [FCVins, setFCVins] = useState("0");
    const [FCVmed, setFCVmed] = useState("0");
    const [FCVV, setFCVV] = useState("0");
    const [combinacionCritica, setCombinacionCritica] = useState("");


    //cubierta
    const [sepmont, setsepmont] = useState("0.90");
    const [angulo, setangulo] = useState("12");
    const [claro, setclaro] = useState("6.00");

    const [contraf, setcontraf] = useState("1");

    // Condiciones de Carga
    const [lamina, setlamina] = useState("5.0");
    const [CMm, setCMm] = useState("0");
    const [CVins, setCVins] = useState("20");
    const [CVmax, setCVmax] = useState("40");
    const [CVmed, setCVmed] = useState("5");
    const [Viento, setViento] = useState("50");

    const [laminam, setlaminam] = useState(null);
    const [CVinsm, setCVinsm] = useState(null);
    const [CVmaxm, setCVmaxm] = useState(null);
    const [CVmedm, setCVmedm] = useState("5");
    const [Vientom, setVientom] = useState(null);

    const [laminamx, setlaminamx] = useState(null);
    const [CMmx, setCMmx] = useState(null);
    const [CMmy, setCMmy] = useState(null);
    const [CVinsmx, setCVinsmx] = useState(null);
    const [CVmaxmx, setCVmaxmx] = useState(null);
    const [CVmedmx, setCVmedmx] = useState("5");

    const [Totalx, setTotalx] = useState(null);

    const [laminamy, setlaminamy] = useState(null);
    const [CVinsmy, setCVinsmy] = useState(null);
    const [CVmaxmy, setCVmaxmy] = useState(null);
    const [CVmedmy, setCVmedmy] = useState("5");

    const [Totaly, setTotaly] = useState(null);

    const [CargaDiseñox, setCargaDiseñox] = useState(null);
    const [CargaDiseñoy, setCargaDiseñoy] = useState(null);

    const [Mmaxx, setMmaxx] = useState(null);
    const [Mmaxy, setMmaxy] = useState(null);
    const [Vmax, setVmax] = useState(null);

    //Resistencia
    const [Mnxo, setMnxo] = useState(null);
    const [RMnx, setRMnx] = useState(null);
    const [Rmny, setRmny] = useState(null);
    const [PhiRMnx, setPhiRMnx] = useState(null);
    const [PhiRmny, setPhiRmny] = useState(null);
    const [Mninterac, setMninterac] = useState(null);
    //cortante
    const [Vcr, setVcr] = useState(null);
    const [Aw, setAw] = useState(null);
    const [Vy, setVy] = useState(null);
    const [lam, setlam] = useState(null);
    const [Vn, setVn] = useState(null);

    const [Vninter, setVninter] = useState(null);

    // Perfiles y selección
    const [profiles, setProfiles] = useState([]);
    const [selectedMedida, setSelectedMedida] = useState("");
    const [h, seth] = useState(null);
    const [FcrV, setFcrV] = useState(null);

    // Propiedades del perfil seleccionado (agrupadas en un objeto)
    const [profileProps, setProfileProps] = useState({});
    const [optimalProfiles, setOptimalProfiles] = useState([]);




    //ITERACIONES




    // ========= OBTENCIÓN DE PERFILES AL CARGAR =========
    useEffect(() => {
        fetch(`${BASE_URL}/api/cf/`)
            .then((response) => response.json())
            .then((data) => {
                setProfiles(data);
                setSelectedMedida("");
            })
            .catch((error) => console.error("Error al obtener los perfiles:", error));
    }, []);

    // ========= LIMPIEZA AUTOMÁTICA AL CAMBIAR DE PERFIL =========


    // ========= MANEJO DE SELECCIÓN DE PROPIEDADES =========
    const handleShowProperties = () => {
        const profile = profiles.find(
            (p) =>
                p.designacion_mm?.toLowerCase() === selectedMedida.toLowerCase() ||
                p.designacion_metrico?.toLowerCase() === selectedMedida.toLowerCase()
        );
        if (profile) {
            setProfileProps({
                //sx: profile.sx,
                Calibre: profile.calibre,
                peso: profile.peso_aprox,
                ho: profile.h_o,
                bo: profile.b_o,
                c: profile.c,
                t: profile.t,
                R: profile.R,
                Ar: profile.area_total,
                ae50: profile.ae_50,
                Idx50: profile.idx_50,
                Sxe50: profile.sxe_50,
                Mnxo50: profile.mnxo_50,
                ae33: profile.ae_33,
                Idx33: profile.idx_33,
                Sxe33: profile.sxe_33,
                Mnxo33: profile.mnxo_33,
                rx: profile.rx,
                iy: profile.iy,
                sy: profile.sy,
                ry: profile.ry,
                j: profile.j,
                cw: profile.cw,
                x_barra: profile.x_barra,
                x_c: profile.x_c,
                e_o: profile.e_o


            });
        } else {
            setProfileProps({});
        }
    };


    // ========= FACTORES =========
    useEffect(() => {
        if (Combin === "Resistencia") {
            if (Grupo === "Grupo A") {
                setFCM("1.5");
                setFCVins("0");
                setFCVmax("1.7");
                setFCVmed("0");
                setFCVV("0");
            } else if (Grupo === "Grupo B") {
                setFCM("1.3");
                setFCVins("0");
                setFCVmax("1.5");
                setFCVmed("0");
                setFCVV("0");
            } else {
                console.log("Error de grupo");
            }
        } else if (Combin === "Servicio") {
            setFCM("1.0");
            setFCVins("0");
            setFCVmax("0");
            setFCVmed("1.0");
            setFCVV("0");
        }
        else {
            setFCM("1.1");
            setFCVins("1.1");
            setFCVmax("0");
            setFCVmed("0");
            setFCVV("1.1");
        }
    }, [Grupo, Combin]);

    // ========= CARGAS =========
    useEffect(() => {
        setlaminam(lamina * sepmont);
        setCVinsm(CVins * sepmont);
        setCVmaxm(CVmax * sepmont);
        setCVmedm(CVmed * sepmont);
        setVientom(Viento * sepmont);
    }, [lamina, CVins, CVmax, CVmed, Viento, sepmont]);


    function gradosARadianes(grados) {
        return grados * (Math.PI / 180);
    }

    useEffect(() => {

        const pesoPerfil = Number(profileProps.peso) || 0;
        setCMm(Number(laminam) + pesoPerfil);
    }, [laminam, profileProps.peso]);


    useEffect(() => {
        const angRad = gradosARadianes(angulo);
        setlaminamy(laminam * Math.cos(angRad));
        setCMmy(CMm * Math.cos(angRad));
        setCVinsmy(CVinsm * Math.cos(angRad));
        setCVmaxmy(CVmaxm * Math.cos(angRad));
        setCVmedmy(CVmedm * Math.cos(angRad));
    }, [laminam, CVinsm, CVmaxm, CVmedm, angulo, CMm]);

    useEffect(() => {
        setTotaly(CMmy + CVinsmy + CVmaxmy + CVmedmy + Vientom);
    }, [CMmy, CVinsmy, CVmaxmy, CVmedmy, Vientom]);


    useEffect(() => {
        const angRad = gradosARadianes(angulo);
        setlaminamx(laminam * Math.sin(angRad));
        setCMmx(CMm * Math.sin(angRad));
        setCVinsmx(CVinsm * Math.sin(angRad));
        setCVmaxmx(CVmaxm * Math.sin(angRad));
        setCVmedmx(CVmedm * Math.sin(angRad));
    }, [laminam, CVinsm, CVmaxm, CVmedm, angulo, CMm]);

    useEffect(() => {
        setTotalx(CMmx + CVinsmx + CVmaxmx + CVmedmx);
    }, [CMmx, CVinsmx, CVmaxmx, CVmedmx]);

    useEffect(() => {
        const fcm = parseFloat(FCM);
        const fcvins = parseFloat(FCVins);
        const fcvmax = parseFloat(FCVmax);
        const fcvmed = parseFloat(FCVmed);
        const fcvv = parseFloat(FCVV);

        const carga =
            (CMmy) * fcm +
            CVinsmy * fcvins +
            CVmaxmy * fcvmax +
            CVmedmy * fcvmed +
            Vientom * fcvv;

        setCargaDiseñoy(carga);
    }, [CMmy, CVinsmy, CVmaxmy, CVmedmy, Vientom, FCM, FCVins, FCVmax, FCVmed, FCVV, profileProps.peso]);

    useEffect(() => {
        const fcm = parseFloat(FCM);
        const fcvins = parseFloat(FCVins);
        const fcvmax = parseFloat(FCVmax);
        const fcvmed = parseFloat(FCVmed);

        const carga =
            (CMmx) * fcm +
            CVinsmx * fcvins +
            CVmaxmx * fcvmax +
            CVmedmx * fcvmed;

        setCargaDiseñox(carga);
    }, [CMmx, CVinsmx, CVmaxmx, CVmedmx, FCM, FCVins, FCVmax, FCVV, profileProps.peso]);


    useEffect(() => {
        let coef
        if (contraf == 1) {
            coef = 1 / 32
        } else {
            coef = 1 / 90
        }
        setMmaxy(CargaDiseñoy * (claro ** 2) / 8);
        setMmaxx(CargaDiseñox * (claro ** 2) * coef);
        setVmax(CargaDiseñoy * claro / 2);
    }, [CargaDiseñoy, CargaDiseñox, claro, contraf]);



    // ========= RESISTENCIAS =========
    useEffect(() => {
        // convierto Fy a número por si todavía es string
        const fyNum = typeof Fy === "string" ? Number(Fy) : Fy;
        let Mn;

        if (fyNum === 230) {
            Mn = profileProps.Mnxo33;
        } else {
            Mn = profileProps.Mnxo50;
        }

        if (Mn != null) {
            setMnxo(Mn);
        } else {
            setMnxo(null);
        }
    }, [Fy, profileProps]);


    useEffect(() => {
        setRMnx(R * Mnxo)
        setRmny(R * Number(profileProps.sy * 1000) * Fy / 9850)
    }, [Mnxo]);

    useEffect(() => {
        setPhiRMnx(Phi * RMnx)
        setPhiRmny(Phi * Rmny)
    }, [RMnx, Rmny]);

    useEffect(() => {
        setMninterac((Mmaxx / PhiRmny) + (Mmaxy / PhiRMnx))
    }, [Mmaxx, Mmaxy, PhiRMnx, PhiRmny]);

    // ========= CORTANTE =========
    useEffect(() => {
        seth(profileProps.ho - 2 * profileProps.t - 2 * profileProps.R)
    }, [profileProps]);

    useEffect(() => {
        setAw(h * Number(profileProps.t))
    }, [h, profileProps]);

    useEffect(() => {
        setFcrV(V_Fcr(E, kv, u, h, Number(profileProps.t)))
    }, [E, kv, u, h, profileProps]);

    useEffect(() => {
        setVcr(h * profileProps.t * FcrV)
    }, [h, profileProps, FcrV]);

    useEffect(() => {
        setVy(V_Vy(Aw, Fy))
    }, [Aw, Fy]);

    useEffect(() => {
        setlam(Math.sqrt(Vy / Vcr))
    }, [Vy, Vcr]);

    useEffect(() => {
        setVn(V_Vn(lam, Vcr, Vy))
    }, [lam, Vcr, Vy]);

    // ========= CORTANTE/MOMENTO =========
    useEffect(() => {
        setVninter(Math.sqrt(((Mmaxy / PhiRMnx) ** 2) + ((Vmax / (Vn * Phiv)) ** 2)))
    }, [Mmaxy, PhiRMnx, Vmax, Vn, Phiv]);

    // ========= ITERACIONES =========
    function buscarCombinacionCritica() {
        const combinaciones = ["Resistencia", "Servicio", "Viento"];
        const resultados = [];

        combinaciones.forEach((comb) => {
            let fcm, fcvins, fcvmax, fcvmed, fcvv;

            if (comb === "Resistencia") {
                if (Grupo === "Grupo A") {
                    fcm = 1.5; fcvins = 0; fcvmax = 1.7; fcvmed = 0; fcvv = 0;
                } else {
                    fcm = 1.3; fcvins = 0; fcvmax = 1.5; fcvmed = 0; fcvv = 0;
                }
            } else if (comb === "Servicio") {
                fcm = 1.0; fcvins = 0; fcvmax = 0; fcvmed = 1.0; fcvv = 0;
            } else if (comb === "Viento") {
                fcm = 1.1; fcvins = 1.1; fcvmax = 0; fcvmed = 0; fcvv = 1.1;
            }

            const cargaY =
                Number(CMmy) * fcm +
                Number(CVinsmy) * fcvins +
                Number(CVmaxmy) * fcvmax +
                Number(CVmedmy) * fcvmed +
                Number(Vientom) * fcvv;

            const cargaX =
                Number(CMmx) * fcm +
                Number(CVinsmx) * fcvins +
                Number(CVmaxmx) * fcvmax +
                Number(CVmedmx) * fcvmed;

            resultados.push({
                combinacion: comb,
                cargaX,
                cargaY,
            });
        });

        const critico = resultados.reduce((max, actual) => {
            const sumaActual = actual.cargaX + actual.cargaY;
            const sumaMax = max.cargaX + max.cargaY;
            return sumaActual > sumaMax ? actual : max;
        });

        //setCombin(critico.combinacion);
        //setCargaDiseñox(critico.cargaX);
        //setCargaDiseñoy(critico.cargaY);
        setCombinacionCritica(critico.combinacion);
    }

    function buscarPerfilesOptimos() {
        // ---------- FACTORES DE CARGA ----------
        const fcm = Number(FCM);
        const fcvins = Number(FCVins);
        const fcvmax = Number(FCVmax);
        const fcvmed = Number(FCVmed);
        const fcvv = Number(FCVV);

        // ---------- CONSTANTES DE GEOMETRÍA Y CARGA ----------
        const angRad = gradosARadianes(angulo);
        const coef = contraf === 1 ? 1 / 32 : 1 / 90;
        const fyNum = Number(Fy);                         // << conversión ÚNICA
        const L = Number(claro);                      // longitud de vano en m

        // ---------- RECORRER PERFILES ----------
        const candidatos = profiles.map(p => {
            // a) Propiedades básicas
            const peso = Number(p.peso_aprox);
            const sy = Number(p.sy);                     // cm³  (puede venir vacío)
            const mn33 = Number(p.mnxo_33);                // kg·m
            const mn50 = Number(p.mnxo_50);                // kg·m

            if (!peso || !mn33 || !mn50 || !sy) return null; // descarta datos incompletos

            // b) Cargas de diseño por perfil
            const CMm_p = laminam + peso;                   // kg/m
            const CMmx_p = CMm_p * Math.sin(angRad);
            const CMmy_p = CMm_p * Math.cos(angRad);

            const CVinsmx_p = CVinsm * Math.sin(angRad);
            const CVmaxmx_p = CVmaxm * Math.sin(angRad);
            const CVmedmx_p = CVmedm * Math.sin(angRad);

            const CVinsmy_p = CVinsm * Math.cos(angRad);
            const CVmaxmy_p = CVmaxm * Math.cos(angRad);
            const CVmedmy_p = CVmedm * Math.cos(angRad);

            const qx = CMmx_p * fcm + CVinsmx_p * fcvins + CVmaxmx_p * fcvmax + CVmedmx_p * fcvmed;
            const qy = CMmy_p * fcm + CVinsmy_p * fcvins + CVmaxmy_p * fcvmax + CVmedmy_p * fcvmed + Vientom * fcvv;

            // c) Esfuerzos solicitantes
            const Mx_max = qx * L * L * coef;      // kg·m
            const My_max = qy * L * L / 8;         // kg·m
            const V_max = qy * L / 2;           // kg

            // d) Resistencia a momento
            const Mnxo = fyNum === 230 ? mn33 : mn50;
            const RMnx = R * Mnxo;
            const PhiRMnx = Phi * RMnx;

            const Rmny = R * (sy * 1000) * fyNum / 9850;   // kg·m
            const PhiRmny = Phi * Rmny;

            if (!PhiRMnx || !PhiRmny) return null;         // evita división por 0

            const I_MM = My_max / PhiRMnx + Mx_max / PhiRmny;  // interacción M‑M

            // e) Resistencia a corte
            const h_p = p.h_o - 2 * p.t - 2 * p.R;
            const Aw_p = h_p * p.t;
            const FcrV_p = V_Fcr(E, kv, u, h_p, p.t);
            const Vcr_p = h_p * p.t * FcrV_p;
            const Vy_p = V_Vy(Aw_p, fyNum);
            const λv = Math.sqrt(Vy_p / Vcr_p);
            const Vn_p = V_Vn(λv, Vcr_p, Vy_p);
            const φVn = Phiv * Vn_p;

            if (!φVn) return null;

            const I_VM = Math.sqrt((My_max / PhiRMnx) ** 2 + (V_max / (φVn)) ** 2); // M‑V

            return {
                id: p.id,
                nombre: p.designacion_metrico || p.designacion_mm,
                peso,
                I_MM,
                I_VM,
                I_V: V_max / φVn,
            };
        })
            .filter(Boolean);  // quita null

        // ---------- FILTRO & ORDEN ----------
        const válidos = candidatos
            .filter(c => c.I_MM < 1 && c.I_VM < 1 && c.I_V < 1)
            .sort((a, b) => a.peso - b.peso)
            .slice(0, 3);

        setOptimalProfiles(válidos);
    }


    function redondearNumeros(obj, decimales = 2) {
        const nuevoObj = {};
        for (const clave in obj) {
            if (typeof obj[clave] === "number") {
                nuevoObj[clave] = parseFloat(obj[clave].toFixed(decimales));
            } else {
                nuevoObj[clave] = obj[clave];
            }
        }
        return nuevoObj;
    }

    async function generarReporte() {
        const datosOriginales = {
            perfil: selectedMedida,
            Fy,
            E,
            G,
            u,
            Phi,
            Phiv,
            R,
            kv,
            Grupo,
            Combin,
            FCM,
            FCVmax,
            FCVins,
            FCVmed,
            FCVV,
            sepmont,
            angulo,
            claro,
            contraf,
            lamina,
            CMm,
            CVins,
            CVmax,
            CVmed,
            Viento,
            CargaDiseñox,
            CargaDiseñoy,
            Mmaxx,
            Mmaxy,
            Vmax,
            Mnxo,
            RMnx,
            Rmny,
            PhiRMnx,
            PhiRmny,
            Mninterac,
            Vcr,
            Vy,
            lam,
            Vn,
            Vninter,
            ...profileProps
        };

        const datos = redondearNumeros(datosOriginales, 2);

        const response = await fetch(`${BASE_URL}/api/reporte-cf/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte_cf.docx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            alert("Error generando el reporte");
        }
    }



    return (
        <div style={styles.body}>
            <Navbar title="Diseño por Flexión CF" showBackLink={true} backLink="/Diseflex" />

            <section style={styles.sectionnotes}>
            <p><i>Esta calculadora esta creada para el diseño de largueros ante esfuerzos de flexión y cortante.
                Las combinaciones, factores de carga y la lista de perfiles fueron obtenidos del manual IMCA 6ta edición.
                Las formulas para revisión de momento y fuerza cortante se basan en el manual AISI s100-16.
                El valor de la carga de viento debe ser obtenido de un analisis.
                Además se consideró lo siguiente.
                <ul>
                    <li><i>El larguero se idealiza como una viga simplemente apoyada con momentos positivos unicamente</i></li>
                    <li><i>La lámina proporcioná soporte lateral, de acuerdo con AISI-s908-17, con un factor R = 0.90</i></li>
                    <li><i>El módulo de sección efectivo de cada perfil es tomado del manual IMCA</i></li>
                </ul>

                Por lo anterior, no se considera la revisión de pandeo global torsionante, pandeo local ni distorisonal. Si el larguero
                a revisar es continuo o en voladizo, los momentos negativos pueden llegar a ser importantes y se deberá hacer la revisión ante
                este tipo de solicitaciones.
                
                </i></p>

            </section>

            {/* Sección: Materiales y Condiciones de carga */}

            <section style={styles.container}>
                <div style={styles.div}>
                    <h4>Materiales</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fy</label>

                        <select id="Fy" value={Fy} onChange={(e) => setFy(Number(e.target.value))} style={styles.inputg}>
                            <option value="230">230Mpa (33ksi)</option>
                            <option value="345">345Mpa (50ksi)</option>
                        </select>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>E</label>
                        <input type="number" placeholder="Ingresa E" value={E} onChange={(e) => setE(e.target.value)} style={styles.inputg} />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>G</label>
                        <input type="number" placeholder="Ingresa G" value={G} onChange={(e) => setG(e.target.value)} style={styles.inputg} />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>μ</label>
                        <input type="number" value={u} onChange={(e) => setu(e.target.value)} style={styles.inputg} />

                    </div>
                    <h4>LRFD</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Φ </label>
                        <input type="number" value={Phi} readOnly style={styles.inputg} />
                    </div><div style={styles.label}>
                        <label style={styles.tit1}>Φv </label>
                        <input type="number" value={Phiv} readOnly style={styles.inputg} />
                    </div>
                    <h4>Tipo de estructura</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Tipo</label>
                        <select value={Grupo} onChange={(e) => setGrupo(e.target.value)} style={styles.input} >
                            <option value="Grupo A">Grupo A</option>
                            <option value="Grupo B">Grupo B</option>
                        </select>


                    </div>
                    <h4>Factores de carga</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Combinacion</label>
                        <select value={Combin} onChange={(e) => setCombin(e.target.value)} style={styles.inputgg}>
                            <option value="Resistencia">Resistencia</option>
                            <option value="Viento">Viento</option>
                            <option value="Servicio">Servicio</option>
                        </select>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.labelA}>FCM</label>
                        <input type="number" value={FCM} readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>FCVmax</label>
                        <input type="number" value={FCVmax} readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>FCVinst</label>
                        <input type="number" value={FCVins} readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>FCVmed</label>
                        <input type="number" value={FCVmed} readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>FCVV</label>
                        <input type="number" value={FCVV} readOnly style={styles.inputg} />

                    </div>
                </div>

                <div style={styles.div}>
                    <h4>Cubierta</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Separación de monten</label>
                        <input type="number" value={sepmont} onChange={(e) => setsepmont(e.target.value)} style={styles.inputg} />
                        <label>m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Angulo de cubierta</label>
                        <input type="number" value={angulo} onChange={(e) => setangulo(e.target.value)} style={styles.inputg} />
                        <label>grados</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Claro</label>
                        <input type="number" value={claro} onChange={(e) => setclaro(e.target.value)} style={styles.inputg} />
                        <label>m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Contraflambeos</label>
                        <select id="Fy" value={contraf} onChange={(e) => setcontraf(Number(e.target.value))} style={styles.inputg} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <h4>Cargas</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Peso de lámina m2</label>
                        <input type="number" value={lamina} onChange={(e) => setlamina(e.target.value)} style={styles.inputg} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva instantanea</label>
                        <input type="number" value={CVins} onChange={(e) => setCVins(e.target.value)} style={styles.inputg} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva máxima</label>
                        <input type="number" value={CVmax} onChange={(e) => setCVmax(e.target.value)} style={styles.inputg} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva media</label>
                        <input type="number" value={CVmed} onChange={(e) => setCVmed(e.target.value)} style={styles.inputg} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viento</label>
                        <input type="number" value={Viento} onChange={(e) => setViento(e.target.value)} style={styles.inputg} />
                        <label>kg / m2</label>
                    </div>
                    <h4>Carga lineal</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Peso de lámina</label>
                        <input type="number" value={laminam} onChange={(e) => setlaminam(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga muerta</label>
                        <input type="number" value={CMm} onChange={(e) => setCMm(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva instantanea</label>
                        <input type="number" value={CVinsm} onChange={(e) => setCVinsm(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva máxima</label>
                        <input type="number" value={CVmaxm} onChange={(e) => setCVmaxm(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva media</label>
                        <input type="number" value={CVmedm} onChange={(e) => setCVmedm(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viento</label>
                        <input type="number" value={Vientom} onChange={(e) => setVientom(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>

                </div>

                <div style={styles.div}>
                    <h4>Carga lineal en y</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga muerta</label>
                        <input type="number" value={CMmy} onChange={(e) => setCMmy(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva instantanea</label>
                        <input type="number" value={CVinsmy} onChange={(e) => setCVinsmy(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva máxima</label>
                        <input type="number" value={CVmaxmy} onChange={(e) => setCVmaxmy(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva media</label>
                        <input type="number" value={CVmedmy} onChange={(e) => setCVmedmy(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viento</label>
                        <input type="number" value={Vientom} onChange={(e) => setVientom(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Total</label>
                        <input type="number" value={Totaly} onChange={(e) => setTotaly(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>

                    <h4>Carga lineal en x</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga muerta</label>
                        <input type="number" value={CMmx} onChange={(e) => setCMmx(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva instantanea</label>
                        <input type="number" value={CVinsmx} onChange={(e) => setCVinsmx(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva máxima</label>
                        <input type="number" value={CVmaxmx} onChange={(e) => setCVmaxmx(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Viva media</label>
                        <input type="number" value={CVmedmx} onChange={(e) => setCVmedmx(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga Total</label>
                        <input type="number" value={Totalx} onChange={(e) => setTotalx(e.target.value)} style={styles.inputg} readOnly/>
                        <label>kg / m</label>
                    </div>
                    <h4>Combinaciones</h4>

                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga de diseño y</label>
                        <input type="number" value={CargaDiseñoy} onChange={(e) => setCargaDiseñoy(e.target.value)} style={styles.input} readOnly />
                        <label>kg/m</label>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Carga de diseño x</label>
                        <input type="number" value={CargaDiseñox} onChange={(e) => setCargaDiseñox(e.target.value)} style={styles.input} readOnly />
                        <label>kg/m</label>
                    </div>
                    <Boton onClick={buscarCombinacionCritica}>Buscar combinación más crítica</Boton>


                    <label>Combinación crítica: {combinacionCritica}</label>

                </div>

                <div style={styles.div}>

                    <h4>Simplemente apoyada</h4>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Mxmax</label>
                        <input type="number" value={Mmaxy} onChange={(e) => setMmaxy(e.target.value)} style={styles.input} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Mymax</label>
                        <input type="number" value={Mmaxx} onChange={(e) => setMmaxx(e.target.value)} style={styles.input} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>Vmax</label>
                        <input type="number" value={Vmax} onChange={(e) => setVmax(e.target.value)} style={styles.input} readOnly />
                        <label>kg</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.labelA}>R</label>
                        <input type="number" value={R} style={styles.input} readOnly />

                    </div>


                </div>


            </section>

            {/* Sección: Selección CF */}
            <h2>SELECCIONAR CF</h2>
            <section style={styles.container}>
                <div style={styles.canvas}>
                    <h4>SELEECCIONAR PEFIL</h4>
                    <select value={selectedMedida} onChange={(e) => setSelectedMedida(e.target.value)} style={styles.select}>
                        <option value="">-- Selecciona una medida --</option>
                        {profiles.map((profile) => {
                            const medida =
                                profile.designacion_mm ||
                                profile.designacion_metrico ||
                                "Sin medida";
                            return (
                                <option key={profile.id} value={medida}>
                                    {medida}
                                </option>
                            );
                        })}
                    </select>
                    
                    <Boton onClick={handleShowProperties}>Cargar propiedades</Boton>
                    <div >
                        <label>Previsualizacion</label>
                        <img src="/PROPCF.png" alt="propiedades de IR" style={styles.image} />

                    </div>
                </div>

                <div style={styles.div}>
                    <h3>Propiedades</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>ho</label>
                        <input type="number" name="ho" style={styles.input} value={profileProps.ho || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>bo</label>
                        <input type="number" name="bo" style={styles.input} value={profileProps.bo || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>c</label>
                        <input type="number" name="c" style={styles.input} value={profileProps.c * 10 || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>t</label>
                        <input type="number" name="t" style={styles.input} value={profileProps.t || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>R</label>
                        <input type="number" name="R" style={styles.input} value={profileProps.R || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Area</label>
                        <input type="number" name="area" style={styles.input} value={profileProps.Ar || ""} readOnly />
                        <label>cm²</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>peso</label>
                        <input type="number" name="peso" style={styles.input} value={profileProps.peso || ""} readOnly />
                        <label>kg/m</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>x</label>
                        <input type="number" name="b2tf" style={styles.input} value={profileProps.x_barra || ""} readOnly />
                        <label>cm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>xc</label>
                        <input type="number" name="htw" style={styles.input} value={profileProps.x_c || ""} readOnly />
                        <label>cm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>eo</label>
                        <input type="number" name="htw" style={styles.input} value={profileProps.e_o || ""} readOnly />
                        <label>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>h</label>
                        <input type="number" style={styles.input} value={h} readOnly />
                        <label>cm</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Aw</label>
                        <input type="number" style={styles.input} value={Aw} readOnly />
                        <label>cm</label>
                    </div>
                </div>


                <div style={styles.div}>
                    <h3>X-X</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>rx</label>
                        <input type="number" name="rx" style={styles.input} value={profileProps.rx || ""} readOnly />
                        <label>cm</label>
                    </div>

                    <h3>Fy = 50 ksi</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ae</label>
                        <input type="number" name="Ae" style={styles.input} value={profileProps.ae50 || ""} readOnly />
                        <label>cm²</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ix</label>
                        <input type="number" name="Ix" style={styles.input} value={profileProps.Idx50 || ""} readOnly />
                        <label>cm⁴</label>
                    </div>


                    <div style={styles.label}>
                        <label style={styles.tit1}>Sx</label>
                        <input type="number" name="Sx" style={styles.input} value={profileProps.Sxe50 || ""} readOnly />
                        <label>cm³</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Mnxo</label>
                        <input type="number" name="Mnxo" style={styles.input} value={profileProps.Mnxo50 || ""} readOnly />
                        <label>kg * m</label>
                    </div>

                    <h3>Fy = 33 ksi</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ae</label>
                        <input type="number" name="Ae" style={styles.input} value={profileProps.ae33 || ""} readOnly />
                        <label>cm²</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ix</label>
                        <input type="number" name="Ix" style={styles.input} value={profileProps.Idx33 || ""} readOnly />
                        <label>cm⁴</label>
                    </div>


                    <div style={styles.label}>
                        <label style={styles.tit1}>Sx</label>
                        <input type="number" name="Sx" style={styles.input} value={profileProps.Sxe33 || ""} readOnly />
                        <label>cm³</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Mnxo</label>
                        <input type="number" name="Mnxo" style={styles.input} value={profileProps.Mnxo33 || ""} readOnly />
                        <label>kg * m</label>
                    </div>
                </div>


                <div style={styles.div}>
                    <div style={styles.label}>
                        <label style={styles.tit1}>J</label>
                        <input type="number" name="J" style={styles.input} value={profileProps.j || ""} readOnly />
                        <label>cm⁴</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Cw</label>
                        <input type="number" name="Cw" style={styles.input} value={profileProps.cw || ""} readOnly />
                        <label>cm⁶</label>
                    </div>

                    <h3>Y-Y</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Iy</label>
                        <input type="number" name="Iy" style={styles.input} value={profileProps.iy || ""} readOnly />
                        <label>cm⁴</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Sy</label>
                        <input type="number" name="Sy" style={styles.input} value={profileProps.sy || ""} readOnly />
                        <label>cm³</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>ry</label>
                        <input type="number" name="ry" style={styles.input} value={profileProps.ry || ""} readOnly />
                        <label>cm</label>

                    </div>
                    <h4>Cortante</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>kv</label>
                        <input type="number" style={styles.input} value={kv} readOnly />
                    </div>

                </div>


            </section>

            {/* Cálculo */}
            <section style={styles.container}>
                <div style={styles.div}>
                    <h4>Momento</h4>
                    <div style={styles.label}>

                        <label style={styles.tit1}>Mnxo</label>
                        <input type="number" value={Mnxo !== null && !isNaN(Mnxo) ? Mnxo.toFixed(2) : ""} style={styles.inputg} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>RMnx</label>
                        <input type="number" value={RMnx} onChange={(e) => setRMnx(e.target.value)} style={styles.inputg} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>RMny</label>
                        <input type="number" value={Rmny} onChange={(e) => setRmny(e.target.value)} style={styles.inputg} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>PhiMnx</label>
                        <input type="number" value={PhiRMnx} onChange={(e) => setPhiRMnx(e.target.value)} style={styles.inputg} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>PhiMny</label>
                        <input type="number" value={PhiRmny} onChange={(e) => setPhiRmny(e.target.value)} style={styles.inputg} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Interacción</label>
                        <input type="number" value={Mninterac} onChange={(e) => setMninterac(e.target.value)} style={styles.inputg} readOnly />
                        <label>{Vninter < 1 ? "<" : Vninter > 1 ? ">" : "="} 1</label>
                    </div>
                    {Vninter < 1 && (
                            <label style={{ color: "green", fontWeight: "bold" }}>
                                Perfil correcto
                            </label>
                        )}
                        {Vninter > 1 && (
                            <label style={{ color: "red", fontWeight: "bold" }}>
                                Perfil incorrecto
                            </label>
                        )}

                </div>
                <div style={styles.div}>
                    <h4>Cortante</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fcr</label>
                        <input type="number" style={styles.inputg} value={FcrV} readOnly />
                        <label>m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Vcr</label>
                        <input type="number" value={Vcr} style={styles.inputg} readOnly />
                        <label>kg</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Vy</label>
                        <input type="number" value={Vy} style={styles.inputg} readOnly />
                        <label>kg</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>λv</label>
                        <input type="number" value={lam} style={styles.inputg} readOnly />
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Vn</label>
                        <input type="number" value={Vn} style={styles.inputg} readOnly />
                        <label>kg</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>φVn</label>
                        <input type="number" value={Phiv * Vn} style={styles.inputg} readOnly />
                        <label>kg</label>
                    </div>


                </div>
                <div style={styles.div}>
                    <h4>Interaccion Cortante/Momento</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Interaccion</label>
                        <input type="number" value={Vninter} style={styles.inputg} readOnly />
                        <label>{Vninter < 1 ? "<" : Vninter > 1 ? ">" : "="} 1</label>
                    </div>
                    {Vninter < 1 && (
                            <label style={{ color: "green", fontWeight: "bold" }}>
                                Perfil correcto
                            </label>
                        )}
                        {Vninter > 1 && (
                            <label style={{ color: "red", fontWeight: "bold" }}>
                                Perfil incorrecto
                            </label>
                        )}

                </div>
                
            </section>
            <section style={styles.sectionnotes}>
            <p><i>La revisión ante pandeo global torsional, pandeo local y distorisonal estarán disponibles en una versión posterior
                
                
                </i></p>

            </section>

            {/* Iteraciones */}
            <section style={styles.container}>
                <div style={styles.div}>
                    <h3>ITERACIONES</h3>
                    
                    <Boton onClick={buscarPerfilesOptimos}>Buscar 3 perfiles más óptimos</Boton>
                    

                    <ul>
                        {optimalProfiles.map(p => (
                            <li key={p.id}>
                                {p.nombre} — {p.peso.toFixed(2)} kg/m
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={styles.div}>
                    
                    <Boton onClick={generarReporte}>Generar reporte</Boton>
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
export default DisVigaCFlex;
