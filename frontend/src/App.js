import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("https://django-backend.onrender.com/api/message/")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <div>
      <h1>React + Django</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
