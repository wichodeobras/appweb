import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalcCb, calcFcr, calcrts, F2Mn, LimiteLp, LimiteLr } from "../../Ecuaciones/DISEÑOESTRUCTURAL/ACERO/AceroFlexión";
import ThreeViga from "../../graficos/ThreeViga"

const BASE_URL = "https://django-backend-3vty.onrender.com";

function DisVigaRecFlex() {

    // Materiales
    const [Fy, setFy] = useState("345");
    const [E, setE] = useState("200000");

    // Condiciones de Carga
    const [Mmax, setMmax] = useState("7963");
    const [Ma, setMa] = useState("5972");
    const [Mb, setMb] = useState("7963");
    const [Mc, setMc] = useState("5972");
    const [Cb, setCb] = useState(null);

    //
    const [ho, setho] = useState(null);
    const [rts, setrts] = useState(null);

    const c = 1;

    // Perfiles y selección
    const [profiles, setProfiles] = useState([]);
    const [selectedMedida, setSelectedMedida] = useState("");

    // Propiedades del perfil seleccionado (agrupadas en un objeto)
    const [profileProps, setProfileProps] = useState({});

    // Clasificaciones
    const [clasificacionPatin, setClasificacionPatin] = useState("");
    const [clasificacionAlma, setClasificacionAlma] = useState("");
    //const [rango, setRango] = useState("")


    //Cálculos
    const [Lb, setLb] = useState("8000");
    const [Lp, setLp] = useState(null);
    const [Lr, setLr] = useState(null);
    const [Fcr, setFcr] = useState(null);
    const [Mp, setMp] = useState(null);
    const [Mn, setMn] = useState(null);

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
            });
        } else {
            setProfileProps({});
        }
    };

    // ========= CLASIFICACIONES =========
    useEffect(() => {
        if (E && Fy && profileProps.b_2tf && profileProps.h_tw) {
            setClasificacionPatin(
                ClasificacionPatin(
                    Number(profileProps.b_2tf),
                    Number(E),
                    Number(Fy)
                )
            );
            setClasificacionAlma(
                ClasificacionAlma(
                    Number(profileProps.h_tw),
                    Number(E),
                    Number(Fy)
                )
            );
        } else {
            setClasificacionPatin("");
            setClasificacionAlma("");
        }
    }, [E, Fy, profileProps.b_2tf, profileProps.h_tw]);

    const ClasificacionPatin = (b_2tf, E, Fy) => {
        const lambda = b_2tf;
        const lambdap = 0.38 * Math.sqrt(E / Fy);
        const lambdar = Math.sqrt(E / Fy);
        if (lambda < lambdap) return "Compacto";
        if (lambda >= lambdap && lambda <= lambdar) return "No compacto";
        if (lambda > lambdar) return "Esbelto";
        return "Clasificación desconocida";
    };

    const ClasificacionAlma = (h_tw, E, Fy) => {
        const lambda = h_tw;
        const lambdap = 3.76 * Math.sqrt(E / Fy);
        const lambdar = 5.7 * Math.sqrt(E / Fy);
        if (lambda < lambdap) return "Compacto";
        if (lambda >= lambdap && lambda <= lambdar) return "No compacto";
        if (lambda > lambdar) return "Esbelto";
        return "Clasificación desconocida";
    };

    // ========= Cb =========
    useEffect(() => {
        setCb(CalcCb(Number(Mmax), Number(Ma), Number(Mb), Number(Mc)))
    }, [Mmax, Ma, Mb, Mc]);

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

    // ========= RESISTENCIA =========
    useEffect(() => {
        setFcr(calcFcr(Number(Cb), Number(E), Number(rts), Number(Lb), Number(profileProps.j * 10000), Number(c), Number(profileProps.sx * 1000), Number(ho)))
    }, [Cb, E, rts, Lb, c, ho, profileProps.j, profileProps.sx]);

    useEffect(() => {
        setMp(profileProps.zx * 1000 * Fy)
    }, [profileProps.zx, Fy]);

    useEffect(() => {
        setMn(F2Mn(Number(Fy), Number(profileProps.zx * 1000), Number(Lb), Number(Lp), Number(Lr), Number(Fcr), Number(profileProps.sx * 1000), Number(Cb)))
    }, [Fy, Lb, Lp, Lr, Fcr, profileProps.zx, profileProps.sx]);

    // ========= ITERACIONES =========
    const handleIterar = () => {
        const resultados = [];

        profiles.forEach((p) => {
            try {
                const sx = Number(p.sx) * 1000;
                const Zx = Number(p.zx) * 1000;
                const j = Number(p.j) * 10000;
                const cw = Number(p.cw) * 1e6;
                const iy = Number(p.iy) * 10000;
                const ry = Number(p.ry) * 10;
                const ho = Number(p.d) - Number(p.tf);
                const rts = calcrts(iy, cw, sx);
                const Lp_local = LimiteLp(Number(E), Number(Fy), ry);
                const Lr_local = LimiteLr(Number(E), Number(Fy), sx, rts, j, ho);
                const Fcr_local = calcFcr(Cb, Number(E), rts, Number(Lb), j, c, sx, ho);
                const Mn_local = F2Mn(Number(Fy), Zx, Number(Lb), Lp_local, Lr_local, Fcr_local, sx, Cb);

                if (Mn_local/9806.65 > Number(Mmax)) {
                    resultados.push({
                        perfil: p.designacion_mm || p.designacion_metrico || "SIN NOMBRE",
                        Mn: Mn_local /9806.65,
                        diferencia: Mn_local/9806.65 - Number(Mmax)
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
            <header>
                <h1>DISEÑO POR FLEXIÓN VIGA IR</h1>
                <Link to="/Diseflex">Volver a la página principal</Link>
                <hr />
            </header>

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
                        <label style={styles.tit1}>Ma</label>
                        <input type="number" name="Ma" style={styles.input} value={Ma} onChange={(e) => setMa(e.target.value)} />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mb</label>
                        <input type="number" name="Mb" style={styles.input} value={Mb} onChange={(e) => setMb(e.target.value)} />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Mc</label>
                        <input type="number" name="Mc" style={styles.input} value={Mc} onChange={(e) => setMc(e.target.value)} />
                        <label>kg * m</label>
                    </div>
                    <div style={styles.label}>
                        <label style={styles.tit1}>Cb</label>
                        <label style={styles.tit1}>{Cb}</label>
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
                    <button onClick={handleShowProperties} style={styles.button}> Mostrar propiedades </button>
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
                        <label style={styles.tit1}>peso</label>
                        <input type="number" name="peso" style={styles.input} value={""} readOnly />
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
                        <input type="number" name="Lp" style={styles.inputg} value={Lp} onChange={(e) => setLp(e.target.value)} />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Lr</label>
                        <input type="number" name="Lr" style={styles.inputg} value={Lr} onChange={(e) => setLr(e.target.value)} />
                        <label>mm</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Fcr</label>
                        <input type="number" name="Fcr" style={styles.inputg} value={Fcr} onChange={(e) => setFcr(e.target.value)} />
                        <label>Mpa</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Mp</label>
                        <input type="number" name="Mp" style={styles.inputg} value={Mp/9806.65} onChange={(e) => setMp(e.target.value)} />
                        <label>Kg*m</label>
                    </div>

                    <div style={styles.label}>
                        <label style={styles.tit1}>Mn</label>
                        <input type="number" name="Mn" style={styles.inputg} value={Mn/9806.65} onChange={(e) => setMn(e.target.value)} />
                        <label>Kg*m</label>
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
                    <button onClick={handleIterar}>Iterar</button>
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
                    <button>Generar reporte</button>
                </div>
            </section>
        </div>
    );
}

function GraficaMn({
    Fy,
    E,
    Zx,
    Lp,
    Lr,
    Sx,
    Cb,
    Lb,
    J,
    rts,
    ho,
    c = 1,
}) {
    const width = 900;
    const height = 600;
    const paddingLeft = 75;
    const paddingTop = 40;
    const paddingRight = 40;
    const paddingBottom = 40;

    if (!Fy || !Zx || !Sx || !Lp || !Lr || !E || !J || !rts || !ho) {
        return <svg width={width} height={height} style={styles.svgGrafica} />;
    }

    const numPoints = 100;
    const maxLb = Lr * 3;
    const step = maxLb / numPoints;

    const data = [];
    for (let i = 0; i <= numPoints; i++) {
        const Lb_i = i * step;
        const Fcr_i = calcFcr(Cb, E, rts, Lb_i, J, c, Sx, ho);
        const Mn_i = F2Mn(Fy, Zx, Lb_i, Lp, Lr, Fcr_i, Sx, Cb);
        data.push({ Lb: Lb_i, Mn: Mn_i });
    }

    const maxLbVal = Math.max(...data.map((d) => d.Lb));
    const maxMn = Math.max(...data.map((d) => d.Mn));

    const scaleX = (val) =>
        paddingLeft + (val / maxLbVal) * (width - paddingLeft - paddingRight);
    const scaleY = (val) =>
        height -
        paddingBottom -
        (val / maxMn) * (height - paddingTop - paddingBottom);

    const pathD = data
        .map((point, i) => {
            const x = scaleX(point.Lb);
            const y = scaleY(point.Mn);
            return i === 0 ? `M${x},${y}` : `L${x},${y}`;
        })
        .join(" ");

    const numGridLines = 10;
    const xGridLines = [];
    for (let i = 1; i < numGridLines; i++) {
        const x =
            paddingLeft +
            i * ((width - paddingLeft - paddingRight) / numGridLines);
        xGridLines.push(
            <line
                key={`x-grid-line-${i}`}
                x1={x}
                y1={paddingTop}
                x2={x}
                y2={height - paddingBottom}
                style={{ stroke: "#ddd", strokeWidth: 1 }}
            />
        );
        const lbValue = (i / numGridLines) * maxLbVal;
        xGridLines.push(
            <text
                key={`x-grid-label-${i}`}
                x={x}
                y={height - paddingBottom + 15}
                fontSize="10"
                textAnchor="middle"
                fill="#888"
            >
                {lbValue.toFixed(0)}
            </text>
        );
    }

    const yGridLines = [];
    for (let i = 1; i < numGridLines; i++) {
        const y =
            paddingTop + i * ((height - paddingTop - paddingBottom) / numGridLines);
        yGridLines.push(
            <line
                key={`y-grid-line-${i}`}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                style={{ stroke: "#ddd", strokeWidth: 1 }}
            />
        );
        const mnValue =
            ((height - paddingBottom - y) /
                (height - paddingTop - paddingBottom)) *
            maxMn;
        yGridLines.push(
            <text
                key={`y-grid-label-${i}`}
                x={paddingLeft - 5}
                y={y + 3}
                fontSize="10"
                textAnchor="end"
                fill="#888"
            >
                {mnValue.toFixed(0)}
            </text>
        );
    }

    const limitLines = [];
    const addLimitLine = (xValue, color, label) => {
        const x = scaleX(xValue);
        limitLines.push(
            <line
                key={`line-${label}`}
                x1={x}
                y1={paddingTop}
                x2={x}
                y2={height - paddingBottom}
                style={{ stroke: color, strokeDasharray: "5,5", strokeWidth: 2 }}
            />,
            <text
                key={`label-${label}`}
                x={x + 5}
                y={paddingTop + 15}
                fontSize="12"
                fill={color}
            >
                {label}
            </text>
        );
    };

    if (Lp > 0 && Lp < maxLbVal) addLimitLine(Lp, "blue", "Lp");
    if (Lr > 0 && Lr < maxLbVal) addLimitLine(Lr, "green", "Lr");

    let circlePoint = null;
    let textPoint = null;
    if (Lb > 0 && Lb < maxLbVal) {
        const FcrReal = calcFcr(Cb, E, rts, Lb, J, c, Sx, ho);
        const MnReal = F2Mn(Fy, Zx, Lb, Lp, Lr, FcrReal, Sx, Cb);
        const cx = scaleX(Lb);
        const cy = scaleY(MnReal);
        circlePoint = <circle cx={cx} cy={cy} r={5} style={styles.svgCircle} />;
        textPoint = (
            <text x={cx + 10} y={cy - 5} fontSize="12" style={styles.svgText}>
                ({Lb.toFixed(1)}, {MnReal.toFixed(1)})
            </text>
        );
    }

    return (
        <svg width={width} height={height} style={styles.svgGrafica}>
            {xGridLines}
            {yGridLines}
            <line
                x1={paddingLeft}
                y1={height - paddingBottom}
                x2={width - paddingRight}
                y2={height - paddingBottom}
                style={styles.svgAxis}
            />
            <line
                x1={paddingLeft}
                y1={paddingTop}
                x2={paddingLeft}
                y2={height - paddingBottom}
                style={styles.svgAxis}
            />
            <text
                x={width / 2}
                y={height - 10}
                textAnchor="middle"
                fontSize="14"
                fill="#000"
            >
                Lb [mm]
            </text>
            <text
                x={15}
                y={height / 2}
                textAnchor="middle"
                fontSize="14"
                fill="#000"
                transform={`rotate(-90, 15, ${height / 2})`}
            >
                Mn [N·mm]
            </text>
            <path d={pathD} style={styles.svgCurve} />
            {limitLines}
            {circlePoint}
            {textPoint}
        </svg>
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
export default DisVigaRecFlex;
