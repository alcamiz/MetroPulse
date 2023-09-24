import hood00 from '../shared/img/hood00.png';
import hood01 from '../shared/img/hood01.png';
import hood02 from '../shared/img/hood02.png';
import background from '../shared/img/hood_back.jpeg';


import './Instance.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

function HoodInfo({info}) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
          <p>{info.desc}</p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Information</Accordion.Header>
        <Accordion.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Borough</td>
                <td>{info.borough}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Testing Facilities</Accordion.Header>
        <Accordion.Body>
        <ul>
            <li>CVS</li>
            <li>Walgreens</li>
            <li>Inkafarma</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Medical Facilities</Accordion.Header>
        <Accordion.Body>
        <ul>
            <li>Children's Hospital</li>
            <li>Mayo Clinic</li>
            <li>HonorHealth</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function HoodInstance({index}) {

  var images = [hood00, hood01, hood02];
  var test = require('../shared/data/hood.json');

  var info = test[index]
  var image = images[info.id]

  return (
    <div className="Instance" style={{backgroundImage: `url(${background})`}}>
      <header className="Instance-header">
        <img src={image} className="Instance-logo" alt="logo" />
        <h3 className="Instance-title">
          {info.name}
        </h3>
          <HoodInfo info={info}/>
      </header>
    </div>
  );
}

export default HoodInstance;
