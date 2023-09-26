
import '../App.css';
import './Model.css';
import hood00 from '../shared/img/hood00.png';
import hood01 from '../shared/img/hood01.png';
import hood02 from '../shared/img/hood02.png';
import HoodData from '../shared/data/hood.json';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

  
  function HoodModel() {
    // const cardLink
    var image = [hood00, hood01, hood02];
    return (
        <>
        <div className="container">
             <h1>Neigborhoods</h1>
            <h5>Results: 3</h5>
            <Row xs={1} md={2} lg={3}  className="g-4">
                {HoodData && HoodData.map((Hood) => (
                <Col key={Hood.id}>
                    {/* <Link to = {cardLink}> */}
                    {/* <a href=''> */}
                    <Card className="small-card">
                    <Card.Img variant="top" src={image[Hood.id]}/>
                    <Card.Body>
                        <Card.Title>{Hood.name}</Card.Title>
                        <Card.Text>Borough: {Hood.borough}</Card.Text>
                        <Card.Text>Testing Facilities: 3</Card.Text>
                        <Card.Text>Testing Centers: 3</Card.Text>

                    </Card.Body>
                    </Card>
                    {/* </a> */}
                    {/* </Link> */}
                </Col>
                ))}
            </Row>
        </div>
        </>
    );
  }
  
  export default HoodModel;
