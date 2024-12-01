import React, { useState, ChangeEvent, FormEvent } from "react";
import logo from "../../public/images/logo-1.png";
import rnpImage from "../../public/images/rnp.png";
import ribImage from "../../public/images/download.jpeg";
import stopImage from "../../public/images/stop.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notiflix from "notiflix";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return; // Ensure the function exits if passwords don't match
    }

    setLoading(true);
    setError("");

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await axios.post(
        "https://isange-pro-be.onrender.com/api/v1/user/signup",
        form
      );

      Notiflix.Notify.success("Your account has been created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      Notiflix.Notify.failure("Account creation failed");
      if (error.response) {
        console.error("Signup Error - Server Response:", error.response.data);
      } else if (error.request) {
        console.error("Signup Error - No Response Received:", error.request);
      } else {
        console.error("Signup Error - Request Setup: ", error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex w-full h-screen bg-[#084287]">
        <div className="hidden lg:flex h-full w-1/2 items-center justify-center">
          <div>
            <img src={logo} alt="logo" className="mx-auto" />
            <div className="flex justify-evenly mt-[14rem]">
              <img src={rnpImage} alt="RNP" className="h-20" />
              <img
                src={ribImage}
                alt="RIB"
                className="h-16 mt-2 rounded-full"
              />
              <img src={stopImage} alt="stop" className="h-20" />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className="bg-white px-20 py-9 rounded-lg shadow-lg w-full mr-4">
            <h1 className="text-[18px] font-semibold">Create An Account</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Full Names
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your names"
                  className="w-full border-2 rounded-sm p-[5px] mt-1 bg-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full border-2 rounded-sm p-[5px] mt-1 bg-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full border-2 rounded-sm p-[5px] mt-1 bg-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full border-2 rounded-sm p-[5px] mt-1 bg-transparent"
                />
              </div>
              <div className="flex mt-4 justify-between items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label className="ml-2 text-sm font-medium">
                    I have read and agreed to the terms of Services and Privacy
                    Policy
                  </label>
                </div>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-3 flex flex-col gap-y-2">
                <button
                  type="submit"
                  className="active:scale-[.98] hover:scale-[1.01] active:duration-75 transition-all rounded-xl py-1 bg-[#084287] text-white text-lg font-bold"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#084287] font-medium">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
