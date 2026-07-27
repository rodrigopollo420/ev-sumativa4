import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MascotasPage from "./pages/MascotasPage";
import MascotasDetail from "./components/mascotas/MascotasDetail";

function App() {

  return (
    <>
      <Router>
        <div className="app-layout">
          <nav>
            <NavLink to={"/mascotas"} className="navbar-mascotas">Mascotas Perdidas</NavLink>
          </nav>
          <div className="app-contenido">
            <Routes>
              <Route path="/mascotas" element={<MascotasPage />} />
              <Route path="/mascotas/:id" element={<MascotasDetail />} />
            </Routes>
          </div>
          
          <footer className="footer-mascotas">
            "Hasta que uno no ha amado a un animal, una parte del alma permanece dormida."
            <span>— Anatole France</span>
          </footer>
        </div>
      </Router>
    </>
  )
}

export default App
