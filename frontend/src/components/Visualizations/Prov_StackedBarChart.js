import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = ({ data }) => {

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
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={100}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sheltered_population" stackId="a" fill="#0088FE"/>
            <Bar dataKey="unsheltered_population" stackId="a" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

export default StackedBarChart;