import BarChartComponent from "@/components/shared/Bar";
import LineCharts from "@/components/shared/LineChart";
import Chart from "@/components/ui/Chart";

const DataAnalysis = () => {
  const chartTitles = [
    "All Cases",
    "RIB Cases",
    "Cases with doctors",
    "Solved Cases",
  ];
  const fillColors = ["#f0fff6", "#e7f0ff", "#ffffe6", "#f3e6fb"];
  const strokeColors = ["#2fa464", "#4a8aff", "#ffc315", "#8e1c91"];
  const numbers = ["108", "100", "12", "22"];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {chartTitles.map((title, index) => (
          <Chart
            key={index}
            title={title}
            fillColor={fillColors[index]}
            strokeColor={strokeColors[index]}
            num={numbers[index]}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-2  ">
          <BarChartComponent />
        </div>
        <div className="p-2">
          <LineCharts />
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
