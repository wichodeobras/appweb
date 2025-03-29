import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Definición de unidades para cada categoría con su factor de conversión (a la unidad base)
const units = {
  distancia: [
    { label: 'Metro (m)', factor: 1 },
    { label: 'Kilómetro (km)', factor: 1000 },
    { label: 'Centímetro (cm)', factor: 0.01 },
    { label: 'Pie (ft)', factor: 0.3048 },
    { label: 'Yarda (yd)', factor: 0.9144 },
    { label: 'Milla (mi)', factor: 1609.34 },
  ],
  area: [
    { label: 'Metro cuadrado (m²)', factor: 1 },
    { label: 'Kilómetro cuadrado (km²)', factor: 1e6 },
    { label: 'Centímetro cuadrado (cm²)', factor: 0.0001 },
    { label: 'Pie cuadrado (ft²)', factor: 0.092903 },
    { label: 'Yarda cuadrada (yd²)', factor: 0.836127 },
    { label: 'Acre', factor: 4046.86 },
  ],
  volumen: [
    { label: 'Metro cúbico (m³)', factor: 1 },
    { label: 'Litro (L)', factor: 0.001 },
    { label: 'Centímetro cúbico (cm³)', factor: 1e-6 },
    { label: 'Pie cúbico (ft³)', factor: 0.0283168 },
    { label: 'Galón (US)', factor: 0.00378541 },
  ],
  masa: [
    { label: 'Kilogramo (kg)', factor: 1 },
    { label: 'Gramo (g)', factor: 0.001 },
    { label: 'Libra (lb)', factor: 0.453592 },
    { label: 'Onza (oz)', factor: 0.0283495 },
  ],
  fuerza: [
    { label: 'Newton (N)', factor: 1 },
    { label: 'Kilonewton (kN)', factor: 1000 },
    { label: 'Libra-fuerza (lbf)', factor: 4.44822 },
  ],
  presion: [
    { label: 'Pascal (Pa)', factor: 1 },
    { label: 'Kilopascal (kPa)', factor: 1000 },
    { label: 'Bar', factor: 100000 },
    { label: 'Psi', factor: 6894.76 },
    { label: 'Atm', factor: 101325 },
  ],
};

// Estilos en línea para el componente
const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  label: {
    marginRight: '0.5rem',
  },
  select: {
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
    fontSize: '1rem',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  result: {
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

function UnitConverter() {
  // Estado para la categoría de medición (por ejemplo, "distancia", "area", etc.)
  const [category, setCategory] = useState('distancia');
  // Estado para la unidad de origen y destino
  const [fromUnit, setFromUnit] = useState(units['distancia'][0].label);
  const [toUnit, setToUnit] = useState(units['distancia'][1].label);
  // Estado para el valor de entrada y el resultado
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  // Actualiza los dropdowns cuando se cambia la categoría
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    // Reinicia las unidades de origen y destino según la nueva categoría
    setFromUnit(units[newCategory][0].label);
    setToUnit(units[newCategory][1].label);
    setResult(null);
    setInputValue('');
  };

  // Función de conversión
  const handleConvert = () => {
    const inputNum = parseFloat(inputValue);
    if (isNaN(inputNum)) {
      setResult("Ingrese un número válido");
      return;
    }
    // Obtiene el factor de conversión para la unidad de origen y destino
    const fromFactor = units[category].find(u => u.label === fromUnit)?.factor;
    const toFactor = units[category].find(u => u.label === toUnit)?.factor;
    if (fromFactor == null || toFactor == null) {
      setResult("Unidad no encontrada");
      return;
    }
    // Conversión:
    // Primero convierte el valor a la unidad base (multiplicando por el factor de la unidad origen)
    // Luego, divide por el factor de la unidad destino para obtener el valor convertido
    const converted = (inputNum * fromFactor) / toFactor;
    setResult(converted);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Convertidor de Unidades</h1>
      <Link to="/" style={{ marginBottom: "1rem", display: "inline-block" }}>
              Volver a la página principal
            </Link>
      {/* Selección de categoría */}
      <div>
        <label style={styles.label}>Categoría:</label>
        <select value={category} onChange={handleCategoryChange} style={styles.select}>
          <option value="distancia">Distancia</option>
          <option value="area">Área</option>
          <option value="volumen">Volumen</option>
          <option value="masa">Masa</option>
          <option value="fuerza">Fuerza</option>
          <option value="presion">Presión</option>
        </select>
      </div>
      
      {/* Selección de unidad de origen */}
      <div>
        <label style={styles.label}>Desde:</label>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} style={styles.select}>
          {units[category].map((unit) => (
            <option key={unit.label} value={unit.label}>{unit.label}</option>
          ))}
        </select>
      </div>
      
      {/* Selección de unidad destino */}
      <div>
        <label style={styles.label}>Hacia:</label>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} style={styles.select}>
          {units[category].map((unit) => (
            <option key={unit.label} value={unit.label}>{unit.label}</option>
          ))}
        </select>
      </div>
      
      {/* Entrada del valor a convertir */}
      <div>
        <label style={styles.label}>Valor:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
      </div>
      
      {/* Botón para realizar la conversión */}
      <button onClick={handleConvert} style={styles.button}>Convertir</button>
      
      {/* Muestra el resultado */}
      {result !== null && (
        <div style={styles.result}>
          Resultado: {result}
        </div>
      )}
    </div>
  );
}

export default UnitConverter;
