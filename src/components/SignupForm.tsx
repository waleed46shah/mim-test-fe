import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { validateSignup } from "../utils/validation";
import axios from "axios";
import toast from "react-hot-toast";
import { SignupRequest, SignupResponse } from "../types/auth";

const SignupForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignup(username, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const requestData: SignupRequest = { name: username, email, password };

    try {
      const response = await axios.post<SignupResponse>(
        "https://mim-test-be.vercel.app/api/auth/register",
        requestData
      );
      if (response.data.status === "success") {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Unable to signup. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
      <header>
        <img
          className="w-20 mx-auto mb-5"
          src="https://img.icons8.com/fluent/344/year-of-tiger.png"
          alt="logo"
        />
      </header>

      <div className="py-4">
        <GoogleButton
          label="Signup with Google"
          onClick={() => {
            /* Additional actions after signup */
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="username">
            Username
          </label>
          <input
            className="w-full p-2 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: undefined });
            }}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: undefined });
            }}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: undefined });
            }}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <button
            className="w-full mt-2 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <footer>
        <Link
          className="text-indigo-700 hover:text-pink-700 text-sm float-right"
          to={"/login"}
        >
          Sign in
        </Link>
      </footer>
    </div>
  );
};

export default SignupForm;
