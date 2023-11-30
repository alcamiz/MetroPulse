import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ScatterPlot = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                width={600}
                height={600}
                margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="total_unsheltered_pop" name="Population" />
                <YAxis type="number" dataKey="square_miles" name="Square Miles" unit="mi²" />
                <ZAxis dataKey={"csa_label"} name="City"></ZAxis>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="City"data={data} fill="#0088FE" stroke="#FFFFFF"/>
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default ScatterPlot;
