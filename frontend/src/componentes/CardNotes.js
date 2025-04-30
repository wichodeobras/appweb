// src/componentes/CardNotes.js

import React from "react";

function CardNotes({ children }) {
  const styles = {
    sectionnotes: {
      width: "auto",
      height: "auto",
      padding: "15px",
      margin: "15px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      border: "1px solid #90e0ef",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  };

  return (
    <section style={styles.sectionnotes}>
      {children}
    </section>
  );
}

export default CardNotes;
