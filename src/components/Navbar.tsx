import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://mim-test-be.vercel.app/api/auth/logout"
      );

      if (response.status !== 200) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPicture");
      localStorage.removeItem("isGoogleLogin");
      localStorage.removeItem("googleAccessToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="w-screen flex justify-between items-center py-2 shadow-sm px-5">
      <img
        className="w-12"
        src="https://img.icons8.com/fluent/344/year-of-tiger.png"
        alt="logo"
      />

      <button
        className="block text-sm bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
