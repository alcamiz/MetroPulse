  import React, { useState, useEffect } from "react";
import StackedBarChart from "../components/Visualizations/Prov_StackedBarChart";
import PopulationDensityCutoffBarChart from "../components/Visualizations/Prov_CutoffBarChart";
import ScatterPlot from "../components/Visualizations/ScatterPlot";
import "../styles/Visualization.css";

const ProviderVis = () => {

  const [shelteredUnshelteredData, setShelteredUnshelteredData] = useState([]);
  const [populationDensityData, setPopulationDensityData] = useState([]);
  const [ResourceData, setResourceData] = useState([]);

  useEffect(() => {
    fetch("https://api.lacountyhomelesshelper.me/cities")
      .then((response) =>
        response.json().then((jsonData) => {
          console.log(jsonData);
          setShelteredUnshelteredData(processShelterData(jsonData));
          setPopulationDensityData(processPopulationDensityData(jsonData))
          setResourceData(processResourceData(jsonData))
        })
      )
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });

  }, []);

  const processShelterData = (data) => {
    return data
      .filter(city => city.total_sheltered_pop > 200 && city.total_unsheltered_pop > 200)
      .map(city => ({
        name: city.csa_label,
        sheltered_population: city.total_sheltered_pop,
        unsheltered_population: city.total_unsheltered_pop
      }));
  };
  

  const processPopulationDensityData = (data) => {
    // First, sort the cities by population density in descending order
    const sortedByDensity = data.sort((a, b) => b.density_total - a.density_total);

    // Then, take the top 10 cities with the highest population density
    const topTenCities = sortedByDensity.slice(0, 6);

    // Finally, map the cities to the required format
    return topTenCities.map(city => ({
      name: city.csa_label,
      population_density: city.density_total
    }));
  };

  const processResourceData = (data) => {
    const processedData = data.map((city) => ({
      csa_label: city.csa_label,
      square_miles: city.square_miles,
      total_unsheltered_pop : city.total_unsheltered_pop,
    }));

    return processedData
      .sort((a, b) => b.square_miles - a.square_miles)
      .slice(0, 30);
  };


  return (
    <div className="container">
      <h1 className="title">Sheltered vs Unsheltered Homeless</h1>
        <div className="charts-container">
          <StackedBarChart data={shelteredUnshelteredData} />
        </div>
        <h1 className="chart-title">Homeless population density by city</h1>
        <div className="charts-container">
          <PopulationDensityCutoffBarChart data={populationDensityData} />
        </div>
        <h1 className="chart-title">
          Unsheltered Population Compared to Square Miles
        </h1>
        <div className="charts-container">
          <ScatterPlot data={ResourceData} />
        </div>
      </div>
  );
};

export default ProviderVis;
