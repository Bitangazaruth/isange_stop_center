import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Open", value: 60, color: "#084287" },
  { name: "Closed", value: 30, color: "#dc2626" },
  { name: "Pending", value: 20, color: "#ffef00" },
];

const PiChart = () => {
  return (
    <div className="rounded-md bg-white mt-4 shadow-lg p-4">
      <h6 className="text-center font-bold mb-4">Case Statistics Overview</h6>
      <PieChart width={240} height={290}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex items-center justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full`}
              style={{ backgroundColor: entry.color }}
            ></div>
            <div className="ml-2">{entry.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PiChart;
