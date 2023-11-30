import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {highlightWords} from "../../utils/highlightWords"

const styles = {
  link: {
      textDecoration: 'none',
  },
  card: {
      width: '20rem',
      height: '40rem'
  }
};


function CenterCard({ center, highlight }) {

  console.log(highlight);
  return (
    <Link to={`/test/${center.id_t}`} style={styles.link}>
      <Card style={styles.card}>
        <Card.Img variant="top" src={center.static_map_url} />
        <Card.Body>
          <Card.Title dangerouslySetInnerHTML={{__html: highlightWords(center.name, highlight)}}/>
          <Card.Text dangerouslySetInnerHTML={{ __html: highlightWords(`Borough: ${center.borough}`, highlight) }}/>
          <Card.Text>Council Number: {center.council}</Card.Text>
          <Card.Text>Zipcode: {center.zip_code}</Card.Text>
          <Card.Text>Nearby Medical Facilities: {(center.nearby_hospitals == null) ? 0 : center.nearby_hospitals.filter((hospital, index, self) => {
              return self.findIndex((h) => h.name === hospital.name) === index;
            }).length}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CenterCard;
