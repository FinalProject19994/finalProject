// skills/layout.js
"use client";
import SkillsGraph from "./SkillsGraph";
import { SelectedNodeIdProvider } from "./SelectedNodeIdContext";

const Page = ({ children }) => {
  return (
    <SelectedNodeIdProvider>
      <div className="my-2 flex h-[98%] flex-col gap-4 px-4 md:flex-row">
        {/* LEFT */}
        <div className="h-[98%] w-full md:w-1/2">{children}</div>

        {/* RIGHT */}
        <div className="flex h-full rounded-md bg-white shadow-md md:w-1/2">
          <SkillsGraph />
        </div>
      </div>
    </SelectedNodeIdProvider>
  );
};

export default Page;
