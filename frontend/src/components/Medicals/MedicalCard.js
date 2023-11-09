import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MedicalPlaceholder from "../../placeholders/medical_placeholder.png";
import {highlightWords} from "../../utils/highlightWords"

const styles = {
  link: {
      textDecoration: 'none',
  },
  card: {
      width: '20rem',
      height: 'auto'
  }
};

function MedicalCard({ medical, highlight }) {

  return (
    <Link to={`/medical/${medical.id_t}`} style={styles.link}>
    <Card style={styles.card}>
      <Card.Img variant="top" width="400" height="400" src={medical.static_map_url || "https://www.google.com/maps/d/thumbnail?mid=1rN8fFwktkFQlwWkL8mlSoximF6E"} />
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{__html: highlightWords(medical.name, highlight)}}/>
        <Card.Text>Borough: {medical.borough}</Card.Text>
        <Card.Text>Council District: {medical.council_district}</Card.Text>
        <Card.Text>Zipcode: {medical.zip_code}</Card.Text>
        <Card.Text>Nearby Testing Centers: {(medical.nearby_centers == null) ? 0 : medical.nearby_centers.filter((center, index, self) => {
              return self.findIndex((c) => c.name === center.name) === index;
            }).length}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
}

export default MedicalCard;
