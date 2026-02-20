import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">
        News Dashboard
      </h1>

      {/* Navigation Links + Logout */}
      <div className="flex items-center gap-4">

        <Link
          to="/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        {/* ✅ ADDED PROFILE LINK */}
        <Link
          to="/profile"
          className="hover:text-gray-300"
        >
          Profile
        </Link>

        <Link
          to="/favorites"
          className="hover:text-gray-300"
        >
          Favorites
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
