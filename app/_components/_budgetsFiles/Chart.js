"use client"

import { formatCurrency } from "@/app/_utils/helpers"
import {
  Area,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

function Chart({
  data,
  totalBudgetSpent,
  totalLimit,
  cx,
  cy,
  containerWidth,
  containerHeight,
  centerXPos,
  centerYPos,
  innerVal,
  outerVal,
}) {
  return (
    <ResponsiveContainer width={containerWidth} height={containerHeight}>
      <PieChart responsive>
        <Pie
          data={data}
          nameKey="category"
          dataKey="percentageValue"
          // innerRadius={80}
          // outerRadius={115}
          innerRadius="65%"
          outerRadius="90%"
          cx={cx}
          O
          cy={cy}
          paddingAngle={1}
        >
          {data.map((entry) => (
            <Cell
              fill={entry.themeColor}
              stroke={entry.themeColor}
              key={entry.category}
              style={{ outline: "none" }}
            />
          ))}
        </Pie>
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-900 font-bold"
          style={{
            fontSize: totalBudgetSpent > 1000 ? "15px" : "20px",
          }}
        >
          {formatCurrency(totalBudgetSpent)}
        </text>
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-500"
          style={{
            fontSize: totalLimit > 1000 ? "12px" : " 15px",
          }}
        >
          of {formatCurrency(totalLimit)} limit
        </text>
        <Tooltip
          formatter={(value, name) => [`${value}%`, name]}
          contentStyle={{
            backgroundColor: "white",
            color: "green",
            borderRadius: "5px",
            fontSize: "13px",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        />
        <Area
          dataKey="category"
          type="monotone"
          stroke={"green"}
          fill={"yellow"}
          strokeWidth={2}
          name="Total sales"
          unit="$"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Chart
