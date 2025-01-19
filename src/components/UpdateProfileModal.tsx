import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface UpdateProfileModalProps {
  user: { _id?: string; name: string; email: string };
  onClose: () => void;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  user,
  onClose,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = user._id;

    try {
      const response = await axios.put(
        `https://mim-test-be.vercel.app/api/user/update/${userId}`,
        {
          name,
          email,
        }
      );

      if (response.status === 200) {
        toast.success("User updated!");
        onClose();
      } else {
        toast.error("Failed to update data");
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
