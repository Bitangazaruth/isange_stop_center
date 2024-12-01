import { Link } from "react-router-dom";

import werty from "../../assets/to.jpg";
import profile from "../../../public/images/profile1.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function NavBar({ isAboveMediumScreen }) {
  const userString = localStorage.getItem("IsLoggedIn");
  const user = userString ? JSON.parse(userString) : null;
  return (
    <div
      className={`flex justify-between items-center px-4 py-1 text-gray-200 ${
        !isAboveMediumScreen ? "bg-[#084287] w-screen" : ""
      }`}
    >
      <div className="text-lg font-extrabold ">
        <div className="flex-col justify-start items-start gap-2 inline-flex sm:flex-row sm:justify-between sm:items-center ">
          <div className=" flex text-gray-50 text-base font-extrabold font-['Roboto'] leading-9">
            <p>Welcome</p>
            <p className="ml-3">
              {user && user.USER && user.USER.name ? user.USER.name : "Client"}
            </p>
          </div>
          <div className=" text-neutral-400 text-xs font-normal font-roboto leading-normal sm:text-right">
            26th March 2024
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 mr-20 ">
        <div>
          <div className="relative flex items-center gap-4 text-black">
            <IoMdNotificationsOutline size={27} color="#999" />
            <Link to="/login" className="flex items-center gap-10 ">
              <img
                src={profile}
                className="w-8 h-8 rounded-full object-cover transition-transform duration-500 transform hover:scale-110"
                alt="Profile Picture"
              />
              <p className="-ml-6 ">
                <div className=" text-gray-50">
                  {user && user.USER && user.USER.name
                    ? user.USER.name
                    : "Client"}
                </div>

                <div className="text-neutral-400 flex gap-20 text-xs font-normal font-['Roboto'] leading-normal">
                  <div className="text-neutral-400 flex gap-20 text-xs font-normal font-['Roboto'] leading-normal">
                    {user.USER.role ? user.USER.role : "Unknown Role"}
                    <RiArrowDropDownLine className="w-5 h-5" />
                  </div>
                </div>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
