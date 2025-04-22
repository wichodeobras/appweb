//AISIS s100-16

//========FLEXION=======

export function Flex_ro (rx,ry,xo){
    let ro = Math.sqrt((rx**2)+(ry**2)+(xo**2));
    return ro
}

export function Flex_sigmaey(E,ky,ly,ry){
    const pi2 = (Math.PI)**2;
    let sigmaey = (pi2 * E )/((ky*ly/ry)**2);
    return sigmaey
}

export function Flex_sigmat(A, ro, G, J, E, Cw, kt,lt){
    const pi2 = (Math.PI)**2;
    let sigmat = (1/(A * (ro **2)))*(G * J +((pi2 *E * Cw)/(kt * lt)**2));
    return sigmat;
}

export function Flex_Fcre (Cb, ro, A, Sf, sigmaey, sigmat){
    let Fcre = Cb * ro * A * Math.sqrt( sigmaey * sigmat) / Sf ;
    return Fcre;

}

export function Flex_Fn(Fcre, Fy) {
    let Fn;
    if (Fcre >= 2.78 * Fy) {
        Fn = Fy;
    } else if (Fcre <= 0.56 * Fy) {
        Fn = Fcre;
    } else {
        Fn = (10 / 9) * Fy * (1 - (10 * Fy) / (36 * Fcre));
    }
    return Fn;
}


export function Flex_Mne (Sf, Fn, Fy, Sfy){
    let My = Sfy * Fy;
    let Mne = Sf * Fn;
    if (Mne > My){
        Mne = My
    }
    return Mne
}

//=======CORTANTE=======

export function V_Fcr (E, kv, u, h,t){
    const pi2 = (Math.PI)**2;
    let Fcr = (pi2 * E * kv)/(12 * (1-u**2) * (h/t)**2)
    return Fcr
}

export function V_Vy (Aw, Fy){
    let Vy = 0.6 * Aw * Fy 
    return Vy
}

export function V_Vn (lambda_v, Vcr, Vy){
    let  Vn;
    if (lambda_v <= 0.815){
        Vn = Vy
    } else if (lambda_v > 1.227){
        Vn = Vcr
    } else {
        Vn = 0.815 * Math.sqrt(Vcr * Vy)
    }
    return Vn
}