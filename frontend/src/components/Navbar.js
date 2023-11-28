import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function NavBar() {
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
    <Navbar bg="dark" variant="dark" expand="lg" data-testid="navbar">
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
              <Nav.Link href="/vis/">Visualizations</Nav.Link>
              <Nav.Link href="/prov/">Provider Visualizations</Nav.Link>
              <Nav.Link href="/about/">About</Nav.Link>
            </Nav>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
