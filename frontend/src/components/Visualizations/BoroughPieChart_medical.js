
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#A09EBB",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#58355E",
  "#ffc658",
  "#EC0B43",
  "#CA054D",
];

const BoroughPieChartMedical = ({ data }) => {
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

export default BoroughPieChartMedical;
