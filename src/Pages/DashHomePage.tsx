import { CgProfile } from "react-icons/cg";
import { GiClawHammer } from "react-icons/gi";
import { BsFillAwardFill } from "react-icons/bs";
import { FaBriefcase } from "react-icons/fa";
import Widget from "@/components/widget";
import LineSoilChart from "@/components/LineSoilChart";
import PiChart from "@/components/PiChart";

const DashHomePage = () => {
  return (
    <div className=" bg-white p-4 mt-8 mr-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Widget
          title="Total Users"
          amount={109}
          diff={10}
          description="New users "
          icon={
            <CgProfile size={32} className="text-3xl md:text-4xl lg:text-5xl" />
          }
          textColor="text-blue-600"
        />
        <Widget
          title="Total Cases"
          amount={102}
          diff={85}
          description="Cases in progress"
          icon={
            <GiClawHammer
              size={32}
              className="text-3xl md:text-4xl lg:text-5xl"
            />
          }
          textColor="text-yellow-600"
        />
        <Widget
          title="New Cases"
          amount={109}
          diff={70}
          description="Recently added cases"
          icon={
            <BsFillAwardFill
              size={32}
              className="text-3xl md:text-4xl lg:text-5xl"
            />
          }
          textColor="text-purple-600"
        />
        <Widget
          title="Submitted Cases"
          amount={50}
          diff={76}
          description="Cases under review"
          icon={
            <FaBriefcase
              size={32}
              className="text-3xl md:text-4xl lg:text-5xl"
            />
          }
          textColor="text-red-600"
        />
      </div>
      <div className="flex gap-[2rem]">
        <LineSoilChart />
        <div className="">
          <PiChart />
        </div>
      </div>
    </div>
  );
};

export default DashHomePage;
