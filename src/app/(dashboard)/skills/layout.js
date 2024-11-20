"use client";
import SkillsGraph from "./SkillsGraph";

const Page = ({ children }) => {
  return (
    <div className="over flex h-[90dvh] flex-col gap-4 overflow-clip px-4 md:flex-row">
      {/* LEFT */}
      <div className="w-[35%]">{children}</div>
      {/* <SkillsGraph nodes={skills} links={[]} /> */}

      {/* RIGHT */}
      <SkillsGraph />
    </div>
  );
};

export default Page;
