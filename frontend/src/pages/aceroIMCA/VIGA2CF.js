import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalcCb, } from "../../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroFlexión";
import { Flex_Fcre, Flex_Fn, Flex_Mne, Flex_ro, Flex_sigmaey, Flex_sigmat } from "../../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroEnFrio";


const BASE_URL = "https://django-backend-3vty.onrender.com";

function DisViga2CFlex() {

    // Materiales
    const [Fy, setFy] = useState("230");
    const [E, setE] = useState("200000");
    const [G, setG] = useState("77000");
    // LRFD
    const Phi = 0.90
    const R = 0.90


    //Condiciones de frontera
    const [angulo, setangulo]=useState("null")

    // Condiciones de Carga
    const [Lamina, setLamina] = useState("5");
    const [Cargaviva, setcargaviva] = useState("0");
    const [Cargavivainst, setCargavivainst]=useState("0")
    const [Cargaviento, setCargaviento] = useState("50")
    const [Peso_metro, setPeso_metro] = useState(null);
    const [Viva_metro, setViva_metro] = useState(null);
    const [Viento_metro, setViento_metro] = useState(null);
    const [sep_monten, setsep_monten] = useState("0.90");
    const [Peso_total, setPeso_total] = useState(null);
    const [claro, setclaro] = useState("6.00")
    const [Cargatotal, setcargatotal] = useState(null);
    const [Mmax, setMmax] = useState(null);
    const [Ma, setMa] = useState("5972");
    const [Mb, setMb] = useState("7963");
    const [Mc, setMc] = useState("5972");
    const [Cb, setCb] = useState(null);

    //Factores de Carga
    const [CoefCM, setcoefCM] = useState("1.1");
    const [CoefCV, setcoefCV] = useState("1.1");
    const [CoefCA, setcoefCA] = useState("1.1");

    //Resistencia
    const [xo, setxo] = useState(null);
    const [ro, setro] = useState(null);
    const [sigey, setsigey] = useState(null);
    const [sigt, setsigt] = useState(null);
    const [Fcre, setFcre] = useState(null);
    const [Fn, setFn] = useState(null);
    const [My, setMy] = useState(null);
    const [Mne, setMne] = useState(null);


    // Perfiles y selección
    const [profiles, setProfiles] = useState([]);
    const [selectedMedida, setSelectedMedida] = useState("");

    // Propiedades del perfil seleccionado (agrupadas en un objeto)
    const [profileProps, setProfileProps] = useState({});

    // Condiciones de frontera
    const [ky, setky] = useState("1");
    const [ly, setly] = useState("3000");
    const [kt, setkt] = useState("1");
    const [lt, setlt] = useState("3000");

    //const [rango, setRango] = useState("")


    //Cálculos



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



    // ========= Cb =========
    useEffect(() => {
        setCb(CalcCb(Number(Mmax), Number(Ma), Number(Mb), Number(Mc)))
    }, [Mmax, Ma, Mb, Mc]);

    //Cargas
    useEffect(() => {
        setPeso_metro(Lamina * sep_monten)
    }, [Lamina, sep_monten]);

    useEffect(() => {
        setViva_metro(Cargaviva * sep_monten)
    }, [Cargaviva, sep_monten]);

    useEffect(() => {
        setViento_metro(Cargaviento * sep_monten)
    }, [Cargaviento, sep_monten]);

    useEffect(() => {
        setPeso_total(Peso_metro + Number(profileProps.peso))
    }, [Peso_metro, profileProps.peso]);

    useEffect(() => {
        setcargatotal((CoefCM * Peso_total) + (CoefCV * Viva_metro) + (CoefCA * Viento_metro))
    }, [CoefCM, CoefCV, CoefCA, Peso_total, Viva_metro, Viento_metro]);

    //Condiciones de carga
    useEffect(() => {
        setMmax(Cargatotal * (claro ** 2) / 8)
    }, [Cargatotal, claro]);

    useEffect(() => {
        setMb(Mmax)
    }, [Mmax])

    useEffect(() => {
        setMa(3 * Cargatotal * (claro ** 2) / 32)
    }, [Cargatotal, claro]);

    useEffect(() => {
        setMc(3 * Cargatotal * (claro ** 2) / 32)
    }, [Cargatotal, claro]);

    // ========= RESISTENCIA =========
    useEffect(() => {
        setxo(Number(profileProps.x_barra * 10) + Number(profileProps.e_o * 10))
    }, [profileProps.x_barra, profileProps.e_o]);

    useEffect(() => {
        setro(Flex_ro(Number(profileProps.rx * 10), Number(profileProps.ry * 10), xo))
    }, [profileProps.rx, profileProps.ry, xo]);

    useEffect(() => {
        setsigey(Flex_sigmaey(E, ky, ly, Number(profileProps.ry * 10)))
    }, [E, ky, ly, profileProps.ry]);

    useEffect(() => {
        setsigt(Flex_sigmat(Number(profileProps.Ar * 100), ro, G, Number(profileProps.j * 10000), E, Number(profileProps.cw * 1000000), kt, lt))
    }, [profileProps.Ar, ro, G, profileProps.j, E, profileProps.cw, kt, lt]);

    useEffect(() => {
        setFcre(Flex_Fcre(Cb, ro, Number(profileProps.Ar * 100), Number(profileProps.Sxe50 * 1000), sigey, sigt))
    }, [Cb, ro, profileProps.Ar, profileProps.Sxe50, sigey, sigt]);

    useEffect(() => {
        setFn(Flex_Fn(Fcre, Fy))
    }, [Fcre, Fy]);

    useEffect(() => {
        setMy(Number(profileProps.Sxe50 * 1000) * Fy)
    }, [profileProps.Sxe50, Fy]);

    useEffect(() => {
        setMne(Flex_Mne(Number(profileProps.Sxe50 * 1000), Fn, Fy, Number(profileProps.Sxe50 * 1000)))
    }, [profileProps.Sxe50, Fn, Fy]);
    // ========= ITERACIONES =========




    return (
        <div style={styles.page}>
            <header>
                <h1>DISEÑO POR FLEXIÓN LARGUERO CF</h1>
                <Link to="/Diseflex">Volver a la página principal</Link>
                <hr />
            </header>

            {/* Sección: Materiales y Condiciones de carga */}
            <section style={styles.container}>
                <div style={styles.divv}>
                    <h4>Materiales</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fy</label>
                        
                        <select id="Fy" value={Fy}  onChange={(e) => setFy(Number(e.target.value))}>
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

                    <h4>LRFD</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Φ </label>
                        <input type="number" placeholder="Ingresa Phi" value={Phi} onChange={(e) => setG(e.target.value)} readOnly style={styles.inputg} />

                    </div>
                    <h4>Tipo de estructua</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Tipo</label>
                        <select id="Fy" >
                            <option value="A">Grupo A</option>
                            <option value="B">Grupo B</option>
                        </select>

                    </div>
                    <h4>Factores de carga</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Combinacion</label>
                        <select id="Fy" >
                            <option value="A">Resistencia</option>
                            <option value="B">Viento</option>
                        </select>

                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>FCM</label>
                        <input type="number"   readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>FCVmax</label>
                        <input type="number"   readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>FCVinst</label>
                        <input type="number"   readOnly style={styles.inputg} />

                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>FCVV</label>
                        <input type="number"   readOnly style={styles.inputg} />

                    </div>
                </div>

                <div style={styles.divv}>
                    <h4>Cubierta</h4>
                    <div style={styles.label}>
                        <label >Separación de monten</label>
                        <input type="number" placeholder="Peso Laminas" value={sep_monten} onChange={(e) => setsep_monten(e.target.value)} style={styles.inputg} />
                        <label>m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Angulo de cubierta</label>
                        <input type="number" placeholder="Angulo cubierta" value={angulo} onChange={(e) => setangulo(e.target.value)} style={styles.inputg} />
                        <label>grados</label>
                    </div>
                    <div style={styles.label}>
                        <label >Claro</label>
                        <input type="number" placeholder="Claro" value={claro} onChange={(e) => setclaro(e.target.value)} style={styles.inputg} />
                        <label>m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Contraflambeos</label>
                        <select id="Fy" >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <h4>Cargas</h4>
                    <div style={styles.label}>
                        <label >Peso de lámina m2</label>
                        <input type="number" placeholder="Peso Laminas" value={Lamina} onChange={(e) => setLamina(e.target.value)} style={styles.inputg} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva instantanea</label>
                        <input type="number" name="CV" value={Cargavivainst} onChange={(e) => setCargavivainst(e.target.value)} style={styles.input} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva máxima</label>
                        <input type="number" name="CVmax" value={Cargaviva} onChange={(e) => setcargaviva(e.target.value)} style={styles.input} />
                        <label>kg / m2</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viento</label>
                        <input type="number" name="CA" value={Cargaviento} onChange={(e) => setCargaviento(e.target.value)} style={styles.input} />
                        <label>kg / m2</label>
                    </div>
                    <h4>Carga lineal</h4>
                    <div style={styles.label}>
                        <label >Peso de lámina</label>
                        <input type="number"  style={styles.inputg} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva instantanea</label>
                        <input type="number" name="CV"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva máxima</label>
                        <input type="number" name="CVmax"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viento</label>
                        <input type="number" name="CA"  style={styles.input} />
                        <label>kg / m</label>
                    </div>

                </div>

                <div style={styles.divv}>
                <h4>Carga lineal en y</h4>
                    <div style={styles.label}>
                        <label >Peso de lámina</label>
                        <input type="number"  style={styles.inputg} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva instantanea</label>
                        <input type="number" name="CV"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva máxima</label>
                        <input type="number" name="CVmax"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viento</label>
                        <input type="number" name="CA"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Total</label>
                        <input type="number" name="CA"  style={styles.input} />
                        <label>kg / m</label>
                    </div>

                    <h4>Carga lineal en x</h4>
                    <div style={styles.label}>
                        <label >Peso de lámina</label>
                        <input type="number"  style={styles.inputg} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva instantanea</label>
                        <input type="number" name="CV"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Viva máxima</label>
                        <input type="number" name="CVmax"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <div style={styles.label}>
                        <label >Carga Total</label>
                        <input type="number" name="CA"  style={styles.input} />
                        <label>kg / m</label>
                    </div>
                    <h4>Combinaciones</h4>   
                    
                    <div style={styles.label}>
                        <label >Carga de diseño</label>
                        <input type="number" name="Cargatotal" value={Cargatotal} onChange={(e) => setcargatotal(e.target.value)} style={styles.input} readOnly />
                        <label>kg/m</label>
                    </div>
                    <button>Buscar combinación mas cirtica</button>
                    <label >Resistencia!!!</label>
                </div>

                <div style={styles.divv}>

                    <h4>Simplemente apoyada</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mxmax</label>
                        <input type="number" name="Mmax" style={styles.input} value={Mmax} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mymax</label>
                        <input type="number" name="Mmax" style={styles.input} value={Mmax} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Vmax</label>
                        <input type="number" name="Vmax" style={styles.input} value={Mmax} readOnly />
                        <label>kg</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>R</label>
                        <input type="number" name="R" style={styles.input} value={Mmax} readOnly />
                        
                    </div>
                    
                    <h4>Condiciones de carga</h4>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mmax</label>
                        <input type="number" name="Mmax" style={styles.input} value={Mmax} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Ma</label>
                        <input type="number" name="Ma" style={styles.input} value={Ma} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mb</label>
                        <input type="number" name="Mb" style={styles.input} value={Mb} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mc</label>
                        <input type="number" name="Mc" style={styles.input} value={Mc} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Cb</label>
                        <label style={styles.tit1}>{Cb}</label>
                    </div>
                </div>


            </section>

            {/* Sección: Selección CF */}
            <h2>SELECCIONAR CF</h2>
            <section style={styles.container}>
                <div style={styles.canvas}>
                    <h4>SELEECCIONAR PEFIL</h4>
                    <select value={selectedMedida} onChange={(e) => setSelectedMedida(e.target.value)} style={styles.select} >
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
                    <button onClick={handleShowProperties} style={styles.button}> Mostrar propiedades </button>
                    <div>
                        <label>Previsualizacion</label>
                        <img src="/PROPCF.png" alt="propiedades de IR" style={styles.image} />

                    </div>
                </div>

                <div style={styles.divv}>
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
                </div>


                <div style={styles.divv}>
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


                <div style={styles.divv}>
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

                    <div style={styles.label}>
                        <label style={styles.tit1}>xo</label>
                        <input type="number" name="ry" style={styles.input} value={xo} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>ro</label>
                        <input type="number" name="ry" style={styles.input} value={ro} readOnly />
                        <label>mm</label>
                    </div>
                </div>


                <div style={styles.canvas}>
                    <div style={styles.label}>
                        <h4>Momento</h4>
                        <label style={styles.tit1}>RMnx</label>
                        <input type="number" name="ry" style={styles.input} value={ro} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>RMny</label>
                        <input type="number" name="ry" style={styles.input} value={ro} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Interacción</label>
                        <input type="number" name="ry" style={styles.input} value={ro} readOnly />
                        <label>{"<"} 1 </label>
                        
                    </div>
                    <h4>Cortante</h4>

                    <h4>Interaccion momento/cortante</h4>

                </div>
            </section>

            {/* Cálculo */}
            <section style={styles.container}>
                <div style={styles.divv}>
                    <h2>CALCULAR</h2>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ky</label>
                        <input type="number" placeholder="Ingresa Ky" value={ky} onChange={(e) => setky(e.target.value)} style={styles.inputg} />

                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ly</label>
                        <input type="number" placeholder="Ingresa Ly" value={ly} onChange={(e) => setly(e.target.value)} style={styles.inputg} />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Kt</label>
                        <input type="number" placeholder="Ingresa Kt" value={kt} onChange={(e) => setkt(e.target.value)} style={styles.inputg} />

                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Lt</label>
                        <input type="number" placeholder="Ingresa Lt" value={lt} onChange={(e) => setlt(e.target.value)} style={styles.inputg} />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>σey</label>
                        <input type="number" name="ry" style={styles.inputg} value={sigey} readOnly />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>σt</label>
                        <input type="number" name="sigt" style={styles.inputg} value={sigt} readOnly />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fcre</label>
                        <input type="number" name="Fcre" style={styles.inputg} value={Fcre} readOnly />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fn</label>
                        <input type="number" name="Fn" style={styles.inputg} value={Fn} readOnly />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>My</label>
                        <input type="number" name="My" style={styles.inputg} value={My / 9806.65} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mne</label>
                        <input type="number" name="Mne" style={styles.inputg} value={Mne / 9806.65} readOnly />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>ΦbMne</label>
                        <input type="number" name="ΦbMne" style={styles.inputg} value={Mne * Phi / 9806.65} readOnly />
                        <label>kg * m</label>
                    </div>
                </div>



                <div style={styles.divv}>
                    <h2>ÁREA DE GRÁFICO</h2>

                </div>
            </section>

            {/* Iteraciones */}
            <section style={styles.container}>
                <div style={styles.divv}>
                    <h3>ITERACIONES</h3>
                    <button >Iterar</button>

                </div>
                <div style={styles.divv}>
                    <button>Generar reporte</button>
                </div>
            </section>
        </div>
    );
}




const styles = {
    page: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    container: {
        width: "auto",
        height: "auto",
        padding: "10px",
        margin: "15px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
        border: "5px solid darkslategrey",
    },
    label: {
        padding: "5px",
    },
    tit1: {
        width: "50px",
        display: "inline-block",
    },
    input: {
        width: "50px",
    },
    inputg: {
        width: "70px"
    },
    image: {
        width: "100%",
        height: "300px",
        objectFit: "contain",
        marginBottom: "1rem",
    },
    // Estilos para la gráfica SVG
    svgGrafica: {
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "2rem",
    },

    svgCurve: {
        fill: "none",
        stroke: "red",
        strokeWidth: 2,
    },

    svgAxis: {
        stroke: "#000",
        strokeWidth: 1,
    },

    svgPath: {
        stroke: "#343a40", // Gris oscuro
        strokeWidth: 2,
        fill: "none",
    },
    svgLine: {
        strokeWidth: 1.5,
        stroke: "red",
    },
    svgLineBlue: {
        stroke: "blue",
        strokeDasharray: "4,4",
    },
    svgLineGreen: {
        stroke: "green",
        strokeDasharray: "4,4",
    },
    svgCircle: {
        fill: "red",
        stroke: "black",
        strokeWidth: 1,
    },
    svgText: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        fill: "#333",
    },
}
export default DisViga2CFlex;
