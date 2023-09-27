
import '../App.css';
import './Model.css';
import hood00 from '../shared/img/hood00.png';
import hood01 from '../shared/img/hood01.png';
import hood02 from '../shared/img/hood02.png';
import HoodData from '../shared/data/hood.json';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

const styles = {
    link: {
        textDecoration: 'none',
    },
    card: {
        width: '20rem',
        height: 'auto'
    }
};

  function HoodModel() {
    var image = [hood00, hood01, hood02];
    return (
        <>
        <div className="container">
             <h1>Neighborhoods</h1>
            <h5>Results: 3</h5>
            <Row xs={1} md={2} lg={3}  className="g-4">
                {HoodData && HoodData.map((Hood) => (
                <Col key={Hood.id}>
                    <Link to={`/hoods/${Hood.id}`} style={styles.link}>
                    <Card style={styles.card}>
                    <Card.Img variant="top" src={image[Hood.id]}/>
                    <Card.Body>
                        <Card.Title>{Hood.name}</Card.Title>
                        <Card.Text>Borough: {Hood.borough}</Card.Text>
                        <Card.Text>Population: {Hood.population}</Card.Text>
                        <Card.Text>Testing Facilities: 3</Card.Text>
                        <Card.Text>Testing Centers: 3</Card.Text>
                    </Card.Body>
                    </Card>
                    </Link>
                </Col>
                ))}
            </Row>
        </div>
        </>
    );
  }
  
  export default HoodModel;
