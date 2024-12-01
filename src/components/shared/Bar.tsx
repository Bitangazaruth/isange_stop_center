import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const data = [
  { received: 10, solved: 7, unsolved: 3 },
  { received: 12, solved: 9, unsolved: 3 },
  { received: 8, solved: 5, unsolved: 3 },
  { received: 15, solved: 11, unsolved: 4 },
  { received: 9, solved: 6, unsolved: 3 },
];

const CustomActiveShape = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke="blue"
      strokeWidth={2}
    />
  );
};

export default class BarChartComponent extends PureComponent {
  render() {
    return (
      <div className="shadow-lg p-4 rounded-lg bg-white w-[450px]">
        <h2 className="text-center font-semibold text-lg mb-4">
          Case Statistics in a Month
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="day" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="received"
              fill="#8884d8"
              shape={<CustomActiveShape />}
            />
            <Bar
              dataKey="solved"
              fill="#82ca9d"
              shape={<CustomActiveShape fill="#82ca9d" />}
            />
            <Bar
              dataKey="unsolved"
              fill="#ffc658"
              shape={<CustomActiveShape fill="#FFEE04" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
