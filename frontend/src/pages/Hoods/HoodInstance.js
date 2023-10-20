import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import HoodDetails from "../../components/Hoods/HoodDetails.js";
import { getNeighborhood } from "../../utils/api";

const HoodInstance = () => {
  const { nta_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [neighborhood, setNeighborhood] = useState(null);

  useEffect(() => {
    const fetchNeighborhood = async () => {
      const neighborhood = await getNeighborhood(nta_id);
      // console.log(neighborhood)
      setNeighborhood(neighborhood);
      setLoading(false);
    };
    setLoading(true);
    fetchNeighborhood();
  }, [nta_id]);

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && <HoodDetails hood={neighborhood} />}
    </React.Fragment>
  );
};

export default HoodInstance;