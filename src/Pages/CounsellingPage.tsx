import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import ribImage from "../../public/images/rib-removebg-preview.png";
import rnpImage from "../../public/images/policel-removebg-preview.png";

const CounsellingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleQuestionClick = (question) => {
    setActiveQuestion(question);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://isange-pro-be.onrender.com/api/v1/cont/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ email: "", message: "" });
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Isange One Stop Center
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <img src={ribImage} alt="RIB" className="w-20 h-20" />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                RIB Toll-Free Number
              </h2>
              <p>If you need immediate assistance, please call:</p>
              <p className="mt-4 text-3xl font-bold text-blue-600">3151</p>
              <p className="mt-2 text-gray-600">
                The RIB (Rwanda Investigation Bureau) hotline provides 24/7
                support for crisis situations
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <img src={rnpImage} alt="RNP" className="w-20 h-20" />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                RNP Toll-Free Number
              </h2>
              <p>If you need immediate assistance, please call:</p>
              <p className="mt-4 text-2xl font-bold text-blue-600">900</p>
              <p className="mt-2 text-gray-600">
                The RNP (Rwanda National Police) hotline is available 24/7 for
                emergency police assistance
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Direct Support</h2>
          <p>
            If you need direct support, please contact one of our staff members:
          </p>
          <div className="mt-2">
            <p className="mt-2 text-gray-600">
              <strong>Bitangaza Ruth:</strong> +250 787 203 308
            </p>
            {/* <p className="text-gray-600">Role: CEO</p>
            <p className="mt-2 text-gray-600">
              <strong>Jane Smith:</strong> +250 787 654 321
            </p>
            <p className="text-gray-600">Role: Support Specialist</p>
            <p className="mt-2 text-gray-600">
              <strong>Mark Johnson:</strong> +250 780 789 012
            </p> */}
            <p className="text-gray-600">Role: Crisis Counselor</p>
            <p className="mt-2 text-gray-600">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:ruthbitangaza99@gmail.com"
                className="text-blue-600 hover:underline"
              >
                ruthbitangaza99@gmail.com
              </a>
            </p>
          </div>

          <button
            className="mt-4 bg-[#084287] text-white px-4 py-2 rounded-lg hover:bg-[#000] focus:outline-none"
            onClick={toggleContactForm}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
          onClick={toggleChat}
        >
          <FaCommentDots className="text-2xl" />
        </button>
      </div>

      {showChat && (
        <div className="fixed bottom-20 right-6 bg-white p-6 shadow-lg rounded-lg w-80">
          <h2 className="text-xl font-semibold mb-4">Quick Questions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() =>
                handleQuestionClick("What services are available?")
              }
            >
              Need Health Care support?
            </li>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleQuestionClick("How can I contact support?")}
            >
              Need Justice support?
            </li>
            <li
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() =>
                handleQuestionClick("Where can I find more resources?")
              }
            >
              Need Pyschology support?
            </li>
          </ul>
          {activeQuestion && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold">Answer:</h3>
              {activeQuestion === "What services are available?" && (
                <p>
                  CrisisGuard offers a range of services including crisis
                  intervention, counseling, legal assistance, and medical
                  support. These services are designed to help individuals in
                  crisis situations receive the support they need promptly.
                </p>
              )}
              {activeQuestion === "How can I contact support?" && (
                <p>
                  You can contact support by calling the toll-free numbers
                  provided above for immediate assistance. For non-urgent
                  matters, you can reach out via email or visit the Isange One
                  Stop Center during working hours.
                </p>
              )}
              {activeQuestion === "Where can I find more resources?" && (
                <p>
                  More resources are available on the CrisisGuard website and at
                  the Isange One Stop Center. You can access informational
                  brochures, support groups, and links to external resources
                  that provide additional help and guidance.
                </p>
              )}
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                onClick={() => setActiveQuestion("")}
              >
                Close Answer
              </button>
            </div>
          )}
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
            onClick={toggleChat}
          >
            Close Chat
          </button>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none"
            onClick={toggleOverlay}
          >
            More Info
          </button>
        </div>
      )}

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded-lg w-80 relative">
            <h2 className="text-xl font-semibold mb-4">
              Additional Information
            </h2>
            <p>
              If you require further assistance or have more questions, please
              visit our website or contact us through the provided toll-free
              numbers. Our support team is here to help you with any inquiries
              and provide the necessary resources to assist you.
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
              onClick={toggleOverlay}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg rounded-lg w-80 relative">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4"
                required
              />
              <label className="block mb-2">Your Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg mb-4"
                rows="4"
                placeholder="Type your message here"
                required
              ></textarea>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Send Message
              </button>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                onClick={toggleContactForm}
                type="button"
              >
                Close
              </button>
            </form>
            {formStatus && <p className="mt-4">{formStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellingPage;
