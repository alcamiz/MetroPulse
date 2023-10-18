import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import HomePage from './homepage/HomePage';
import HoodInstance from './instances/Hoods';
import CenterInstance from './instances/TestCenter';
import MedicalInstance from './instances/Facilities';
import CenterModel from './models/TestCenter';
import HoodModel from './models/Hoods';
import FacilityModel from './models/Facilities';
import About from './about/AboutPage';
import Navbar from "./components/Navbar"

function App() {

  var routes = [];
  const t_names = [{ name: "test", comp: <CenterInstance /> }, { name: "medical", comp: <MedicalInstance /> }, { name: "hoods", comp: <HoodInstance /> }]


  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      routes.push({ path: "/" + t_names[i].name + "/" + j, exact: true, component: React.cloneElement(t_names[i].comp, { index: j }) })
      console.log(routes[i])
    }
  }

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
            {routes.map((route, idx) => (
              <Route path={route.path} exact element={route.component} />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
