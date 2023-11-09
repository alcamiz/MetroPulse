import React, { useState, useEffect } from "react";
import "../../styles/Model.css";
import "../../styles/SearchModel.css"
import {get_hospitals_length, fetch_hospitals} from "../../utils/pagination.js";
import { searchSpecificModel } from "../../utils/api";
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import MedicalCard from "../../components/Medicals/MedicalCard.js";
import CustomDropDown from "../../components/CustomDropDown";
import SearchBar from "../../components/SearchBar"

function MedicalModel() {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [medicals, setMedicals] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [numMedicals, setNumMedicals] = useState(1);
  const [highlight, setHighlight] = useState("")
  const [isSearchResults, setIsSearchResults] = useState(false);

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
      activity = activity.toUpperCase(); // set borough uppercase to match data for centers
      setBoroughFilter(activity);
    }
  }


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
        const medicals = await fetch_hospitals(
          currPage,
          sort,
          order,
          boroughFilter,
          perPage);
        // console.log(medicals);
        setMedicals(medicals);
        setLoading(false);
      }
    };
    setLoading(true);
    load_medicals();
  }, [loadingPage, currPage, reload]);

  const handleSearch = async (search_value) => {
    setLoading(true);
    setIsSearchResults(true);
    const search_data = await searchSpecificModel(search_value, "hospital");
    let searched_hospitals = search_data["hospitals"]["data"]
    setNumMedicals(Object.keys(searched_hospitals).length)
    setMedicals(searched_hospitals);
    setHighlight(search_value);
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Medical Facilities</h1> 
        <SearchBar model="Hospitals" handleSearch={handleSearch} />
        {/* PHASE 3 - Sorting and Filtering */}
        <div className="dropdownContainer">
          {/* Sort:   */}
          {/* Filter:  */}
          <CustomDropDown
            title="Sort"
            items={["Sort", "Name", "ID", "Borough", "Zipcode"]}
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

           {/* <CustomDropDown
            title="Neighborhood"
            items={[""
            ]}
            func={handleBoroughFilter}
            scroll
          />

            <CustomDropDown
            title="Zipcode"
            items={[""
            ]}
            func={handleBoroughFilter}
            scroll
          /> */}

        </div>
        <button className="filter-submit-button" onClick={handleSubmit}>
          Submit
        </button>

        <h5>Results: {numMedicals} </h5>
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            {!isSearchResults && medicals !== null && (
              <PaginationIndicator
                currPage={currPage}
                setCurrPage={setCurrPage}
                numPages={numPages}
              />
            )}
            <div className="cardBox">
              {medicals !== null &&
                medicals.map((medical, index) => {
                  return (
                    <MedicalCard
                      key={index}
                      medical={medical}
                      highlight={highlight}
                    />
                  );
                })}
            </div>
            {!isSearchResults && medicals !== null && (
              <PaginationIndicator
                currPage={currPage}
                setCurrPage={setCurrPage}
                numPages={numPages}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default MedicalModel;
