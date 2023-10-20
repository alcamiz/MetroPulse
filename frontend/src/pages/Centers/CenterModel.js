import React, { useState, useEffect } from "react";
import "../../instances/Instance.css";
import "../../styles/Model.css";
import {fetch_centers, get_centers_length} from "../../utils/pagination.js";
import { getCenters } from "../../utils/api";
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import CenterCard from "../../components/Centers/CenterCard.js";

function CenterModel() {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [centers, setCenters] = useState(null);
  const [numPages, setNumPages] = useState(null)
  const [numCenters, setNumCenters] = useState(1);

  useEffect(() => {
      const load_num_centers = async () => {
          const num_centers = await get_centers_length(); // write function
          setNumCenters(num_centers);
          setNumPages(Math.ceil(num_centers/25.0));
          setLoadingPage(false);
      }
      setLoadingPage(true);
      setLoading(true);
      load_num_centers();
  }, [])

  useEffect(() => {
      const load_centers = async () => { // prolly medical centers?
          if (!loadingPage) {
              const centers = await fetch_centers(currPage);
              // console.log(centers);
              setCenters(centers);
              setLoading(false);
          }
      }
      setLoading(true);
      load_centers(); // parks?
  }, [loadingPage, currPage])
  
  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Testing Centers</h1>
        <h5>Results: {numCenters} </h5>
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
              {centers !== null &&
                centers.map((center, index) => {
                  return (
                    <CenterCard
                      key={index}
                      center={center}
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

export default CenterModel;
