import hood00 from '../shared/img/hood00.png';
import hood01 from '../shared/img/hood01.png';
import hood02 from '../shared/img/hood02.png';
import background from '../shared/img/hood_back.jpeg';

import './Instance.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function HoodInfo({info}) {

  var l_tests = []
  var l_medical = []

  var tests = require('../shared/data/test.json');
  var medical = require('../shared/data/medic.json');

  for (let i = 0; i < tests.length; i++) {
    let val = tests[i]
    if (val.nta === info.name) {
      l_tests.push(i)
    }
  }

  for (let i = 0; i < medical.length; i++) {
    let val = medical[i]
    if (val.nta === info.name) {
      l_medical.push(i)
    }
  }

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
              <tr>
                <td>Population</td>
                <td>{info.population}</td>
              </tr>
              <tr>
                <td>Area Codes</td>
                <td>{info.acodes.map(item => {return item + " ";})}</td>
              </tr>
              <tr>
                <td>Coordinates</td>
                <td>(N: {info.xcord}, W: {info.ycord})</td>
              </tr>
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Testing Facilities</Accordion.Header>
        <Accordion.Body>
          <ul>
            {l_tests.map((idx, _) => ( <li><Link to={'/test/' + idx}>{tests[idx].name}</Link></li> ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Medical Facilities</Accordion.Header>
        <Accordion.Body>
          <ul>
          {l_tests.map((idx, _) => ( <li><Link to={'/medical/' + idx}>{medical[idx].name}</Link></li> ))}
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
      <div className="Instance-images">
        <img style={{display: `block`}} src={info.img1} className="Instance-logo" alt="logo" />
        <img style={{display: `block`}} src={info.img2} className="Instance-logo" alt="logo" />
      </div>

    </div>
  );
}

export default HoodInstance;
