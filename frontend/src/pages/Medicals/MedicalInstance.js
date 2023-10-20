import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import MedicalDetails from "../../components/Medicals/MedicalDetails.js";
import { getMedical } from "../../utils/api";

const MedicalInstance = () => {
  const { medical_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [medical, setMedical] = useState(null);

  useEffect(() => {
    const fetchMedical = async () => {
      const medical = await getMedical(medical_id);
      // console.log(medical)
      setMedical(medical);
      setLoading(false);
    };
    setLoading(true);
    fetchMedical();
  }, [medical_id]);

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && <MedicalDetails medical={medical} />}
    </React.Fragment>
  );
};

export default MedicalInstance;
