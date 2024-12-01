import React, { useState } from "react";
import Notiflix from "notiflix";

interface ModalProps {
  onClose: () => void;
}

interface CaseData {
  victim_name: string;
  gender: string;
  doctor_name: string;
  needed_aid: string;
  next_appointment: string;
}

const FollowUpModal: React.FC<ModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CaseData>({
    victim_name: "",
    gender: "",
    doctor_name: "",
    needed_aid: "",
    next_appointment: "",
  });
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

  const addNewCase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://isange-pro-be.onrender.com/api/v1/follow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Notiflix.Notify.success("Case added successfully!");

      setFormData({
        victim_name: "",
        gender: "",
        doctor_name: "",
        needed_aid: "",
        next_appointment: "",
      });
    } catch (error) {
      console.error("Error adding case:", error);
      Notiflix.Notify.failure("Failed to add case.");
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
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Add New Case
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNewCase();
              }}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
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
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Needed Aid
                  </label>
                  <input
                    type="text"
                    name="needed_aid"
                    value={formData.needed_aid}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Next Appointment
                  </label>
                  <input
                    type="datetime-local"
                    name="next_appointment"
                    value={formData.next_appointment}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
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
                  Add a follow case
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpModal;
