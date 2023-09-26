
import medic00 from '../shared/img/medic00.png';
import medic01 from '../shared/img/medic01.png';
import medic02 from '../shared/img/medic02.png';
import '../App.css';
import MedicData from '../shared/data/medic.json';
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

  function FacilityModel() {
    var image = [medic00, medic01, medic02];
    return (
        <>
        <div className="container">
            <h1>Medical Facilities</h1>
            <h5>Results: 3</h5>
            <Row xs={1} md={2} lg={3}  className="g-4">
                {MedicData && MedicData.map((facility) => (
                <Col key={facility.id}>
                    <Link to={`/medical/${facility.id}`} style={styles.link}>
                    <Card style={styles.card}>
                    <Card.Img variant="top" src={image[facility.id]}/>
                    <Card.Body>
                        <Card.Title>{facility.name}</Card.Title>
                        <Card.Text>Borough: {facility.borough}</Card.Text>
                        <Card.Text>Council Number: {facility.council}</Card.Text>
                        <Card.Text>Zipcode: {facility.zip}</Card.Text>
                        <Card.Text>Nearby Testing Facilities: 3</Card.Text>
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
  
  export default FacilityModel;
