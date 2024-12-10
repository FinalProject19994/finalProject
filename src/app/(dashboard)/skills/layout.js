import SkillsGraph from "./SkillsGraph";

const Page = ({ children }) => {
  return (
    <div className="flex h-[90dvh] flex-col gap-4 px-4 md:flex-row">
      {/* LEFT */}
      <div className="w-full md:w-3/5">{children}</div>

      {/* RIGHT */}
      <div className="flex h-full rounded-md bg-white shadow-md md:w-2/5">
        <SkillsGraph />
      </div>
    </div>
  );
};

export default Page;
