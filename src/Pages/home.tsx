import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#084287] h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-white mb-4 animate-zoom">
        Welcome to CRISIS GUARD
      </h1>
      <h2 className="text-white text-lg font-bold">By Isange One Stop Center</h2>
      <Link className="border-b text-blue-200 hover:text-blue-400 mt-4" to="/signup">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
