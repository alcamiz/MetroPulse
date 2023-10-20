import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import CenterDetails from "../../components/Centers/CenterDetails.js";
import { getCenter } from "../../utils/api";

const CenterInstance = () => {
  const { test_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const fetchCenter = async () => {
      const center = await getCenter(test_id);
      // console.log(center)
      setCenter(center);
      setLoading(false);
    };
    setLoading(true);
    fetchCenter();
  }, [test_id]);

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && <CenterDetails center={center} />}
    </React.Fragment>
  );
};

export default CenterInstance;