import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const { _id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `https://isange-pro-be.onrender.com/api/v1/user/getuserById/${_id}`,
          config
        );

        console.log("Response data:", response.data); // Debugging log

        if (response.data && response.data.client) {
          setUser(response.data.client);
          setSelectedRole(response.data.client.role);
        } else {
          console.error("Client data not found in response");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [_id]);

  const handleRoleChange = async (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `https://isange-pro-be.onrender.com/api/v1/user/changeRole/${_id}`,
        { role: newRole },
        config
      );

      setUser((prevUser) => ({ ...prevUser, role: newRole }));
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full justify-center items-center mt-4">
      <div className="w-3/4 p-5 shadow-md relative bg-white">
        <div className="absolute top-0 right-0 p-1 text-xs text-yellow-600 bg-yellow-100 rounded-bl">
          <label htmlFor="role-select" className="mr-2">
            Change Role:
          </label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={handleRoleChange}
            className="p-1 border rounded"
          >
            <option value="user">User</option>
            <option value="RIB">RIB</option>
            <option value="hospital">Hospital</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <h1 className="text-lg text-gray-500 mb-3">Information</h1>
        <div className="flex gap-5">
          <img
            src={"defaultProfileImage.jpg"}
            alt="profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-700 mb-3">
              {user.name}
            </h1>
            <div className="mb-3 text-sm">
              <span className="font-bold text-gray-600 mr-1">Email:</span>
              <span className="font-light">{user.email}</span>
            </div>
            <div className="mb-3 text-sm">
              <span className="font-bold text-gray-600 mr-1">Role:</span>
              <span className="font-light">{user.role}</span>
            </div>
            <div className="mb-3 text-sm">
              <span className="font-bold text-gray-600 mr-1">User Type:</span>
              <span className="font-light">{user.userType}</span>
            </div>
            <div className="mb-3 text-sm">
              <span className="font-bold text-gray-600 mr-1">Last Login:</span>
              <span className="font-light">
                {new Date(user.lastLogin).toLocaleString()}
              </span>
            </div>
            <div className="mb-3 text-sm">
              <span className="font-bold text-gray-600 mr-1">
                Date Registered:
              </span>
              <span className="font-light">
                {new Date(user.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
