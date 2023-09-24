import test00 from '../shared/img/test00.png';
import test01 from '../shared/img/test01.png';
import test02 from '../shared/img/test02.png';
import background from '../shared/img/test_back.jpeg';

import './Instance.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

function CenterInfo({info}) {
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
                <td>{info.address}, {info.nta}, NY {info.zip}</td>
              </tr>
              <tr>
                <td>Borough</td>
                <td>{info.borough}</td>
              </tr>
              <tr>
                <td>Council District</td>
                <td>{info.council}</td>
              </tr>
              <tr>
                <td>Instructions</td>
                <td>{info.howto}</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Nearby Medical Facilities</Accordion.Header>
        <Accordion.Body>
        <ul>
            <li>Children's Hospital</li>
            <li>Mayo Clinic</li>
            <li>Test</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function CenterInstance({index}) {

  var images = [test00, test01, test02];
  var test = require('../shared/data/test.json');

  var info = test[index]
  var image = images[info.id]

  return (
    <div className="Instance" style={{backgroundImage: `url(${background})`}}>
      <header className="Instance-header">
        <img src={image} className="Instance-logo" alt="logo" />
        <h3 className="Instance-title">
          {info.name}
        </h3>

        <CenterInfo info={info}/>
        
      </header>
    </div>
  );
}

export default CenterInstance;
