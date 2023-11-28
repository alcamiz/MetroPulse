import React, { useState, useEffect } from "react";
import BoroughPieChartMedical from "../components/Visualizations/BoroughPieChart_medical";
import BoroughPieChartTest from "../components/Visualizations/BoroughPieChart_test";
import CutoffBarChart from "../components/Visualizations/Prov_CutoffBarChart";
// import "../styles/Visualizations.css";

const ProviderVis = () => {

  const [boroughMedicalData, setBoroughMedicalData] = useState([]);
  const [boroughTestData, setBoroughTestData] = useState([]);
  const [neighborhoodData, setNeighborhoodData] = useState([]);



  const [statesData, setStatesData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    fetch("https://api.park-dex.me/api/states")
      .then((response) =>
        response.json().then((jsonData) => {
          console.log(jsonData);
          setStatesData(processStatesData(jsonData));
        })
      )
      .catch((error) => {
        console.error("Error fetching states data:", error);
      });

    fetch("https://api.park-dex.me/api/animals")
      .then((response) => response.json())
      .then((jsonData) => {
        setSpeciesData(processSpeciesData(jsonData));
      })
      .catch((error) => {
        console.error("Error fetching animals data:", error);
      });

    fetch("https://api.park-dex.me/api/parks")
      .then((response) => response.json())
      .then((jsonData) => {
        setParksData(processParksData(jsonData));
      })
      .catch((error) => {
        console.error("Error fetching parks data:", error);
      });
  }, []);

  const processStatesData = (data) => {
    return data.data.map((state) => ({
      state: state.name,
      biodiversity: state.animals.length,
    }));
  };

  const processSpeciesData = (data) => {
    const speciesCount = {};

    data.data.forEach((animal) => {
      const group = animal.species_group;
      if (speciesCount[group]) {
        speciesCount[group]++;
      } else {
        speciesCount[group] = 1;
      }
    });

    return Object.keys(speciesCount).map((group) => ({
      name: group,
      count: speciesCount[group],
    }));
  };

  const processParksData = (data) => {
    const processedData = data.data.map((park) => ({
      park: park.full_name,
      activities: park.activities.length,
    }));

    return processedData
      .sort((a, b) => b.activities - a.activities)
      .slice(0, 30);
  };

  return (
    <div className="container">
      <h1 className="title">Visualizations</h1>
      <div className="charts-container">
        <h1 className="chart-title">States with Most Biodiversity</h1>
       {/* // <BiodiversityBarChart data={statesData} /> */}
        <h1 className="chart-title">Number of Animals per Species Group</h1>
        {/* <SpeciesPieChart data={speciesData} /> */}
        <h1 className="chart-title">
          Top 25 Parks with the Largest Amount of Activities
        </h1>
        {/* <ParksBarChart data={parksData} /> */}
      </div>
    </div>
  );
};

export default ProviderVis;
