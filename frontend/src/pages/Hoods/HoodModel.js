import React, { useState, useEffect } from "react";
import {fetch_neighborhoods, get_neighborhoods_length} from "../../utils/pagination.js";
import { getHoods } from "../../utils/api";
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import HoodCard from "../../components/Hoods/HoodCard.js";

function HoodModel() {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [hoods, setHoods] = useState(null);
  const [numPages, setNumPages] = useState(null)
  const [numHoods, setNumHoods] = useState(1);


  useEffect(() => {
      const load_num_hoods = async () => {
          const num_hoods = await get_neighborhoods_length(); // write function
          setNumHoods(num_hoods);
          setNumPages(Math.ceil(num_hoods/25.0));
          setLoadingPage(false);
      }
      setLoadingPage(true);
      setLoading(true);
      load_num_hoods();
  }, [])

  useEffect(() => {
      const load_hoods = async () => { // prolly medical hoods?
          if (!loadingPage) {
              const hoods = await fetch_neighborhoods(currPage);
              // console.log(hoods);
              setHoods(hoods);
              setLoading(false);
          }
      }
      setLoading(true);
      load_hoods(); // parks?
  }, [loadingPage, currPage])
  
  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Neighborhoods</h1>
        <h5>Results: {numHoods} </h5>
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
              {hoods !== null &&
                hoods.map((hood, index) => {
                  return (
                    <HoodCard
                      key={index}
                      hood={hood}
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

export default HoodModel;
