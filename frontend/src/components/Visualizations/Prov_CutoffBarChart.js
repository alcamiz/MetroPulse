import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PopulationDensityCutoffBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%"> 
          <BarChart
            width={600}
            height={600}
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 80, // Adjust if needed for label space
            }}
            barSize={20}
          >
            <XAxis dataKey="name" angle = {-15} textAnchor = "end" height = {120}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="population_density" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      );
};

export default PopulationDensityCutoffBarChart;
