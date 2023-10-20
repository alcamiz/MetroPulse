import React from "react";
import "../../instances/Instance.css";
import CenterPlaceholder from "../../placeholders/center_placeholder.png"; // ADD PLACEHOLDER IMAGE

import background from '../../shared/img/test_back.jpeg';
import '../../instances/Instance.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


function CenterInfo({ center }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Contact Information</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Phone Number</td>
                <td>{center.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{center.address}, {center.nta_name}, NY {center.zip_code}</td>
              </tr>
              <tr>
                <td>Neighborhood</td>
                <td><Link to={'/hoods/' + center.nta_map[center.info.nta]}>{center.info.nta}</Link></td>
              </tr>
              <tr>
                <td>Borough</td>
                <td>{center.borough}</td>
              </tr>
              <tr>
                <td>Council District</td>
                <td>{center.council}</td>
              </tr>
              <tr>
                <td>Instructions</td>
                <td>{center.howto}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Nearby Medical Facilities</Accordion.Header>
        <Accordion.Body>
          <ul>
            {center.nearby_hospitals.map((hospital) => (
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

function CenterDetails({ center }) {
  return (
    <div className="Instance" style={{ backgroundImage: `url(${background})` }}>
      <header className="Instance-header">
        <img src={center.map_url} className="Instance-logo" alt="logo" />  {/*FIX MAP URL */}
        <h3 className="Instance-title">
          {center.name}
        </h3>
        <CenterInfo center={center} />
      </header>
      <div className="Instance-images">
        <img style={{ display: `block` }} src={center.image_url} className="Instance-logo" alt="logo" />
      </div>
    </div>
  );
}

export default CenterDetails;
