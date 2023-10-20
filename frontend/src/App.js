import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import HomePage from './homepage/HomePage';
import HoodInstance from './instances/Hoods';
import CenterInstance from './pages/Centers/CenterInstance';
import MedicalInstance from './instances/Facilities';
import CenterModel from './models/TestCenter';
import HoodModel from './models/Hoods';
import FacilityModel from './models/Facilities';
import About from './about/AboutPage';
import Navbar from "./components/Navbar"

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Use the BootstrapNavbar here */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<CenterModel />} />
            <Route path="/medical" element={<FacilityModel />} />
            <Route path="/hoods" element={<HoodModel />} />
            <Route path="/about" element={<About />} />
            <Route path="/test/:test_id" element={<CenterInstance />}/>
          {/*  <Route path="/medical/:id_t" element={<MedicalInstance />}/>*/}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
