import React, { useState, useEffect } from "react";
import {fetch_neighborhoods, get_neighborhoods_length} from "../../utils/pagination.js";
import { getHoods } from "../../utils/api";
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import HoodCard from "../../components/Hoods/HoodCard.js";
import CustomDropDown from "../../components/CustomDropDown";

function HoodModel() {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [hoods, setHoods] = useState(null);
  const [numPages, setNumPages] = useState(null)
  const [numHoods, setNumHoods] = useState(1);

  // PHASE 3

  const [reload, setReload] = useState(0);
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(null);
  const [boroughFilter, setBoroughFilter] = useState(null);
  const [perPage, setPerPage] = useState(20);

  const lower_underlines = (input_string) => {
    return input_string.toLowerCase().replace(/ /g, "_");
  };

  const handleSubmit = () => {
    setReload(reload + 1);
  };

  function handleSort(field) {
    console.log(field);
    if (field === "Sort") {
      setSort(null);
    } 
    else {
      setSort(lower_underlines(field));
    }
  }

  function handleOrder(order) {
    let newOrder = null;
    switch (order) {
      case "Ascending":
        newOrder = "asc";
        break;
      case "Descending":
        newOrder = "desc";
        break;
      default:
        newOrder = null;
    }
    setOrder(newOrder);
  }

  function handleBoroughFilter(activity) {
    if (activity === "Borough") {
      setBoroughFilter(null);
    } else {
      setBoroughFilter(activity);
    }
  }


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
              const hoods = await fetch_neighborhoods(
                currPage,
                sort,
                order,
                boroughFilter,
                perPage);
              // console.log(hoods);
              setHoods(hoods);
              setLoading(false);
          }
      }
      setLoading(true);
      load_hoods(); // parks?
  }, [loadingPage, currPage, reload])
  
  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Neighborhoods</h1>

         {/* PHASE 3 - Sorting and Filtering */}

         {/* Sort: id, name, borough, Population  */}
          {/* Filter: fips code, borough*/}

        <div className="dropdownContainer">

          <CustomDropDown
            title="Sort"
            items={["Sort", "Name", "ID", "Borough",  "Population"]}
            func={handleSort}
          />

          <CustomDropDown
            title="Order"
            items={["Order", "Ascending", "Descending"]}
            func={handleOrder}
          />

          <CustomDropDown
            title="Borough"
            items={["Borough", "Brooklyn", "Bronx", "Manhattan", "Queens"
            ]}
            func={handleBoroughFilter}
            scroll
          />

           <CustomDropDown
            title="FIPS Code"
            items={[""
            ]}
            func={handleBoroughFilter}
            scroll
          />

        </div>
        <button className="filter-submit-button" onClick={handleSubmit}>
          Submit
        </button>

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
