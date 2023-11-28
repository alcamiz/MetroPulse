import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import HomePage from './homepage/HomePage';
import HoodInstance from './pages/Hoods/HoodInstance';
import CenterInstance from './pages/Centers/CenterInstance';
import MedicalInstance from './pages/Medicals/MedicalInstance'
import CenterModel from './pages/Centers/CenterModel';
import HoodModel from './pages/Hoods/HoodModel';
import MedicalModel from './pages/Medicals/MedicalModel';
import About from './about/AboutPage';
import Navbar from "./components/Navbar"
import SearchPage from "./pages/SearchPage.js";
import Vis from './pages/VisualizationPage';
import ProviderVis from './pages/ProviderPage';



function App() {

  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Use the BootstrapNavbar here */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<CenterModel />} />
            <Route path="/medical" element={<MedicalModel />} />
            <Route path="/hoods" element={<HoodModel />} />
            <Route path="/about" element={<About />} />
            <Route path="/test/:test_id" element={<CenterInstance />}/>
            <Route path="/medical/:medical_id" element={<MedicalInstance />}/>
            <Route path="/hoods/:nta_id" element={<HoodInstance />}/>
            <Route path="/vis" element={<Vis/>} />
            <Route path="/prov" element={<ProviderVis />} />
            <Route path="/search/:search_term" element={<SearchPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
