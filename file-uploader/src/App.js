import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/index.css'
import Home from './components/Home';
import Upload from './components/Upload';
import Ser_Tecnico from './components/Ser_Tecnico';
import Cotizaciones from './components/Cotizaciones';
import Contacto from './components/Contacto';


import logo from "./logo.jpg";

const App = () => {
    return (
        <Router>
            <div>
                <header style={{ display: "flex", alignItems: "center", padding: "10px 20px", borderBottom: "2px solid #ddd" }}>
                    {/* Logo */}
                    <div style={{ marginRight: "20px" }}>
                        <img src={logo} alt="Logo" style={{ height: "50px" }} />
                    </div>
                    
                    {/* Navegación */}
                    <nav style={{ flexGrow: 1}}>
                        <ul>
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/Ser_Tecnico">Servicio Técnico</Link>
                            </li>
                            <li>
                                <Link to="/upload">Manuales</Link>
                            </li>
                            <li>
                                <Link to="/Cotizaciones">Cotizaciones</Link>
                            </li>
                            <li>
                                <Link to="/Contacto">Contacto</Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                {/* Definición de rutas */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="Ser_Tecnico" element={<Ser_Tecnico />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/Cotizaciones" element={<Cotizaciones />} />
                        <Route path="/Contacto" element={<Contacto />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;



