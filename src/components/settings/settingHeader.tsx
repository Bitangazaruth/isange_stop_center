import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
function settings() {
  return (
    <div className="w-[800px] h-[55px] mt-9 relative bg-white m-auto shadow-md rounded-lg ">
      <Link to="changePassword">
        <div className="w-[149px] px-3 py-3 left-[440px] top-[8px] absolute text-emerald-800 rounded-xl text-xs font-semibold font-['Inter'] hover:border-2 hover:border-emerald-800">
          Change Password
        </div>
      </Link>
      <Link to="ProfileSetting">
        <div className="w-[137px] px-4 py-3 left-[10px] top-[10px] absolute bg-white rounded-xl  justify-start items-center gap-2.5 inline-flex hover:border-2 hover:border-emerald-800">
          <div className="grow shrink basis-0 text-emerald-800 text-xs font-semibold font-['Inter']">
            My Account
          </div>
        </div>
      </Link>
      <div className="w-[190px] h-11 px-[18.67px] left-[593px] top-[6px] absolute bg-white rounded-[10.67px] hover:border-2 border-zinc-300 justify-start items-center gap-4 inline-flex hover:border-emerald-800">
        <select className="grow  shrink basis-0 text-emerald-800 text-xs font-normal font-['Inter'] leading-snug  outline-none bg-transparent">
          <div className="px-[5.33px] py-2 flex-col justify-start items-start gap-[13.33px] inline-flex pointer-events-none">
            <RiArrowDropDownLine className="w-10 h-10" />
          </div>
          <option disabled selected>
            Select Languages
          </option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <div className="w-[143px] px-2 py-3 rounded-xl left-[145px] top-[8px] absolute text-emerald-800 text-xs font-semibold font-['Inter'] hover:border-2 hover:border-emerald-800">
        Device Management
      </div>
      <div className="w-[147px] left-[287px] px-1 py-3 rounded-xl top-[8px] absolute text-emerald-800 text-xs font-semibold font-['Inter'] hover:border-2 hover:border-emerald-800">
        Crop Management
      </div>
    </div>
  );
}

export default settings;
