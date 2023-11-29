  import React, { useState, useEffect } from "react";
import StackedBarChart from "../components/Visualizations/Prov_StackedBarChart";
import PopulationDensityCutoffBarChart from "../components/Visualizations/Prov_CutoffBarChart";
import "../styles/Visualization.css";

const ProviderVis = () => {

  const [shelteredUnshelteredData, setShelteredUnshelteredData] = useState([]);
  const [populationDensityData, setPopulationDensityData] = useState([]);
  const [neighborhoodData, setNeighborhoodData] = useState([]);

  const [speciesData, setSpeciesData] = useState([]);
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    fetch("https://api.lacountyhomelesshelper.me/cities")
      .then((response) =>
        response.json().then((jsonData) => {
          console.log(jsonData);
          setShelteredUnshelteredData(processShelterData(jsonData));
          setPopulationDensityData(processPopulationDensityData(jsonData))
        })
      )
      .catch((error) => {
        console.error("Error fetching city data:", error);
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
      <h1 className="title">Sheltered vs Unsheltered Homeless</h1>
        <div className="charts-container">
          <StackedBarChart data={shelteredUnshelteredData} />
        </div>
        <h1 className="chart-title">Homeless population density by city</h1>
        <div className="charts-container">
          <PopulationDensityCutoffBarChart data={populationDensityData} />
        </div>
        <h1 className="chart-title">
          Top 25 Parks with the Largest Amount of Activities
        </h1>
        {/* <ParksBarChart data={parksData} /> */}
      </div>
  );
};

export default ProviderVis;
