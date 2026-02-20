import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">
            News Aggregator
          </h1>

          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 hover:text-indigo-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated with Latest News
          </h2>
          <p className="text-gray-600 mb-6">
            Aggregate and summarize news from multiple sources in one place.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 text-white px-6 py-3 rounded text-lg hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
