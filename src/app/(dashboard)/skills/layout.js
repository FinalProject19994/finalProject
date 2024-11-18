"use client";
import SkillsGraph from "./SkillsGraph";

const Page = ({ children }) => {
  // const [skills, setSkills] = useState([]);

  return (
    <div className="flex h-[90dvh] flex-col gap-4 overflow-hidden px-4 md:flex-row">
      {/* LEFT */}
      <SkillsGraph />
      {/* <SkillsGraph nodes={skills} links={[]} /> */}

      {/* RIGHT */}
      <div className="">{children}</div>
    </div>
  );
};

export default Page;
