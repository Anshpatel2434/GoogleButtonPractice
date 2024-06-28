import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

export const Navbar = () => {
  const [log, setLog] = useState(true);
  const [sign, setSign] = useState(true);

  const updateLog = () => {
    setLog(!log);
  };
  const updateSign = () => {
    setSign(!sign);
  };

  return (
    <div className="w-screen h-[5rem] bg-[#000015] flex justify-center border-b-2 items-center fixed z-10">
      <Link to="/" className="text-[#FF0031] text-[2rem] font-moul ml-[1.4rem]">
        StudySphere
      </Link>
      <div className="flex absolute right-[1rem] gap-4">
        {log && <Login updateLog={updateLog} />}
        {sign && <Signup updateSign={updateSign} />}
      </div>
    </div>
  );
};
