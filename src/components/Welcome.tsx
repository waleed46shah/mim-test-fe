import { useEffect, useState } from "react";
import { getUserId } from "../utils/auth";
import { User } from "../types/user";
import UpdateProfileModal from "./UpdateProfileModal";

const Welcome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = getUserId();
  const isGoogleLogin = localStorage.getItem("isGoogleLogin") === "true";

  const fetchUserData = async () => {
    if (isGoogleLogin) {
      setUser({
        name: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
      });
    } else if (userId) {
      try {
        const response = await fetch(
          `https://mim-test-be.vercel.app/api/user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    await fetchUserData();
  };

  return (
    <div className="mt-4 p-8 bg-blue-100 rounded-lg shadow-lg mx-4 md:mx-8 lg:mx-12">
      {user ? (
        <>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {user.name}!
          </h1>
          <h3 className="text-gray-500">{user.email}</h3>
          {isGoogleLogin ? (
            "Profile can't be updated with google login"
          ) : (
            <button
              onClick={handleOpenModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          )}
          {isModalOpen && !isGoogleLogin && (
            <UpdateProfileModal user={user} onClose={handleCloseModal} />
          )}
        </>
      ) : (
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome!
        </h1>
      )}
    </div>
  );
};

export default Welcome;
