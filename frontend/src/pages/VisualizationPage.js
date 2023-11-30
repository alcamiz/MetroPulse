import React, { useState, useEffect } from "react";
import BoroughPieChart from "../components/Visualizations/BoroughPieChart";
import CutoffBarChart from "../components/Visualizations/CutoffBarChart";
import { backend_website } from "../backend_website";
//import "../styles/Visualizations.css";

const Vis = () => {
  const [boroughMedicalData, setBoroughMedicalData] = useState([]);
  const [boroughTestData, setBoroughTestData] = useState([]);
  const [neighborhoodData, setNeighborhoodData] = useState([]);

  const boroughs = ["Bronx", "Brooklyn", "Manhattan", "Queens"];

  useEffect(() => {
    // Hospitals by Borough
    const fetchBoroughMedicalData = async (borough) => {
      try {
        const website = `${backend_website}/hospitals?borough=${borough}`;
        const response = await fetch(website);
        const jsonData = await response.json();
  
        return processBoroughMedicalData(jsonData, borough);
      } catch (error) {
        console.error(`Error fetching hospital data for ${borough} borough:`, error);
        return { name: borough, value: 0 };
      }
    };
  
    const fetchAllBoroughMedicalData = async () => {
      const promises = boroughs.map((borough) => fetchBoroughMedicalData(borough));
      const dataForAllBoroughs = await Promise.all(promises);
      setBoroughMedicalData(dataForAllBoroughs);
    };

    // Test Center by Borough 
    const fetchBoroughTestData = async (borough) => {
      try {
        const website = `${backend_website}/centers?borough=${borough}`;
        const response = await fetch(website);
        const jsonData = await response.json();
  
        return processBoroughTestData(jsonData, borough);
      } catch (error) {
        console.error(`Error fetching test center data for ${borough} borough:`, error);
        return { name: borough, value: 0 };
      }
    };
  
    const fetchAllBoroughTestData = async () => {
      const promises = boroughs.map((borough) => fetchBoroughTestData(borough));
      const dataForAllBoroughs = await Promise.all(promises);
      setBoroughTestData(dataForAllBoroughs);
    };
  
    fetchAllBoroughMedicalData();
    fetchAllBoroughTestData();

    // Fetch neighborhood data
    fetch("https://backend.metropulse.link/neighborhoods")
    .then((response) =>
      response.json().then((jsonData) => {
        console.log(jsonData);
        setNeighborhoodData(processNeighborhoodData(jsonData));
      })
    )
    .catch((error) => {
      console.error("Error fetching states data:", error);
    });

  }, []);

  const processBoroughMedicalData = async (data, borough) => {
    const numMedicals = data["total_size"]
    return {
      name: borough,
      value: numMedicals,
    };
  };

  const processBoroughTestData = async (data, borough) => {
    const numMedicals = data["total_size"]
    return {
      name: borough,
      value: numMedicals,
    };
  };

  const processNeighborhoodData = (data) => {
    // First, sort the cities by population density in descending order
    const sortedByPopulation = data.data.sort((a, b) => b.population - a.population);

    // Then, take the top 10 cities with the highest population density
    const topTenHoods = sortedByPopulation.slice(0, 25);
    
    return topTenHoods.map((hood) => ({
      nta_name: hood.nta_name,
      population: hood.population,
    }));
  };

  return (
    <div className="container">
    <h1 className="chart-title">Hospitals by Borough</h1>
    <div className="charts-container">
      {boroughMedicalData.length > 0 && (
        <>
          <BoroughPieChart data={boroughMedicalData} />
        </>
      )}
      {boroughMedicalData.length === 0 && <p>Loading medical data...</p>}
    </div>
    <h1 className="chart-title">Test Centers by Borough</h1>
    <div className="charts-container">
      {boroughTestData.length > 0 && (
        <>
          <BoroughPieChart data={boroughTestData} />
        </>
      )}
      {boroughTestData.length === 0 && <p>Loading test center data...</p>}
    </div>
    <h1 className="chart-title">Population of Neighborhoods</h1>
    <div className="charts-container">  
      <CutoffBarChart data={neighborhoodData}/>
    </div>
  </div>
  );
};

export default Vis;
