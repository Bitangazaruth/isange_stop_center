import React, { useEffect, useState } from "react";

interface ModalProps {
  onClose: () => void;
  id: string;
}

const EditModal: React.FC<ModalProps> = ({ onClose, id }) => {
  const [formData, setFormData] = useState({
    caseTitle: "",
    dateOfIncident: "",
    location: "",
    description: "",
    victim_name: "",
    victim_email: "",
    victim_phone: "",
    national_id: "",
    gender: "",
    risk_type: "",
    photo: null as File | null,
    documents: null as File | null,
  });
  const [caseData, setCaseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const response = await fetch(
          `https://isange-pro-be.onrender.com/api/v1/Case/getCaseById/${id}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching case data: ${errorText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        const jsonData = await response.json();
        console.log("Fetched case data:", jsonData);
        setCaseData(jsonData);
        setFormData({
          caseTitle: jsonData.caseTitle,
          dateOfIncident: jsonData.dateOfIncident,
          location: jsonData.location,
          description: jsonData.description,
          victim_name: jsonData.victim_name,
          victim_email: jsonData.victim_email,
          victim_phone: jsonData.victim_phone,
          national_id: jsonData.national_id,
          gender: jsonData.gender,
          risk_type: jsonData.risk_type,
          photo: null,
          documents: null,
        });
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCaseData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : null,
    });
  };

  const updateCase = async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("No access token found in local storage");
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key as keyof typeof formData]) {
          formDataToSend.append(
            key,
            formData[key as keyof typeof formData] as Blob | string
          );
        }
      });

      const response = await fetch(
        `https://isange-pro-be.onrender.com/api/v1/Case/userUpdateCase/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating case: ${errorText}`);
      }

      const jsonData = await response.json();
      setCaseData(jsonData.case);
      console.log("Updated case data:", jsonData.case);
    } catch (error) {
      console.error("Error updating case:", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-lg z-10 w-full max-w-2xl max-h-[80%] overflow-y-auto">
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Edit Case
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCase();
              }}
            >
              <div className="">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Case Name
                    </label>
                    <input
                      type="text"
                      name="caseTitle"
                      value={formData.caseTitle}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date of Incident
                    </label>
                    <input
                      type="date"
                      name="dateOfIncident"
                      value={formData.dateOfIncident}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Victim Name
                    </label>
                    <input
                      type="text"
                      name="victim_name"
                      value={formData.victim_name}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Victim Email
                    </label>
                    <input
                      type="email"
                      name="victim_email"
                      value={formData.victim_email}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Victim Phone
                    </label>
                    <input
                      type="text"
                      name="victim_phone"
                      value={formData.victim_phone}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      National ID
                    </label>
                    <input
                      type="text"
                      name="national_id"
                      value={formData.national_id}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Risk Type
                    </label>
                    <input
                      type="text"
                      name="risk_type"
                      value={formData.risk_type}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Photo
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Documents
                    </label>
                    <input
                      type="file"
                      name="documents"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={updateCase}
                >
                  Update Case
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditModal;
