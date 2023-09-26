import medic00 from '../shared/img/medic00.png';
import medic01 from '../shared/img/medic01.png';
import medic02 from '../shared/img/medic02.png';
import background from '../shared/img/hospital_back.jpeg';

import './Instance.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function MedicalInfo({info}) {
  const nta_map = {"Woodside": 0, "Astoria": 1, "Corona" : 2}
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Contact Information</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Phone Number</td>
                <td>{info.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{info.address}</td>
              </tr>
              <tr>
                <td>Neighborhood</td>
                <td><Link to={'/hoods/' + nta_map[info.nta]}>{info.nta}</Link></td>
              </tr>
              <tr>
                <td>Borough</td>
                <td>{info.borough}</td>
              </tr>
              <tr>
                <td>Council District</td>
                <td>{info.council}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Nearby Testing Facilities</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li><Link to='/test/0'>Duane Reade</Link></li>
            <li><Link to='/test/1'>Wellness Center Pharmacy</Link></li>
            <li><Link to='/test/2'>Platinum Pharmacy</Link></li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function MedicalInstance({index}) {

  var images = [medic00, medic01, medic02];
  var test = require('../shared/data/medic.json');

  var info = test[index]
  var image = images[info.id]

  return (
    <div className="Instance" style={{backgroundImage: `url(${background})`}}>
      <header className="Instance-header">
        <img src={image} className="Instance-logo" alt="logo" />
        <h3 className="Instance-title">
          {info.name}
        </h3>
        <MedicalInfo info={info}/>
      </header>
      <div className="Instance-images">
        <img style={{display: `block`}} src={info.img1} className="Instance-logo" alt="logo" />
      </div>
    </div>
  );
}

export default MedicalInstance;
