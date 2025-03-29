import React, { useState, useEffect } from "react";


const endpointMapping = {
    
  INFRAESTRUCTURA: "infra",
  SEP: "SEP"
};

function CatalogosPres() {
  const BASE_URL = "https://django-backend-3vty.onrender.com/api/";
  // Mapeo de catálogo a endpoint (ajusta según corresponda)


  // Estados
  const [catalogData, setCatalogData] = useState([]);
  const [displayedCatalogData, setDisplayedCatalogData] = useState([]);
  const [selectedCatalogType, setSelectedCatalogType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetItems, setBudgetItems] = useState([]);

  // Al cambiar el catálogo, se consulta la API
  useEffect(() => {
    if (selectedCatalogType) {
      fetch(BASE_URL + endpointMapping[selectedCatalogType] + "/")
        .then((response) => response.json())
        .then((data) => {
          setCatalogData(data);
          setDisplayedCatalogData(data);
        })
        .catch((err) => {
          console.error(err);
          setCatalogData([]);
          setDisplayedCatalogData([]);
        });
    } else {
      setCatalogData([]);
      setDisplayedCatalogData([]);
    }
  }, [selectedCatalogType]);

  // Maneja el cambio en el select de catálogo
  const handleCatalogTypeChange = (e) => {
    setSelectedCatalogType(e.target.value);
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
      const costo = newBudget[index].costo || newBudget[index].costo_directo || 0;
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        margin: 0,
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Catálogo de Conceptos y Presupuesto
      </h1>

      {/* Panel de Catálogo */}
      <div
        className="catalog-panel"
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: 20,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>Catálogos</h2>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }} htmlFor="busqueda">
          Buscar concepto
        </label>
        <input
          type="text"
          id="busqueda"
          placeholder="Ej. IR 200x100x5"
          style={{ width: "100%", padding: 8, marginBottom: 10, fontSize: "1rem" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: 4,
            marginTop: 10,
            display: "block",
            width: "100%",
          }}
        >
          BUSCAR
        </button>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }} htmlFor="catalogType">
          Tipo de Catálogo:
        </label>
        <select
          id="catalogType"
          style={{ width: "100%", padding: 8, marginBottom: 10, fontSize: "1rem" }}
          value={selectedCatalogType}
          onChange={handleCatalogTypeChange}
        >
          <option value="">-- Selecciona un catálogo --</option>
          <option value="INFRAESTRUCTURA">INFRAESTRUCTURA</option>
          <option value="SEP">SEP</option>
        </select>
        <div
          id="catalogContainer"
          style={{
            maxHeight: 400,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        >
          <table
            id="catalogTable"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f0f0f0",
                zIndex: 1,
              }}
            >
              <tr>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Clave
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Descripción
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Unidad
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Costo Directo
                </th>
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
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: 8,
                        textAlign: "center",
                      }}
                    >
                      {concept.clave}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: 8,
                        textAlign: "center",
                      }}
                    >
                      {concept.descripcion}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: 8,
                        textAlign: "center",
                      }}
                    >
                      {concept.unidad}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: 8,
                        textAlign: "center",
                      }}
                    >
                      ${concept.costo_directo}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                    colSpan="4"
                  >
                    Selecciona un catálogo para ver los conceptos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel de Presupuesto */}
      <div
        className="budget-panel"
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>
          Presupuesto
        </h2>
        <div
          id="budgetContainer"
          className="budget-container"
          style={{ marginBottom: 10 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <table
            id="budgetTable"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Clave
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Descripción
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Unidad
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Costo Unitario
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Cantidad
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Importe
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: 8,
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.clave}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.descripcion}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.unidad}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.costo || item.costo_directo}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="number"
                      min="0"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      style={{ width: 60 }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.importe}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={() => removeBudgetItem(index)}
                      style={{
                        backgroundColor: "#d9534f",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderRadius: 4,
                        marginTop: 10,
                        display: "block",
                        width: "100%",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={clearBudget}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: 4,
            marginTop: 10,
            display: "block",
            width: "100%",
          }}
        >
          LIMPIAR PRESUPUESTO
        </button>
      </div>
    </div>
  );
}

export default CatalogosPres;
