//ECUACIONES IMCA 6ta EDICION PAG. II-113


//=========ECUACIONES PARA PERFILES I============
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


//=========ECUACIONES PARA PERFILES ORR============
export function LimiteLpORR (E, Ag, ry, J, Mp) {
    return 0.13 * E * ry * ((Math.sqrt(J * Ag ))/Mp)
}

export function LimiteLrORR (E, Ag, ry, J, Fy, sx) {
    return 2 * E * ry * ((Math.sqrt(J * Ag ))/(0.7 * Fy * sx))
}


//Pandeo General
export function ORRMn (Fy, Zx, Lb, Lp, Lr, E, Sx, Cb, J, Ag) {
    let Mp = Fy * Zx;
    let Mn;

    if (Lb <= Lp) {
        Mn = Mp;
    } else if (Lb > Lp && Lb <= Lr) {
        Mn = Cb * (Mp - (Mp - 0.7 * Fy * Sx) * ((Lb - Lp) / (Lr - Lp)));
    } else {
        Mn = 2 * E * Cb * ((Math.sqrt(J*Ag))/(Lb / Lr))
    }

    if (Mn > Mp) {
        Mn = Mp;
    }

    return Mn;
}

//Pandeo patín
export function ORRbe (tf, E, Fy, b, ){
    let be;
    be = 1.92 * tf * (Math.sqrt( E / Fy)) * (1 - ((0.38 / ( b/tf ))*(Math.sqrt(E/Fy))))
    if (be > b ){
        be = b;
    }

    return be;
}
export function Se (){

    return  1;
}

export function ORRMnPatin(Mp, Fy, S, b, tf, E, Clas, Se){
    let Mn;
    if(Clas = "Compacto"){
        Mn = Mp;

    } else if (Clas = "No compacto"){
        Mn = Mp - ((Mp - Fy * S) * ((3.57 * (b/tf)*Math.sqrt(Fy / E))-4))
    } else if (Clas = "Esbelto"){
        Mn = Fy * Se;
    } else {
        Mn = 0
    }
    if (Mn > Mp){
        Mn = Mp
    }
    return Mn;
    
}

//Pandeo alma
export function awORR (h, tw, b, tf){
    let aw = (2 * h * tw)/(b * tf);
    return (aw);
}

export function FcrORR (E, bf, tf){
    let Fcr = (0.9 * E * 4 )/((bf/tf)**2)
    return Fcr
}

export function RpgORR(aw, hc, tw, E, Fy){
    let Rpg = 1 - ((aw/(1200+(300*aw))*((hc/tw)- (5.7 * matchMedia.sqrt(E/Fy)))))
    return Rpg;
}

export  function ORRMnAlma (Mp, Fy, S, h, tw, E, Clas){

    let Mn;
    if(Clas = "Compacto"){
        Mn = Mp;

    } else if (Clas = "No compacto"){
        Mn = Mp - ((Mp - Fy * S) * ((0.305 * (h/tw)*Math.sqrt(Fy / E))-0.738))
    } else if (Clas = "Esbelto"){

        //revisar estas ecuaciones
        Mn = 0;
    } else {
        Mn = 0
    }
    if (Mn > Mp){
        Mn = Mp
    }
    return Mn;

}

