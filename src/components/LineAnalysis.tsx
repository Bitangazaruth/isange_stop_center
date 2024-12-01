import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Text,
} from "recharts";

const data = [
  { name: "Jan", cases: 120, closed: 40 },
  { name: "Feb", cases: 200, closed: 80 },
  { name: "Mar", cases: 150, closed: 90 },
  { name: "Apr", cases: 170, closed: 60 },
  { name: "May", cases: 210, closed: 110 },
];

const renderCustomAxisTick = ({ x, y, payload }) => {
  return (
    <Text x={x} y={y} dy={16} textAnchor="middle" fill="#666" fontSize="12px">
      {payload.value}
    </Text>
  );
};

const LineAnalysis = () => {
  return (
    <div className="w-[78%] rounded-md mt-4 bg-white p-4 h-[400px] shadow-lg">
      <h2 className="text-center text-lg font-semibold mb-4">Case History</h2>
      <div className="flex items-center w-full">
        <AreaChart
          width={650}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#e1defc" stopOpacity={0.4} />
            </linearGradient>
            <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#c1f2d8" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="closed"
            stroke="#82ca9d"
            fill="url(#colorClosed)"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5" vertical={false} />
          <XAxis dataKey="name" tick={renderCustomAxisTick} />
          <YAxis />
          <Tooltip />
        </AreaChart>
      </div>
    </div>
  );
};

export default LineAnalysis;
