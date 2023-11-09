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
  const [neighborhoodFilter, setNeighborhoodFilter] = useState(null);
  const [zipcodeFilter, setZipcodeFilter] = useState(null);
  const [perPage, setPerPage] = useState(20);

// for Neighborhood filtering dropdown
const getUniqueNeighborhoods = () => {
  const uniqueNeighborhoods = new Set();
  const neighborhoods = medicals
    ? medicals
        .filter((medical) => medical.nta_name !== null)
        .map((medical) => medical.nta_name)
        .filter((neighborhood) => {
          if (uniqueNeighborhoods.has(neighborhood)) {
            return false; // Skip if already added
          }
          uniqueNeighborhoods.add(neighborhood);
          return true;
        })
        .sort()
    : [];

  return ["Neighborhood", ...neighborhoods];
};

// for Zipcode filtering dropdown
const getUniqueZipcodes = () => {
  const uniqueZipcodes = new Set();
  const zipcodes = medicals
    ? medicals
        .filter((medical) => medical.zip_code !== null)
        .map((medical) => medical.zip_code)
        .filter((zipcode) => {
          if (uniqueZipcodes.has(zipcode)) {
            return false; // Skip if already added
          }
          uniqueZipcodes.add(zipcode);
          return true;
        })
        .sort()
    : [];

  return ["Zipcode", ...zipcodes];
};

  const lower_underlines = (input_string) => {
    return input_string.toLowerCase().replace(/ /g, "_");
  };

  const handleSubmit = () => {
    setReload(reload + 1);
  };

  function handleSort(field) {
    // console.log(field);
    // console.log(field === "Zipcode");
    if (field === "Sort") {
      setSort(null);
    } 
    else {
      if (field === "Zipcode") {
        // console.log("Zip");
        field = "Zip";
      }
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

  function handleNeighborhoodFilter(activity) {
    console.log(activity);
    if (activity === "Neighborhood") {
      setNeighborhoodFilter(null);
    } else {
      setNeighborhoodFilter(activity);
    }
  }

  function handleZipcodeFilter(activity) {
    console.log(activity);
    if (activity === "Zipcode") {
      setZipcodeFilter(null);
    } else {
      setZipcodeFilter(activity);
    }
  }


  useEffect(() => {
    const load_num_medicals = async () => {
      const num_medicals = await get_hospitals_length(
        boroughFilter,
        neighborhoodFilter,
        zipcodeFilter);
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
        const num_medicals = await get_hospitals_length(
          boroughFilter,
          neighborhoodFilter,
          zipcodeFilter);
          setNumMedicals(num_medicals);
          setNumPages(Math.ceil(num_medicals/25.0));
          setLoadingPage(false);
        const medicals = await fetch_hospitals(
          currPage,
          sort,
          order,
          boroughFilter,
          neighborhoodFilter,
          zipcodeFilter,
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

          <CustomDropDown
            title="Neighborhood"
            items={getUniqueNeighborhoods().map(item => item)}
            func={handleNeighborhoodFilter}
            scroll
          />

          <CustomDropDown
          title="Zipcode"
          items={getUniqueZipcodes().map(item => item)}
          func={handleZipcodeFilter}
          scroll
          />

        </div>
        <button className="filter-submit-button" onClick={handleSubmit}>
          Apply
        </button>

        
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <h5>Results: {numMedicals}</h5>
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
                  if (medical.name != null) {
                    return (
                      <MedicalCard
                        key={index}
                        medical={medical}
                        highlight={highlight}
                      />
                    );
                  }
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
