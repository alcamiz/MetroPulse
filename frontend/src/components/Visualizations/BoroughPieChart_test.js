
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042"
];

const BoroughPieChartTest = ({ data }) => {
  return (
    <PieChart width={600} height={600}>
      <Pie
        data={data}
        cx={280}
        cy={250}
        labelLine={false}
        outerRadius={200}
        fill="#8884d8"
        dataKey="count"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default BoroughPieChartTest;
