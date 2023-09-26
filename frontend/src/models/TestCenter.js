
import test00 from '../shared/img/test00.png';
import test01 from '../shared/img/test01.png';
import test02 from '../shared/img/test02.png';
import '../App.css';
import CenterData from '../shared/data/test.json';
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
 
  function CenterModel() {
    var image = [test00, test01, test02];
    return (
        <>
        <div className="container">
            <h1>Testing Centers</h1>
            <h5>Results: 3</h5>
            <Row xs={1} md={2} lg={3}  className="g-4">
                {CenterData && CenterData.map((center) => (
                <Col key={center.id}>
                    <Link to={`/test/${center.id}`} style={styles.link}>
                    <Card style={styles.card}>
                    <Card.Img variant="top" src={image[center.id]}/>
                    <Card.Body>
                        <Card.Title>{center.name}</Card.Title>
                        <Card.Text>Borough: {center.borough}</Card.Text>
                        <Card.Text>Council Number: {center.council}</Card.Text>
                        <Card.Text>Zipcode: {center.zip}</Card.Text>
                        <Card.Text>Nearby Medical Facilities: 3</Card.Text>
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
  
  export default CenterModel;
