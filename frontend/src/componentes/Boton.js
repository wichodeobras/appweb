// src/components/Boton.js
import React from "react";

const Boton = ({
    children,
    onClick,
    type = "button",
    style = {},
    disabled = false,
    fullWidth = true,
}) => {
    const baseStyle = {
        padding: "10px",
        backgroundColor: "#0077b6",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "10px",
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...style,
    };

    return (
        <button type={type} style={baseStyle} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Boton;
