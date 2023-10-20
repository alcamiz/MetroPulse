import '../App.css';
import CenterCard from '../components/Centers/CenterCard';
import CenterPlaceholder from "../placeholders/center_placeholder.png";
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
    return (
        <div className="container">
            <h1>Testing Centers</h1>
            <h5>Results: {CenterData.size} </h5>
            <Row xs={1} md={2} lg={3}  className="g-4">
                {CenterData && CenterData.data.map((center) => (
                <Col key={center.id_t}>
                    <Link to={`/test/${center.id_t}`} style={styles.link}>
                    <CenterCard center={center} />
                    </Link>
                </Col>
                ))}
            </Row>
        </div>
    );
  }
  
  export default CenterModel;
