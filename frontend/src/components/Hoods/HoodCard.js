import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import HoodPlaceholder from "../../placeholders/neighborhood_placeholder.png"; 

const styles = {
  link: {
      textDecoration: 'none',
  },
  card: {
      width: '20rem',
      height: 'auto'
  }
};

function HoodCard( {hood} ) {
  // center

  return (
    <Link to={`/hoods/${hood.id_t}`} style={styles.link}>
      <Card style={styles.card}>
        <Card.Img variant="top" src={hood.static_map_url} />
        <Card.Body>
          <Card.Title>{hood.nta_name}</Card.Title>
          <Card.Text>Borough: {hood.borough}</Card.Text>
          <Card.Text>Population: {hood.population}</Card.Text>
          <Card.Text>County Code: {hood.fips_county_code}</Card.Text>
          <Card.Text>NTA Code: {hood.nta_code}</Card.Text>
          <Card.Text>Nearby Hospitals: { (hood.nearby_hospitals == null)? 0 : hood.nearby_hospitals.length}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default HoodCard;
