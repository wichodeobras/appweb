//ECUACIONES IMCA 6ta EDICION PAG. II-113

export function CalcCb (Mmax, Ma, Mb, Mc) {
    return 12.5 * Mmax / (2.5 * Mmax + 3 * Ma + 4 * Mb + 3 * Mc);
}

export function calcrts (Iy, Cw, Sx) {
    return Math.sqrt(Math.sqrt(Iy * Cw) / Sx);
}

export function calcFcr (Cb, E, rts, Lb, J, c, Sx, ho) {
    const pi = Math.PI;
    return (Cb * pi ** 2 * E / ((Lb / rts) ** 2)) * 
           Math.sqrt(1 + 0.078 * (J * c / (Sx * ho)) * ((Lb / rts) ** 2));
}

export function F2Mn (Fy, Zx, Lb, Lp, Lr, Fcr, Sx, Cb) {
    let Mp = Fy * Zx;
    let Mn;

    if (Lb <= Lp) {
        Mn = Mp;
    } else if (Lb > Lp && Lb <= Lr) {
        Mn = Cb * (Mp - (Mp - 0.7 * Fy * Sx) * ((Lb - Lp) / (Lr - Lp)));
    } else {
        Mn = Fcr * Sx;
    }

    if (Mn > Mp) {
        Mn = Mp;
    }

    return Mn;
}

export function LimiteLp (E, Fy, ry) {
    return 1.76 * ry * Math.sqrt(E / Fy);
}

export function LimiteLr (E, Fy, Sx, rts, J, ho) {
    const c = 1; // para secciones I
    return 1.95 * rts * (E / (0.7 * Fy)) * 
           Math.sqrt((J * c / (ho * Sx)) + 
           Math.sqrt(((J * c / (ho * Sx)) ** 2) + 6.76 * ((0.7 * Fy / E) ** 2)));
}
