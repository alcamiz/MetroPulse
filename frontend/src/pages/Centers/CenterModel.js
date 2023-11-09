import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../../instances/Instance.css";
import "../../styles/Model.css";
import "../../styles/SearchModel.css"
import {fetch_centers, get_centers_length} from "../../utils/pagination.js";
import { searchSpecificModel } from "../../utils/api";
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import CenterCard from "../../components/Centers/CenterCard.js";
import CustomDropDown from "../../components/CustomDropDown";
import SearchBar from "../../components/SearchBar"



function CenterModel() {
  
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [centers, setCenters] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [numCenters, setNumCenters] = useState(1);
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
  const neighborhoods = centers
    ? centers
        .filter((center) => center.nta_name !== null)
        .map((center) => center.nta_name)
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
  const zipcodes = centers
    ? centers
        .filter((center) => center.zip_code !== null)
        .map((center) => center.zip_code)
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
      activity = activity.toUpperCase(); // set borough uppercase to match data for centers
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
      const load_num_centers = async () => {
          const num_centers = await get_centers_length(
            boroughFilter,
            neighborhoodFilter,
            zipcodeFilter);
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
            const num_centers = await get_centers_length(
              boroughFilter,
              neighborhoodFilter,
              zipcodeFilter);
              setNumCenters(num_centers);
              setNumPages(Math.ceil(num_centers/25.0));
              setLoadingPage(false);
            const centers = await fetch_centers(
              currPage,
              sort,
              order,
              boroughFilter,
              neighborhoodFilter,
              zipcodeFilter,
              perPage);
            // console.log(centers);
            setCenters(centers);
            setLoading(false);
          }
      }
      setLoading(true);
      load_centers(); // parks?
  }, [loadingPage, currPage, reload])


  const handleSearch = async (search_value) => {
    setLoading(true);
    setIsSearchResults(true);
    const search_data = await searchSpecificModel(search_value, "center");
    let test_centers_searched = search_data["centers"]["data"];
    setNumCenters(Object.keys(test_centers_searched).length)
    setCenters(test_centers_searched);
    setHighlight(search_value);
    setLoading(false);
  }
  
  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Testing Centers</h1>
        <SearchBar model="Test Centers" handleSearch={handleSearch} />
        {/* PHASE 3 - Sorting and Filtering */}
        <div className="dropdownContainer">

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

        {/* <h5>Results: {numCenters} </h5> */}
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <h5>Results: {numCenters} </h5>
            {!isSearchResults && centers !== null && (
              <PaginationIndicator
                currPage={currPage}
                setCurrPage={setCurrPage}
                numPages={numPages}
              />
            )}
            <div className="cardBox">
              {centers !== null &&
                centers.map((center, index) => {
                  if (center.name != null) { // do not display if no name
                    return (
                      <CenterCard
                        key={index}
                        center={center}
                        highlight={highlight}
                    />
                    );
                  }
                })}
            </div>
            {!isSearchResults && centers !== null && (
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

export default CenterModel;
