import React, { useState, useEffect } from "react";
import "../../styles/Model.css";
import {get_hospitals_length, fetch_hospitals} from "../../utils/pagination.js";
import { getCenters } from "../../utils/api";
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import MedicalCard from "../../components/Medicals/MedicalCard.js";

function MedicalModel() {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [medicals, setMedicals] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [numMedicals, setNumMedicals] = useState(1);

  useEffect(() => {
    const load_num_medicals = async () => {
      const num_medicals = await get_hospitals_length();
      setNumMedicals(num_medicals);
      setNumPages(Math.ceil(num_medicals / 25.0));
      setLoadingPage(false);
    };
    setLoadingPage(true);
    setLoading(true);
    load_num_medicals();
  }, []);

  useEffect(() => {
    const load_medicals = async () => {
      if (!loadingPage) {
        const medicals = await fetch_hospitals(currPage);
        // console.log(medicals);
        setMedicals(medicals);
        setLoading(false);
      }
    };
    setLoading(true);
    load_medicals();
  }, [loadingPage, currPage]);

  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Medical Facilities</h1> 
        <h5>Results: {numMedicals} </h5>
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <div className="pagination-ind">
              <PaginationIndicator
                currPage={currPage}
                setCurrPage={setCurrPage}
                numPages={numPages}
              />
            </div>
            <div className="cardBox">
              {medicals !== null &&
                medicals.map((medical, index) => {
                  return (
                    <MedicalCard
                      key={index}
                      medical={medical}
                    />
                  );
                })}
            </div>
            <PaginationIndicator
              currPage={currPage}
              setCurrPage={setCurrPage}
              numPages={numPages}
            />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default MedicalModel;
