import React from "react";

export const Signup = ({ updateSign }: { updateSign: () => void }) => {
  updateSign();
  updateSign();
  return (
    <button className="min-w-[5rem] h-[2.5rem] rounded-lg flex items-center bg-[#ff0031] text-white text-[1.2rem] font-semibold px-[1rem] font-oswald hover:bg-white hover:text-[#ff0031]">
      SignUp
    </button>
  );
};
