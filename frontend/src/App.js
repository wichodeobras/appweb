import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ConsultaPerfiles from "./pages/ConsultaPerfiles";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Bienvenido a la App de Perfiles IR</h1>
        <nav>
          <ul>
            <li>
              <Link to="/perfiles">Ir a Consulta de Perfiles</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/perfiles" component={ConsultaPerfiles} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
