import React, { useContext, useState } from "react";
import { SingupInput } from "@anshpatel2434/odoo-combat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { AppContext } from "../context/AppContext";

const AskPassword: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AskPassword must be used within an AppContextProvider");
  }

  const { profile, setProfile } = context;

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  // Setting up the user in the backend
  async function sendRequest(signup: SingupInput) {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signup);
    } catch (error) {
      alert("Error while signing up");
    }
  }

  function handleSendRequest() {
    if (password === confirmPassword) {
      if (profile) {
        const signup: SingupInput = {
          name: profile.name,
          email: profile.email,
          password: password,
        };
        sendRequest(signup);
      }
      navigate("/userInfo");
    } else {
      alert("Password and Confirm Password do not match");
      googleLogout();
      setProfile(null);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Set Your Password
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-left font-medium mb-1"
          >
            Enter your password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-left font-medium mb-1"
          >
            Confirm your password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleSendRequest}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AskPassword;
