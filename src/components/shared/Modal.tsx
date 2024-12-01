import React, { useState } from "react";
import Notiflix from "notiflix";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : null,
    });
  };

  const createNewCase = async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        Notiflix.Notify.failure("No access token found in local storage");
        throw new Error("No access token found in local storage");
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(
          key,
          formData[key as keyof typeof formData] as Blob | string
        );
      });

      const response = await fetch(
        "https://isange-pro-be.onrender.com/api/v1/Case/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        Notiflix.Notify.failure(`Error creating case: ${errorText}`);
        throw new Error(`Error creating case: ${errorText}`);
      }

      const jsonData = await response.json();
      setCaseData(jsonData.case);
      console.log("Created case data:", jsonData.case);

      Notiflix.Notify.success("Case created successfully");

      // Reset form fields
      setFormData({
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
        photo: null,
        documents: null,
      });

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating case:", error);
      Notiflix.Notify.failure("Error creating case");
    } finally {
      setIsLoading(false);
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
        ) : caseData ? (
          <div className="p-4 rounded-lg bg-gray-100 mb-4">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              CASE DETAILS
            </h1>
            <div className="flex items-center mb-4">
              <h5 className="text-sm font-bold text-gray-800 mr-2">
                CASE NAME
              </h5>
              <p className="text-sm text-gray-600">{caseData.caseTitle}</p>
            </div>
            <div className="flex items-center mb-4">
              <h5 className="text-sm font-bold text-gray-800 mr-2">
                VICTIM NAME
              </h5>
              <p className="text-sm text-gray-600">{caseData.victim_name}</p>
            </div>
            <div className="flex items-center mb-4">
              <h5 className="text-sm font-bold text-gray-800 mr-2">
                DESCRIPTION
              </h5>
              <p className="text-sm text-gray-600">{caseData.description}</p>
            </div>
            <div className="flex items-center mb-4">
              <h5 className="text-sm font-bold text-gray-800 mr-2">
                CREATE DATE
              </h5>
              <p className="text-sm text-gray-600">
                {new Date(caseData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <h5 className="text-sm font-bold text-gray-800 mr-2">
                LAST UPDATED
              </h5>
              <p className="text-sm text-gray-600">
                {new Date(caseData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Add New Case
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createNewCase();
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
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Documents
                  </label>
                  <input
                    type="file"
                    name="documents"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="w-[160.39px] h-[41.46px] bg-[#084287] rounded-[14.62px] text-white text-lg font-normal font-inter capitalize mr-4"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-[160.39px] h-[41.46px] bg-[#084287] rounded-[14.62px] text-white text-lg font-normal font-inter capitalize"
                >
                  Add Case
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
