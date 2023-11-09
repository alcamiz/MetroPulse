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
      const load_num_centers = async () => {
          const num_centers = await get_centers_length(
            boroughFilter);
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
              boroughFilter);
              setNumCenters(num_centers);
              setNumPages(Math.ceil(num_centers/25.0));
              setLoadingPage(false);
            const centers = await fetch_centers(
              currPage,
              sort,
              order,
              boroughFilter,
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
                  return (
                    <CenterCard
                      key={index}
                      center={center}
                      highlight={highlight}
                    />
                  );
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
