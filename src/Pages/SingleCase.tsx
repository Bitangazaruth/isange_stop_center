import axios from "axios";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import { useParams } from "react-router-dom";

const SingleCase = () => {
  const { _id } = useParams();
  const [singleCase, setSingleCase] = useState<any>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newRole, setSelectedRole] = useState("");
  const token = localStorage.getItem("access_token");
  const [allUsersRib, setallUsersRib] = useState<any>([]);
  const [allUsersDoc, setAllUsersDoc] = useState<any>([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("https://isange-pro-be.onrender.com/api/v1/user/all", config)
      .then((res) => {
        console.log(res);
        setallUsersRib(res.data.clients.filter((c) => c.role === "RIB"));
        setAllUsersDoc(res.data.clients.filter((c) => c.role === "hospital"));
      })
      .catch((e) => console.log(e));
  }, []);

  const handleCaseAssign = async (event) => {
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

      await axios
        .put(
          `https://isange-pro-be.onrender.com/api/v1/Case/adminUpdateCaseToRib/${_id}`,
          { ribId: newRole },
          config
        )
        .then((res) => {
          console.log(res);
          Notiflix.Notify.success("Case assigned to RIB");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  const handleCaseAssignDoc = async (event) => {
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

      await axios
        .put(
          `https://isange-pro-be.onrender.com/api/v1/Case/adminUpdatesCaseToHospital/${_id}`,
          { hospitalId: newRole },
          config
        )
        .then((res) => {
          console.log(res);
          Notiflix.Notify.success("Case assigned to Hospital");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  const handleCaseAccepted = async (event) => {
    const newRole = Boolean(event.target.value);
    setSelectedRole(newRole);

    try {
      const userString = localStorage.getItem("IsLoggedIn");
      const user = userString ? JSON.parse(userString) : null;
      const role = user.USER.role;
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
        "https://isange-pro-be.onrender.com/api/v1/user/all",
        config
      );
      const hospitals = response.data.filter(
        (user) => user.role === "hospital"
      );

      if (role === "RIB") {
        await axios
          .put(
            `https://isange-pro-be.onrender.com/api/v1/Case/RIBAcceptReject/${_id}`,
            {
              isRIBAccepted: newRole,
            },
            config
          )
          .then((res) => {
            console.log(res);
            Notiflix.Notify.success("Case accepted by RIB");
          })
          .catch((e) => console.log(e));
      }

      if (role === "hospital") {
        await axios
          .put(
            `https://isange-pro-be.onrender.com/api/v1/Case/HospitalAcceptReject/${_id}`,
            {
              isHospitalAccepted: newRole,
            },
            config
          )
          .then((res) => {
            console.log(res);
            Notiflix.Notify.success("Case accepted by hospital");
          })
          .catch((e) => console.log(e));
      }
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(token);

    axios
      .get(
        `https://isange-pro-be.onrender.com/api/v1/case/getCaseById/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log("##### signle case", data);
        setSingleCase(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching case data");
        setLoading(false);
      });
  }, [_id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!singleCase) {
    return <div className="text-center mt-8">No case data found</div>;
  }

  const {
    caseTitle,
    typeOfCase,
    progress,
    dateOfIncident,
    location,
    photo,
    description,
    isRIBAccepted,
    responseText,
    victim_name,
    victim_email,
    victim_phone,
    national_id,
    gender,
    risk_type,
    documents,
    status,
    isEmergency,
  } = singleCase;
  console.log("##### isemergency", isEmergency);

  const userString = localStorage.getItem("IsLoggedIn");
  const user = userString ? JSON.parse(userString) : null;


  const currRole = user.USER.role;

  return (
    <div className="flex w-full">
      <div className="flex-1 p-4">
        <div className="p-4 flex flex-col md:flex-row gap-5">
          <div className="flex-1 p-4 bg-white rounded-lg shadow-lg relative">
            {/* <button className="absolute top-2 right-2 bg-yellow-500 text-white text-xs p-1 rounded-bl-lg">
              Assign case */}
            <div
              hidden={currRole !== undefined && currRole !== "admin"}
              className="absolute top-0 right-0 p-1 text-xs text-yellow-600 bg-yellow-100 rounded-bl"
            >
              <label htmlFor="role-select" className="mr-2">
                Assign Case to RIB:
              </label>
              <select
                id="role-select"
                value={newRole}
                onChange={handleCaseAssign}
                className="p-1 border rounded"
              >
                <option>Select a RIB user</option>
                {allUsersRib.length !== 0 &&
                  allUsersRib.map((u) => (
                    <option value={u._id}>{u.name}</option>
                  ))}
                {allUsersRib.length === 0 && (
                  <option value="loading">loading</option>
                )}
              </select>
            </div>
            <div
              hidden={currRole !== undefined && currRole !== "admin"}
              className="absolute top-12 right-0 p-1 text-xs text-yellow-600 bg-yellow-100 rounded-bl"
            >
              <label htmlFor="role-select" className="mr-2">
                Assign Case to Hospital:
              </label>
              <select
                id="role-select"
                value={newRole}
                onChange={handleCaseAssignDoc}
                className="p-1 border rounded"
              >
                <option>Select a Hospitals</option>
                {allUsersDoc.length !== 0 &&
                  allUsersDoc.map((u) => (
                    <option value={u._id}>{u.name}</option>
                  ))}
                {allUsersDoc.length === 0 && (
                  <option value="loading">loading</option>
                )}
              </select>
            </div>

            <div
              hidden={
                currRole !== undefined &&
                currRole !== "RIB" &&
                currRole !== "doctor"
              }
              className="absolute top-0 right-0 p-1 text-xs text-yellow-600 bg-yellow-100 rounded-bl"
            >
              <label htmlFor="role-select" className="mr-2">
                Accept:
              </label>
              <select
                id="role-select"
                value={newRole}
                onChange={handleCaseAccepted}
                className="p-1 border rounded"
              >
                <option>Select an action</option>

                <option value={1}>Accept</option>
              </select>
            </div>

            {/* </button> */}
            <div className="flex gap-5">
              <div>
                <h2 className="mb-2 text-gray-600">Case Details</h2>
                <p className="font-bold text-lg mb-2">{caseTitle}</p>
                <p className="mb-4">{description}</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {typeOfCase}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(dateOfIncident).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Progress:</span> {progress}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {location}
                    </a>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Status:</span> {status}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Assigned To:</span>{" "}
                    {isRIBAccepted ? "RIB Kacyiru" : "Not Assigned"}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Response Text:</span>{" "}
                    {responseText}
                  </p>
                  <p>
                    <span className="font-semibold">Emergency:</span>{" "}
                    {JSON.stringify(isEmergency)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Victim Details</h2>
            <div className="mb-4">
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {victim_name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {victim_email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone:</span> {victim_phone}
              </p>
              <p className="mb-2">
                <span className="font-semibold">National ID:</span>{" "}
                {national_id}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Gender:</span> {gender}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Risk Type:</span> {risk_type}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-4">Additional Documents</h3>
            <div className="flex flex-col gap-4">
             
              {documents && (
                <a
                  href={documents}
                  download
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  View Documents <MdDownload className="ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCase;
