import React, { useEffect, useState } from "react";
import { calcFcr, calcrts, F2Mn, LimiteLp, LimiteLr, f3_kc, f3_Mn, MomentoResistente } from "../../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroFlexión";
import Navbar from "../../componentes/Navbar";
import Boton from "../../componentes/Boton";
import ThreeViga from "../../graficos/ThreeViga";
import GraficaMn from "../../graficos/GraficaMn";

const BASE_URL = "https://django-backend-3vty.onrender.com";

function DisVigaRecFlex() {

    // Materiales
    const [Fy, setFy] = useState("345");
    const [E, setE] = useState("200000");

    // Condiciones de Carga
    const [Mmax, setMmax] = useState("1760");
    const [Cb, setCb] = useState("1.00");

    //Propiedades  de perfil
    const [profileProps, setProfileProps] = useState({});
    const [ho, setho] = useState(null);
    const [rts, setrts] = useState(null);

    const c = 1;
    const phib = 0.90;
    const phiv = 0.90;

    // Perfiles y selección
    const [profiles, setProfiles] = useState([]);
    const [selectedMedida, setSelectedMedida] = useState("");

    // Clasificaciones
    const [clasificacionPatin, setClasificacionPatin] = useState("");
    const [clasificacionAlma, setClasificacionAlma] = useState("");

    //Patin y alma
    const [PatLambdap, setPatlambdap] = useState(null);
    const [PatLambdar, setPatlambdar] = useState(null);
    const [AlmLambdap, setAlmlambdap] = useState(null);
    const [AlmLambdar, setAlmlambdar] = useState(null);

    //cortante
    const [Aw, setAw]= useState(null);
    const Cvl = 1;
    const [Vn, setVn] = useState(null);


    //Condiciones de frontera
    const [claro, setClaro] = useState("5000");
    const [Lb, setLb] = useState("1000");
    const [Lp, setLp] = useState(null);
    const [Lr, setLr] = useState(null);



    //Fluencia
    const [Mp, setMp] = useState(null);

    //Pandeo lateral torsional
    const [Fcr, setFcr] = useState(null);
    const [Mn, setMn] = useState(null);

    //Pandeo local patín de en compresión
    const [f3Mn, setf3Mn] = useState(null);
    const [kc, setkc] = useState(null);

    //Momento resistente
    const [MnR, setMnR] = useState(null);


    //ITERACIONES
    const [iteracionesResult, setIteracionesResult] = useState([]);


    // ========= OBTENCIÓN DE PERFILES AL CARGAR =========
    useEffect(() => {
        fetch(`${BASE_URL}/api/irr/`)
            .then((response) => response.json())
            .then((data) => {
                setProfiles(data);
                setSelectedMedida("");
            })
            .catch((error) => console.error("Error al obtener los perfiles:", error));
    }, []);

    // ========= LIMPIEZA AUTOMÁTICA AL CAMBIAR DE PERFIL =========
    useEffect(() => {
        setProfileProps({});
        setClasificacionPatin("");
        setClasificacionAlma("");
    }, [selectedMedida]);

    // ========= MANEJO DE SELECCIÓN DE PROPIEDADES =========
    const handleShowProperties = () => {
        const profile = profiles.find(
            (p) =>
                p.designacion_mm?.toLowerCase() === selectedMedida.toLowerCase() ||
                p.designacion_metrico?.toLowerCase() === selectedMedida.toLowerCase()
        );
        if (profile) {
            setProfileProps({
                sx: profile.sx,
                sy: profile.sy,
                Ag: profile.area,
                cw: profile.cw,
                ix: profile.ix,
                iy: profile.iy,
                j: profile.j,
                zx: profile.zx,
                zy: profile.zy,
                rx: profile.rx,
                ry: profile.ry,
                b_2tf: profile.b_2tf,
                h_tw: profile.h_tw,
                d: profile.d,
                h: profile.h,
                bf: profile.bf,
                tf: profile.tf,
                tw: profile.tw,
                peso: profile.peso,
            });
        } else {
            setProfileProps({});
        }
    };

    // 1️⃣ Handlers para anterior / siguiente
  const handlePrevProfile = () => {
    const idx = profiles.findIndex(p => {
      const m = selectedMedida.toLowerCase();
      return p.designacion_mm?.toLowerCase() === m
          || p.designacion_metrico?.toLowerCase() === m;
    });
    if (idx > 0) {
      const prev = profiles[idx - 1];
      const medida = prev.designacion_mm || prev.designacion_metrico;
      setSelectedMedida(medida);
    }
  };

  const handleNextProfile = () => {
    const idx = profiles.findIndex(p => {
      const m = selectedMedida.toLowerCase();
      return p.designacion_mm?.toLowerCase() === m
          || p.designacion_metrico?.toLowerCase() === m;
    });
    if (idx >= 0 && idx < profiles.length - 1) {
      const next = profiles[idx + 1];
      const medida = next.designacion_mm || next.designacion_metrico;
      setSelectedMedida(medida);
    }
  };

  // 2️⃣ Automáticamente recargar propiedades al cambiar selectedMedida
  useEffect(() => {
    if (selectedMedida) {
      handleShowProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMedida]);


    // ========= CLASIFICACIONES =========
    useEffect(() => {
        if (E && Fy && profileProps.b_2tf && profileProps.h_tw) {
            setClasificacionPatin(
                ClasificacionPatin(Number(profileProps.b_2tf), Number(E), Number(Fy) ));
            setClasificacionAlma(
                ClasificacionAlma( Number(profileProps.h_tw), Number(E), Number(Fy) ));
        } else {
            setClasificacionPatin("");
            setClasificacionAlma("");
        }
    }, [E, Fy, profileProps.b_2tf, profileProps.h_tw]);

    const ClasificacionPatin = (b_2tf, E, Fy) => {
        const lambda = b_2tf;
        const lambdap = 0.38 * Math.sqrt(E / Fy);
        const lambdar = Math.sqrt(E / Fy);

        setPatlambdap(lambdap);
        setPatlambdar(lambdar);

        if (lambda < lambdap) return "Compacto";
        if (lambda >= lambdap && lambda <= lambdar) return "No compacto";
        if (lambda > lambdar) return "Esbelto";
        return "Clasificación desconocida";
    };

    const ClasificacionAlma = (h_tw, E, Fy) => {
        const lambda = h_tw;
        const lambdap = 3.76 * Math.sqrt(E / Fy);
        const lambdar = 5.7 * Math.sqrt(E / Fy);

        setAlmlambdap(lambdap);
        setAlmlambdar(lambdar);

        if (lambda < lambdap) return "Compacto";
        if (lambda >= lambdap && lambda <= lambdar) return "No compacto";
        if (lambda > lambdar) return "Esbelto";
        return "Clasificación desconocida";
    };

    // ========= RTS y ho =========
    useEffect(() => {
        setrts(calcrts(Number(profileProps.iy * 10000), Number(profileProps.cw * 1000000), Number(profileProps.sx * 1000)))
    }, [profileProps]);

    useEffect(() => {
        setho(profileProps.d - profileProps.tf)
    }, [profileProps]);

    // ========= LIMITES =========
    useEffect(() => {
        setLp(LimiteLp(Number(E), Number(Fy), Number(profileProps.ry * 10)))
    }, [E, Fy, profileProps.ry]);

    useEffect(() => {
        setLr(LimiteLr(Number(E), Number(Fy), Number(profileProps.sx * 1000), Number(rts), Number(profileProps.j * 10000), Number(ho)))
    }, [E, Fy, rts, ho]);

    // ========= RESISTENCIA A FLEXION =========

    //Fluencia 
    useEffect(() => {
        setMp(profileProps.zx * 1000 * Fy)
    }, [profileProps.zx, Fy]);


    //Pandeo lateral torsional
    useEffect(() => {
        setFcr(calcFcr(Number(Cb), Number(E), Number(rts), Number(Lb), Number(profileProps.j * 10000), Number(c), Number(profileProps.sx * 1000), Number(ho)))
    }, [Cb, E, rts, Lb, c, ho, profileProps.j, profileProps.sx]);


    useEffect(() => {
        setMn(F2Mn(Number(Fy), Number(profileProps.zx * 1000), Number(Lb), Number(Lp), Number(Lr), Number(Fcr), Number(profileProps.sx * 1000), Number(Cb)))
    }, [Fy, Lb, Lp, Lr, Fcr, profileProps.zx, profileProps.sx]);

    //Pandeo local del patin en compresion
    useEffect(() => {
        setkc(f3_kc(Number(profileProps.h_tw)))
    }, [profileProps.h_tw]);

    useEffect(() => {
        setf3Mn(f3_Mn( clasificacionPatin, E, kc, Number(profileProps.sx * 1000), Number(profileProps.b_2tf), Mp, Fy, PatLambdap, PatLambdar));        
    }, [clasificacionPatin, E, kc, profileProps.sx, profileProps.b_2tf, Mp, Fy, PatLambdar, PatLambdap]);

    //Momento resistente
    useEffect(()=>{
        setMnR(MomentoResistente(clasificacionPatin, Mn, f3Mn))
    },[clasificacionPatin, Mn, f3Mn]);


    //=======CORTANTE==========
    useEffect(()=>{
        setAw(Number(profileProps.d) * Number(profileProps.tw))
    },[profileProps]);

    useEffect(()=>{
        setVn( 0.6 * Fy * Aw * Cvl)
    },[Fy, Aw, Cvl]);

    // ========= ITERACIONES =========
    const handleIterar = () => {
        const resultados = [];
    
        profiles.forEach((p) => {
            try {
                const sx = Number(p.sx) * 1000;
                const zx = Number(p.zx) * 1000;
                const j = Number(p.j) * 10000;
                const cw = Number(p.cw) * 1e6;
                const iy = Number(p.iy) * 10000;
                const ry = Number(p.ry) * 10;
                const ho = Number(p.d) - Number(p.tf);
                const b_2tf = Number(p.b_2tf);
                const h_tw = Number(p.h_tw);
    
                const rts = calcrts(iy, cw, sx);
                const Lp_local = LimiteLp(Number(E), Number(Fy), ry);
                const Lr_local = LimiteLr(Number(E), Number(Fy), sx, rts, j, ho);
                const Fcr_local = calcFcr(Number(Cb), Number(E), rts, Number(Lb), j, c, sx, ho);
                const f2Mn = F2Mn(Number(Fy), zx, Number(Lb), Lp_local, Lr_local, Fcr_local, sx, Number(Cb));
                const kc = f3_kc(h_tw);
    
                // Clasificación local para cada iteración
                const lambda = b_2tf;
                const lambda_p = 0.38 * Math.sqrt(E / Fy);
                const lambda_r = Math.sqrt(E / Fy);
                let clas = "";
                if (lambda < lambda_p) clas = "Compacto";
                else if (lambda <= lambda_r) clas = "No compacto";
                else clas = "Esbelto";
    
                const f3Mn = f3_Mn(clas, Number(E), kc, sx, lambda, zx * Fy, Fy, lambda_p, lambda_r);
                const MnR = MomentoResistente(clas, f2Mn, f3Mn);
                const phiMnR = phib * MnR;
    
                if ((phiMnR / 9806.65) > Number(Mmax)) {
                    resultados.push({
                        perfil: p.designacion_mm || p.designacion_metrico || "SIN NOMBRE",
                        Mn: phiMnR / 9806.65,
                        diferencia: (phiMnR / 9806.65) - Number(Mmax),
                    });
                }
            } catch (error) {
                console.error("Error en perfil:", p.id, error);
            }
        });
    
        const top3 = resultados
            .sort((a, b) => a.diferencia - b.diferencia)
            .slice(0, 3);
    
        setIteracionesResult(top3);
    };
    



    return (
        <div style={styles.page}>
            <Navbar title="Diseño por Flexión CF" showBackLink={true} backLink="/Diseflex" />

            {/* Sección: Materiales y Condiciones de carga */}
            <section style={styles.container}>
                <div style={styles.divv}>
                    <h2>Materiales</h2>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fy</label>
                        <input type="number" placeholder="Ingresa Fy" value={Fy} onChange={(e) => setFy(e.target.value)} />
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>E</label>
                        <input type="number" placeholder="Ingresa E" value={E} onChange={(e) => setE(e.target.value)} />
                        <label>Mpa</label>
                    </div>
                </div>

                <div style={styles.divv}>
                    <h2>Condiciones de carga</h2>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mmax</label>
                        <input type="number" name="Mmax" style={styles.input} value={Mmax} onChange={(e) => setMmax(e.target.value)} />
                        <label>kg * m</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Claro</label>
                        <input type="number" style={styles.input} value={claro} onChange={(e) => setClaro(e.target.value)} />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Cb</label>
                        <input type="number" style={styles.input} value={Cb} onChange={(e) => setCb(e.target.value)} />

                    </div>
                </div>
            </section>

            {/* Sección: Selección IR */}
            <h2>SELECCIONAR IR</h2>
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
                    <Boton onClick={handleShowProperties}>Mostrar propiedades</Boton>

                    {/* Botones Anterior / Siguiente */}
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <Boton
            onClick={handlePrevProfile}
            disabled={
              profiles.findIndex(p => 
                (p.designacion_mm === selectedMedida) ||
                (p.designacion_metrico === selectedMedida)
              ) <= 0
            }
          >
            « Anterior
          </Boton>
          <Boton
            onClick={handleNextProfile}
            disabled={
              profiles.findIndex(p => 
                (p.designacion_mm === selectedMedida) ||
                (p.designacion_metrico === selectedMedida)
              ) === profiles.length - 1
            }
          >
            Siguiente »
          </Boton>
        </div>

                    <div>
                        <label>Previsualizacion</label>
                        <ThreeViga
                            lb="500"
                            h={profileProps.h}
                            bf={profileProps.bf}
                            tf={profileProps.tf}
                            tw={profileProps.tw}
                        />
                    </div>
                </div>

                <div style={styles.divv}>
                    <h3>Propiedades</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>d</label>
                        <input type="number" name="d" style={styles.input} value={profileProps.d || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>h</label>
                        <input type="number" name="h" style={styles.input} value={profileProps.h || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>tw</label>
                        <input type="number" name="tw" style={styles.input} value={profileProps.tw || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>bf</label>
                        <input type="number" name="bf" style={styles.input} value={profileProps.bf || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>tf</label>
                        <input type="number" name="tf" style={styles.input} value={profileProps.tf || ""} readOnly />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>area</label>
                        <input type="number" name="area" style={styles.input} value={profileProps.Ag || ""} readOnly />
                        <label>cm²</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Aw</label>
                        <input type="number" name="area" style={styles.input} value={Aw} readOnly />
                        <label>mm²</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>peso</label>
                        <input type="number" name="peso" style={styles.input} value={profileProps.peso} readOnly />
                        <label>kg/m</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>b/2tf</label>
                        <input type="number" name="b2tf" style={styles.input} value={profileProps.b_2tf || ""} readOnly />
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>h/tw</label>
                        <input type="number" name="htw" style={styles.input} value={profileProps.h_tw || ""} readOnly />
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>kc</label>
                        <input type="number" style={styles.input} value={kc} readOnly />
                    </div>
                </div>


                <div style={styles.divv}>
                    <h3>X-X</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Ix</label>
                        <input type="number" name="Ix" style={styles.input} value={profileProps.ix || ""} readOnly />
                        <label>cm⁴</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Zx</label>
                        <input type="number" name="Zx" style={styles.input} value={profileProps.zx || ""} readOnly />
                        <label>cm³</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Sx</label>
                        <input type="number" name="Sx" style={styles.input} value={profileProps.sx || ""} readOnly />
                        <label>cm³</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>rx</label>
                        <input type="number" name="rx" style={styles.input} value={profileProps.rx || ""} readOnly />
                        <label>cm</label>
                    </div>

                    <h3>Y-Y</h3>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Iy</label>
                        <input type="number" name="Iy" style={styles.input} value={profileProps.iy || ""} readOnly />
                        <label>cm⁴</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Zy</label>
                        <input type="number" name="Zy" style={styles.input} value={profileProps.zx || ""} readOnly />
                        <label>cm³</label>
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

                    <div style={styles.label}>
                        <label style={styles.tit1}>c</label>
                        <label>1</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>rts</label>
                        <label>{rts?.toFixed(3) ?? ""}</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Alma</label>
                        <label>{clasificacionAlma}</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Patín</label>
                        <label>{clasificacionPatin}</label>
                    </div>
                    <h3>Patín</h3>
                    <div style={styles.label}>
                        <label style={styles.tit1}>λp</label>
                        <label>{PatLambdap?.toFixed(2)}</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>λr</label>
                        <label>{PatLambdar?.toFixed(2)}</label>
                    </div>
                    <h3>Alma</h3>
                    <div style={styles.label}>
                        <label style={styles.tit1}>λp</label>
                        <label>{AlmLambdap?.toFixed(2)}</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>λr</label>
                        <label>{AlmLambdar?.toFixed(2)}</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Cvl</label>
                        <label>1</label>
                    </div>

                </div>


                <div style={styles.canvas}>

                    <img src="/PROPIR.png" alt="propiedades de IR" style={styles.image} />
                </div>
            </section>

            {/* Cálculo */}
            <section style={styles.container}>
                <div style={styles.divv}>
                    <h2>CALCULAR</h2>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Lb</label>
                        <input type="number" name="Lb" style={styles.inputg} value={Lb} onChange={(e) => setLb(e.target.value)} />
                        <label>mm</label>
                    </div>

                    <label>¡¡Rango elástico!!</label>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Lp</label>
                        <input type="number" name="Lp" style={styles.inputg} value={Lp}  readOnly/>
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Lr</label>
                        <input type="number" name="Lr" style={styles.inputg} value={Lr}  readOnly/>
                        <label>mm</label>
                    </div>


                    <label>Fluencia</label>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mp</label>
                        <input type="number" name="Mp" style={styles.inputg} value={Mp / 9806.65}  readOnly/>
                        <label>Kg*m</label>
                    </div>
                    <label>Pandeo lateral torsional</label>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Fcr</label>
                        <input type="number" name="Fcr" style={styles.inputg} value={Fcr}  readOnly/>
                        <label>Mpa</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mn</label>
                        <input type="number" name="Mn" style={styles.inputg} value={Mn / 9806.65}  readOnly/>
                        <label>Kg*m</label>
                    </div>
                    <label>Pandeo local del patin</label>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mn</label>
                        <input type="number" name="Mn" style={styles.inputg} value={f3Mn / 9806.65} readOnly />
                        <label>Kg*m</label>
                    </div>

                    <h3>Momento Res</h3>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mn</label>
                        <input type="number" name="Mn" style={styles.inputg} value={MnR / 9806.65} readOnly />
                        <label>Kg*m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>φMn</label>
                        <input type="number" name="Mn" style={styles.inputg} value={phib*MnR / 9806.65} readOnly />
                        <label>Kg*m</label>
                    </div>

                    <h3>Cortante</h3>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Vn</label>
                        <input type="number" name="Vn" style={styles.inputg} value={Vn/9.80665} readOnly/>
                        <label>Kg</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>φVn</label>
                        <input type="number" name="Vn" style={styles.inputg} value={(Vn/9.80665)*phiv} readOnly/>
                        <label>Kg</label>
                    </div>


                </div>


                <div style={styles.divv}>
                    <h2>ÁREA DE GRÁFICO</h2>
                    <GraficaMn
                        Fy={Number(Fy)}
                        E={Number(E)}

                        Zx={Number(profileProps.zx * 1000)}
                        Lp={Lp}
                        Lr={Lr}
                        Sx={Number(profileProps.sx * 1000)}
                        Cb={Cb}
                        Lb={Number(Lb)}
                        J={Number(profileProps.j * 10000)}
                        rts={Number(rts)}
                        ho={Number(ho)}

                    />
                </div>
            </section>

            {/* Iteraciones */}
            <section style={styles.container}>
                <div style={styles.divv}>
                    <h3>ITERACIONES</h3>

                    <Boton onClick={handleIterar}>Iterar</Boton>
                    <div>
                        {iteracionesResult.length === 0 && (
                            <p>No hay resultados o Mn &lt; Mmax para todos los perfiles.</p>
                        )}
                        {iteracionesResult.map((item, idx) => (
                            <div key={idx} style={{ marginTop: "5px" }}>
                                <strong>#{idx + 1}:</strong> {item.perfil} - Mn: {item.Mn.toFixed(2)} kg·m
                            </div>
                        ))}
                    </div>
                </div>
                <div style={styles.divv}>
                    <Boton >Generar reporte</Boton>

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
    
}
export default DisVigaRecFlex;
