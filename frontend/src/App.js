import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import HomePage from './homepage/HomePage';
import HoodInstance from './instances/Hoods';
import CenterInstance from './instances/TestCenter';
import MedicalInstance from './instances/Facilities';
import CenterModel from './models/TestCenter';
import HoodModel from './models/Hoods';
import FacilityModel from './models/Facilities';
import About from './about/AboutPage';
import search from './shared/svg/search-svgrepo-com.svg';

// change links here, make routes in app
function BootstrapNavbar() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const enterSearchMode = () => {
      setIsSearchMode(true);
  };

  const exitSearchMode = () => {
      setIsSearchMode(false);
      setSearchValue('');
  };

  const handleSearchChange = (e) => {
      setSearchValue(e.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand style={{ marginLeft: '20px' }} href="/">MetroPulse</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isSearchMode ? (
          <div className="mr-auto" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchValue}
              onChange={handleSearchChange}
              onBlur={exitSearchMode}
            />
            <Button variant="outline-info" onClick={exitSearchMode}>Close</Button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/medical/">Medical Facilities</Nav.Link>
              <Nav.Link href="/test/">Test Centers</Nav.Link>
              <Nav.Link href="/hoods/">Neighborhoods</Nav.Link>
              <Nav.Link href="/about/">About</Nav.Link>
            </Nav>
            <img src={search} alt="Search Icon" style={{ width: '32px', height: '32px', cursor: 'pointer' }} onClick={enterSearchMode} />
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

function App() {

  var routes = [];
  const t_names = [{name: "test", comp: <CenterInstance/>}, {name: "medical", comp: <MedicalInstance/>}, {name: "hoods", comp: <HoodInstance/>}]


  for (var i=0; i < 3; i++) {
    for (var j=0; j < 3; j++) {
      routes.push({ path: "/" + t_names[i].name + "/" + j, exact: true, component: React.cloneElement(t_names[i].comp, {index: j})})
      console.log(routes[i])
    }
  }

  return (
    <div className="App">
      <Router>
        <BootstrapNavbar /> {/* Use the BootstrapNavbar here */}
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<CenterModel />} />
            <Route path="/medical" element={<FacilityModel/>} />
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
