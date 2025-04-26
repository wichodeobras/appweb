// src/components/BotonLink.js
import React from "react";
import { Link } from "react-router-dom";

const BotonLink = ({
  to,
  children,
  style = {},
  fullWidth = false,
}) => {
  const baseStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#0077b6",
    color: "#ffffff",
    borderRadius: "6px",
    textDecoration: "none",
    textAlign: "center",
    width: fullWidth ? "100%" : "auto",
    ...style,
  };

  return (
    <Link to={to} style={baseStyle}>
      {children}
    </Link>
  );
};

export default BotonLink;
