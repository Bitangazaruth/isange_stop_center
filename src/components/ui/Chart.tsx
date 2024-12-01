import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString(),
    value: 1 + Math.random(),
  });
}

function CustomTooltip({ active,  label }) {
  if (active) {
    return (
      <div className="border-r-2 bg-[#26313c] p-1 shadow-md text-center text-white">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
      </div>
    );
  }
  return null;
}

const Chart = ({ title, fillColor, strokeColor, num }) => {
  return (
    <div className="chart-container p-2 shadow-md rounded-lg bg-white w-full h-full">
      <h2 className="text-center mb-2 text-sm font-semibold">{title}</h2>
      <div className="text-center mb-4 text-lg font-bold">{num}</div>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="75%" stopColor={strokeColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke={strokeColor} fill={fillColor} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 7 === 0) {
                return format(date, "MMM d");
              }
              return "";
            }}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={4}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
