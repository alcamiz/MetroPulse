import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AppLogo from '../shared/svg/pulse-svgrepo-com.svg'
import "../styles/NavBar.css";

function NavBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchWarning, setSearchWarning] = useState('')

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    if (event.target.value.trim()) {
      setSearchWarning(''); // Clear warning if user starts typing
    }
  };

  const handleSearchSubmit = (event) => {
    if(!searchValue.trim()) {
      event.preventDefault();
      setSearchWarning("Please enter a search term.");
    }
  };

  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" data-testid="navbar">
      <Navbar.Brand style={{ marginLeft: '20px' }} href="/">
        <img
          src={AppLogo}
          alt = "MetroPulse"
          style ={{ height: "40px", width: "80px"}}
        />
        MetroPulse
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/medical/">Medical Facilities</Nav.Link>
              <Nav.Link href="/test/">Test Centers</Nav.Link>
              <Nav.Link href="/hoods/">Neighborhoods</Nav.Link>
              <Nav.Link href="/vis/">Visualizations</Nav.Link>
              <Nav.Link href="/prov/">Provider Visualizations</Nav.Link>
              <Nav.Link href="/about/">About</Nav.Link>
            </Nav>
          </div>
      </Navbar.Collapse>
      <div className='nav-search nav-search-input'>
        <input
          style={{ display: 'inline' }}
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearchChange}
          value={searchValue}
        />
        <Link to={searchValue.trim() ? `/search/${searchValue}` : '#'}>
          <button className='nav-search-confirm' onClick={handleSearchSubmit}>
            Search
          </button>
        </Link>
        {searchWarning && <div className="search-warning">{searchWarning}</div>}
      </div>
    </Navbar>
  );
}

export default NavBar;
