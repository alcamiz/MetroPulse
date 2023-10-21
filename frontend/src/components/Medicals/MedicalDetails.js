import React from "react";
import "../../instances/Instance.css";
import MedicalPlaceholder from "../../placeholders/medical_placeholder.png"; 

import background from '../../shared/img/test_back.jpeg';
import '../../instances/Instance.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


function MedicalInfo({ medical }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Contact Information</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Phone Number</td>
                <td>{medical.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{medical.address}</td>
              </tr>
              <tr>
                <td>Neighborhood</td>
                <td><Link to={'/hoods/' + medical.parent_neighborhood}>{medical.nta}</Link></td>
              </tr>
              <tr>
                <td>Borough</td>
                <td>{medical.borough}</td>
              </tr>
              <tr>
                <td>Council District</td>
                <td>{medical.council}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Nearby Testing Centers</Accordion.Header>
        <Accordion.Body>
          <ul>
            {medical.nearby_centers.map((center) => (
              <li key={center.id_t}>
                <Link to={`/center/${center.id_t}`}>{center.name}</Link>
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function MedicalDetails({medical}) {
  return (
    <div className="Instance">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <header className="Instance-header">
              <img src={medical.static_map_url || "https://www.google.com/maps/d/thumbnail?mid=1rN8fFwktkFQlwWkL8mlSoximF6E"} className="Instance-logo" alt="logo" /> 
              <h3 className="Instance-title">
                {medical.facility_name}
              </h3>
              <MedicalInfo medical={medical}/>
            </header>
          </div>
          <div class="col-sm">
            <div className="Instance-images">
              <img style={ {display: `block`}} width="400" height="400" src={medical.image_url || "https://s3-prod.modernhealthcare.com/s3fs-public/styles/width_792/public/rural-health2_i.png"} className="Instance-logo" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalDetails;
