import React from "react";
import { Link } from "react-router-dom";

export const Login = ({ updateLog }: { updateLog: () => void }) => {
  updateLog();
  return (
    <Link
      to="/signup"
      className="min-w-[5rem] h-[2.5rem] rounded-lg flex items-center bg-[#ff0031] text-white text-[1.2rem] font-semibold px-[1rem] font-oswald hover:bg-white hover:text-[#ff0031]"
    >
      Login
    </Link>
  );
};
