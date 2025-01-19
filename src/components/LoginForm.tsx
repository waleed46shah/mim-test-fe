import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { validateLogin } from "../utils/validation";
import { LoginRequest, LoginResponse } from "../types/auth";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLogin(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const requestData: LoginRequest = { email, password };

    try {
      const response = await axios.post<LoginResponse>(
        "https://mim-test-be.vercel.app/api/auth/login",
        requestData
      );
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Unable to login. Please check your email or password.");
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
          label="Login with Google"
          onClick={() => {
            /* Additional actions after login */
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="username">
            Email
          </label>
          <input
            className="w-full p-2 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="email"
            name="username"
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
          <label
            className=" mb-2 text-indigo-500 flex items-center gap-1"
            htmlFor="rememberMe"
          >
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <div>
          <button
            className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <footer>
        <Link
          className="text-indigo-700 hover:text-pink-700 text-sm float-left"
          to={""}
        >
          Forgot Password?
        </Link>
        <Link
          className="text-indigo-700 hover:text-pink-700 text-sm float-right"
          to={"/signup"}
        >
          Create Account
        </Link>
      </footer>
    </div>
  );
};

export default LoginForm;
