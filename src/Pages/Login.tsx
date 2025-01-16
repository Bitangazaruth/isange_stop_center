import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo-1.png";
import rnpImage from "../../public/images/rnp.png";
import ribImage from "../../public/images/download.jpeg";
import stopImage from "../../public/images/stop.png";
import Notiflix from "notiflix";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://isange-pro-be.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
        setLoading(false);
        return;
      }

      const data = await response.json();

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("IsLoggedIn", JSON.stringify(data));
      Notiflix.Notify.success("Login successful");
      // Navigate to dashboard for now
      navigate("/admin/dashboard");
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#084287]">
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center">
        <div className="">
          <img src={logo} alt="logo" className="mx-auto" />
          <div className="flex justify-evenly mt-[14rem]">
            <img src={rnpImage} alt="RNP" className="h-20" />
            <img src={ribImage} alt="RIB" className="h-16 mt-2 rounded-full" />
            <img src={stopImage} alt="stop" className="h-20" />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-20 py-10 rounded-lg shadow-lg w-full h-[90%] mr-4">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Welcome Back!! Please enter your details
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
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
            <div className="mt-4">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full border-2 rounded-sm p-[5px] mt-1 bg-transparent"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="flex mt-4 justify-between items-center">
              <button type="button" className="text-sm text-violet-800">
                <p>Forgot Password?</p>
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4 flex flex-col gap-y-2">
              <button
                type="submit"
                className="active:scale-[.98] hover:scale-[1.01] active:duration-75 transition-all rounded-xl py-1 bg-[#084287] text-white text-lg font-bold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Do not have an account??{" "}
                <Link to="/signup" className="text-[#084287] font-medium">
                  SignUp here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
