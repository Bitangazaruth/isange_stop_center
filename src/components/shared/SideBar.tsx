import baz from "../../../public/images/logo-1.png";
import { HiViewGrid } from "react-icons/hi";
import { RiBookReadLine } from "react-icons/ri";
import { HiMiniBars4 } from "react-icons/hi2";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsDatabase } from "react-icons/bs";
import { MdDataThresholding } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineHelpCenter } from "react-icons/md";
import { CiViewList, CiCalendarDate } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { MdModelTraining } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  const userString = localStorage.getItem("IsLoggedIn");
  const user = userString ? JSON.parse(userString) : null;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("IsLoggedIn");
    navigate("/login");
  };

  const userMenuItems = [
    {
      name: "Dashboard",
      icon: <HiViewGrid size={17} color="#999" />,
      link: "dashboard",
    },
    {
      name: "Secure case",
      icon: <FaBriefcase size={16} color="#999" />,
      link: "cases",
    },
    {
      name: "Crisis counseling",
      icon: <CiViewList size={17} color="#999" />,
      link: "crisis",
    },
    {
      name: "Data Analysis",
      icon: <MdDataThresholding size={17} color="#999" />,
      link: "analysis",
    },
    {
      name: "Emergency",
      icon: <RiBookReadLine size={17} color="#999" />,
      link: "emergency",
    },
    {
      name: "Training",
      icon: <MdModelTraining size={17} color="#999" />,
      link: "trainings",
    },
    {
      name: "Help Center",
      icon: <MdOutlineHelpCenter size={17} color="#999" />,
      link: "helping",
    },
    {
      name: "Setting",
      icon: <MdOutlineSettings size={17} color="#999" />,
      link: "settings/profile",
    },
  ];

  const adminMenuItems = [
    {
      name: "Dashboard",
      icon: <HiViewGrid size={17} color="#999" />,
      link: "dashboard",
    },
    {
      name: "Users",
      icon: <FaUsers size={17} color="#999" />,
      link: "users",
    },
    {
      name: "Secure case",
      icon: <FaBriefcase size={16} color="#999" />,
      link: "cases",
    },
    {
      name: "Victim Identification",
      icon: <BsDatabase size={16} color="#999" />,
      link: "victims",
    },
    {
      name: "Crisis counseling",
      icon: <CiViewList size={17} color="#999" />,
      link: "crisis",
    },
    {
      name: "Data Analysis",
      icon: <MdDataThresholding size={17} color="#999" />,
      link: "analysis",
    },
    {
      name: "Follow Up",
      icon: <CiCalendarDate size={17} color="#999" />,
      link: "followup",
    },
    {
      name: "Emergency",
      icon: <RiBookReadLine size={17} color="#999" />,
      link: "emergency",
    },
    {
      name: "Training",
      icon: <MdModelTraining size={17} color="#999" />,
      link: "trainings",
    },
  ];

  const hospitalMenuItems = [
    {
      name: "Dashboard",
      icon: <HiViewGrid size={17} color="#999" />,
      link: "dashboard",
    },
    {
      name: "Secure case",
      icon: <FaBriefcase size={16} color="#999" />,
      link: "cases",
    },
    {
      name: "Crisis counseling",
      icon: <CiViewList size={17} color="#999" />,
      link: "crisis",
    },
    {
      name: "Data Analysis",
      icon: <MdDataThresholding size={17} color="#999" />,
      link: "analysis",
    },
    {
      name: "Emergency",
      icon: <RiBookReadLine size={17} color="#999" />,
      link: "emergency",
    },
    {
      name: "Training",
      icon: <MdModelTraining size={17} color="#999" />,
      link: "trainings",
    },
  ];
  const ribMenuItems = [
    {
      name: "Dashboard",
      icon: <HiViewGrid size={17} color="#999" />,
      link: "dashboard",
    },
    {
      name: "Secure case",
      icon: <FaBriefcase size={16} color="#999" />,
      link: "cases",
    },
    {
      name: "Victim Identification",
      icon: <BsDatabase size={16} color="#999" />,
      link: "victims",
    },
    {
      name: "Crisis counseling",
      icon: <CiViewList size={17} color="#999" />,
      link: "crisis",
    },
    {
      name: "Data Analysis",
      icon: <MdDataThresholding size={17} color="#999" />,
      link: "analysis",
    },
    {
      name: "Follow Up",
      icon: <CiCalendarDate size={17} color="#999" />,
      link: "followup",
    },
    {
      name: "Emergency",
      icon: <RiBookReadLine size={17} color="#999" />,
      link: "emergency",
    },
    {
      name: "Training",
      icon: <MdModelTraining size={17} color="#999" />,
      link: "trainings",
    },
  ];

  const menuItems =
    user.USER.role === "user"
      ? userMenuItems
      : user.USER.role === "admin"
      ? adminMenuItems
      : user.USER.role === "hospital"
      ? hospitalMenuItems
      : ribMenuItems;

  return (
    <div className="h-screen flex">
      <div className="sm:hidden">
        <button onClick={toggleSidebar}>
          <HiMiniBars4 size={17} color="#999" />
        </button>
      </div>
      <div
        className={`fixed inset-0 z-50 bg-[#084287] shadow-lg transition-transform sm:relative sm:w-56 sm:bg-[#084287] sm:shadow sm:block ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="relative">
          <div className="w-[180px] h-[23px] left-[20px] top-[7px] absolute sm:static">
            <img src={baz} alt="bazfarm" />
          </div>
          <div className="absolute top-[20px] right-[20px] sm:hidden">
            <button onClick={toggleSidebar}>
              <IoClose className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>
        <div className="top-[90px] absolute flex-col justify-start items-center gap-4 inline-flex sm:static sm:flex sm:mt-4">
          <div className="flex-col ml-3 justify-start items-start gap-3 flex">
            <div className="flex-col justify-start items-start gap-0.1 flex">
              <div className="pl-8 pb-1.5 justify-start items-center inline-flex mb-2">
                <p className="text-[#000] text-xs font-normal font-['Inter'] leading-[18px]">
                  Home
                </p>
              </div>
              <div className="flex-col justify-start items-start flex">
                {menuItems.slice(0, 6).map((item) => (
                  <Link to={item.link} key={item.name}>
                    <div
                      className={`self-stretch h-6 w-48 rounded-[8px] justify-start items-center gap-2.5 inline-flex ${
                        selectedItem === item.name
                          ? "text-yellow-300"
                          : "hover:border-2 hover:border-[#FFEF00]"
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      <div className="w-5 h-5 relative">{item.icon}</div>
                      <div
                        className={`grow flex gap-3 shrink basis-0 text-[12px] font-normal font-['Inter'] ${
                          selectedItem === item.name
                            ? "text-yellow-300"
                            : "text-[#DCDADA]"
                        }`}
                      >
                        <b>{item.name}</b>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-col justify-start items-start flex">
              <div className="w-48 pl-8 pb-1.5 justify-start items-center inline-flex">
                <div className="justify-start items-center inline-flex mb-2">
                  <p className="text-[#000] text-xs font-normal font-['Inter'] leading-[18px]">
                    Platform
                  </p>
                </div>
              </div>
              <div className="flex-col justify-start items-start flex">
                {menuItems.slice(6, 8).map((item) => (
                  <Link to={item.link} key={item.name}>
                    <div
                      className={`self-stretch h-6 w-48 rounded-[8px] justify-start items-center gap-2.5 inline-flex ${
                        selectedItem === item.name
                          ? "text-yellow-300"
                          : "hover:border-2 hover:border-[#FFEF00]"
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      <div className="w-5 h-5 relative">{item.icon}</div>
                      <div
                        className={`grow flex gap-3 shrink basis-0 text-[12px] font-normal font-['Inter'] ${
                          selectedItem === item.name
                            ? "text-yellow-300"
                            : "text-[#DCDADA]"
                        }`}
                      >
                        <b>{item.name}</b>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="top-[398px] absolute ml-3 flex-col justify-start items-start gap-0 inline-flex sm:static sm:mt-4">
          <div className="w-48 pl-8 pb-1.5 justify-start items-center inline-flex">
            <div className="text-[#000] text-xs font-normal font-['Inter'] leading-[18px]">
              Preferences
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            {menuItems.slice(8).map((item) => (
              <Link to={item.link} key={item.name}>
                <div
                  className={`w-48 h-6 rounded-[8px] justify-start items-center gap-2.5 inline-flex ${
                    selectedItem === item.name
                      ? "text-yellow-300"
                      : "hover:border-2 hover:border-[#FFEF00]"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <div className="w-5 h-5 relative">{item.icon}</div>
                  <div
                    className={`grow flex gap-3 shrink basis-0 text-[12px] font-normal font-['Inter'] ${
                      selectedItem === item.name
                        ? "text-yellow-300"
                        : "text-[#DCDADA]"
                    }`}
                  >
                    <b>{item.name}</b>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 px-3">
          <button
            className="flex items-center gap-2.5 w-full h-8 rounded-[8px] hover:border-2 hover:border-[#FFEF00] text-[#DCDADA] text-[12px] font-normal font-['Inter']"
            onClick={handleLogout}
          >
            <AiOutlineLogout size={17} color="#999" />
            <b>Log Out</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
