import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiChevronDown } from "react-icons/fi";

const ChartBar = () => {
  const data = [
    { name: "Moisture", uv: 4000 },
    { name: "Temperature", uv: 3000 },
    { name: "Nitrogen", uv: 2000 },
    { name: "Ph", uv: 2780 },
    { name: "Nitrogen", uv: 1890 },
    { name: "Potassium", uv: 2390 },
  ];

  return (
    <div className="bg-white rounded-lg mt-4 w-[400px]">
      <div className="relative ml-56 ">
        <div className="bg-white border border-black text-gray-700 w-[70px] rounded-lg relative">
          <p className="text-lg font-bold relative">100</p>
          <FiChevronDown className="absolute top-2 left-10" />
        </div>
      </div>

      <h3 className="font-bold text-center  ">Condition Overview</h3>
      <div className=" ">
        <ResponsiveContainer  height={290}>
          <BarChart
            width={800}
            height={500}
            data={data}
            margin={{ top: 12, right: 30, left: 30, bottom: 22 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="gray" />
            <Tooltip />
            <Bar dataKey="uv" fill="#8884d8" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartBar;
