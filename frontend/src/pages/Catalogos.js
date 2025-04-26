import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Boton from "../componentes/Boton";
import Navbar from "../componentes/Navbar";

const endpointMapping = {
  INFRAESTRUCTURA: "infra",
  SEP: "SEP"
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    margin: 0,
    padding: 20,
  },
  h1: {
    textAlign: "center",
    marginBottom: 20,
  },
  panel: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  catalogHeader: {
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: 4,
    marginTop: 10,
    display: "block",
    width: "100%",
  },
  select: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    fontSize: "1rem",
  },
  tableContainer: {
    maxHeight: 400,
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: 8,
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  td: {
    border: "1px solid #ccc",
    padding: 8,
    textAlign: "center",
  },
  emptyDropMessage: {
    padding: "100px",
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },
  
};

function CatalogosPres() {
  const BASE_URL = "https://django-backend-3vty.onrender.com/api/";

  const [allCatalogs, setAllCatalogs] = useState({});
  const [catalogData, setCatalogData] = useState([]);
  const [displayedCatalogData, setDisplayedCatalogData] = useState([]);
  const [selectedCatalogType, setSelectedCatalogType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetItems, setBudgetItems] = useState([]);

  // Carga todos los catálogos al montar el componente
  useEffect(() => {
    const fetchAllCatalogs = async () => {
      try {
        const catalogKeys = Object.keys(endpointMapping);
        const results = await Promise.all(
          catalogKeys.map((key) =>
            fetch(BASE_URL + endpointMapping[key] + "/")
              .then((response) => response.json())
              .then((data) => [key, data])
          )
        );
        const catalogs = {};
        results.forEach(([key, data]) => {
          catalogs[key] = data;
        });
        setAllCatalogs(catalogs);
      } catch (error) {
        console.error("Error fetching catalogs: ", error);
      }
    };
    fetchAllCatalogs();
  }, []);

  // Actualiza los datos del catálogo mostrado al cambiar la selección o al cargar todos los catálogos
  useEffect(() => {
    if (selectedCatalogType && allCatalogs[selectedCatalogType]) {
      setCatalogData(allCatalogs[selectedCatalogType]);
      setDisplayedCatalogData(allCatalogs[selectedCatalogType]);
    } else {
      setCatalogData([]);
      setDisplayedCatalogData([]);
    }
  }, [selectedCatalogType, allCatalogs]);

  // Maneja el cambio en el select de catálogo
  const handleCatalogTypeChange = (e) => {
    setSelectedCatalogType(e.target.value);
    setSearchQuery("");
  };

  // Filtra el catálogo según el término de búsqueda
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = catalogData.filter(
      (item) =>
        item.clave.toLowerCase().includes(query) ||
        item.descripcion.toLowerCase().includes(query)
    );
    setDisplayedCatalogData(filtered);
  };

  // Configura el drag & drop en cada fila del catálogo
  const handleDragStart = (e, concept) => {
    e.dataTransfer.setData("application/json", JSON.stringify(concept));
  };

  // Al soltar en el contenedor de presupuesto, agrega el concepto
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const concept = JSON.parse(data);
      addConceptToBudget(concept);
    }
  };

  // Agrega el concepto seleccionado al presupuesto
  const addConceptToBudget = (concept) => {
    setBudgetItems((prev) => [
      ...prev,
      { ...concept, cantidad: 0, importe: "0.00" },
    ]);
  };

  // Actualiza la cantidad e importe en el presupuesto
  const handleQuantityChange = (index, newQuantity) => {
    setBudgetItems((prev) => {
      const newBudget = [...prev];
      newBudget[index].cantidad = parseFloat(newQuantity) || 0;
      const costo =
        newBudget[index].costo || newBudget[index].costo_directo || 0;
      newBudget[index].importe = (newBudget[index].cantidad * costo).toFixed(2);
      return newBudget;
    });
  };

  // Elimina un ítem del presupuesto
  const removeBudgetItem = (index) => {
    setBudgetItems((prev) => prev.filter((item, i) => i !== index));
  };

  // Limpia el presupuesto
  const clearBudget = () => {
    setBudgetItems([]);
  };

  return (
    <div>
      <Navbar title="Catálogo de Conceptos" showBackLink={true} backLink="/" />
    <div style={styles.container}>
     
      {/* Panel de Catálogo */}
      <div style={styles.panel}>
        <h2 style={styles.catalogHeader}>Catálogos</h2>
        <label style={styles.label} htmlFor="busqueda">
          Buscar concepto
        </label>
        <input
          type="text"
          id="busqueda"
          placeholder="Ingresa la clave del concepto"
          style={styles.input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <Boton onClick={handleSearch}>BUSCAR</Boton>
        <label style={styles.label} htmlFor="catalogType">
          Tipo de Catálogo:
        </label>
        <select
          id="catalogType"
          style={styles.select}
          value={selectedCatalogType}
          onChange={handleCatalogTypeChange}
        >
          <option value="">-- Selecciona un catálogo --</option>
          <option value="INFRAESTRUCTURA">INFRAESTRUCTURA</option>
          <option value="SEP">SEP</option>
        </select>
        <div id="catalogContainer" style={styles.tableContainer}>
          <table id="catalogTable" style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Clave</th>
                <th style={styles.th}>Descripción</th>
                <th style={styles.th}>Unidad</th>
                <th style={styles.th}>Costo Directo</th>
              </tr>
            </thead>
            <tbody>
              {displayedCatalogData.length > 0 ? (
                displayedCatalogData.map((concept, index) => (
                  <tr
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, concept)}
                  >
                    <td style={styles.td}>{concept.clave}</td>
                    <td style={styles.td}>{concept.descripcion}</td>
                    <td style={styles.td}>{concept.unidad}</td>
                    <td style={styles.td}>${concept.costo_directo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={styles.td} colSpan="4">
                    Selecciona un catálogo para ver los conceptos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel de Presupuesto */}
      <div style={styles.panel}>
        <h2 style={styles.catalogHeader}>Presupuesto</h2>
        <div
          id="budgetContainer"
          className="budget-container"
          style={{ marginBottom: 10 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <table id="budgetTable" style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Clave</th>
                <th style={styles.th}>Descripción</th>
                <th style={styles.th}>Unidad</th>
                <th style={styles.th}>Costo Unitario</th>
                <th style={styles.th}>Cantidad</th>
                <th style={styles.th}>Importe</th>
                <th style={styles.th}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.length === 0 ? (
                <tr>
                  <td style={styles.emptyDropMessage} colSpan="7">
                     Arrastra tus conceptos aquí para agregarlos al presupuesto
                  </td>
                </tr>
              ) : (
                budgetItems.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.clave}</td>
                    <td style={styles.td}>{item.descripcion}</td>
                    <td style={styles.td}>{item.unidad}</td>
                    <td style={styles.td}>{item.costo || item.costo_directo}</td>
                    <td style={styles.td}>
                      <input
                        type="number"
                        min="0"
                        value={item.cantidad}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        style={{ width: 60 }}
                      />
                    </td>
                    <td style={styles.td}>{item.importe}</td>
                    <td style={styles.td}>
                      <button onClick={() => removeBudgetItem(index)} style={styles.button}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
        
        <Boton onClick={clearBudget}>LIMPIAR PRESUPUESTO</Boton>
         
      </div>
    </div>
    </div>
  );
}

export default CatalogosPres;
