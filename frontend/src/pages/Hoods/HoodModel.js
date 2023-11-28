import React, { useState, useEffect } from "react";
import {fetch_neighborhoods, get_neighborhoods_length} from "../../utils/pagination.js";
import { searchSpecificModel } from "../../utils/api";
import "../../styles/SearchModel.css"
import Loading from "../../components/Loading";
import PaginationIndicator from "../../components/PaginationIndicator";
import HoodCard from "../../components/Hoods/HoodCard.js";
import CustomDropDown from "../../components/CustomDropDown";
import SearchBar from "../../components/SearchBar"

function HoodModel() {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [hoods, setHoods] = useState(null);
  const [numPages, setNumPages] = useState(null)
  const [numHoods, setNumHoods] = useState(1);
  const [highlight, setHighlight] = useState("")
  const [isSearchResults, setIsSearchResults] = useState(false);

  // PHASE 3

  const [reload, setReload] = useState(0);
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(null);
  const [boroughFilter, setBoroughFilter] = useState(null);
  const [fipsFilter, setFipsFilter] = useState(null);
  const [perPage, setPerPage] = useState(20);

  // for FIPS county code filtering dropdown
const getUniqueFips = () => {
  const uniqueFips = new Set();
  const fipsCodeList = hoods
    ? hoods
        .filter((hood) => hood.fips_county_code !== null)
        .map((hood) => hood.fips_county_code)
        .filter((fipsCode) => {
          if (uniqueFips.has(fipsCode)) {
            return false; // Skip if already added
          }
          uniqueFips.add(fipsCode);
          return true;
        })
        .sort()
    : [];

  return ["Fips Code", ...fipsCodeList];
};

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

  function handleFipsFilter(activity) {
    if (activity === "FIPS Code") {
      setFipsFilter(null);
    } else {
      setFipsFilter(activity);
    }
  }


  useEffect(() => {
      const load_num_hoods = async () => {
          const num_hoods = await get_neighborhoods_length(
            boroughFilter,
            fipsFilter); // write function
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
              const num_hoods = await get_neighborhoods_length(
                boroughFilter,
                fipsFilter);
                setNumHoods(num_hoods);
                setNumPages(Math.ceil(num_hoods/25.0));
                setLoadingPage(false);
              const hoods = await fetch_neighborhoods(
                currPage,
                sort,
                order,
                boroughFilter,
                fipsFilter,
                perPage);
              // console.log(hoods);
              setHoods(hoods);
              setLoading(false);
          }
      }
      setLoading(true);
      load_hoods(); // parks?
  }, [loadingPage, currPage, reload])

  const handleSearch = async (search_value) => {
    setLoading(true);
    setIsSearchResults(true);
    const search_data = await searchSpecificModel(search_value, "neighborhood");
    let searched_neighborhoods = search_data["neighborhoods"]["data"]
    setHoods(searched_neighborhoods);
    setNumHoods(Object.keys(searched_neighborhoods).length)
    setHighlight(search_value);
    setLoading(false);
  }
  
  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1 className="titleText">Neighborhoods</h1>
        <SearchBar model="Neighborhoods" handleSearch={handleSearch} />
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
            items={getUniqueFips().map(item => item)}
            func={handleFipsFilter}
            scroll
          />

        </div>
        <button className="filter-submit-button" onClick={handleSubmit}>
          Apply
        </button>

        
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <h5>Results: {numHoods} </h5>
            <div className="pagination-ind">
            {!isSearchResults && hoods !== null && (
              <PaginationIndicator
                currPage={currPage}
                setCurrPage={setCurrPage}
                numPages={numPages}
              />
            )}
            </div>
            <div className="cardBox">
              {hoods !== null &&
                hoods.map((hood, index) => {
                  if (hood.nta_name != null) { // do not display if no name
                    return (
                      <HoodCard
                        key={index}
                        hood={hood}
                        highlight={highlight}
                    />
                    );
                  }
                })}
            </div>
            {!isSearchResults && hoods !== null && (
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

export default HoodModel;
