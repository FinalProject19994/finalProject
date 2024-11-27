"use client";
import SkillsGraph from "./SkillsGraph";

const Page = ({ children }) => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 overflow-clip px-4 md:flex-row">
      {/* LEFT */}
      <div className="w-1/2">{children}</div>

      {/* RIGHT */}
      <div className="flex w-1/2 gap-4 rounded-md bg-white text-3xl shadow-md">
        <SkillsGraph />
      </div>
    </div>
  );
};

export default Page;
