import React, { useContext } from "react";
import { googleLogout } from "@react-oauth/google";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UserInfo: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("UserInfo must be used within an AppContextProvider");
  }

  const { profile, setProfile } = context;

  const handleLogout = () => {
    googleLogout();
    setProfile(null);
    navigate("/");
  };

  if (!profile) {
    return (
      <div className="text-center text-gray-400 bg-black">
        No user profile available.
      </div>
    );
  }

  return (
    <div className=" bg-black w-screen h-screen">
      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <img
            src={profile.picture}
            alt={`${profile.name}'s profile`}
            className="w-24 h-24 rounded-full border-4 border-green-500 shadow-md"
          />
          <h2 className="text-3xl font-semibold text-center mt-4 glow-text">
            {profile.name}
          </h2>
          <p className="text-lg text-center glow-text">{profile.email}</p>
          <p className="text-center mt-2">
            <span className="font-medium">Verified Email: </span>
            <span
              className={`${
                profile.verified_email
                  ? "text-green-400 glow-text"
                  : "text-red-400 glow-text"
              }`}
            >
              {profile.verified_email ? "Yes" : "No"}
            </span>
          </p>
        </div>
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-inner">
          <p className="mt-2 glow-text">
            <span className="font-medium">Given Name:</span>{" "}
            {profile.given_name}
          </p>
          <p className="mt-2 glow-text">
            <span className="font-medium">Family Name:</span>{" "}
            {profile.family_name}
          </p>
          <p className="mt-2 glow-text">
            <span className="font-medium">Locale:</span> {profile.locale}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md mt-6 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
