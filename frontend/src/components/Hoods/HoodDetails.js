import React from "react";

import '../../instances/Instance.css';
import HoodPlaceholder from "../../placeholders/neighborhood_placeholder.png";

import background from '../../shared/img/test_back.jpeg';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


function HoodInfo({ hood }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
          <p>{hood.desc}</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Information</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Borough</td>
                <td>{hood.borough}</td>
              </tr>
              <tr>
                <td>Population</td>
                <td>{hood.population}</td>
              </tr>
              <tr>
                <td>County Code</td>
                <td>{hood.flips_county_code}</td>
              </tr>
              <tr>
                <td>NTA Code</td>
                <td>{hood.nta_code}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Nearby Testing Centers</Accordion.Header>
        <Accordion.Body>
          <ul>
            {hood.nearby_centers == null
              ? 0
              : hood.nearby_centers
                .filter((center, index, self) => {
                  // Filter to keep only the first occurrence of each center.name
                  return self.findIndex((c) => c.name === center.name) === index;
                })
                .map((center) => (
                  <li key={center.id_t}>
                    <Link to={`/test/${center.id_t}`}>{center.name}</Link>
                  </li>
                ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Nearby Hospitals</Accordion.Header>
        <Accordion.Body>
          <ul>
            {hood.nearby_hospitals == null
              ? 0
              : hood.nearby_hospitals
                .filter((hospital, index, self) => {
                  // Filter to keep only the first occurrence of each hospital.name
                  return self.findIndex((h) => h.name === hospital.name) === index;
                })
                .map((hospital) => (
                  <li key={hospital.id_t}>
                    <Link to={`/medical/${hospital.id_t}`}>{hospital.name}</Link>
                  </li>
                ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function HoodDetails({ hood }) {
  return (
    <div className="Instance">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <header className="Instance-header">
              <img src={hood.static_map_url || HoodPlaceholder} className="Instance-logo" alt="logo" />  {/*FIX MAP URL */}
              <h3 className="Instance-title">
                {hood.nta_name}
              </h3>
              <HoodInfo hood={hood} />
            </header>
          </div>
          <div class="col-sm">
            <div className="Instance-images">
              <img style={{ display: `block` }} width="400" height="400" src={hood.image_url || "https://www.elikarealestate.com/blog/wp-content/uploads/2015/09/village-streets-nyc.jpg"} className="Instance-logo" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoodDetails;
