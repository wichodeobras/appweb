import React, { useState } from 'react';
import { Link } from "react-router-dom";
import GraficaTemplate from "../../graficos/GraficoTemplate";


function Granul (){
    return (
        <div>
            <h1>Pagina en proceso</h1>
            <Link to="/">Volver a la página principal</Link>
            <div>
            <GraficaTemplate title="Mi Ecuación" />
            {/* Aquí puedes superponer la curva o elementos que representen la ecuación */}
          </div>
        </div>

    );
}

export default Granul;