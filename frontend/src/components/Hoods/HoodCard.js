import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import HoodPlaceholder from "../../placeholders/neighborhood_placeholder.png"; 
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

function HoodCard( { hood, highlight } ) {

  return (
    <Link to={`/hoods/${hood.id_t}`} style={styles.link}>
      <Card style={styles.card}>
        <Card.Img variant="top" src={hood.static_map_url} />
        <Card.Body>
          <Card.Title dangerouslySetInnerHTML={{__html: highlightWords(hood.nta_name, highlight)}}/>
          <Card.Text dangerouslySetInnerHTML={{ __html: highlightWords(`Borough: ${hood.borough}`, highlight) }}/>
          <Card.Text>Population: {hood.population}</Card.Text>
          <Card.Text>County Code: {hood.fips_county_code}</Card.Text>
          <Card.Text>NTA Code: {hood.nta_code}</Card.Text>
          <Card.Text>Nearby Hospitals: { (hood.nearby_hospitals == null)? 0 : hood.nearby_hospitals.filter((hospital, index, self) => {
              return self.findIndex((h) => h.name === hospital.name) === index;
            }).length}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default HoodCard;
