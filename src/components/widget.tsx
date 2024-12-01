const Widget = ({ title, amount, diff, icon, textColor, description }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-md shadow bg-white">
      <div>
        <p className="text-gray-700 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{amount}</p>
        <div
          className={`flex items-center ${
            diff > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="text-sm">+{diff}% </span>
          <span className="text-sm lg:text-[8px] ml-2 underline text-[#999]">
            {description}
          </span>
        </div>
      </div>
      <div
        className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-200 ${textColor}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default Widget;
