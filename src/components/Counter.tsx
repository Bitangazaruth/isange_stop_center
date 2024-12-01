import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

const Counter = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await fetch(
          "https://isange-pro-be.onrender.com/api/v1/follow"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNotificationCount(data.length); // Assuming data is an array of follows
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, []);

  return (
    <div className="relative flex items-center">
      <div className="relative">
        <FaBell className="text-2xl cursor-pointer" />
        {notificationCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notificationCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
