import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for daily user statistics and cases submitted over a month
const data = [
  { day: "2024-06-01", users: 50, casesSubmitted: 30 },
  { day: "2024-06-02", users: 60, casesSubmitted: 45 },
  { day: "2024-06-03", users: 40, casesSubmitted: 25 },
  { day: "2024-06-04", users: 70, casesSubmitted: 55 },
  { day: "2024-06-05", users: 80, casesSubmitted: 65 },
  // Add more data points as needed
];

export default class LineCharts extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/line-chart-double-y-axes-2stmj2";

  render() {
    return (
      <div className="shadow-lg p-4 rounded-lg bg-white ">
        <h2 className="text-center font-semibold text-lg mb-4">
          User and Case Statistics in a Month
        </h2>
        <div className="p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={366}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="casesSubmitted"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
